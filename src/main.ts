import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { setupRouter } from '@/router/index'
import { setupStore } from '@/store/index'
import 'normalize.css/normalize.css'

import 'element-plus/theme-chalk/el-loading.css'
import 'element-plus/theme-chalk/el-message.css'
import 'element-plus/theme-chalk/el-notification.css'
import 'element-plus/theme-chalk/el-message-box.css'

const app = createApp(App)

setupRouter(app)
setupStore(app)

app.mount('#app')
