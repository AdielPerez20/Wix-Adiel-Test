import React, {Component} from 'react';
import FontAwesome from 'react-fontawesome';
import './OverlayImage.scss';

class OverlayImage extends Component{
  constructor(props){
    super(props);
  }
  render(){
    return(
      <div className='OverlayImage'>
        <div className='close' onClick={this.props.onClose}><FontAwesome className="icon" name="times-circle" title="close" /></div>
        <div className='image' style={{
          backgroundImage: `url('${this.props.bigImg.src}')`
        }}>
          <div onClick={() => this.props.onSwitch('prev')}><FontAwesome className="image-icon" name="arrow-left" title="prev" /></div>
          <div onClick={() => this.props.onSwitch('next')}><FontAwesome className="image-icon" name="arrow-right" title="next" /></div>
        </div>
      </div>
    );
  }
}

export default OverlayImage;
