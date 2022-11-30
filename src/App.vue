<template>
  <v-app>
    <nav-bar v-model="navbar" />
    <v-main>
      <alert-vue
        class="d-flex float-right mt-2 mr-6"
        position="absolute"
        v-if="navbar"
      />
      <v-container class="py-8 px-6" fluid>
        <v-breadcrumbs :items="items" class="text-capitalize" v-show="navbar">
          <template v-slot:prepend>
            <v-icon size="small" :icon="pageIcon"></v-icon>
          </template>
        </v-breadcrumbs>
        <router-view v-slot="{ Component, route }">
          <transition :name="route.meta.transitionName">
            <component :is="Component"> </component>
          </transition>
        </router-view>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { storeToRefs } from "pinia";
import NavBar from "@/components/NavBar";
import { useShowNavBar } from "@/stores";
import AlertVue from "@/components/Alert.vue";
import { routeValues } from "@/router/routes";

export default {
  data: () => ({
    navbar: false,
  }),
  watch: {
    $route(to) {
      const { show } = storeToRefs(useShowNavBar());

      show.value = to.name !== "account.login";
      this.navbar = this.showNav;
    },
  },
  computed: {
    showNav() {
      const { getShow } = storeToRefs(useShowNavBar());
      return getShow.value;
    },
    currentRoute() {
      let value = this.$router.currentRoute.value;
      return { value: value, routeValue: routeValues(value.name) };
    },
    pageIcon() {
      return this.currentRoute.routeValue?.icon ?? "mdi-origin";
    },
    items() {
      const paths = this.currentRoute.value.fullPath.split("/");

      paths.shift();

      return paths.map((namePath, index) => {
        return {
          title: namePath !== "" ? namePath : "home",
          disabled: index === paths.length - 1,
          href: `#${routeValues(namePath)?.path ?? "/"}`,
        };
      });
    },
  },
  components: {
    NavBar,
    AlertVue,
  },
};
</script>
