import React from "react";

function SingleNotif(props) {
  return (
    <div>
      <div className="bg-light border rounded  p-2 my-2">
        <div className="d-flex justify-content-between">
          <div>
            {props.notification.url && props.notification.title && (
              <a
                className="font-14 fw-bold"
                href={props.notification.url}
                target="_blank"
              >
                {props.notification.title}
              </a>
            )}
          </div>
          <p className="mb-0 text-right fw-light font-10">12hr ago</p>
        </div>
        <p className="mb-0 font-14">{props.notification.content}</p>
        {props.notification.url && (
          <p className="mb-0 font-10">
            Meet link:{" "}
            <a href={props.notification.url} target="_blank">
              {props.notification.url.substr(8)}
            </a>
          </p>
        )}
      </div>
    </div>
  );
}

export default SingleNotif;
