import "~/style/index.css"

import { createApp } from "vue"

import Application from "~/Application.vue"
import { router } from "~/router.js"

const app = createApp(Application)

app.use(router)
app.mount("#root")
