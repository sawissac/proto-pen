// function disableCtrlS() {
//   keyDown(function (key) {
//     if (key.ctrlKey && key.code === "KeyS") {
//       key.preventDefault();
//     }
//   }, true);
//   return this;
// }

// function disableAllShortCut(){
//   keyDown(function(key){
//     key.preventDefault();
//   },true)
//   return this;
// }

// function disableContext() {
//   document.addEventListener(
//     "contextmenu",
//     (e) => {
//       e.preventDefault();
//     },
//     true
//   );
//   return this;
// }

function ctrlKeyPreventDefault(ev: WheelEvent) {
  if (ev.ctrlKey) {
    ev.preventDefault();
  }
}

export function disableWheelEvent(target: HTMLElement) {
  target.addEventListener("wheel", ctrlKeyPreventDefault);
}

export function removeDisableWheelEvent(target: HTMLElement) {
  target.addEventListener("wheel", ctrlKeyPreventDefault);
}

function spaceKeyPreventDefault(ev: KeyboardEvent) {
  if (ev.code === "Space") {
    ev.preventDefault();
  }
}

export function disableSpacePressEvent() {
  window.addEventListener("keydown", spaceKeyPreventDefault);
}

export function removeDisableSpacePressEvent() {
  window.removeEventListener("keydown", spaceKeyPreventDefault);
}
// function keyDown(callback){
//   window.addEventListener("keydown", callback, true);
//   return this;
// }

// function keyUp(callback) {
//   window.addEventListener("keyup", callback, true);
//   return this;
// }

// export const key = {
//   disableContext,
//   disableCtrlS,
//   disableWheelScaling,
//   disableAllShortCut,
//   keyDown,
//   keyUp,
// };
