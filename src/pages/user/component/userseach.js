import React from "react";
import ReactDOM from "react-dom";
import { useHistory } from "react-router-dom";

import {
  Elements,
  Button,
  Card,
  Modal,
  showAlertMessage,
  API,
  links,
  debounce,
} from "../../../common";

function Userseach() {
  const [searchText, setSearchText] = React.useState("");
  const [users, setUsers] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const history = useHistory();

  React.useEffect(() => {
    console.log(searchText);
    //if (searchText.length > 0) debounce(checkUserAvaliabilty);
  }, [searchText]);

  function checkUserAvaliabilty() {
    API({
      ...links.get_users,
      urlparams: { searchtext: searchText },
      bodydata: {},
      isfile: false,
      callback: (res) => {
        if (res.status === 200) {
          let arr = [];
          for (const x of res.data.data) {
            let val = { label: x.first_name + x.last_name, value: x.username };
            arr.push(val);
          }
          setUsers(arr);

          console.log(res.data.data);
        }
      },
    });
  }

  return (
    <div>
      {" "}
      <Elements
        formField={[
          {
            id: "searchText",
            placeholder: "search users",
            type: "react_select",
            className: "",
            requiredFlag: true,
            inputValue: searchText,
            autoComplete: "off",

            onInputChange: setSearchText,
            onchange: (e) => {
              let path = `/app/profile/` + e.value;
              setSearchText("");
              history.push(path);
              //window.location.reload();
            },
            options: users,
            // options: [
            //   { label: "rahul", value: "rah1" },
            //   { label: "abhi", value: "abhi2" },
            // ],
            // valueKey: "",
            // labelKey: "",
          },
        ]}
      />
    </div>
  );
}

export default Userseach;
