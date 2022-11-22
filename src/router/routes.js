import QueueList from "../components/Queue/QueueList.vue";

export default [
  {
    path: "/",
    name: "home",
    component: QueueList,
  },
  {
    path: "/teste",
    name: "teste",
    component: { template: "<div>OPA</div>" },
  },
];
