import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { ElMessage,ElMessageBox} from 'element-plus'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import mitt from 'mitt';

const app = createApp(App)
app.use(router)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
app.mount('#app')
app.config.globalProperties.mittBus = new mitt()
