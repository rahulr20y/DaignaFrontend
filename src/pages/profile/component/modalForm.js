import React from "react";
import { useHistory } from "react-router-dom";

import {
  Elements,
  API,
  links,
  showAlertMessage,
  Modal,
  Spinner,
  Card,
  Button,
  Tab,
  debounce,
} from "../../../common";

function ModalForm(props) {
  const [username, setUsername] = React.useState();
  const [relationType, setRelationType] = React.useState();
  const [loading, setLoading] = React.useState(true);
  const [searchText, setSearchText] = React.useState("");
  const [users, setUsers] = React.useState([]);

  const history = useHistory();

  // React.useEffect(() => {
  //   if (searchText.length > 0) debounce(checkUserAvaliabilty);
  // }, [searchText]);

  React.useEffect(() => {
    if (props.family != undefined) checkUserAvaliabilty();
  }, [props.family]);

  function checkUserAvaliabilty() {
    API({
      ...links.get_members,
      callurl: links.get_members.callurl + "/" + props.family,
      urlparams: {},
      bodydata: {},
      isfile: false,
      callback: (res) => {
        if (res.status === 200) {
          let arr = [];
          for (const x of res.data) {
            let val = {
              label: x.firstname,
              value: x.treenodeid,
            };
            arr.push(val);
          }
          setUsers(arr);
        }
      },
    });
  }

  function addRelation(event) {
    console.log(username.value, relationType.value);
    props.addRelation(username.value, relationType.value);
    var myModalEl = document.querySelector("#relation");
    var modal = window.bootstrap.Modal.getOrCreateInstance(myModalEl); // Returns a Bootstrap modal instance
    modal.hide();
  }
  return (
    <Modal
      modalId="relation"
      contentClass="overflow-visible"
      bodyClass="overflow-visible"
      body={
        <div>
          <form>
            <Elements
              formField={[
                {
                  id: "username",
                  label: "Name",
                  placeholder: "Name",
                  value: username,
                  type: "react_select",
                  className: "",
                  requiredFlag: true,
                  inputValue: searchText,
                  autoComplete: "off",
                  onInputChange: setSearchText,
                  onchange: (e) => {
                    console.log(e);
                    setUsername(e);
                  },
                  options: users,
                },
              ]}
            />

            <Elements
              formField={[
                {
                  id: "relationType",
                  className: "overflow-visible",
                  type: "react_select",
                  value: relationType,
                  label: "Relation",
                  placeholder: "Relation Types",
                  onchange: (e) => {
                    setRelationType(e);
                  },
                  options: [
                    { label: "Parent", value: "Parent" },
                    { label: "Sibling", value: "Sibling" },
                    { label: "Spouse", value: "Spouse" },
                  ],
                },
              ]}
            />
          </form>
        </div>
      }
      footer={
        <>
          <Button
            variant="outline"
            text="Cancel"
            className="me-3"
            onClick={() => {
              var myModalEl = document.querySelector("#relation");
              var modal = window.bootstrap.Modal.getOrCreateInstance(myModalEl); // Returns a Bootstrap modal instance
              modal.hide();
            }}
          />
          <Button
            text="Add"
            onClick={(e) => {
              addRelation(e);
            }}
          />
        </>
      }
    />
  );
}

export default ModalForm;
