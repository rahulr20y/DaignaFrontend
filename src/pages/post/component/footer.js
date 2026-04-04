import React from "react";
import { Button } from "../../../common";
import { useHistory } from "react-router-dom";
import CommentSection from "./commentSection";

function Footer(props) {
  const history = useHistory();

  return (
    <div>
      <div className="d-flex justify-content-around">
        <div className="d-flex align-items-center">
          <p className="mb-0 font-14 text-primary">
            {props.post.post.reaction_count}
          </p>
          <Button text={<i class="bi bi-hand-thumbs-up-fill"></i>} variant="icon" />
        </div>
        <div className="d-flex align-items-center">
          <p className="mb-0 font-14 text-primary">
            {props.post.post.comment_count}
          </p>
          <Button
            text={<i class="bi bi-chat-square"></i>}
            onClick={() => {
              history.push("/app/post/" + props.post.post.contentid);
            }}
            variant="icon"
          />
        </div>
      </div>
      {props.showComments && (
        <CommentSection contentid={props.post.post.contentid} />
      )}
    </div>
  );
}

export default Footer;
