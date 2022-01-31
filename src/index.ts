import {createApp} from "vue";
import App from "./App.vue"

export const app = createApp(App)

const vm = app.mount("#app")
export {vm}

