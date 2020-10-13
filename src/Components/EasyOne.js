import React, { Component } from 'react';
import './EasyOne.css';

export default class EasyOne extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hexDigits: ['0','1','2','3','4','5','6','7','8','9','A','B','C','D','E','F'],
            colors: [
                ['#6495ED', '#5DE865', '#F35753', '#F16EFD'],
                ['#C22326', '#F37338', '#FDB632', '#027878'],
                ['#FF6362', '#BC5090', '#58508D', '#00405C'],
                ['#FFB52F', '#F3587A', '#A166AA', '#90D0EC'],
                ['#0E5C68', '#E89291', '#F7BBBB', '#FADD8D']

            ],
            lastTimeUsedColors: ['', '', '', ''],
            selectedColors: [],
            selectedColor: '',
            clickedBoxes: [false, false, false, false],
            score: 0,
            timer: '', 
        };

        this.selectColorPalette = this.selectColorPalette.bind(this);
        this.setFooterBoxesColors = this.setFooterBoxesColors.bind(this);
        this.addKeyboardListener = this.addKeyboardListener.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleKeyPressed = this.handleKeyPressed.bind(this);
        this.blockBox = this.blockBox.bind(this);
        this.resetClickedBoxes = this.resetClickedBoxes.bind(this);
        this.setBoxesColors = this.setBoxesColors.bind(this);
        this.colorUsed = this.colorUsed.bind(this);
        this.init = this.init.bind(this);
        this.start = this.start.bind(this);
        this.stop = this.stop.bind(this);
    }

    selectColorPalette() {
        var randomIndex = Math.floor(Math.random() * this.state.colors.length);
        this.selectedColors = this.state.colors[randomIndex];
        this.setFooterBoxesColors();
    }

    addKeyboardListener() {
        document.addEventListener("keydown", this.handleKeyPressed.bind(this));
    }

    rgbToHex(rgb) {
        rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
        return '#' + this.hex(rgb[1]) + this.hex(rgb[2]) + this.hex(rgb[3]);
    }

    hex(x) {
        return isNaN(x) ? '00' : this.state.hexDigits[(x - x % 16) / 16] + this.state.hexDigits[x % 16];
    }

    handleClick(event) {
        var clickedBox = event.target;
        var boxId = parseInt(clickedBox.getAttribute('id'));
        if(!this.state.clickedBoxes[boxId]) {
            if(this.rgbToHex(clickedBox.style.backgroundColor) === this.selectedColor) {
                this.setState(state => ({score: state.score + 5}));
                this.blockBox(clickedBox, boxId);
            } else {
                this.setState(state => ({score: state.score - 10}));
                this.blockBox(clickedBox, boxId);
            }
        }
    }

    handleKeyPressed(event) {
        switch(event.keyCode) {
            case 81: // Q
                this.selectedColor = this.selectedColors[0];
                break;
            case 87: // W
                this.selectedColor = this.selectedColors[1];
                break;
            case 69: // E
                this.selectedColor = this.selectedColors[2];
                break;  
            case 82: // R 
                this.selectedColor = this.selectedColors[3];
                break;
            default:
                break;
        }
    }

    blockBox(box, boxId) {
        var clickedBoxes = this.state.clickedBoxes;
        clickedBoxes[boxId] = true;
        this.setState({clickedBoxes: clickedBoxes});
        box.classList.add('clicked');
    }

    resetClickedBoxes() {
        var resetedClickedBoxes = [false, false, false, false];
        this.setState({clickedBoxes: resetedClickedBoxes});
        for(var box of document.querySelectorAll('.clicked')) {
            box.classList.remove('clicked');
        }
    }

    setFooterBoxesColors() {
        var boxes = document.querySelectorAll('.footer-box');
        for(var i = 0; i < boxes.length; i++) {
            boxes[i].style.backgroundColor = this.selectedColors[i];
        }
    }

    colorUsed(currentBoxIndex, randomColorIndex, usedColors) {
        if(usedColors.includes(this.selectedColors[randomColorIndex])) {
            return true;
        }

        if(this.state.lastTimeUsedColors[currentBoxIndex] !== '') {
            return this.state.lastTimeUsedColors[currentBoxIndex] === this.selectedColors[randomColorIndex];
        }

        return false;
    } 

    setBoxesColors() {
        var boxes = document.querySelectorAll('.main-box');
        var usedColors = [];
        for(var currentBoxIndex = 0; currentBoxIndex < boxes.length; currentBoxIndex++) {
            var randomColorIndex = Math.floor(Math.random() * this.selectedColors.length);
            var iterations = 0;
            while(this.colorUsed(currentBoxIndex, randomColorIndex, usedColors) 
                && iterations <= this.selectedColors.length 
            ) {
                randomColorIndex++;
                if(randomColorIndex === this.selectedColors.length) {
                    randomColorIndex = 0;
                } 
                iterations++;
            }
            if(iterations > this.selectedColors.length) {
                console.log('yes');
                this.setBoxesColors();
                return;
            }
            usedColors.push(this.selectedColors[randomColorIndex]);
            boxes[currentBoxIndex].style.backgroundColor = this.selectedColors[randomColorIndex];
        }
        this.setState({lastTimeUsedColors: usedColors});
    }

    init() {
        this.selectColorPalette();
        this.setBoxesColors();
        this.addKeyboardListener();
    }

    start() {
        this.selectColorPalette();
        this.setBoxesColors();
        this.addKeyboardListener();
        
        var countdown = 3;
        let timer = setInterval(() => {
            console.log(countdown);
            countdown--;
            if(countdown === 0) {
                let timer = setInterval(() => {
                    this.resetClickedBoxes();
                    this.setBoxesColors();
                }, 1000);
                this.setState({timer: timer});
            }
        }, 1000);
    }

    stop() {
        clearInterval(this.state.timer);
    }

    render() {
        return (
            <div onKeyDownCapture={(event) => this.handleKeyPressed(event)}>
                <header>
                    <button onClick={() => this.start()}>Start</button>
                    <button onClick={() => this.stop()}>Stop</button>
                    <h4>Score: {this.state.score}</h4>
                </header>
                <main>
                    <div className='row'>
                        <div className='box main-box' onClick={(event) => this.handleClick(event)} id='0'></div>
                        <div className='box main-box' onClick={(event) => this.handleClick(event)} id='1'></div>
                    </div>
                    <div className='row'>
                        <div className='box main-box' onClick={(event) => this.handleClick(event)} id='2'></div>
                        <div className='box main-box' onClick={(event) => this.handleClick(event)} id='3'></div>
                    </div>
                </main>
                <footer>
                    <div className='row'>
                        <div className='column'>
                            <h6>Q</h6>
                            <div className='box footer-box'></div>
                        </div>
                        <div className='column'>
                            <h6>W</h6>
                            <div className='box footer-box'></div> 
                        </div>
                        <div className='column'>
                            <h6>E</h6>
                            <div className='box footer-box'></div>  
                        </div>
                        <div className='column'>
                            <h6>R</h6>
                            <div className='box footer-box'></div>
                        </div>
                    </div>
                </footer>
            </div>
        );
    }
}