export class EventDisabler {
  private eventName: string = "";
  private callback: any = null;
  constructor() {}

  wheel() {
    this.eventName = "wheel";
    this.callback = (ev: WheelEvent) => {
      if (ev.ctrlKey) ev.preventDefault();
    };
    return this;
  }

  scroll() {
    this.eventName = "wheel";
    this.callback = (ev: WheelEvent) => {
      ev.preventDefault();
    };
    return this;
  }

  set(element: HTMLElement) {
    if (!element) {
      new TypeError("null can't be inside the element props!");
      return () => {};
    }
    element.addEventListener(this.eventName, this.callback);
    return () => {
      element.removeEventListener(this.eventName, this.callback);
    };
  }
}
