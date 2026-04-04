import React from "react";
import { Card, Avatar, Button } from "../../../common";

function FeedbackPost(props) {
  function deleteFeedback(e) {
    props.deleteFeedback(props.feedback.feedback.contentid);
  }
  return (
    <div>
      <Card
        className="my-2"
        body={
          <div className="d-flex justify-content-between">
            <div>{props.feedback["body"]} </div>
            <div className="text-end">
              {props.feedback.feedback.user.username ===
                props.profile.username && (
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
                          deleteFeedback(e);
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
        }
        footer={
          <div className="d-flex justify-content-between">
            <Avatar
              src={
                "https://cdn.vox-cdn.com/thumbor/JgCPp2BBxETY596wCp50ccosCfE=/0x0:2370x1574/1200x800/filters:focal(996x598:1374x976)/cdn.vox-cdn.com/uploads/chorus_image/image/68870438/Screen_Shot_2020_07_21_at_9.38.25_AM.0.png"
              }
              className="me-2"
              size="md"
            />
            <div>
              <p className="mb-0 font-14">
                {props.feedback.feedback.user.first_name}
                {props.feedback.feedback.user.last_name}
              </p>
              <p className="mb-0 font-12 fw-light">
                @{props.feedback.feedback.user.username}
              </p>
            </div>
          </div>
        }
      />
    </div>
  );
}

export default FeedbackPost;
