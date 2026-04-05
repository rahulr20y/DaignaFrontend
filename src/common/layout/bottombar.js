import React from "react";
import { motion } from "framer-motion";
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
                        "active-nav": location.pathname === item.to,
                        "text-muted opacity-70": location.pathname !== item.to,
                      }
                    )}
                  >
                    <motion.div
                      whileTap={{ scale: 0.85 }}
                      whileHover={{ y: -2 }}
                      className="d-flex flex-row align-items-center justify-content-center p-2 rounded-pill h-100"
                    >
                      <i className={"font-24 bi bi-" + (location.pathname === item.to ? item.activeIcon || item.icon + '-fill' : item.icon)} />
                    </motion.div>
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
