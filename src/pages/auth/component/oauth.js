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
          "d-flex w-100 btn waves-effect waves-light mx-auto mb-3 border align-items-center justify-content-center",
          {
            "shadow-sm": !btn_on,
            disabled: btn_on,
          }
        )}
        style={{ 
          padding: "10px 20px", 
          borderRadius: "12px",
          backgroundColor: "#fff",
          borderColor: "#e2e8f0"
        }}
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
        <div style={{ height: "24px", width: "24px", marginRight: "12px" }}>
          <img
            className="h-100 w-100"
            src={innerData.img}
            alt={`${innerData.name}-logo`}
          />
        </div>
        <div className="text-dark font-15" style={{ fontFamily: "Outfit, sans-serif", fontWeight: "500" }}>
          Continue with {innerData.name}
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
