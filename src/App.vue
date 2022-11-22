<template>
  <v-app>
    <nav-bar />
    <v-main>
      <v-container class="py-8 px-6" fluid>
        <p v-text="this.$route.matched.name"></p>
        <v-breadcrumbs :items="items" class="text-capitalize">
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
import NavBar from "@/components/NavBar";
import { routeValues } from "@/router/routes";

export default {
  data: () => ({
    //
  }),
  computed: {
    pageIcon() {
      return (
        routeValues(this.$router.currentRoute.value.name)?.icon ?? "mdi-origin"
      );
    },
    items() {
      const paths = this.$router.currentRoute.value.fullPath.split("/");

      paths.shift();

      return paths.map((namePath, index) => {
        return {
          title: namePath !== "" ? namePath : "home",
          disabled: index === paths.length - 1,
          href: `#${routeValues(namePath)?.path ?? "/home"}`,
        };
      });
    },
  },
  setup() {
  },
  components: {
    NavBar,
  },
};
</script>
