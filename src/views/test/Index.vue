<template>
    <div class="theme">
        <div>{{userName}}</div>
        <div>
            <ul class="g-flex-rsc change-theme-ul">
                <li class="blue-theme" @click="() => {onChangeTheme('blue')}">蓝色主题</li>
                <li class="black-theme" @click="() => {onChangeTheme('black')}">黑色主题</li>
            </ul>
        </div>

        <el-button type="primary">Primary</el-button>
        <el-button type="info">Info</el-button>
        <el-date-picker
            type="date"
            placeholder="Pick a day"
        />
        <el-checkbox checked label="Option 1" size="large" />
        <el-radio label="1" size="large">Option 1</el-radio>
        <el-input-number :min="1" :max="10" />
        <el-slider />
        <el-select class="m-2" placeholder="Select" size="large">
            <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
                />
        </el-select>
        <el-switch />
        <el-time-select
            start="08:30"
            step="00:15"
            end="18:30"
            placeholder="Select time"
        />

        <el-table :data="tableData" stripe style="width: 100%">
            <el-table-column prop="date" label="Date" width="180" />
            <el-table-column prop="name" label="Name" width="180" />
            <el-table-column prop="address" label="Address" />
        </el-table>
    </div>
</template>

<script setup lang="ts">
import { get } from 'lodash'
import { computed } from 'vue'
import { useBaseStore } from '@/store'
const iStore = useBaseStore()
const onChangeTheme = (stTheme: string) => {
    app.getAppCtl().changeTheme(stTheme)
}

const userName = computed(() => get(iStore, 'iLoginUser.userName'))

const options = [
  {
    value: 'Option1',
    label: 'Option1',
  },
  {
    value: 'Option2',
    label: 'Option2',
  },
  {
    value: 'Option3',
    label: 'Option3',
  },
  {
    value: 'Option4',
    label: 'Option4',
  },
  {
    value: 'Option5',
    label: 'Option5',
  },
]

const tableData = [
  {
    date: '2016-05-03',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
]
</script>

<style lang="scss" scoped>
.theme{
    padding: 40px;
    .change-theme-ul{
        li{
            margin: 10px;
            cursor: pointer;
        }

        .blue-theme, .black-theme{
            color: var(--color);
        }
    }
}
</style>