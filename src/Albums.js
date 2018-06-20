import React, { Component } from 'react';
import { connect } from 'react-redux';
import { selectedAlbum } from './actions/index.js';
import { Link } from 'react-router-dom';

const mapDispatchToProps = dispatch => {
  return {
    selectedAlbum: (data) => dispatch(selectedAlbum(data))
  }
}

const mapStateToProps = state => {
  return { albums: state.albums };
}

class Albums extends Component {
  selectAlbum(album) {
    this.props.selectedAlbum(album);
  }

  render(){
    let albums = [];
    if (this.props.albums) {
      albums = JSON.parse(this.props.albums)
    }
    return(
      <div className="albums-container">
        <h1>Select an album</h1>
        <div className="albums-grid">
          { albums.map((album, index) => {
            return(
              <Link to="/album" key={index} onClick={() => this.selectAlbum({id: album.id, title: album.title})} className="album-container">
                <i className="fas fa-images"></i>
                <p>{album.id}. {album.title}</p>
              </Link>
            )
            })

          }
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Albums);
