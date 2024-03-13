import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { createMUI } from 'shuimo-ui';
import 'shuimo-ui/dist/es/assets/style/global.css';

createApp(App)
  .use(createMUI())
  .mount('#app')
