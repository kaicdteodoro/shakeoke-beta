import { ucFirst } from "@/helpers";
import LoginVue from "@/components/Login";
import QueueList from "@/components/Queue/QueueList";

const routes = [
  {
    path: "/",
    name: "home",
    icon: "mdi-home",
    component: QueueList,
  },
];

const authRoutes = [
  {
    path: "/login",
    name: "account.login",
    icon: "mdi-account-circle",
    component: LoginVue,
  },
];

export const routeValues = (name) => {
  return routes.find((route) => {
    return route.name === name;
  });
};

export const sideBarLinks = () => {
  return routes.map((route) => {
    return {
      title: ucFirst(route.name),
      route: route.name,
      icon: route.icon,
    };
  });
};

export default routes.concat(authRoutes);
