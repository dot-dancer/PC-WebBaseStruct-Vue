/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>
  export default component 
}

declare namespace GlobalType{
  type KeyType = string | number;
  type ARecord = Record<string, any>;
}

declare var app:  GlobalType.ARecord
declare var Tools: GlobalType.ARecord
declare var Ajax: GlobalType.ARecord

type FnLpkType = (key: string, option?: {index?: number, default?: GlobalType.KeyType}) => string
declare var lpk: FnLpkType

type ReturnTypeWithTimeout = ReturnType<typeof setTimeout>