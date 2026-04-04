import React from "react";
import {
  Elements,
  Button,
  Modal,
  API,
  links,
  showAlertMessage,
} from "../../../common";

const redirectURI = `${window.location.origin}/get-response/`;

function SendNotification(props) {
  const [notifInfo, setNotifInfo] = React.useState({
    content: "",
    meet: false,
    start: "",
    end: "",
  });

  React.useEffect(() => {
    console.log(notifInfo);
  }, [notifInfo]);

  function formatNumber(input) {
    return input.toLocaleString("en-US", {
      minimumIntegerDigits: 2,
      useGrouping: false,
    });
  }

  React.useEffect(() => {
    if (notifInfo.meet) {
      var date = new Date();
      console.log(date.getMonth());

      var current =
        date.getFullYear() +
        "-" +
        formatNumber(date.getMonth() + 1) +
        "-" +
        formatNumber(date.getDate()) +
        "T" +
        formatNumber(date.getHours()) +
        ":" +
        formatNumber(date.getMinutes());

      setNotifInfo({ ...notifInfo, title: "", start: current, end: current });
    } else {
      delete notifInfo["start"];
      delete notifInfo["end"];
      delete notifInfo["title"];
    }
  }, [notifInfo.meet]);

  React.useEffect(() => {
    if (notifInfo.start === undefined) return;
    let d = new Date(notifInfo.start);
    console.log(d.toISOString());
  }, [notifInfo.start]);

  const handleCreateNotif = () => {
    let startIso = new Date(notifInfo.start);
    let endIso = new Date(notifInfo.end);

    API({
      ...links.post_notification,
      urlparams: {},
      isfile: false,
      bodydata: {
        ...notifInfo,
        start: startIso.toISOString(),
        end: endIso.toISOString(),
        redirect_uri: redirectURI,
      },
      callback: (res) => {
        if (res.status === 200) {
          if (res.data.status == 200) {
            props.setNotification(res.data.data);
            showAlertMessage("Notification created Successfully", "success");
          } else {
            showAlertMessage("Session timed out", "danger");
            localStorage.clear();
            localStorage.setItem("enable_meet", true);
            localStorage.setItem("authType", `google`);
            window.location.href = res.data.data.redirectURI;
          }
        } else {
          showAlertMessage(res.data.message, "danger");
        }
      },
    });
    var myModalEl = document.querySelector("#sendNotif");
    var modal = window.bootstrap.Modal.getOrCreateInstance(myModalEl);
    modal.hide();
  };

  return (
    <div>
      <Button
        text={"Send Notification"}
        variant="outline"
        className="w-100"
        target="sendNotif"
      />
      <Modal
        modalId="sendNotif"
        title={<>Send Notification</>}
        body={
          <div>
            <Elements
              formField={[
                {
                  id: "notifMessage",
                  type: "text",
                  value: notifInfo.content,
                  placeholder: "Type the Notification Message here",
                  onchange: (val, id) =>
                    setNotifInfo({ ...notifInfo, content: val }),
                },
                {
                  id: "enableMeet",
                  type: "checkbox",
                  label: "Create a Google Meet",
                  value: notifInfo.meet,
                  defaultChecked: notifInfo.meet,
                  onchange: (val, id) =>
                    setNotifInfo({ ...notifInfo, meet: val }),
                },
                {
                  id: "meetName",
                  type: "text",
                  disabled: !notifInfo.meet,
                  visible: notifInfo.meet,
                  value: notifInfo.title,
                  placeholder: "Meeting Title",
                  onchange: (val, id) =>
                    setNotifInfo({ ...notifInfo, title: val }),
                },
                {
                  id: "startTime",
                  type: "datetime-local",
                  disabled: !notifInfo.meet,
                  visible: notifInfo.meet,
                  value: notifInfo.start,
                  label: "Meet starting time",
                  onchange: (val, id) =>
                    setNotifInfo({ ...notifInfo, start: val }),
                },
                {
                  id: "endTime",
                  type: "datetime-local",
                  disabled: !notifInfo.meet,
                  visible: notifInfo.meet,
                  value: notifInfo.end,
                  label: "Meet ending time",
                  onchange: (val, id) =>
                    setNotifInfo({ ...notifInfo, end: val }),
                },
              ]}
            />
          </div>
        }
        footer={
          <div className="text-end">
            <Button
              text="Send"
              varaint="outline"
              onClick={(event) => handleCreateNotif()}
            />
          </div>
        }
      />
    </div>
  );
}

export default SendNotification;
