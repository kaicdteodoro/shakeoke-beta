import routes from "./routes";
import { useAuthStore, useAlertStore } from "@/stores";
import { createRouter, createWebHashHistory } from "vue-router";

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach(async (to, from, next) => {
  const { _token } = useAuthStore();
  const { clear } = useAlertStore();
  const toDepth = to.path.split("/").length;
  const fromDepth = from.path.split("/").length;

  to.meta.transitionName = toDepth < fromDepth ? "slide-right" : "slide-left";
  clear();
  if (!_token && to.name !== "account.login") next({ name: "account.login" });
  else next();
});

export default router;
