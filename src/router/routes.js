import { ucFirst } from "@/helpers";
import LoginVue from "@/components/Login";
import QueueList from "@/components/Queue/QueueList";

// deixar as rotas com tela específica no routes, e as rotas de consumo de api ou de retorno de informações no apiROutes
const routes = [
  {
    path: "/",
    name: "home",
    icon: "mdi-home",
    component: QueueList,
  },
  {
    path: "/teste",
    name: "teste",
    icon: "mdi-orign",
    component: {template: "<div>TESTE</div>"},
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
