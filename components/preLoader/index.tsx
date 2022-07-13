import React, { FC, CSSProperties } from "react";
import BounceLoader from "react-spinners/BounceLoader";
import LoaderProps from "./loader.interface";
const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
  zIndex: 9999999999999,
};

const PreLoader: FC<LoaderProps> = ({ isLoading }) => {
  return (
    <div className="preLoader">
      <BounceLoader
        color={"#3d3783"}
        cssOverride={override}
        loading={isLoading}
        size={60}
      />
    </div>
  );
};

export default PreLoader;
