import React from "react";
import {
  Card,
  API,
  links,
  showAlertMessage,
  Modal,
  Spinner,
} from "../../common";
import SendNotification from "./component/sendNotification";
import SingleNotif from "./component/singleNotif";

function Notification() {
  const [notifications, setNotifications] = React.useState();
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    API({
      ...links.get_notifications,
      urlparams: {},
      isfile: false,
      callback: (res) => {
        if (res.status === 200) {
          setNotifications(res.data);
          showAlertMessage("User fetched successfully", "success");
        } else {
          showAlertMessage(res.data.message, "danger");
        }
        setLoading(false);
      },
    });
  }, []);

  function setNotification(notification) {
    setNotifications([notification, ...notifications]);
  }

  return (
    <div className="w-100">
      <Card
        bodyClass="p-1"
        header={
          <h6>
            <i class="bi bi-bell"></i> Notifications
          </h6>
        }
        body={
          <div>
            <SendNotification setNotification={setNotification} />
            {loading ? (
              <>Loading...</>
            ) : (
              <div>
                {notifications.length > 0 ? (
                  notifications.map((notification, i) => {
                    return (
                      <SingleNotif
                        key={notification.notificationid}
                        notification={notification}
                      />
                    );
                  })
                ) : (
                  <div className="text-muted text-center">
                    No Notification Found !!!
                  </div>
                )}
              </div>
            )}
            {/* <SingleNotif />
            <SingleNotif />
            <SingleNotif />
            <SingleNotif />
            <SingleNotif />
            <SingleNotif />
            <SingleNotif /> */}
          </div>
        }
      />
    </div>
  );
}

export default Notification;
