import React from "react";
import ProfileBody from "./component/profileBody";
import ProfileHeader from "./component/profileHeader";
import { useParams } from "react-router-dom";
import {
  API,
  links,
  showAlertMessage,
  Modal,
  Spinner,
  Card,
} from "../../common";
import { connect } from "react-redux";

function Profile(props) {
  const [userDetails, setUserDetails] = React.useState();
  const [loading, setLoading] = React.useState(true);
  const params = useParams();
  let username = "";

  React.useEffect(() => {
    username = params.username;
    if (username === "self") {
      username = props.profile.username;
    }
    API({
      ...links.get_user,
      callurl: links.get_user.callurl + "/" + username,
      urlparams: {},
      isfile: false,
      callback: (res) => {
        if (res.status === 200) {
          setUserDetails(res.data);
          showAlertMessage("User fetched successfully", "success");
        } else {
          showAlertMessage(res.data.message, "danger");
        }
        setLoading(false);
      },
    });
  }, [params.username]);

  return (
    userDetails !== undefined && (
      <div>
        <Card
          className="shadow-sm"
          headerClass="p-0"
          header={<ProfileHeader userDetails={userDetails} />}
        />
        <Card
          className="shadow-sm"
          body={<ProfileBody userDetails={userDetails} />}
        />
      </div>
    )
  );
}

const mapStateToProps = (state) => {
  return {
    profile: state.general.profile,
  };
};

export default connect(mapStateToProps)(Profile);
