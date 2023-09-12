import React from "react";

const Title = ({ headingText }) => {
  return (
    <>
      <p className="text-center mb-8">{headingText.toUpperCase()}</p>
    </>
  );
};

export default Title;
