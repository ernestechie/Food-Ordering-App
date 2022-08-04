import { createPortal } from 'react-dom';
import { useContext } from 'react';
import ModalContext from '../../context/ModalContext';
import classes from './Modal.module.css';

const Backdrop = () => {
  const { showModal, toggleModal } = useContext(ModalContext);

  return (
    <div
      className={classes.backdrop}
      onClick={() => toggleModal(showModal)}
    ></div>
  );
};

const ModalBox = ({ children }) => {
  return <div className={classes.modal}>{children}</div>;
};

const overlayPortal = document.querySelector('#modal-overlay');

const Modal = ({ children }) => {
  return (
    <>
      {createPortal(<Backdrop />, overlayPortal)}
      {createPortal(<ModalBox>{children}</ModalBox>, overlayPortal)}
    </>
  );
};

export default Modal;
