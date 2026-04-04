import React from "react";
import { connect } from "react-redux";
import { NavLink, useLocation } from "react-router-dom";
import { menu } from "..";
import classnames from "classnames";

function BottomBar(props) {
  const location = useLocation();

  return (
    <div
      id="bottombar-nav"
      className="fixed-bottom border-top d-md-none shadow-sm"
    >
      <div className="conatiner-fluid h-100">
        <div className="row h-100">
          {menu.map((item, i) => {
            if (item.mobile)
              return (
                <span className="col-3 h-100" key={item.to}>
                  <NavLink
                    to={item.to}
                    className={classnames(
                      "d-flex flex-column justify-content-center align-items-center text-decoration-none h-100",
                      {
                        "text-dark fw-bold": location.pathname === item.to,
                        "text-muted hover:text-gray-700":
                          location.pathname !== item.to,
                      }
                    )}
                  >
                    <i className={"font-20 flex-grow-1 bi bi-" + item.icon} />
                    <span className="font-12 mt-0"> {item.name} </span>
                  </NavLink>
                </span>
              );
            else return <></>;
          })}
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    token: state.general.token,
    brandname: state.general.brandname,
  };
};

export default connect(mapStateToProps, null)(BottomBar);
