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
  debounce,
  links,
} from "../../../common";
function Familyform() {
  const [name, setName] = React.useState("");
  const [unique_name, setUniquename] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [image, setImage] = React.useState("");
  const [addloading, setAddLoading] = React.useState(false);
  const history = useHistory();

  React.useEffect(() => {
    if (unique_name.length > 0) debounce(checkFamilyNameAvaliabilty);
  }, [unique_name]);

  function checkFamilyNameAvaliabilty() {
    let elem = document.querySelector("#unique_name ~ .form-control-feedback");
    ReactDOM.render(<span className="text-muted">Checking...</span>, elem);
    API({
      ...links.check_familyname,
      urlparams: { "unique_name": unique_name },
      bodydata: {},
      isfile: false,
      callback: (res) => {
        if (res.status === 200) {
          let dom = <></>;
          if (res.data.data.available)
            dom = <span className="text-success">Avaliable</span>;
          else dom = <span className="text-danger">Not Avaliable</span>;

          ReactDOM.render(dom, elem);
        }
      },
    });
  }

  function addFamily(event) {
    setAddLoading(true);
    var bodyFormData = new FormData();
    bodyFormData.append("name", name);
    bodyFormData.append("unique_name", unique_name);
    bodyFormData.append("description", description);
    bodyFormData.append("image", "image_url");
    console.log(bodyFormData);
    API({
      ...links.post_family,
      urlparams: {},
      bodydata: bodyFormData,
      isfile: false,
      callback: (res) => {
        if (res.status === 200) {
          showAlertMessage("Family Posted successfully", "success");
        } else {
          showAlertMessage(res.data.message, "danger");
        }
        setImage("");
        setDescription("");
        setImage("");
        setAddLoading(false);
        let path = `/app/family`;
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
                  id: "name",
                  type: "text",
                  value: name,
                  label: "Name",
                  placeholder: "Type the Family Name here",
                  onchange: setName,
                },
              ]}
            />
            <Elements
              formField={[
                {
                  id: "unique_name",
                  type: "text",
                  value: unique_name,
                  label: "Unique Name",
                  placeholder: "Type the Unique Family Name here",
                  onchange: setUniquename,
                },
              ]}
            />
            <Elements
              formField={[
                {
                  id: "description",
                  type: "text",
                  value: description,
                  label: "Description",
                  placeholder: "Type the Family Description here",
                  onchange: setDescription,
                },
              ]}
            />
            <Button
              text={"Add Family"}
              variant="outline"
              className="w-100"
              onClick={(e) => {
                addFamily(e);
              }}
            />
          </form>
        }
      />
    </div>
  );
}

export default Familyform;
