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

  interface MenuOrButtonConfigType{
    type?: "" | "default" | "text" | "primary" | "success" | "warning" | "info" | "danger";
    align?: 'left' | 'right';
    text?: string;
    icon?: string;
    iconType?: 'add' | 'edit' | 'remove';
    showMustSelect?: boolean;
    show?: any;
    render?: any;
    handler?: any;
  }
}

declare const app:  GlobalType.ARecord
declare const Tools: GlobalType.ARecord
declare const Ajax: GlobalType.ARecord

type FnLpkType = (key: string, option?: {index?: number, default?: GlobalType.KeyType}) => string
declare const lpk: FnLpkType

type TimeoutReturnType = ReturnType<typeof setTimeout>
type TimeoutType = TimeoutReturnType | null

declare const defineOptions: (options: GlobalType.ARecord) => void