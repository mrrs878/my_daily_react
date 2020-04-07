declare function onNavBarLeftClick();
declare module '*.module.css' {
  const classes: { readonly [key: string]: string };
  export default classes;
}
declare module '*.svg' {
  const classes: string;
  export default classes;
}

type ObjectKeyValue<T> = {
  [propName: string]: T;
};
type ModuleResI = { code: number; msg: string };
