import React from "react";

const minHeight = `calc(100vh - 140px)`;
const Content = (props: Props) => {
  return (
    <div
      style={{ minHeight: minHeight, width: "100vw", paddingBottom: "20px" }}
    >
      {props.children}
    </div>
  );
};

export default Content;

type Props = {
  children?: any;
};
