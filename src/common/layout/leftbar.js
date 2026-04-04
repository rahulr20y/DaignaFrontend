import React from "react";
import { menu } from "..";
import Card from "../component/Card";
import { NavLink, useLocation } from "react-router-dom";
import classnames from "classnames";

function Leftbar() {
  const location = useLocation();

  return (
    <div className="pt-2">
      {menu
        // .filter((item) => item.web)
        .map((item, i) => {
          if (item.web) {
            return (
              <NavLink
                key={item.to}
                to={item.to}
                className={classnames(
                  "d-flex align-items-center mb-1 text-decoration-none h-100 px-3 py-2 rounded-pill",
                  {
                    "bg-soft-primary fw-bold text-primary":
                      location.pathname === item.to,
                    "text-muted": location.pathname !== item.to,
                  }
                )}
              >
                <i className={"me-3 font-18 bi bi-" + item.icon} />
                <span> {item.name} </span>
              </NavLink>
            );
          }
        })}
    </div>
  );
}

export default Leftbar;
