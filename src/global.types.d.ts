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

declare var app:  Record<string, any>
declare var Tools: Record<string, any>
declare var Ajax: Record<string, any>

type FnLpkType = (key: string, option?: {index?: number, default?: GlobalType.KeyType}) => string
declare var lpk: FnLpkType

type ReturnTypeWithTimeout = ReturnType<typeof setTimeout>