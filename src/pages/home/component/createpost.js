import React from "react";
import {
  API,
  Button,
  Card,
  links,
  Modal,
  showAlertMessage,
  Elements,
} from "../../../common";
import { Editor, EditorState, convertToRaw } from "draft-js";
import "draft-js/dist/Draft.css";
import { useTranslation } from "react-i18next";

function Createpost(props) {
  const { t } = useTranslation();
  const [editorState, setEditorState] = React.useState(() =>
    EditorState.createEmpty()
  );
  const [addloading, setAddLoading] = React.useState(false);
  const [files, setFiles] = React.useState([]);

  function addPost(event, editorState) {
    setAddLoading(true);
    const currCon = editorState.getCurrentContent();
    const rawJson = convertToRaw(currCon);
    console.log(rawJson);
    var bodyFormData = new FormData();
    bodyFormData.append("body_obj", JSON.stringify(rawJson));
    bodyFormData.append("body", String(rawJson["blocks"][0]["text"]));

		for (let i = 0; i < files.length; i++) {
			bodyFormData.append('files', files[i])
		}

    console.log(bodyFormData);
    API({
      ...links.create_post,
      urlparams: {},
      bodydata: bodyFormData,
      isfile: true,
      callback: (res) => {
        console.log(res);
          if (res.status === 200) {
            props.setPost(res.data.data);
            showAlertMessage(t("Posted successfully"), "success");
            // Only hide modal on success
            var myModalEl = document.querySelector("#create_post");
            var modal = window.bootstrap.Modal.getOrCreateInstance(myModalEl);
            if (modal) modal.hide();
          } else {
            showAlertMessage(res.data.message || t("Error creating post"), "danger");
          }
          setAddLoading(false);
        },
      });
      // event.preventDefault();
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
              data-bs-toggle="modal"
              data-bs-target="#create_post"
            >
              <a className="user-avatar me-2">
                <img
                  src="https://cdn.vox-cdn.com/thumbor/JgCPp2BBxETY596wCp50ccosCfE=/0x0:2370x1574/1200x800/filters:focal(996x598:1374x976)/cdn.vox-cdn.com/uploads/chorus_image/image/68870438/Screen_Shot_2020_07_21_at_9.38.25_AM.0.png"
                  alt="user"
                  className="thumb-sm rounded-circle"
                />
              </a>
              <div className="flex-grow-1 bg-light p-2 px-3 rounded-pill text-muted border">
                {t("What's on your mind?")}
              </div>
            </div>
          </>
        }
      />

      <Modal
        modalId="create_post"
        title={t("Create Post")}
        body={
          <div>
            <div style={{ height: "256px" }}>
              <Editor
                editorState={editorState}
                onChange={setEditorState}
                placeholder={t("Share with Daigna")}
              />
            </div>
            <Elements
              formField={[
                {
                  type: "file",
                  id: "post_file_upload",
                  value: files,
                  multiple: true,
                  onchange: setFiles,
                },
              ]}
            />
          </div>
        }
        footer={
          <>
            <Button
              variant="outline"
              text="Cancel"
              className="me-3"
              dismiss="modal"
            />
            <Button text="Post" onClick={(e) => addPost(e, editorState)} />
          </>
        }
      />
    </div>
  );
}

export default Createpost;
