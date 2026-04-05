import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Route, Switch, Redirect, useLocation } from "react-router-dom";
import { Spinner, ErrorBoundary, Topbar, BottomBar } from "../common/index";
import { AnimatePresence } from "framer-motion";
import Leftbar from "../common/layout/leftbar";
import Notification from "../pages/notification/notification";
import { getRoutes, PageHead } from "./routes";

function ProtectedWebPage(props) {
  const location = useLocation();
  const [routes, SetRoutes] = React.useState(getRoutes());

  useEffect(() => {
    document.querySelector("body").style.background = "rgba(245,245,245,0.5)";
  }, []);

  function pagehead() {
    let x = PageHead[location.pathname];
    document.title =
      ([undefined, null, ""].includes(x) ? "" : `${x.title} | `) +
      props.brandname;
  }

  if (!props.token.access_token) return <Redirect to="/" />;
  return (
    <>
      <Topbar />

      <div
        className="page-content h-100 mx-auto"
        style={{ maxWidth: "1200px" }}
      >
        <div className="row m-0 container-fluid p-0 p-md-4">
          <div className="col-3 d-none d-md-block ">
            <div className="position-sticky" style={{ top: "80px" }}>
              <Leftbar />
            </div>
          </div>
          <div className="container-fluid col-md-6 mb-5 mb-md-0 mt-2 mt-md-0">
            <ErrorBoundary>
              {pagehead()}

              <React.Suspense fallback={<Spinner />}>
                <AnimatePresence exitBeforeEnter>
                  <Switch location={location} key={location.pathname}>
                    {routes.map((route, idx) => {
                      return (
                        route.component && (
                          <Route
                            key={idx}
                            path={route.path}
                            exact={route.exact}
                            name={route.name}
                            render={(props) => (
                              <route.component {...route.props} />
                            )}
                          />
                        )
                      );
                    })}
                    {/* <Redirect from="/" to="/" /> */}
                  </Switch>
                </AnimatePresence>
              </React.Suspense>
            </ErrorBoundary>
          </div>
          <div className="col-3 d-none d-md-block">
            <div className="position-sticky" style={{ top: "80px" }}>
              <Notification />
            </div>
          </div>
        </div>
        <BottomBar />
      </div>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    token: state.general.token,
    profile: state.general.profile,
    brandname: state.general.brandname,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    // update_secondary_bar: (new_state) => { dispatch({ type: 'SECONDARYBAR_SET', secondaySidebarShow: new_state }) },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ProtectedWebPage);
