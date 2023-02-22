import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import ToastPlugin, { useToast } from "vue-toast-notification";
import BootstrapVue from "bootstrap-vue";
// createApp(App).use(store).use(router).mount("#app");
import { library } from "@fortawesome/fontawesome-svg-core";
import { faRotateRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

const app = createApp(App);
app.use(store);
app.use(router);
app.use(ToastPlugin);
library.add(faRotateRight);
app.component("font-awesome-icon", FontAwesomeIcon);
app.mount("#app");

// Force dismiss specific toast
// instance.dismiss();

// Dismiss all opened toast immediately
// app.$toast.clear();
