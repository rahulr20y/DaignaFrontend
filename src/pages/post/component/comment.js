import React from "react";
import { Avatar, Button } from "../../../common";

function Comment(props) {
  function deleteComment(e) {
    props.deleteComment(props.comment.commentid);
  }
  return (
    <div className="d-flex my-3">
      <Avatar
        src={
          "https://cdn.vox-cdn.com/thumbor/JgCPp2BBxETY596wCp50ccosCfE=/0x0:2370x1574/1200x800/filters:focal(996x598:1374x976)/cdn.vox-cdn.com/uploads/chorus_image/image/68870438/Screen_Shot_2020_07_21_at_9.38.25_AM.0.png"
        }
        className="me-2"
        size="xs"
      />

      <div className="bg-light p-2 w-100 border rounded">
        <div className="d-flex justify-content-between">
          <div className="mb-0 font-14">
            {props.comment.user.first_name} {props.comment.user.last_name}{" "}
            <span className="fw-lighter">@{props.comment.user.username}</span>
          </div>
          <div>
            {props.comment.user.username === props.profile.username && (
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
                        deleteComment(e);
                      }}
                    >
                      Delete
                    </li>
                  </>
                </ul>
              </div>
            )}
          </div>
        </div>
        <p className="mb-0 font-14 fw-light">
          {props.comment.body}
          {/* Lorem Ipsum छपाई और अक्षर योजन उद्योग का एक साधारण डमी पाठ है. Lorem
          Ipsum सन १५०० के बाद से अभी तक इस उद्योग का मानक डमी पाठ मन गया, जब एक
          अज्ञात मुद्रक ने नमूना लेकर एक नमूना किताब बनाई. */}
        </p>
      </div>
    </div>
  );
}

export default Comment;
