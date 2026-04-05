import React from "react";
import {
  Elements,
  Button,
  Card,
  Modal,
  showAlertMessage,
  API,
  links,
} from "../../../common";

function WriteFeedback(props) {
  const [feedback, setFeedback] = React.useState("");
  const [addloading, setAddLoading] = React.useState(false);

  function addFeedback(event) {
    setAddLoading(true);
    console.log(feedback);
    var bodyFormData = new FormData();
    bodyFormData.append("body_obj", feedback);
    bodyFormData.append("body", feedback);
    console.log(bodyFormData);
    API({
      ...links.create_feedback,
      urlparams: {},
      bodydata: bodyFormData,
      isfile: true,
      callback: (res) => {
        console.log(res);
        if (res.status === 200) {
          props.setFeedback(res.data.data);
          showAlertMessage("Feedback Posted successfully", "success");
        } else {
          showAlertMessage(res.data.message, "danger");
        }
        setFeedback("");
        setAddLoading(false);
      },
    });
    event.preventDefault();
  }

  const FeedbackForm = () => {
    return (
      <div>
        <Elements
          formField={[
            {
              id: "feedback",
              placeholder: "Type your Feedback",
              type: "textarea",
              className: "mb-0",
              value: feedback,
              autoComplete: "off",
              onchange: (val) => setFeedback(val),
            },
          ]}
        />
        <div className="text-end">
          <Button
            variant="outline"
            text={<>Submit</>}
            onClick={(e) => {
              addFeedback(e);
            }}
          />
        </div>
      </div>
    );
  };

  return (
    <div>
      <div className="accordion" id="feedbackAccordion">
        <div className="accordion-item">
          <h2 className="accordion-header my-0" id="feedbackHead">
            <button
              className="accordion-button py-2"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#feedbackBody"
              aria-expanded="true"
              aria-controls="feedbackHead"
            >
              Share your Feedback!
            </button>
          </h2>
          <div
            id="feedbackBody"
            className="accordion-collapse collapse"
            aria-labelledby="feedbackBody"
            data-bs-parent="#feedbackHead"
          >
            <div className="accordion-body">
              <FeedbackForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WriteFeedback;
