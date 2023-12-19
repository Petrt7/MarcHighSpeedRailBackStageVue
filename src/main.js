import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router/index.js'
import 'bootstrap'
import "bootstrap/dist/css/bootstrap.min.css";
// import DatetimePicker from '@vuepic/vue-datepicker';
import axios from 'axios'
import App from './App.vue'


const app = createApp(App)

const backendURL = import.meta.env.VITE_AXIOS_HTTP_BASEURL

const httpClient = axios.create({
    withCredentials: true,
    baseURL: backendURL,
});

app.use(createPinia())
app.use(router)
// app.use(DatetimePicker)
app.mount('#app')

export default httpClient;
