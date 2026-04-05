import React, { useEffect, useRef } from "react";
import ReactDOM from "react-dom";
// Props:
// Title
// Body
// Footer
// ModalId
function Modal(props) {
  const modalRef = useRef(null);

  useEffect(() => {
    if (window.bootstrap && modalRef.current) {
      // Initialize the modal once
      const modalInstance = new window.bootstrap.Modal(modalRef.current);
      
      // Manual click handler for close buttons to ensure it works across all environments
      const handleCloseClick = (e) => {
        if (e.target.closest('[data-bs-dismiss="modal"]')) {
           const modal = window.bootstrap.Modal.getInstance(modalRef.current);
           if (modal) modal.hide();
        }
      };

      modalRef.current.addEventListener('click', handleCloseClick);
      return () => {
        if (modalRef.current) {
          modalRef.current.removeEventListener('click', handleCloseClick);
        }
      }
    }
  }, []);

  return ReactDOM.createPortal(
    <div
      id={props.modalId}
      className="modal fade"
      tabIndex={-1}
      ref={modalRef}
    >
      <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        {/* <div className="modal-content"> */}
        <div
          className={
            props.contentClass === undefined
              ? "modal-content"
              : "modal-content " + props.contentClass
          }
        >
          {props.title !== undefined ? (
            <div className="modal-header">
              {/* <h5 className='modal-title'>{props.title.toUpperCase()}</h5> */}
              <h5 className="modal-title">
                {typeof props.title === "string"
                  ? props.title.toUpperCase()
                  : props.title}
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
          ) : (
            <></>
          )}

          {props.body !== undefined ? (
            // <div className='modal-body'>{props.body}</div>
            <div
              className={
                props.bodyClass === undefined
                  ? "modal-body"
                  : "modal-body " + props.bodyClass
              }
            >
              {props.body}
            </div>
          ) : (
            <></>
          )}

          {props.footer !== undefined ? (
            <div className="modal-footer">{props.footer}</div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>,
    document.getElementById("modal-container")
  );
}

export default Modal;
