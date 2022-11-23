import routes from "./routes";
import { storeToRefs } from "pinia";
import { useShowNavBar } from "@/stores";
import { createRouter, createWebHashHistory } from "vue-router";

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.afterEach((to, from) => {
  const { show } = storeToRefs(useShowNavBar());
  show.value = true;
  const toDepth = to.path.split("/").length;
  const fromDepth = from.path.split("/").length;
  to.meta.transitionName = toDepth < fromDepth ? "slide-right" : "slide-left";

  /* if (to.name !== "Login") next({ name: "Login" });
  else next(); */
});

export default router;
