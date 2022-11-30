<template>
  <v-row>
    <v-col v-for="queue in queues" :key="queue.id" cols="12">
      <v-card>
        <v-list lines="two">
          <v-toolbar color="rgba(0, 0, 0, 0)" :theme="theme">
            <v-list-subheader v-text="queue.name"></v-list-subheader>
            <template v-slot:append>
              <v-switch
                class="m-auto px-auto pr-5 pt-1"
                color="primary"
                :model-value="false"
                label="Show done"
              ></v-switch>
              <v-btn icon="mdi-dots-vertical" class="my-2"></v-btn>
            </template>
          </v-toolbar>
          <template v-for="(music, index) in queue.musics" :key="music.id">
            <v-list-item>
              <template v-slot:prepend>
                <v-avatar color="grey-darken-1">{{ music.order }}°</v-avatar>
              </template>
              <div class="d-flex float-right">
                <v-btn
                  variant="text"
                  icon="mdi-arrow-up"
                  size="x-small"
                ></v-btn>

                <v-btn
                  variant="text"
                  icon="mdi-arrow-down"
                  size="x-small"
                ></v-btn>

                <v-btn variant="text" icon="mdi-check" size="x-small"></v-btn>
              </div>
              <v-list-item-title
                v-text="music.reference_name"
              ></v-list-item-title>
              <v-list-item-subtitle v-text="music.url"> </v-list-item-subtitle>
            </v-list-item>
            <v-divider
              v-if="index !== queue.musics.length - 1"
              inset
            ></v-divider>
          </template>
        </v-list>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { useTheme } from "vuetify";
import { storeToRefs } from "pinia";
import { useQueueStore } from "@/stores";
export default {
  name: "QueueList",
  data: () => ({
    theme: useTheme().global.name.value,
    queues: [],
  }),
  async mounted() {
    await useQueueStore().setQueues();
    const { queues } = storeToRefs(useQueueStore());
    this.queues = queues.value;
  },
};
</script>
