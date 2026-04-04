import React from "react";

function FamilyNode(props) {
  return (
    <div
      className="rounded p-2 position-absolute display-flex justify-content-center"
      id={props.key}
      style={props.style}
    >
      <div className="border rounded border-primary w-100 h-100 p-1 bg-info">
        <div className="text-center mb-2">
          <a class="user-avatar">
            <img
              src="https://cdn.vox-cdn.com/thumbor/JgCPp2BBxETY596wCp50ccosCfE=/0x0:2370x1574/1200x800/filters:focal(996x598:1374x976)/cdn.vox-cdn.com/uploads/chorus_image/image/68870438/Screen_Shot_2020_07_21_at_9.38.25_AM.0.png"
              alt="user"
              class="thumb-xs rounded img-fluid"
            />
          </a>
        </div>
        <p className="font-10 mb-0 text-center fw-bold">Username</p>
        <p className="font-10 mb-0 text-center">@handle</p>
      </div>
    </div>
  );
}

export default FamilyNode;
