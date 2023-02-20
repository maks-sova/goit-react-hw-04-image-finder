import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import css from '../styles.module.css';

const modalRoot = document.querySelector('#modal--root');

function Modal({ onClose, children }) {
  const handelKeydown = e => {
    onClose(e);
  };
  const handelClick = e => {
    onClose(e);
  };

  useEffect(() => {
    window.addEventListener('keydown', handelKeydown);

    return () => window.removeEventListener('keydown', handelKeydown);
  });

  return createPortal(
    <div className={css.Overlay} onClick={handelClick}>
      <div className={css.Modal}>{children}</div>
    </div>,
    modalRoot
  );
}

export default Modal;
