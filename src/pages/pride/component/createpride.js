import React from "react";
import {
  Button,
  Card,
  Modal,
  showAlertMessage,
  API,
  links,
} from "../../../common";
import { Editor, EditorState, convertToRaw } from "draft-js";
import "draft-js/dist/Draft.css";

function Createpride(props) {
  const [editorState, setEditorState] = React.useState(() =>
    EditorState.createEmpty()
  );
  const [addloading, setAddLoading] = React.useState(false);

  function addPride(event, editorState) {
    setAddLoading(true);
    const currCon = editorState.getCurrentContent();
    const rawJson = convertToRaw(currCon);
    console.log(rawJson);
    var bodyFormData = new FormData();
    bodyFormData.append("body_obj", JSON.stringify(rawJson));
    bodyFormData.append("body", String(rawJson["blocks"][0]["text"]));
    console.log(bodyFormData);
    API({
      ...links.create_pride,
      urlparams: {},
      bodydata: bodyFormData,
      isfile: false,
      callback: (res) => {
        if (res.status === 200) {
          props.setPride(res.data.data);
          showAlertMessage("Posted successfully", "success");
          editorState.clear();
        } else {
          showAlertMessage(res.data.message, "danger");
        }
        setAddLoading(false);
      },
    });
    var myModalEl = document.querySelector("#create_post");
    var modal = window.bootstrap.Modal.getOrCreateInstance(myModalEl);
    modal.hide();
    event.preventDefault();
  }

  return (
    <div>
      <Card
        className="shadow-sm"
        body={
          <>
            <div
              className="d-flex align-items-center"
              style={{ cursor: "pointer" }}
              onClick={() => {
                var myModalEl = document.querySelector("#create_post");
                var modal =
                  window.bootstrap.Modal.getOrCreateInstance(myModalEl); // Returns a Bootstrap modal instance
                modal.show();
              }}
            >
              {/* <a class="user-avatar me-2">
                <img
                  src="https://cdn.vox-cdn.com/thumbor/JgCPp2BBxETY596wCp50ccosCfE=/0x0:2370x1574/1200x800/filters:focal(996x598:1374x976)/cdn.vox-cdn.com/uploads/chorus_image/image/68870438/Screen_Shot_2020_07_21_at_9.38.25_AM.0.png"
                  alt="user"
                  class="thumb-xs rounded"
                />
              </a> */}
              <div className="fs-14 mx-2 fw-lighter">Add a Pride Story</div>
            </div>
          </>
        }
      />

      <Modal
        modalId="create_post"
        body={
          <div style={{ height: "256px" }}>
            <Editor
              editorState={editorState}
              onChange={setEditorState}
              placeholder="Share with Bisara"
            />
          </div>
        }
        footer={
          <>
            <Button
              variant="outline"
              text="Cancel"
              className="me-3"
              onClick={() => {
                var myModalEl = document.querySelector("#create_post");
                var modal =
                  window.bootstrap.Modal.getOrCreateInstance(myModalEl); // Returns a Bootstrap modal instance
                modal.hide();
              }}
            />
            <Button text="Post" onClick={(e) => addPride(e, editorState)} />
          </>
        }
      />
    </div>
  );
}

export default Createpride;
