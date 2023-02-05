
export const fetchCss = (elementObjData: any, classNameObj: any) => {
  const parseCssList = Object.keys(classNameObj);
  const result = parseCssList.reduce((p: any, c: any) => {
    let cssData = elementObjData[c].css;
    p = { ...p, ...cssData };
    return p;
  }, {});
  return result;
};
