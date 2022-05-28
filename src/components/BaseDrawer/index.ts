
import { ref } from 'vue'

export * from './src/typing'
export { default } from './src/Index.vue'

// =============================================================================
// = 定义该模块对应的hooks
export const useBaseDrawer = () => {
    const refModel = ref<boolean>(false)
    const setVisible = (visible: boolean) => {
        refModel.value = visible
    }

    return [refModel, setVisible]
}