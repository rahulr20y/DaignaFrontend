import React from "react";
import { useParams, useHistory } from "react-router-dom";
import {
  Elements,
  Button,
  Card,
  Modal,
  showAlertMessage,
  API,
  links,
} from "../../../common";

function Memberform() {
  const [familyid, setFamilyid] = React.useState();
  const [username, setUsername] = React.useState();
  const [gender, setGender] = React.useState();
  const [firstname, setFirstname] = React.useState("");
  const [lastname, setLastname] = React.useState("");
  const [addloading, setAddLoading] = React.useState(false);
  const history = useHistory();

  const params = useParams();
  React.useEffect(() => {
    setFamilyid(params.familyid);
  }, []);

  function addMember(event) {
    setAddLoading(true);
    var bodyFormData = new FormData();
    if (familyid !== undefined) bodyFormData.append("familyid", familyid);
    if (username !== undefined) bodyFormData.append("username", username);
    bodyFormData.append("gender", gender);
    bodyFormData.append("firstname", firstname);
    bodyFormData.append("lastname", lastname);
    API({
      ...links.post_member,
      urlparams: {},
      bodydata: bodyFormData,
      isfile: false,
      callback: (res) => {
        if (res.status === 200) {
          showAlertMessage("Member Posted successfully", "success");
        } else {
          showAlertMessage(res.data.message, "danger");
        }
        setFamilyid();
        setUsername();
        setGender();
        setFirstname("");
        setLastname("");
        setAddLoading(false);
        let path = "/app/family/" + familyid;
        history.push(path);
      },
    });
    //event.preventDefault();
  }

  return (
    <div>
      {" "}
      <Card
        className="shadow-sm"
        headerClass="p-0"
        header={<></>}
        body={
          <form>
            <Elements
              formField={[
                {
                  id: "firstname",
                  type: "text",
                  value: firstname,
                  label: "First Name",
                  placeholder: "First Name ",
                  onchange: setFirstname,
                },
              ]}
            />
            <Elements
              formField={[
                {
                  id: "lastname",
                  type: "text",
                  value: lastname,
                  label: "Last Name",
                  placeholder: "Last Name",
                  onchange: setLastname,
                },
              ]}
            />
            <Elements
              formField={[
                {
                  id: "familyid",
                  type: "text",
                  value: familyid,
                  label: "Family Name",
                  placeholder: "Family unique name",
                  onchange: setFamilyid,
                },
              ]}
            />
            <Elements
              formField={[
                {
                  id: "username",
                  type: "text",
                  value: username,
                  label: "User Name",
                  placeholder: "User Name",
                  onchange: setUsername,
                },
              ]}
            />
            <Elements
              formField={[
                {
                  id: "gender",
                  type: "radio",
                  label: "Gender",
                  value: gender,
                  options: [
                    { label: "Male", value: "MALE" },
                    { label: "Female", value: "FEMALE" },
                  ],
                  onchange: setGender,
                },
              ]}
            />
            <Button
              text={"Add Member"}
              variant="outline"
              className="w-100"
              onClick={(e) => {
                addMember(e);
              }}
            />
          </form>
        }
      />
    </div>
  );
}

export default Memberform;
