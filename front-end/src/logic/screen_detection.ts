export interface ScreenProperty {
  width: number;
  height: number;
}

interface ScreenListenerCallBack {
  (props: ScreenProperty): void;
}

export class ScreenDetection {
  private screen: Window = window;
  private closeEventMethod: Function | undefined | null = null;
  private property: ScreenProperty = {
    width: 0,
    height: 0,
  };
  constructor() {
    this.getScreenProperty();
  }
  private getScreenProperty() {
    const { innerHeight, innerWidth } = this.screen;
    this.property["width"] = innerWidth;
    this.property["height"] = innerHeight;
  }
  public getWidth() {
    return this.property.width;
  }
  public getHeight() {
    return this.property.height;
  }
  public listener(callback: ScreenListenerCallBack) {
    const ScreenResizeHandler = () => {
      this.getScreenProperty();
      callback(this.property);
    };

    window.addEventListener("resize", ScreenResizeHandler, true);

    this.closeEventMethod = () => {
      window.removeEventListener("resize", ScreenResizeHandler, true);
    };
  }
  public getBoth(){
    return this.property;
  }
  public closeEvent() {
    const close = this.closeEventMethod as Function;
    close();
  }
}
