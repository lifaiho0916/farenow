import React from "react";

const ServicesBanner = () => {
  return (
    <div className="row">
      <div className="col-lg-12 d-flex align-items-center gap-4">
        <span>Popular:</span>
        <span className="border py-2 px-3" style={{ borderRadius: "50px" }}>
          Handyman Services
        </span>
        <span className="border py-2 px-3" style={{ borderRadius: "50px" }}>
          Home Cleaning
        </span>
        <span className="border py-2 px-3" style={{ borderRadius: "50px" }}>
          Electricity
        </span>
        <span className="border py-2 px-3" style={{ borderRadius: "50px" }}>
          Computers
        </span>
      </div>
    </div>
  );
};

export default ServicesBanner;
