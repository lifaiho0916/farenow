import React from "react";

const Help = () => {
  return (
    <>
      <div
        style={{
          boxShadow:
            "rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px",
          height: "100px",
          width: "70%",
          margin: "auto",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          borderRadius:'30px',
          
        }}
      >
        <h1 style={{ color: "black", textAlign: "center" }}>
          {" "}
          how I can help you!{" "}
        </h1>
      </div>
    </>
  );
};

export default Help;
