import React from "react";

function ProfileHeader(props) {
  return (
    <div>
      <div>
        <img
          className="img-fluid w-100"
          src="https://www.teahub.io/photos/full/51-513680_facebook-cover-wallpaper.jpg"
          style={{ maxHeight: "164px" }}
        />
      </div>

      <div
        className="text-center d-flex justify-content-center"
        style={{ height: "54px", alignItems: "flex-end" }}
      >
        <a class="user-avatar me-2" style={{}}>
          <img
            src="https://cdn.vox-cdn.com/thumbor/JgCPp2BBxETY596wCp50ccosCfE=/0x0:2370x1574/1200x800/filters:focal(996x598:1374x976)/cdn.vox-cdn.com/uploads/chorus_image/image/68870438/Screen_Shot_2020_07_21_at_9.38.25_AM.0.png"
            alt="user"
            class="rounded"
            style={{ width: "108px", height: "108px" }}
          />
        </a>
      </div>

      <div className="text-center">
        <h5 className="mb-0">{props.userDetails.user.first_name} {props.userDetails.user.last_name}</h5>
        <p>@{props.userDetails.user.username}</p>
      </div>
    </div>
  );
}

export default ProfileHeader;
