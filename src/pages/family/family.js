import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Familylist from "./component/familylist";
import Familyform from "./component/familyform";
import Memberlist from "./component/memberlist";
import Memberform from "./component/memberform";

function Family() {
  return (
    <div>
      {" "}
      <Switch>
        <Route exact path={"/app/family"}>
          <Familylist />
        </Route>
        <Route exact path={"/app/family/create"}>
          <Familyform />
        </Route>
        <Route exact path={"/app/family/:familyid"}>
          <Memberlist />
        </Route>
        <Route exact path={"/app/family/:familyid/create"}>
          <Memberform />
        </Route>
      </Switch>
    </div>
  );
}

export default Family;
