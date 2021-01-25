import Card from 'react-bootstrap/Card';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import { PreviewCarrousel } from './PreviewCarrousel';

export function ImageInput({ 
  image,
  show, 
  handleShow, 
  handleClose,
  handleImageChange })
{ 
  
  const [previews, setPreviews] = useState([])

  function handleChange(e){
    handleImageChange(e.target.files)
    const fileList = Array.from(e.target.files)
    const mappedFiles = fileList.map((file) => ({
      ...file,
      preview: URL.createObjectURL(file),
    }))
    setPreviews(mappedFiles);
  };
  return(
    <Card className="bg-dark text-white">
      <div>
        <Button 
          variant="primary" 
          className="form-control" 
          style={{ marginTop: '5px' }} onClick={handleShow}>
          Add Images
        </Button>
        <Modal 
          show={show} 
          onHide={handleClose} 
          animation={false}>
          <Modal.Header closeButton>
            <Modal.Title>Add Images</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Please choose your image to upload:
            <br></br>
            <label htmlFor="file">Image(s): </label>
            <input 
              type="file"
              accept="image/*"
              multiple
              name="file"
              id="file"
              onChange={handleChange}
            />
          </Modal.Body>
          <PreviewCarrousel previews={ previews }/>
          <Modal.Footer>
            <Button 
              variant="secondary" 
              onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </Card>
  )
}