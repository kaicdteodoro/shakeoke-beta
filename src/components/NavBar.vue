<template>
  <v-navigation-drawer
    v-model="drawer"
    :rail="rail"
    @click="rail = false"
    permanent
  >
    <v-list-item
      prepend-avatar="https://randomuser.me/api/portraits/men/85.jpg"
      @click="menuExpand"
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
    <v-expand-transition>
      <v-card v-show="expand" height="100" class="mx-auto">
        <v-list density="compact" nav>
          <v-list-item
            @click="authStore.logout()"
            prepend-icon="mdi-logout"
            title="Logout"
            value="account"
          ></v-list-item>
        </v-list>
      </v-card>
    </v-expand-transition>

    <v-divider></v-divider>

    <v-list density="compact" nav>
      <template v-for="link in links" :key="link.title">
        <router-link custom :to="{ name: link.route }" v-slot="{ navigate }">
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
import { sideBarLinks } from "@/router/routes";
export default {
  name: "NavBar",

  data: () => ({
    rail: false,
    drawer: true,
    expand: false,
    links: sideBarLinks(),
  }),
  setup() {
    //
  },
  methods: {
    menuExpand() {
      if (!this.rail) {
        this.expand = !this.expand;
      }
    },
  },
  computed: {
    //
  },
};
</script>
