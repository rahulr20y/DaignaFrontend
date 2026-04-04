/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useLocation } from "react-router-dom";
import { API, links } from "../../../common/index";
import { connect } from "react-redux";

const redirectURI = `${window.location.origin}/get-response/`;

function OAuthResponse(props) {
  const location = useLocation();

  React.useEffect(() => {
    const values = new URLSearchParams(decodeURIComponent(location.search));
    console.log(values.get("accessToken"));
  }, [location.search]);
  React.useEffect(() => {
    const values = new URLSearchParams(decodeURIComponent(location.search));
    API({
      ...links.oauth_response,
      urlparams: {},
      bodydata: {
        authType: localStorage.getItem("authType"),
        state: values.get("state"),
        code: values.get("code"),
        redirect_uri: `${redirectURI}`,
        enable_meet: localStorage.getItem("enable_meet"),
      },
      isfile: false,
      callback: (res) => {
        console.log(res);
        if (res.status === 200) {
          localStorage.clear();
          console.log(res.data);
          const userDetails = {
            token: {
              access_token: res.data.access_token,
              refresh_token: res.data.refresh_token,
            },
            profile: res.data.profile,
          };
          props.userDetails(userDetails);
        }
      },
    });
  }, []);

  return (
    <div className="card-body">
      <h4 className="text-center">Fetching Data...</h4>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    userDetails: (details) => {
      dispatch({ type: "USER_DETAILS", userdetails: details });
    },
  };
};

export default connect(null, mapDispatchToProps)(OAuthResponse);
