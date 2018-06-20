import React, { Component } from 'react';
import { connect } from 'react-redux';
import { openModal } from './actions/index.js';
import { Link } from 'react-router-dom';
import axios from 'axios';

const mapDispatchToProps = dispatch => {
  return {
    openModal: (data) => dispatch(openModal(data))
  }
}

const mapStateToProps = state => {
  return { albums: state.albums, selectedAlbumId: state.selectedAlbumId, selectedAlbumTitle: state.selectedAlbumTitle };
}

class Album extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentAlbum: []
    }
  }

  componentDidMount() {
    let currentAlbum = sessionStorage.getItem('album' + this.props.selectedAlbumId);
    if (currentAlbum) {
      this.setState({ currentAlbum: JSON.parse(currentAlbum)});
      return;
    }
    axios.get('https://jsonplaceholder.typicode.com/photos?albumId=' + this.props.selectedAlbumId)
    .then((response) => {
      sessionStorage.setItem('album' +  + this.props.selectedAlbumId, JSON.stringify(response.data));
      this.setState({
        currentAlbum: response.data
      })
    })
  }

  openModal(modalData) {
    this.props.openModal(modalData);
  }

  render(){
    return(
      <div>
        <Link to="/" className="back-to-albums"><i className="fas fa-chevron-circle-left"></i>Back To Albums</Link>
        <h1>{this.props.selectedAlbumTitle}</h1>
        <div className="gallery-container">
          <div className="gallery-grid">
            { this.state.currentAlbum.map((image, index) => {
              return (
                  <div key={index} onClick={() => this.openModal({url: image.url, title: image.title, id: image.id})} className="album-gallery-container">
                    <img src={image.url} alt={image.title} />
                    <span className="open-icon fas fa-expand" value={this.props.url}></span>
                  </div>
                )
              })
            }
          </div>
        </div>
      </div>
    )
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Album);
