import { createRouter, createWebHashHistory } from 'vue-router'
import { App } from 'vue'
import routes from './routes'
export const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export function setupRouter(app: App<Element>) {
  app.use(router)
}
