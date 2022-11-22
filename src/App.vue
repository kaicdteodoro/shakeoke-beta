<template>
  <v-app>
    <nav-bar />
    <v-main>
      <v-container class="py-8 px-6" fluid>
        <p v-text="this.$route.matched.name"></p>
        <v-breadcrumbs :items="items" divider=">">
          <template v-slot:item="{ item }">
            <v-breadcrumbs-item
              :href="item.href"
              @click="showSelectedRow2(item)"
            >
              {{ item.text }}
            </v-breadcrumbs-item>
          </template>
        </v-breadcrumbs>
        <router-view v-slot="{ Component, route }">
          <transition :name="route.meta.transitionName">
            <component :is="Component" />
          </transition>
        </router-view>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import NavBar from "./components/NavBar";

export default {
  data: () => ({
    items: [
      { text: "Technology", disabled: false, id: 0 },
      { text: "Computer", disabled: false, id: 1 },
      { text: "Laptop", disabled: false, id: 2 },
      { text: "Apple", disabled: false, id: 3 },
    ],
    teste: [],
  }),
  setup() {},
  components: {
    NavBar,
  },
};
</script>
