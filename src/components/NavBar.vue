<template>
  <v-navigation-drawer
    v-model="drawer"
    :rail="rail"
    @click="rail = false"
    permanent
  >
    <v-list-item
      prepend-avatar="https://randomuser.me/api/portraits/men/85.jpg"
      title="John Leider"
      nav
    >
      <template v-slot:append>
        <v-btn
          variant="text"
          icon="mdi-chevron-left"
          @click.stop="rail = !rail"
        ></v-btn>
      </template>
    </v-list-item>

    <v-divider></v-divider>

    <v-list density="compact" nav>
      <v-list-group value="Users">
        <template v-slot:activator="{ props }">
          <v-list-item
            v-bind="props"
            prepend-icon="mdi-account-circle"
            title="Users"
          ></v-list-item>
        </template>
        <v-list-item
          prepend-icon="mdi-account"
          title="My Account"
          value="account"
        ></v-list-item>
        <v-list-item
          prepend-icon="mdi-home-city"
          title="Home"
          value="home"
        ></v-list-item>
      </v-list-group>

      <template v-for="link in links" :key="link.title">
        <router-link custom :to="link.route" v-slot="{ navigate }">
          <v-list-item
            :prepend-icon="link.icon"
            :title="link.title"
            @click="navigate"
          >
          </v-list-item>
        </router-link>
      </template>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: "NavBar",

  data: () => ({
    drawer: true,
    rail: false,
    links: [
      {
        icon: "mdi-home-city",
        title: "Home",
        route: "/",
      },
      {
        icon: "mdi-home-city",
        title: "Home",
        route: "/teste",
      },
    ],
  }),
};
</script>
