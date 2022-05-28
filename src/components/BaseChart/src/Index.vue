<script setup lang="ts">
/*! @file
********************************************************************************
<PRE>
文件实现功能   : 图表组件
作者           : dotdancer
版本           : 1.0
--------------------------------------------------------------------------------
备注           : -
--------------------------------------------------------------------------------
修改记录 :
日  期       版本    修改人     修改内容
2022/05/16   1.0     dotdancer  创建
</PRE>
*******************************************************************************/
import { toRefs, shallowReactive, onMounted, onUnmounted, onActivated, onDeactivated } from 'vue'
import { nanoid } from 'nanoid'
import * as echarts from 'echarts';

defineOptions({name: 'BaseChart'})

//==============================================================================
//== 类型定义
interface BaseChartStateType {
    resizeTimer: TimeoutType;
    chartId: string;
    chartEntity: any;
}

interface BaseChartPropType{
    data: {
        labels: string[];
        values: number[];
    };
}

//==============================================================================
//== 初始化
const props = withDefaults(defineProps<BaseChartPropType>(), {
    data: () => ({labels: [], values: []})
})

const { data } = toRefs(props)

// 此处不能使用reactive, Vue3使用了proxy，Echarts无法从中获取内部变量, 因此使用shallowReactive
const iState = shallowReactive<BaseChartStateType>({
    resizeTimer: null,
    chartId: `idBaseChart_${nanoid()}`,
    chartEntity: null,
})

// =============================================================================
// = 内部共用方法定义
//! 启用定时更新图表布局
const startListenResizeChart = () => {
    iState.resizeTimer = setInterval(() => {
        try{
            iState.chartEntity?.resize()
        }
        catch(e){
        }
    }, 5000)
}

//! 停止更新图表布局
const stopListenResizeChart = () => {
    clearInterval(iState.resizeTimer as TimeoutReturnType)
    iState.resizeTimer = null
}


//! 更新图表属性
const changeOptions = () =>
{
    if (!iState.chartEntity){
        return;
    }

    let iOption: GlobalType.ARecord = {}

    iOption = {
        tooltip : {
            // 配置hover时线条或背景样式
            axisPointer: {
                type: 'line',
                // type : 'shadow',
                // shadowStyle: {
                lineStyle: {
                    width: 1.3,
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{ 
                        offset: 0,
                        color: 'rgba(255,123,80, 0.9)'
                    }, {
                        offset: .9,
                        color: 'rgba(255,239,242, 0.9)'
                    },{
                        offset: 1,
                        color: 'rgba(255,244,246, 0.9)'
                    }])
                }
            },
            trigger: 'axis',
            formatter(giAllLineParams)
            {
                const data = giAllLineParams[0];
                return `${data.value}`
            }
        },
        xAxis: {
            type: 'category',
            data: ['05/01', '05/02', '05/03', '05/04', '05/05', '05/06', '05/07'],
            // boundaryGap: false, // 不用设置, 否则图表可能遮盖轴线
            axisLabel: {
                color:'#BBB',
            },
            axisTick:{ //y轴刻度线
                show:false
            },
            axisLine:{ //y轴
                show:false
            },
        },
        yAxis: {
            type: 'value',
            splitLine: {
                show: true,
                lineStyle:{
                    type:'dashed',
                    color: '#EEE',
                }
            },
            axisLabel: {
                color:'#BBB',
            },
            axisTick:{ //y轴刻度线
                show:false
            },
            axisLine:{ //y轴
                show:false
            },
        },
        grid: {
            top: '20px',
            left: '10px',
            right: '10px',
            bottom: '10px',
            containLabel: true,
        },
        series: [{
            data: [20, 332, 401, 934, 300, 400, 100],
            type: 'line',
            smooth: true,
            // symbol: 'circle',  //设定为实心点 
            symbolSize: 8,   //设定实心点的大小 
            color:"#FF6B7D", //设定实线点的颜色
            /*
            // 获取焦点时, 调整线条颜色
            emphasis: {
                lineStyle: {
                    color: '#FF0'
                }
            },
            */
            itemStyle: {
                lineStyle: {
                    width: 3,
                    color: '#FF6B7D',
                }
            },
            areaStyle:{
                //颜色渐变函数 前四个参数分别表示四个位置依次为左、下、右、上
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{ 
                    offset: 0,
                    // color: 'rgba(248,153,128, .3)'
                    color: 'rgba(255,239,242, 0.9)'
                }, {
                    offset: .8,
                    color: 'rgba(255,239,242, 0.9)'
                },{
                    offset: 1,
                    color: 'rgba(255,244,246, 0.1)'
                }])
            },
        }]
    }

    iState.chartEntity.setOption(iOption);
}

//==============================================================================
//== 事件处理
//! 挂载时回调
onMounted(() => {
    // 初始化图表
    if (!iState.chartEntity){
        iState.chartEntity = echarts.init(document.getElementById(iState.chartId) as HTMLElement);
        changeOptions()
    }
})

onActivated(() => {
    startListenResizeChart()
})

onDeactivated(() => {
    stopListenResizeChart()
})

</script>

<template>
    <div class="base-chart">
        <div :id="iState.chartId" class="chart"></div>
    </div>
</template>

<style lang="scss" scoped>
.base-chart{
    .chart{
        min-height: 180px;
    }
}

</style>