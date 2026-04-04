import React from "react";
import { connect } from "react-redux";
import FeedbackPost from "./component/feedbackPost";
import WriteFeedback from "./component/writeFeedback";
import {
  API,
  links,
  showAlertMessage,
  Modal,
  Spinner,
} from "../../common/index";

function Feedback(props) {
  const [feedbacks, setFeedbacks] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  function deleteFeedback(feedbackid) {
    API({
      ...links.delete_feedback,
      callurl: links.delete_feedback.callurl + "/" + feedbackid,
      urlparams: {},
      isfile: false,
      callback: (res) => {
        console.log(res);
        if (res.status === 200) {
          setFeedbacks(
            feedbacks.filter(
              (feedback) => feedback.feedback.contentid !== feedbackid
            )
          );
          showAlertMessage("Feedback Deleted successfully", "success");
        } else {
          showAlertMessage(res.data.message, "danger");
        }
      },
    });
  }

  React.useEffect(() => {
    API({
      ...links.get_feedback,
      urlparams: {},
      isfile: false,
      callback: (res) => {
        if (res.status === 200) {
          setFeedbacks(res.data);
          showAlertMessage("Feedbacks fetched successfully", "success");
        } else {
          showAlertMessage(res.data.message, "danger");
        }
        setLoading(false);
      },
    });
  }, []);

  function setFeedback(feedback) {
    setFeedbacks([feedback, ...feedbacks]);
  }
  return (
    <div>
      <WriteFeedback setFeedback={setFeedback} />
      {loading ? (
        <>Loading...</>
      ) : (
        <>
          {feedbacks.length > 0 ? (
            feedbacks.map((feedback, i) => {
              return (
                <FeedbackPost
                  feedback={feedback}
                  deleteFeedback={deleteFeedback}
                  profile={props.profile}
                  key={feedback.feedback.contentid}
                />
              );
            })
          ) : (
            <div className="text-muted text-center">No feedbacks Found !!!</div>
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

export default connect(mapStateToProps)(Feedback);
