import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import EasyOne from './Components/EasyOne';
/*
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
*/
export default class App extends Component {

  render() {
    /*
    const styles = {
      container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '1000px',
        height: '500px',
      },
      card: {
        width: '100%',
      },
      cardHeader: {
        textAlign: 'center',
      },
      button: {
        marginTop: '10px',
        marginBottom: '10px',
      },
    };
    */
    return (
      <EasyOne></EasyOne>
      //<Container style={styles.container}>
        //<Card style={styles.card}>
          //<Card.Header style={styles.cardHeader}>Choose one mode</Card.Header>
          //<Card.Body>
            //<ListGroup variant="flush">
              //<Button variant="primary" style={styles.button}
              //>Singleplayer</Button>
              //<Button variant="primary" style={styles.button}>Multiplayer</Button>
            //</ListGroup>
          //</Card.Body>
        //</Card>
      //</Container>
    );
  }
}
