export function current(rn: any): HTMLElement {
  return rn.current;
}

export function listener(type: string, el: HTMLElement, fn: any): void {
  el.addEventListener(type, fn);
}

export function removeListener(type: string, el: HTMLElement, fn: any): void {
  el.removeEventListener(type, fn);
}

export function eventListener(type: string, el: HTMLElement, fn: any) {
  if(el){
    el.addEventListener(type, fn);
    return ()=>{
      el.removeEventListener(type, fn);
    }
  }
  return ()=>{};
}