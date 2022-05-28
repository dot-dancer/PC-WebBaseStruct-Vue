<script setup lang="ts">
/*! @file
********************************************************************************
<PRE>
文件实现功能   : 表格组件
作者           : dotdancer
版本           : 1.0
--------------------------------------------------------------------------------
备注           : -
--------------------------------------------------------------------------------
修改记录 :
日  期       版本    修改人     修改内容
2022/05/22   1.0     dotdancer  创建
</PRE>
*******************************************************************************/
import { ref, toRefs, reactive } from 'vue'
import { ICON_TYPE } from '@/utils/Constants'

defineOptions({name: 'BaseGrid'})

//==============================================================================
//== 类型定义
interface BaseGridPropType{
  enableSelect: boolean; // 是否支持多选
  enableBatchRemove: boolean; // 是否支持指删除
  showSearch: boolean; // 是否显示搜索条
  showPaging: boolean; // 是否显示分页条
  showHeader: boolean; // 是否显示表头
  dataSource?: { // 数据源
    total?: number; // 总条数
    data?: GlobalType.ARecord[]; // 数据记录
  },
  pageSize?: number; // 每页显示条数
  columns: GlobalType.ARecord[]; // 列头
  tbar?: GlobalType.MenuOrButtonConfigType[]; // 顶部操作项
  operMenus: GlobalType.MenuOrButtonConfigType[]; // 每条记录操作菜单项
  operColumnWidth?: number; // 操作列的宽度
  advColumns?: GlobalType.ARecord[]; // 高级选项字段
  load?: any; // 加载表格数据的方法
}

interface BaseGridStateType{
  giSelectRows: GlobalType.ARecord[];
}

//==============================================================================
//== 初始化
const props = withDefaults(defineProps<BaseGridPropType>(), {
  enableSelect: true,
  enableBatchRemove: true,
  showSearch: true,
  showPaging: true,
  showHeader: true,
  dataSource: () => ({total: 0, data: []}),
  pageSize: 30,
  tbar: () => [],
  operMenus: () => [],
  operColumnWidth: 180,
  advColumns: () => [],
})

const { enableSelect, enableBatchRemove, showSearch, showPaging, 
        showHeader, dataSource, columns, pageSize, 
        tbar, operMenus, operColumnWidth, advColumns, load 
      } = toRefs(props)

const refTable = ref(null) // 表格实体的引用
const iState = reactive<BaseGridStateType>({
  giSelectRows: [],
})


// 解析顶部左右操作按钮
const giLeftTbarItems: GlobalType.MenuOrButtonConfigType[] = []
const giRightTbarItems: GlobalType.MenuOrButtonConfigType[] = []
tbar.value.map((item) => {
  if ('right' == item.align){
    giRightTbarItems.push(item)
    return
  }

  giLeftTbarItems.push(item)
})

// 自动增补指删除按钮
const onBatchRemoveHandler = () => {
  // FOR_DEBUG TODO: 加上类型处理
  (refTable as any).value.clearSelection()
}

if (enableBatchRemove){
  giLeftTbarItems.push({
    text: '删除',
    icon: 'icon-trash',
    type: 'danger',
    showMustSelect: true,
    handler: onBatchRemoveHandler
  })
}

// 解析每行操作菜单项
// 根据类型生成默认值
operMenus.value.map(item => {
  switch(item.iconType){
    case ICON_TYPE.EDIT: {
      item.text = item.text || '编辑'
      item.icon = item.icon || 'icon-edit'
    }
    break;

    case ICON_TYPE.REMOVE: {
      item.type = item.type || 'danger'
      item.text = item.text || '删除'
      item.icon = item.icon || 'icon-trash'
    }
    break;
  }
})
const giDisplayOperMenus: GlobalType.MenuOrButtonConfigType[] = operMenus.value.slice(0, 2)
const giOperMenus: GlobalType.MenuOrButtonConfigType[] = operMenus.value.slice(2)

// =============================================================================
// = 内部共用方法定义
// 根据当前状态加载数据
const doLoad = () => {

}

//==============================================================================
//== 事件处理
//! 处理行选中事件
const onSelectionChangeHandler = (selection: GlobalType.ARecord[]) => {
  iState.giSelectRows = selection
}

</script>

<template>
    <div class="base-grid">
        <div class="g-flex-rsbc tbar">
          <div class="g-flex-rsc left">
            <!--左侧按钮-->
            <template v-for="item in giLeftTbarItems">
              <icon-button 
                v-if="!item.showMustSelect || iState.giSelectRows.length"
                v-bind="item" 
              ></icon-button>
            </template>
          </div>

          <div class="g-flex-rsc right">
            <!--右侧按钮-->
            <template v-for="item in giRightTbarItems">
              <icon-button v-bind="item"></icon-button>
            </template>
            <simple-search class="search" v-if="showSearch"></simple-search>
          </div>
        </div>
        
        <div class="grid">
          <el-table 
            ref="refTable"
            :data="dataSource.data" 
            :border="false" 
            size="large"
            @selection-change="onSelectionChangeHandler"
          >
            <!-- 渲染 checkbox 列-->
            <el-table-column v-if="enableSelect" type="selection"></el-table-column>

            <!-- 遍历渲染列-->
            <template v-for="col in columns">
              <!-- 渲染 expand 列-->
              <el-table-column v-if="'expand' == col.type" v-bind="col">
                <template #default="props">
                  <div class="expand-container">
                      <!-- 通过组件方式自定义展开内容 -->
                      <component v-if="col.component" :is="col.component"/>

                      <!-- 通过属性字段定义展开内容 -->
                      <div v-else class="expand-content">{{props.row[col.prop]}}</div>
                  </div>
                </template>
              </el-table-column>

              <!-- 渲染 普通 列-->
              <el-table-column v-else v-bind="col"></el-table-column>
            </template>

            <!-- 渲染 操作 列-->
            <el-table-column 
              v-if="giDisplayOperMenus.length || giOperMenus.length"
              :width="operColumnWidth" 
              label="操作"
            >
              <template #default="scope">
                <div class="g-flex-rsc">
                  <template v-for="operMenuItem in giDisplayOperMenus">
                    <icon-button 
                      :icon="operMenuItem.icon" 
                      :type="`${operMenuItem.type || 'primary'}`" 
                      plain
                      @click="() => { operMenuItem.handler && operMenuItem.handler(scope.row) }"
                    >{{operMenuItem.text}}</icon-button>
                  </template>
                  
                  <el-dropdown
                    v-if="giOperMenus.length" 
                  >
                    <icon-font icon="icon-menu-more icon-menu"></icon-font>
                    <template #dropdown>
                      <el-dropdown-menu>
                        <template v-for="menuItem in giOperMenus">
                          <el-dropdown-item>
                            <icon-button v-bind="menuItem" plain>{{ menuItem.text }}</icon-button>
                          </el-dropdown-item>
                        </template>
                      </el-dropdown-menu>
                    </template>
                  </el-dropdown>
                </div>
              </template>
            </el-table-column>
          </el-table>
        </div>

        <div class="page" v-if="showPaging">
          <el-pagination 
            class="g-flex-rec" 
            background 
            @update:page-size="() => {}"
            layout="->, total, sizes, prev, pager, next, jumper" 
            :total="dataSource.total" 
            :page-size="pageSize"
            :page-sizes="[10, pageSize, 60, 100]"
          />
        </div>
    </div>
</template>

<style lang="scss" scoped>
.base-grid{

  .tbar{
    .right{
      .search{
        margin-left: 12px;
      }
    }
  }
  .grid{
    margin: 10px 0;

    .expand-container{
      margin: 0 10px;
      line-height: 25px;
    }

    .icon-menu-more{
      color: var(--text-light-color);
    }
  }
}

</style>