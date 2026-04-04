import React from "react";
import { Card, Tab } from "../../common";

function About() {
  const [tabs, setTabs] = React.useState([
    { id: "history", text: "History" },
    { id: "information", text: "Information" },
  ]);

  return (
    <div>
      <Card className="shadow-sm" body={<Tab tabs={tabs} />} />
    </div>
  );
}

export default About;
