import routes from "./routes";
import { useAuthStore } from "@/stores";
import { createRouter, createWebHashHistory } from "vue-router";

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach(async (to, from, next) => {
  const { _token } = useAuthStore();
  const toDepth = to.path.split("/").length;
  const fromDepth = from.path.split("/").length;

  to.meta.transitionName = toDepth < fromDepth ? "slide-right" : "slide-left";

  if (!_token && to.name !== "account.login") next({ name: "account.login" });
  else next();
});

export default router;
