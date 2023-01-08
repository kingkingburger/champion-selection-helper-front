import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import ToastPlugin, { useToast } from "vue-toast-notification";
// Import one of the available themes
//import 'vue-toast-notification/dist/theme-default.css';
import "vue-toast-notification/dist/theme-sugar.css";
import BootstrapVue from "bootstrap-vue";
// createApp(App).use(store).use(router).mount("#app");

const app = createApp(App);

app.use(store);
app.use(router);
app.use(ToastPlugin);
// app.use(BootstrapVue);
app.mount("#app");

// Force dismiss specific toast
// instance.dismiss();

// Dismiss all opened toast immediately
// app.$toast.clear();
