import React, { Component } from 'react';
import { Button,Alert,  Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import { uploadImage } from '../actions/chatActions';
import Cropper from 'react-easy-crop';
import getCroppedImg from './cropImage'
import { isNull } from 'lodash';


class ImageUploadModal extends Component {

  state = {
    toggle:false,
    modal:false,
    selectedImage:null,
    imagePreview:null,
    crop: { x: 0, y: 0 },
    zoom: 1,
    aspect: 1,
    isChosen:false,
    croppedImage:null,
    croppedAreaPixels:null,
    error:null,
    showAvatar:true
  }

  static propTypes = {
    uploadImage: PropTypes.func.isRequired
  }


  toggle = () => {
    this.setState({ modal : !this.state.modal});
    this.setState({ selectedImage: null});
    this.setState({ croppedImage: null});
    this.setState({ imagePreview: null});
    this.setState({ error: null});
    this.setState({isChosen:false});
    this.setState({showAvatar:true});

  }

  CropperWrapper = () => {
    return(
      <div className="imagePreview">
          <Cropper
            image={this.state.imagePreview}
            crop={this.state.crop}
            zoom={this.state.zoom}
            aspect={this.state.aspect}
            onCropChange={this.onCropChange}
            onCropComplete={this.onCropComplete}
            onZoomChange={this.onZoomChange}
          />
      </div>
    )
  }

  onChange = (e) => {
    this.setState({ selectedImage: e.target.files[0] });
    this.setState({ imagePreview: URL.createObjectURL(e.target.files[0])});
    this.setState({isChosen:true});
    this.setState({showAvatar:false});

  };
  
  onCropChange = (crop) => {
    this.setState({ crop })
  }

  onCropComplete = (croppedArea, croppedAreaPixels) => {
    console.log(croppedArea, croppedAreaPixels)
    this.setState({ croppedAreaPixels: croppedAreaPixels});
  }

  onZoomChange = (zoom) => {
    this.setState({ zoom })
  }

  onSubmit = (e) => {
    e.preventDefault();

    if(isNull(this.state.selectedImage)){
      this.setState({ error : 'You need to choose an image first'});
    } else if (isNull(this.state.croppedImage)) {
      this.setState({error : 'You must complete cropping the image before uploading'})
    } else {
    const formData = new FormData();
  
    // Update the formData object
    formData.append(
      "profileImage",
      this.state.selectedImage,
      this.state.selectedImage.name
    );
  
    // Details of the uploaded file
    console.log("UPLOAD CHOSEN FILE DATA");
    console.log(this.state.selectedImage);
    console.log(formData);
    this.props.uploadImage(formData);
    }
  
  };

  confirmCroppedImage = async () => {
    try {
      const croppedImage = await getCroppedImg(
        this.state.imagePreview,
        this.state.croppedAreaPixels,
        0
      )

      // sets the returned Blob to croppedImage in state
      this.setState({croppedImage:URL.createObjectURL(croppedImage)});

      // Returned blob is set to selectedImage, this will be sent over to the server
      this.setState({selectedImage:croppedImage});
      this.setState({isChosen:false});
    } catch (e) {
      console.error(e)
    }
  }

  render() {
    return (
      <div>
        <Button color="body" className="p-0" onClick={this.toggle}>
        <img style={{margin:'0'}} width="20" src="assets/images/upload.svg"></img> &nbsp;
          {this.props.buttonLabel}
        </Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}><legend>Upload A Profile Picture</legend></ModalHeader>
          <ModalBody>
          <Alert color="info">
          You can upload your own profile picture here.
        </Alert>

{    (this.props.currUser.avatar && this.state.showAvatar) && 
      <div>
        <Label for="imagePreview">Current Profile Picture</Label>
            <br></br>
       <img class="croppedImage" src={"storage/"+this.props.currUser.avatar}></img>
      </div>
        
  }

       {
         this.state.isChosen ? 
         <div className="cropperContainer">
        <Label for="imagePreview">Image Preview</Label>
        <br></br>
         <div className="imagePreview">
         <Cropper
           image={this.state.imagePreview}
           crop={this.state.crop}
           zoom={this.state.zoom}
           aspect={this.state.aspect}
           onCropChange={this.onCropChange}
           onCropComplete={this.onCropComplete}
           onZoomChange={this.onZoomChange}
         />
     </div>
     <br></br>
     <Button  onClick={this.confirmCroppedImage} color="primary">Confirm Crop</Button>
         </div>
       : !isNull(this.state.croppedImage) && <div>
        <Label for="imagePreview">Image Preview</Label>
        <br></br>
       <img class="croppedImage" src={this.state.croppedImage}></img>
       </div>
      

       }

        <Form id="upload-image" onSubmit={this.onSubmit}>

        <Input type="file" name="file" id="profileImage" onChange={this.onChange} />
        <FormText color="muted">
          Image format, max dimensions and max file size to be specified here.
        </FormText>
      </Form>
      { !isNull(this.state.error) ? 
      <Alert color="danger">
            {this.state.error}
        </Alert> : null}
          </ModalBody>
          <ModalFooter>
            <Button form="upload-image" color="primary" >Upload Image</Button>
            <Button color="danger" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
  
}


export default connect( null, {uploadImage})(ImageUploadModal);