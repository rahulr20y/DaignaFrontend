import React from "react";
import { useParams, useHistory } from "react-router-dom";
import {
  API,
  links,
  showAlertMessage,
  Modal,
  Spinner,
  Card,
  Button,
} from "../../../common";

function Memberlist() {
  const [members, setMembers] = React.useState();
  const [loading, setLoading] = React.useState(true);
  const params = useParams();

  const history = useHistory();
  const routeChange = () => {
    let path = `/app/family/`+params.familyid+`/create`;
    history.push(path);
  };

  React.useEffect(() => {
    API({
      ...links.get_members,
      callurl: links.get_members.callurl + "/" + params.familyid,
      urlparams: {},
      isfile: false,
      callback: (res) => {
        if (res.status === 200) {
          setMembers(res.data);
          showAlertMessage("Post fetched successfully", "success");
        } else {
          showAlertMessage(res.data.message, "danger");
        }
        setLoading(false);
      },
    });
  }, []);

  return (
    members !== undefined && (
      <div>
        <Card
          className="shadow-sm"
          headerClass="p-0"
          header={
            <Button
              text="Add a new Member"
              varaint="outline"
              onClick={routeChange}
            />
          }
          body={
            <>
              <ul class="list-group">
                {members.length > 0 ? (
                  members.map((member, i) => {
                    return (
                      <li
                        class="list-group-item d-flex justify-content-between align-items-center"
                        // onClick={() => {
                        //   history.push("/app/family/" + family.familyid);
                        // }}
                        key={member.treenodeid}
                      >
                        <span>
                          {member.firstname}
                          <small className="d-block">{member.lastname}</small>
                        </span>
                        {/* <span class="badge bg-primary rounded-pill">14</span> */}
                      </li>
                    );
                  })
                ) : (
                  <div className="text-muted text-center">
                    No Members Found !!!
                  </div>
                )}
              </ul>
            </>
          }
        />
      </div>
    )
  );
}

export default Memberlist;
