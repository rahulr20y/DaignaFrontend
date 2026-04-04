import React from "react";
import { Route, Switch, Redirect, useLocation } from "react-router-dom";
import { useHistory } from "react-router-dom";
import {
  API,
  links,
  showAlertMessage,
  Modal,
  Spinner,
  Card,
  Button,
} from "../../../common";

function Familylist() {
  const [families, setFamilies] = React.useState();
  const [loading, setLoading] = React.useState(true);

  const history = useHistory();
  const routeChange = () => {
    let path = `/app/family/create`;
    history.push(path);
  };

  React.useEffect(() => {
    API({
      ...links.get_family,
      urlparams: {},
      isfile: false,
      callback: (res) => {
        if (res.status === 200) {
          console.log(res.data)
          setFamilies(res.data);
          showAlertMessage("Post fetched successfully", "success");
        } else {
          showAlertMessage(res.data.message, "danger");
        }
        setLoading(false);
      },
    });
  }, []);

  return (
    families !== undefined && (
      <div>
        <Card
          className="shadow-sm"
          headerClass="p-0"
          header={
            <Button
              text="Add a new Family"
              varaint="outline"
              onClick={routeChange}
            />
          }
          body={
            <>
              <ul class="list-group">
                {families.length > 0 ? (
                  families.map((family, i) => {
                    return (
                      <li
                        class="list-group-item d-flex justify-content-between align-items-center"
                        onClick={() => {
                          history.push("/app/family/" + family.unique_name);
                        }}
                        key={family.familyid}
                      >
                        <span>
                          {family.name}
                          <small className="d-block">
                            {family.description}
                          </small>
                        </span>
                        {/* <span class="badge bg-primary rounded-pill">14</span> */}
                      </li>
                    );
                  })
                ) : (
                  <div className="text-muted text-center">
                    No Families Found !!!
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

export default Familylist;
