import React from "react";
import { EventDisabler } from "../../logic/EventDisabler";
import { current } from "../../logic/proto_pen_method/proto_event";

function Wheel(props: { children?: any; target: any }) {
  React.useEffect(() => {
    let container: HTMLElement = current(props.target);
    let evd: EventDisabler = new EventDisabler();;
    let unSet = evd.wheel().set(container);
    return () => {
      unSet();
    };
  }, [props.target]);
  return <React.Fragment>{props.children}</React.Fragment>;
}

function Scroll(props: { children?: any; target: any }) {
  React.useEffect(() => {
    let container: HTMLElement = current(props.target);
    let evd: EventDisabler = new EventDisabler();;
    let unSet = evd.scroll().set(container);
    return () => {
      unSet();
    };
  }, [props.target]);
  return <React.Fragment>{props.children}</React.Fragment>;
}

export const Disabler = {
  Wheel,
  Scroll
};
