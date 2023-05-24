<!-- 首页 -->
<template>
  <div>首页</div>
  <p @click="btnClick">元素</p>
  <el-button type="primary" @click="getUser">Primary</el-button>
  <p>{{ loading }}</p>
  {{ listData }}
</template>

<script setup lang="ts">
import { useLogin } from '@/apis/index'
import { UsableObj } from '@/apis/types/index'
import { Storage } from '@/utils/tools'
import { cancelAllRequest } from '@/request/http'
// import { useRequest } from '@/hooks'

let listData = ref<UsableObj[]>([])

const { data, loading, refresh } = useLogin()

listData = computed(() => {
  return data.value?.code === 20000 ? data.value.data.rows || [] : []
})

// const stopWatch = watchEffect(() => {
//   if (data.value?.code === 20000) {
//     listData.value = data.value?.code === 20000 ? data.value.data.rows || [] : []
//   }
// })

function getUser() {
  refresh()
}
onMounted(() => {
  Storage.set('mmm', 123)
})
function btnClick() {
  let mmm = Storage.get('mmm')
  console.log(mmm)
  cancelAllRequest()
}
// onUnmounted(() => {
//   stopWatch()
// })
</script>
<style scope lang="less"></style>
