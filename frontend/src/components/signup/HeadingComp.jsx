import React from "react";

const HeadingComp = ({first, second}) => {
  return (
    <div>
      <h1 className="text-centerv signup-heading">
        {first} <br /> {second}
      </h1>
    </div>
  );
};

export default HeadingComp;
