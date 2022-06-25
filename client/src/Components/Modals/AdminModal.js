import React from 'react';
import {Button , Modal} from 'react-bootstrap';




export const ChangeProfile = ({
    onHide,
    show
}) => {


return (
    <div className='addmodal_div'>
        <Modal show={show} 
        onHide={onHide}
        size="lg" 
        aria-labelledby="example-modal-sizes-title-lg"
        >
            <Modal.Header closeButton style={{backgroundColor : '#F7F7F7'}}>
                <Modal.Title>Update User Profile</Modal.Title>
            </Modal.Header>
            <Modal.Body className='show-grid'>
              <p>kl</p>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={onHide}>
                Close
            </Button>
            <Button variant="primary" onClick={onHide}>
                Submit
            </Button>
        </Modal.Footer>
        </Modal>
    </div>
  )
}
