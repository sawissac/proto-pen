export interface ScreenProperty {
  width: number;
  height: number;
}

interface ScreenListenerCallBack {
  (props: ScreenProperty): void;
}

export class Screen {
  private screen: HTMLElement = document.body;
  private closeEventMethod: Function | undefined | null = null;
  private property: ScreenProperty = {
    width: 0,
    height: 0,
  };

  constructor() {
    this.getScreenProperty();
  }

  private getScreenProperty() {
    const { clientHeight, clientWidth } = this.screen;
    this.property["width"] = clientWidth;
    this.property["height"] = clientHeight;
  }

  public getWidth(){
    return this.property.width;
  }

  public getHeight(){
    return this.property.height;
  }
  
  public listen(callback: ScreenListenerCallBack) {

    const ScreenResizeHandler = () => {
      this.getScreenProperty();
      callback(this.property);
    }

    window.addEventListener("resize", ScreenResizeHandler, true);

    this.closeEventMethod = () => {
      window.removeEventListener("resize", ScreenResizeHandler, true);
    }

  }

  public closeEvent(){
    const close = this.closeEventMethod as Function;
    close();
  }

}
