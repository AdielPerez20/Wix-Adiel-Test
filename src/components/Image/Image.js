import React from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';
import './Image.scss';

class Image extends React.Component {
  static propTypes = {
    dto: PropTypes.object,
    galleryWidth: PropTypes.number
  };

  constructor(props) {
    super(props);
    this.calcImageSize = this.calcImageSize.bind(this);
    this.rotate = this.rotate.bind(this);

    this.state = {
      size: 200,
      angle: 0
    };
  }

  rotate(){
    let angle = (this.state.angle + 90) % 360;
    this.setState({angle});
  }

  calcImageSize() {
    const {galleryWidth} = this.props;
    const targetSize = 200;
    const imagesPerRow = Math.round(galleryWidth / targetSize);
    const size = (galleryWidth / imagesPerRow);
    this.setState({
      size
    });
  }

  componentDidMount() {
    this.calcImageSize();
  }

  urlFromDto(dto) {
    return `https://farm${dto.farm}.staticflickr.com/${dto.server}/${dto.id}_${dto.secret}.jpg`;
  }

  render() {
    let img = this.props.dto;
    img.src = this.urlFromDto(this.props.dto);

    return (
      <div className='image-root'>
        <div
          className={`image-pic angle${this.state.angle}`}
          style={{
            backgroundImage: `url(${img.src})`,
            width: this.state.size + 'px',
            height: this.state.size + 'px'
          }}
          >
        </div>
        <div
          className='image-overlay' >
          <FontAwesome className="image-icon" name="sync-alt" title="rotate" onClick={this.rotate} />
          <FontAwesome className="image-icon" name="trash-alt" title="delete" onClick={() => this.props.onDelete(img)} />
          <FontAwesome className="image-icon" name="expand" title="expand" onClick={() => this.props.onExpand(img)} />
        </div>
      </div>
    );
  }
}

export default Image;
