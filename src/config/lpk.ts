/*! @file
********************************************************************************
<PRE>
文件实现功能   : 系统语言包的实现
作者           : dotdancer
版本           : 1.0
--------------------------------------------------------------------------------
备注           : -
--------------------------------------------------------------------------------
修改记录 :
日  期       版本    修改人     修改内容
2022/04/08   1.0     dotdancer  创建 
</PRE>
*******************************************************************************/
import { isEmpty, isArray } from 'lodash' 

// 缓存语言包内容
const tblLpk: Record<string, string> = {} 

//! 获取本地语言环境
export const getLocalLanguage = () => {
    // FOR_DEBUG_TODO: 将返回用户实际选择的语言环境
    return 'zh-CN';
}

//! 读取语言包内容
export const lpk: FnLpkType = (key, option = {}) => {
    const mixValue = tblLpk[key];
    
    // 如果指定语言条目为数组, 则按照数组方式获取具体的语言内容
    if (isArray(mixValue)){
        // 空数组直接返回: 名称
        if (!mixValue.length){
            return key;
        }

        if (!isEmpty(option)){
            return mixValue[option.index as number] || key;
        }

        return key;
    } 

    // 不存在则使用默认值
    if (isEmpty(mixValue)){
        return option.default || key;
    }

    // 返回读到的非数组语言内容
    return mixValue;
}

//! 合并指定的语言包内容
type FnMergeLpkType = (importLpkFiles: GlobalType.ARecord) => void
export const mergeLpk: FnMergeLpkType = (importLpkFiles) => {
    const stLocalLanguage = getLocalLanguage()
    for (const key in importLpkFiles){
        // 不是当前语言环境下面的语言包内容, 直接丢弃
        if (-1 == key.indexOf(stLocalLanguage)){
            continue;
        }

        // 缓存当前语言环境下需要的语言包内容
        const {default: iLpkFileItem} = importLpkFiles[key]
        for (const stLpkKey in iLpkFileItem){
            tblLpk[stLpkKey] = iLpkFileItem[stLpkKey]
        }
    }
}