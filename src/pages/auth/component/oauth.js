import React from "react";
import { GoogleLogo, FacebookLogo } from "../../../img/index";
import { API, links } from "../../../common/index";
import classnames from "classnames";

const oAuthArray = [
  { name: "Google", type: "google", img: GoogleLogo },
  { name: "Facebook", type: "facebook", img: FacebookLogo },
];

function OAuth(props) {
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    document.title = "Auth | " + props.brandname;
  }, []);
  const redirectURI = `${window.location.origin}/get-response/`;
  let login_buttons = [];

  oAuthArray.forEach((innerData) => {
    let btn_on = loading || innerData.disabled;
    login_buttons.push(
      <div
        key={innerData.name + " " + btn_on}
        className={classnames(
          "d-flex w-75 btn waves-effect waves-light mx-auto mb-2 border",
          {
            "hover:bg-gray-100 shadow-sm": !btn_on,
            disabled: btn_on,
          }
        )}
        style={{ height: "40px" }}
        onClick={() => {
          setLoading(true);
          API({
            ...links.oauth,
            urlparams: {},
            bodydata: {
              authType: `${innerData.name.toLowerCase()}`,
              redirect_uri: redirectURI,
            },
            isfile: false,
            callback: (res) => {
              //console.log(res.data.data)
              if (res.status === 200) {
                setLoading(false);
                localStorage.setItem("enable_meet", false);
                localStorage.setItem(
                  "authType",
                  `${innerData.name.toLowerCase()}`
                );
                window.location.href = res.data.data.redirectURI;
              }
            },
          });
        }}
      >
        <div className="h-100">
          <img
            className="h-100"
            src={innerData.img}
            alt={`${innerData.name}-logo`}
          />
        </div>
        <div className="w-100">
          <b>Log in with {innerData.name}</b>
        </div>
      </div>
    );
  });

  return (
    <div className="card-body p-4">
      <div className="button-items">{login_buttons}</div>
    </div>
  );
}

export default OAuth;
