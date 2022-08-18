import React from "react";
import { Puff } from "react-loader-spinner";
import "./spinner.css";

const Spinner = () => {
  return (
    <div className="spinner">
      <Puff color="yellow" height={50} width={50} />
    </div>
  );
};

export default Spinner;
