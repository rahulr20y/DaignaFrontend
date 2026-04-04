import React from "react";
import ModalForm from "./modalForm";
import {
  Elements,
  Button,
  Card,
  Modal,
  showAlertMessage,
  API,
  links,
} from "../../../common";

function Tabular(props) {
  const [addloading, setAddLoading] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const [tabRelations, setTabRelations] = React.useState();
  const [family, setFamily] = React.useState();

  React.useEffect(() => {
    API({
      ...links.get_user,
      callurl: links.get_relation.callurl + "/" + props.rootnode,
      urlparams: {},
      isfile: false,
      callback: (res) => {
        if (res.status === 200) {
          setTabRelations(res.data.data.relations);
          setFamily(res.data.data.family);
          console.log(res.data.data.family);
          showAlertMessage("Relations fetched successfully", "success");
        } else {
          showAlertMessage(res.data.message, "danger");
        }
        setLoading(false);
      },
    });
  }, [props.rootnode]);

  function addRelation(username, relation) {
    setAddLoading(true);
    console.log(relation);
    var bodyFormData = new FormData();
    bodyFormData.append("family", family);
    bodyFormData.append("from", props.rootnode);
    bodyFormData.append("to", username);
    bodyFormData.append("relation_type", relation);
    API({
      ...links.post_relation,
      urlparams: {},
      bodydata: bodyFormData,
      isfile: false,
      callback: (res) => {
        if (res.status === 200) {
          props.changeFlag();
          setTabRelations([...new Set([...tabRelations, res.data.data])]);
          showAlertMessage("Member Posted successfully", "success");
        } else {
          showAlertMessage(res.data.message, "danger");
        }
        setAddLoading(false);
      },
    });
  }

  function deleteRelation(relation) {
    setAddLoading(true);
    var bodyFormData = new FormData();
    bodyFormData.append("family", family);
    bodyFormData.append("from", relation.from);
    bodyFormData.append("to", relation.to);
    bodyFormData.append("relation_type", relation.relation_type);
    API({
      ...links.delete_relation,
      urlparams: {},
      bodydata: bodyFormData,
      isfile: false,
      callback: (res) => {
        if (res.status === 200) {
          props.changeFlag();
          setTabRelations(tabRelations.filter((rel) => rel !== relation));
          showAlertMessage("Member Posted successfully", "success");
        } else {
          showAlertMessage(res.data.message, "danger");
        }
        setAddLoading(false);
      },
    });
  }
  return (
    <>
      <div className="text-end">
        <Button
          text={"Add New Relation"}
          variant="outline"
          onClick={() => {
            var myModalEl = document.querySelector("#relation");
            var modal = window.bootstrap.Modal.getOrCreateInstance(myModalEl); // Returns a Bootstrap modal instance
            modal.show();
          }}
        />
      </div>
      <ModalForm family={family} addRelation={addRelation} />
      <table className="table table-borderless">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Relation</th>
          </tr>
        </thead>
        <tbody>
          {tabRelations === undefined ? (
            <>Loading...</>
          ) : (
            <>
              {tabRelations.length > 0 ? (
                tabRelations.map((relation, i) => {
                  return (
                    <tr key={i + 1}>
                      <th scope="row">{i + 1}</th>
                      <td>{relation.to}</td>
                      <td>{relation.relation_type}</td>

                      <>
                        <Button
                          text={<i class="bi bi-trash"></i>}
                          variant="icon"
                          onClick={() => {
                            deleteRelation(relation);
                          }}
                          disabled={["Sibling", "Children"].includes(
                            relation.relation_type
                          )}
                        />
                      </>
                    </tr>
                  );
                })
              ) : (
                <div className="text-muted text-center">
                  No Relations Found !!!
                </div>
              )}
            </>
          )}
        </tbody>
      </table>
    </>
  );
}

export default Tabular;
