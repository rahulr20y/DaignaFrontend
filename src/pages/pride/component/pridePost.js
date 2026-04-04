import React from "react";
import { Card, Button } from "../../../common";

function PridePost(props) {
  function deletePride(e) {
    props.deletePride(props.pride.pride.contentid);
  }
  return (
    <div>
      <Card
        className="shadow-sm"
        body={
          <div className="d-flex justify-content-between">
            <div>{props.pride["body"]} </div>
            <div className="text-end">
              {props.pride.pride.user.username === props.profile.username && (
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
                          deletePride(e);
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
      />
    </div>
  );
}

export default PridePost;
