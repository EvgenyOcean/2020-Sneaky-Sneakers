import React, {useContext} from 'react';
import {Link} from 'react-router-dom';

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

import {DataContext} from '../Context';

import styles from './ItemModal.module.scss';

function ItemModal(props) {
  let {detailedSneakers} = useContext(DataContext);

  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {props.show && ' The Item Added To Cart'}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="d-flex flex-column justify-content-center align-items-center">
        <img src={props.show ? detailedSneakers.img : ''} alt={props.show ? detailedSneakers.name : ' '} className={styles.img}/>
        <div className={styles.name}>{props.show ? detailedSneakers.name : ''}</div>
        <div className={styles.price}>{props.show ? '$' + detailedSneakers.price : ''}</div>
        <Button onClick={props.onHide} variant="outline-primary" className="mb-2">Continue Shopping</Button>
        <Link to="/cart" className="btn btn-outline-warning" onClick={props.onHide}>Go To Cart</Link>
      </Modal.Body>
    </Modal>
  );
}

export default ItemModal;