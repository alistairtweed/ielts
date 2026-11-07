import { createRouter, createWebHashHistory } from "vue-router"

import EditorPlayground from "~/pages/EditorPlayground.vue"
import TestBuilder from "~/pages/TestBuilder.vue"

export const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: "/", component: TestBuilder },
    { path: "/editor", component: EditorPlayground }
  ]
})
