import React from "react";

function ShowIf(props: { sif: any; show: any }) {
  return <React.Fragment>{props.sif ? props.show : null}</React.Fragment>;
}

export default ShowIf;
