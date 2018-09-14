import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import _ from 'lodash';
import Image from '../Image';
import OverlayImage from '../OverlayImage';
import BottomDetection from '../BottomDetection';
import './Gallery.scss';

class Gallery extends React.Component {
  static propTypes = {
    tag: PropTypes.string
  };

  constructor(props) {
    super(props);
    this.deleteImg = this.deleteImg.bind(this);
    this.showBigImg = this.showBigImg.bind(this);
    this.closeBigImg = this.closeBigImg.bind(this);
    this.switchBigImg = this.switchBigImg.bind(this);
    this.loadMore = this.loadMore.bind(this);

    this.state = {
      images: [],
      galleryWidth: this.getGalleryWidth(),
      bigImg: null
    };
  }

  componentDidMount() {
    this.getImages(this.props.tag);
    this.setState({
      galleryWidth: document.body.clientWidth
    });
  }

  componentWillReceiveProps(props) {
    this.getImages(props.tag);
  }

  getGalleryWidth(){
    try {
      return document.body.clientWidth;
    } catch (e) {
      return 1000;
    }
  }
  getImages(tag) {
    const getImagesUrl = `services/rest/?method=flickr.photos.search&api_key=522c1f9009ca3609bcbaf08545f067ad&tags=${tag}&tag_mode=any&per_page=100&format=json&safe_search=1&nojsoncallback=1`;
    const baseUrl = 'https://api.flickr.com/';
    axios({
      url: getImagesUrl,
      baseURL: baseUrl,
      method: 'GET'
    })
      .then(res => res.data)
      .then(res => {
        if (res && res.photos && res.photos.photo && res.photos.photo.length > 0){
          let images = this.state.images.concat(res.photos.photo);
          this.setState({images});
        }
      });
  }

  deleteImg(img){
    let images = _.filter(this.state.images, function(obj) { return obj.id !== img.id; }); //remove the img from images array
    this.setState({images});
  }

  showBigImg(img){
    console.log(img);
    this.setState({bigImg: img});
  }
  closeBigImg(){
    this.setState({bigImg: null});
  }
  switchBigImg(dir){
    let index = this.state.bigImg.index;
    index = (dir=='prev') ? --index : ++index;

    if(index==-1) index=this.state.images.length-1;
    if(index==this.state.images.length) index=0;

    this.setState({bigImg: this.state.images[index]})
  }
  loadMore(){
    this.getImages(this.props.tag);
  }

  render() {
    return (
      <div className="gallery-root">
        {this.state.bigImg && <OverlayImage bigImg={this.state.bigImg} onSwitch={this.switchBigImg} onClose={this.closeBigImg} />}
        {this.state.images.map((dto,i) => {
          dto.index = i; //for switch images in expand mode
          return <Image key={'image-' + i} dto={dto} galleryWidth={this.state.galleryWidth}
             onDelete={this.deleteImg} onExpand={this.showBigImg} />;
        })}
        <BottomDetection callback={this.loadMore} />
      </div>
    );
  }
}

export default Gallery;
