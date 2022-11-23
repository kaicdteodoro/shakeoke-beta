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
    icon: "mdi-origin",
    component: { template: "<div>teste</div>" },
    children: [
      {
        path: "/teste/teste2",
        name: "teste2",
        icon: "mdi-origin",
        component: { template: "<div>teste2</div>" },
      },
    ],
  },
];

const authRoutes = [
  {
    path: "/account",
    component: { template: "<div>Layout</div>" },
    children: [
      {
        path: "",
        redirect: "login",
      },
      {
        path: "login",
        name: "account.login",
        icon: "mdi-account-circle",
        component: { template: "<div>Login</div>" },
      },
      {
        path: "register",
        name: "account.register",
        icon: "mdi-account-circle",
        component: { template: "<div>Register</div>" },
      },
    ],
  },
];

const apiRoutes = [];

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

let ucFirst = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export default routes.concat(apiRoutes).concat(authRoutes);
