<template>
  <v-row>
    <v-col v-for="card in cards" :key="card" cols="12">
      <v-card>
        <v-list lines="two">
          <v-toolbar color="rgba(0, 0, 0, 0)" :theme="theme">
            <v-list-subheader>{{ card }}</v-list-subheader>
            <template v-slot:append>
              <v-btn icon="mdi-dots-vertical"></v-btn>
            </template>
          </v-toolbar>
          <template v-for="n in 6" :key="n">
            <v-list-item>
              <template v-slot:prepend>
                <v-avatar color="grey-darken-1"></v-avatar>
              </template>

              <v-list-item-title>Message {{ n }}</v-list-item-title>

              <v-list-item-subtitle>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nihil
                repellendus distinctio similique
              </v-list-item-subtitle>
            </v-list-item>

            <v-divider v-if="n !== 6" :key="`divider-${n}`" inset></v-divider>
          </template>
        </v-list>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { useTheme } from 'vuetify';

export default {
  name: "QueueList",
  data: () => ({
    theme: useTheme().global.name.value,
    cards: ["Today", "Yesterday"],
  }),
  components: {
    //
  },
};
</script>
