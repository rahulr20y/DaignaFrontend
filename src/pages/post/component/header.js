import React from "react";

import { Modal, Button } from "../../../common";

function Header(props) {
  function deletePost(e) {
    console.log(props.post.post.contentid);
    props.deletePost(props.post.post.contentid);
    // var myModalEl = document.querySelector("#ask");
    // var modal = window.bootstrap.Modal.getOrCreateInstance(myModalEl); // Returns a Bootstrap modal instance
    // modal.hide();
  }
  return (
    <>
      <div className="d-flex justify-content-between align-items-center">
        <div className="d-flex">
          <a class="user-avatar me-2">
            <img
              src="https://cdn.vox-cdn.com/thumbor/JgCPp2BBxETY596wCp50ccosCfE=/0x0:2370x1574/1200x800/filters:focal(996x598:1374x976)/cdn.vox-cdn.com/uploads/chorus_image/image/68870438/Screen_Shot_2020_07_21_at_9.38.25_AM.0.png"
              alt="user"
              class="thumb-md rounded"
            />
          </a>
          <div>
            <h6 className="font-16 m-0">
              {props.post.post.user.first_name} {props.post.post.user.last_name}{" "}
            </h6>
            <p className="font-14 mb-0 fw-light">
              @{props.post.post.user.username}
            </p>
          </div>
        </div>
        {props.deletePost != null &&
          props.post.post.user.username === props.profile.username && (
            <div className="btn-group">
              <Button
                text={<i className="bi bi-three-dots-vertical font-18"></i>}
                variant="icon"
                color="secondary"
                className="dropdown-toggle p-0 m-0"
                toggle="dropdown"
                id="post_options"
              />
              <ul className="dropdown-menu">
                <>
                  <li
                    className="dropdown-item"
                    onClick={(e) => {
                      deletePost(e);
                      // var myModalEl = document.querySelector("#ask");
                      // var modal =
                      //   window.bootstrap.Modal.getOrCreateInstance(myModalEl); // Returns a Bootstrap modal instance
                      // modal.show();
                    }}
                  >
                    Delete
                  </li>
                </>
              </ul>
            </div>
          )}
      </div>

      <Modal
        modalId="ask"
        contentClass="overflow-visible"
        bodyClass="overflow-visible"
        body={<div>Are you sure want to delete?</div>}
        footer={
          <>
            <Button
              variant="outline"
              text="Cancel"
              className="me-3"
              onClick={() => {
                var myModalEl = document.querySelector("#ask");
                var modal =
                  window.bootstrap.Modal.getOrCreateInstance(myModalEl); // Returns a Bootstrap modal instance
                modal.hide();
              }}
            />
            <Button
              text="Delete"
              onClick={(e) => {
                deletePost(e);
              }}
            />
          </>
        }
      />
    </>
  );
}

export default Header;
