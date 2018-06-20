import React, {Component} from 'react';
import { connect } from 'react-redux';
import { closeModal } from './actions/index.js';

const mapDispatchToProps = dispatch => {
  return {
    closeModal: (data) => dispatch(closeModal(data))
  }
}

const mapStateToProps = state => {
  return { modalImgUrl: state.modalImgUrl, modalImgTitle: state.modalImgTitle, modalId: state.modalId };
}

class Modal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      favorited: false
    }
  }
  componentDidMount() {
    let favorites = sessionStorage.getItem('favorites');
    if (favorites) {
      var favs = JSON.parse(favorites)
      if (favs[this.props.modalId]) {
        this.setState({ favorited: true })

      }
    }
  }

  closeModal() {
    this.props.closeModal('thing');
  }

  favoritePic(picId) {
    let favorites = sessionStorage.getItem('favorites');
    if (favorites) {
      favorites = JSON.parse(favorites)
      favorites[picId] = true;
      this.setState({
        favorited: true
      })
      sessionStorage.setItem('favorites', JSON.stringify(favorites))
      return;
    }
    favorites = {}
    favorites[picId] = true;
    this.setState({
      favorited: true
    })
    sessionStorage.setItem('favorites', JSON.stringify(favorites))

  }

  unfavoritePic(picId) {
    let favorites = sessionStorage.getItem('favorites');
    if (favorites) {
      favorites = JSON.parse(favorites)
      if (favorites[picId]) {
        favorites[picId] = false;
        this.setState({
          favorited: false
        })
        sessionStorage.setItem('favorites', JSON.stringify(favorites))
      }
      return;
    }
  }

  render () {
    return (
      <div className="modal-container" onClick={() => this.closeModal()}>
        <div className="modal-image-container" onClick={(event) => {event.stopPropagation()}}>
          {this.state.favorited ? <i className="fas fa-heart" onClick={() => this.unfavoritePic(this.props.modalId)}></i> : <i className="far fa-heart" onClick={() => this.favoritePic(this.props.modalId)}></i> }
          <img src={this.props.modalImgUrl} alt={this.props.modalImgTitle} />
          <p className="image-title">{this.props.modalImgTitle}</p>
          <span className="close-icon fas fa-times-circle" onClick={() => this.closeModal()}></span>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Modal);
