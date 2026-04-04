import React, { useState } from "react";
import { connect } from "react-redux";
import { NavLink, useLocation } from "react-router-dom";
import classnames from "classnames";
import { menu } from "..";
import Location from "./location";
import Search from "./search";
import Userseach from "../../pages/user/component/userseach.js";
import { useTranslation } from "react-i18next";
import i18n from "../../i18n";

function Topbar(props) {
  const location = useLocation();
  const [langs, setLangs] = useState([
    { name: "English", code: "en" },
    { name: "Hindi", code: "hi" },
    { name: "Gujrati", code: "gj" },
  ]);
  const { t, i18n } = useTranslation();

  return (
    <nav
      id="topbar-nav"
      className="navbar fixed-top navbar-light py-0 shadow-sm"
    >
      <div
        className="d-flex flex-grow-1 mx-auto px-2 px-md-4 align-items-center h-100 justify-content-between"
        style={{ maxWidth: "1200px" }}
      >
        {/* <Location location={props.location} updateLocation={props.updateLocation} /> */}
        {/* <div className='d-flex flex-grow-1 h-100'>
					<div className='d-none d-md-flex ms-4 h-100'>
						{menu.map((item, i) => (
							<NavLink
								key={item.to}
								to={item.to}
								className={classnames(
									'd-flex flex-column align-items-center me-3 text-decoration-none h-100',
									{
										'text-dark fw-bold': location.pathname === item.to,
										'text-muted hover:text-gray-700': location.pathname !== item.to,
									}
								)}
							>
								<i className={'flex-grow-1 font-22 bi bi-' + item.icon} />
								<span> {item.name} </span>
							</NavLink>
						))}
					</div>
				</div> */}
        {/* <div className="d-flex align-items-center h-100 justify-content-between"> */}
        {/* <Search />
					<NavLink
						to='/app/notification'
						className='d-flex justify-content-center align-items-center h-100'
					>
						<i className='bi bi-bell mx-2' />
					</NavLink> */}
        <div>
          <h5>{t(props.brandname)}</h5>
          {/* {t("Welcome to React")} */}
        </div>

        <div className="d-flex">
          {/* <div
            className=""
            style={{
              width: "250px",
            }}
          >
            {" "}
            {/* <Userseach />
          </div> */}
          <div className="dropdown d-flex align-items-center mx-2">
            <a
              className="dropdown-toggle waves-effect waves-light nav-user"
              data-bs-toggle="dropdown"
              role="button"
              aria-haspopup="false"
              aria-expanded="false"
            >
              <i class="bi bi-globe"></i>
            </a>
            <div
              className="dropdown-menu dropdown-menu-end"
              style={{ width: "60px" }}
            >
              {langs.map((lang) => (
                <div
                  className="px-2 py-1"
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    i18n.changeLanguage(lang.code);
                  }}
                >
                  {lang.name}
                </div>
              ))}
            </div>
          </div>

          <div className="dropdown d-flex align-items-center ms-2">
            <a
              className="dropdown-toggle waves-effect waves-light nav-user"
              data-bs-toggle="dropdown"
              role="button"
              aria-haspopup="false"
              aria-expanded="false"
            >
              {props.profile && (
                <div className="avatar-box">
                  <img
                    className="thumb-sm rounded"
                    // src={props.profile.picture}
                    src="https://cdn.vox-cdn.com/thumbor/JgCPp2BBxETY596wCp50ccosCfE=/0x0:2370x1574/1200x800/filters:focal(996x598:1374x976)/cdn.vox-cdn.com/uploads/chorus_image/image/68870438/Screen_Shot_2020_07_21_at_9.38.25_AM.0.png"
                    alt="topbar-avatar"
                  />
                </div>
              )}
            </a>
            <div
              className="dropdown-menu dropdown-menu-end"
              style={{ width: "200px" }}
            >
              <NavLink
                className="dropdown-item"
                to={`/app/profile/${props.profile.username}`}
              >
                <div className="fw-bold text-muted text-center text-truncate">
                  {props.profile &&
                    props.profile.first_name + " " + props.profile.last_name}
                </div>
              </NavLink>
              <div className="dropdown-divider" />
              <NavLink className="dropdown-item" to="/app/family">
                <i className="bi bi-house icon-xs icon-dual me-2" />
                {" Family"}
              </NavLink>
              <NavLink className="dropdown-item" to="/app/about">
                <i className="bi bi-info-square icon-xs icon-dual me-2" />
                {" About"}
              </NavLink>
              <div className="dropdown-divider" />
              <NavLink className="dropdown-item" to="/app/logout">
                <i className="bi bi-power icon-xs icon-dual me-2" />
                {" Logout"}
              </NavLink>
            </div>
          </div>
        </div>
      </div>
      {/* </div> */}
    </nav>
  );
}

const mapStateToProps = (state) => {
  return {
    profile: state.general.profile,
    token: state.general.token,
    location: state.general.location,
    brandname: state.general.brandname,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateLocation: (location) => {
      dispatch({ type: "UPDATE_LOCATION", location: location });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Topbar);
