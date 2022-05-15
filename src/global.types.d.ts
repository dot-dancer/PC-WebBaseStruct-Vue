/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>
  export default component 
}

declare module 'animejs';

declare namespace GlobalType{
  type KeyType = string | number;
  type ARecord = Record<string, any>;
}

declare const app:  GlobalType.ARecord
declare const Tools: GlobalType.ARecord
declare const Ajax: GlobalType.ARecord

type FnLpkType = (key: string, option?: {index?: number, default?: GlobalType.KeyType}) => string
declare const lpk: FnLpkType

type TimeoutReturnType = ReturnType<typeof setTimeout>

declare const defineOptions: (options: GlobalType.ARecord) => void