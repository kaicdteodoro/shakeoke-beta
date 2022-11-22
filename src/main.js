
import App from "@/App";
import router from "@/router";
import { createPinia } from 'pinia'
import vuetify from "@/plugins/vuetify";
import { loadFonts } from "@/plugins/webfontloader";
import { createApp } from "vue/dist/vue.esm-bundler.js";

loadFonts();

const app = createApp(App);


app.use(router);
app.use(createPinia());
app.use(vuetify);


app.mount("#app");
