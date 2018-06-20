import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.min.css';
import axios from 'axios';
import { connect } from 'react-redux';
import { liftAlbumsToState } from './actions/index.js';
import Albums from './Albums'
import Album from './Album'
import Modal from './Modal'

const mapDispatchToProps = dispatch => {
  return {
    liftAlbumsToState: (data) => dispatch(liftAlbumsToState(data))
  }
}

const mapStateToProps = state => {
  return { albums: state.albums, modalOpen: state.modalOpen };
}

class App extends Component {

  componentDidMount() {
    let albums = sessionStorage.getItem('albums');
    if (albums) {
      this.props.liftAlbumsToState(albums);
      this.setState({ albums: JSON.parse(albums)});
      return;
    }
    axios.get('https://jsonplaceholder.typicode.com/albums')
    .then((response) => {
      sessionStorage.setItem('albums', JSON.stringify(response.data));
      this.props.liftAlbumsToState(JSON.stringify(response.data));
    })
  }

  render() {
    return (
      <Router>
        <div className="App">
          { this.props.modalOpen ? <Modal /> : null}
          <Route exact path="/" component={Albums}/>
          <Route exact path="/album" component={Album}/>
        </div>
      </Router>
    );
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(App);
