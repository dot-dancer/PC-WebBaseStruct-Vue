// https://vuejs.org/api/utility-types.html#componentcustomproperties
// 为了让<template>中的lpk在typescript环境不会报错, 还需要增加下面声明
// 注意: 该声明必须放置到module中, 否则就会覆盖全局类型, 而不是增强全局类型
declare module '@vue/runtime-core' {
    interface ComponentCustomProperties {
      lpk: FnLpkType 
    }
}

export {}