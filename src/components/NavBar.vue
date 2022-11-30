<template>
  <v-navigation-drawer
    v-model="drawer"
    :rail="rail"
    @click="rail = false"
    permanent
  >
    <v-list-item
      prepend-avatar="https://randomuser.me/api/portraits/lego/2.jpg"
      @click="menuExpand"
      :title="userName"
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
      <v-card v-show="expand" class="mx-auto">
        <v-list density="compact" nav>
          <v-list-item
            @click="logout"
            prepend-icon="mdi-logout"
            title="Logout"
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
import { storeToRefs } from "pinia";
import { ucFirst } from "@/helpers";
import { useAuthStore } from "@/stores";
import { sideBarLinks } from "@/router/routes";
export default {
  name: "NavBar",

  data: () => ({
    rail: false,
    drawer: true,
    expand: false,
    links: sideBarLinks(),
  }),
  methods: {
    menuExpand() {
      if (!this.rail) {
        this.expand = !this.expand;
      }
    },
    logout() {
      useAuthStore().logout();
    },
  },
  computed: {
    userName() {
      const { user } = storeToRefs(useAuthStore());
      return ucFirst(user.value);
    },
  },
};
</script>
