import React from "react";
import { Card } from "../../common";

const SkeletonPost = () => {
  return (
    <Card
      className="shadow-sm mb-3"
      body={
        <div>
          {/* Header Skeleton */}
          <div className="d-flex align-items-center mb-3">
            <div className="skeleton skeleton-avatar me-2"></div>
            <div className="flex-grow-1">
              <div className="skeleton skeleton-title"></div>
              <div
                className="skeleton skeleton-text"
                style={{ width: "30%" }}
              ></div>
            </div>
          </div>

          {/* Body Skeleton */}
          <div className="skeleton skeleton-text"></div>
          <div className="skeleton skeleton-text"></div>
          <div
            className="skeleton skeleton-text"
            style={{ width: "80%" }}
          ></div>

          {/* Optional image skeleton */}
          <div
            className="skeleton mt-2 rounded"
            style={{ height: "200px", display: "block" }}
          ></div>
        </div>
      }
      footer={
        <div className="d-flex justify-content-between p-2">
          <div
            className="skeleton skeleton-text"
            style={{ width: "20%" }}
          ></div>
          <div
            className="skeleton skeleton-text"
            style={{ width: "20%" }}
          ></div>
          <div
            className="skeleton skeleton-text"
            style={{ width: "20%" }}
          ></div>
        </div>
      }
    />
  );
};

export default SkeletonPost;
