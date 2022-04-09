declare namespace GlobalType{
    type KeyType = string | number;
}

declare var app:  Record<string, any>
declare var Tools: Record<string, any>
declare var Ajax: Record<string, any>

type FnLpkType = (key: string, option?: {index?: number, default?: GlobalType.KeyType}) => string
declare var lpk: FnLpkType

type ReturnTypeWithTimeout = ReturnType<typeof setTimeout>