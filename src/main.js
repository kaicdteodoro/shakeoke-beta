import App from "@/App";
import router from "@/router";
import { createPinia } from "pinia";
import vuetify from "@/plugins/vuetify";
import { loadFonts } from "@/plugins/webfontloader";
import { createApp, markRaw } from "vue/dist/vue.esm-bundler.js";

loadFonts();

const app = createApp(App);
const pinia = createPinia();

pinia.use(({ store }) => { store.router = markRaw(router) });

app.use(pinia);
app.use(router);
app.use(vuetify);

app.mount("#app");
