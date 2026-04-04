import React from "react";
import ReactDOM from "react-dom";
// Props:
// Title
// Body
// Footer
// ModalId
function Modal(props) {
  return ReactDOM.createPortal(
    <div id={props.modalId} className="modal fade" tabIndex={-1}>
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
