import React from "react";
import {
  Avatar,
  Button,
  Elements,
  API,
  links,
  showAlertMessage,
} from "../../../common";
import Comment from "./comment";
import { connect } from "react-redux";

function CommentSection(props) {
  const [comments, setComments] = React.useState([]);
  const [comment, setComment] = React.useState("");
  const [loading, setLoading] = React.useState(true);
  const [addloading, setAddLoading] = React.useState(false);

  React.useEffect(() => {
    API({
      ...links.get_comment,
      callurl: links.get_comment.callurl + "/" + props.contentid,
      urlparams: {},
      isfile: false,
      callback: (res) => {
        if (res.status === 200) {
          console.log(res.data);
          setComments(res.data);
          showAlertMessage("Posts fetched successfully", "success");
        } else {
          showAlertMessage(res.data.message, "danger");
        }
        setLoading(false);
      },
    });
  }, []);

  function addComment(event) {
    setAddLoading(true);
    var bodyFormData = new FormData();
    bodyFormData.append("parentid", props.contentid);
    bodyFormData.append("body", comment);
    API({
      ...links.post_comment,
      urlparams: {},
      bodydata: bodyFormData,
      isfile: false,
      callback: (res) => {
        console.log(res);
        if (res.status === 200) {
          setComments([res.data.data, ...comments]);
          showAlertMessage("Comment Posted successfully", "success");
        } else {
          showAlertMessage(res.data.message, "danger");
        }
        setComment("");
        setAddLoading(false);
      },
    });
    event.preventDefault();
  }

  function deleteComment(commentid) {
    API({
      ...links.delete_comment,
      callurl: links.delete_comment.callurl + "/" + commentid,
      urlparams: {},
      isfile: false,
      callback: (res) => {
        console.log(res);
        if (res.status === 200) {
          setComments(
            comments.filter((comment) => comment.commentid !== commentid)
          );
          showAlertMessage("Pride Deleted successfully", "success");
        } else {
          showAlertMessage(res.data.message, "danger");
        }
      },
    });
  }

  return (
    <div>
      <div className="d-flex my-3 ">
        <Avatar
          src={
            "https://cdn.vox-cdn.com/thumbor/JgCPp2BBxETY596wCp50ccosCfE=/0x0:2370x1574/1200x800/filters:focal(996x598:1374x976)/cdn.vox-cdn.com/uploads/chorus_image/image/68870438/Screen_Shot_2020_07_21_at_9.38.25_AM.0.png"
          }
          className="me-1"
        />
        <Elements
          formField={[
            {
              id: "comment",
              placeholder: "Type Comment",
              type: "text",
              value: comment,
              className: "mb-0 rounded-end-0 flex-fill",
              inputClassName: "rounded-0 rounded-start",
              onchange: (val) => {
                setComment(val);
              },
            },
          ]}
        />
        <Button
          variant="outline"
          text={
            <div className="d-flex">
              <span className="d-none d-md-block">Send</span>{" "}
              <span>
                <i class="bi bi-arrow-right d-inline"></i>
              </span>
            </div>
          }
          className="rounded-0 rounded-end"
          onClick={(e) => {
            addComment(e);
          }}
        />
      </div>

      {loading ? (
        <>Loading...</>
      ) : (
        <>
          {comments.length > 0 ? (
            comments.map((comment, i) => {
              return (
                <Comment
                  comment={comment}
                  key={comment.commentid}
                  deleteComment={deleteComment}
                  profile={props.profile}
                />
              );
            })
          ) : (
            <div className="text-muted text-center">No Comments Found !!!</div>
          )}
        </>
      )}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    profile: state.general.profile,
  };
};

export default connect(mapStateToProps)(CommentSection);
