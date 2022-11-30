<template>
  <v-row>
    <create-queue-dialog />
    <v-col v-for="queue in queues" :key="queue.id" cols="12">
      <v-card>
        <v-list lines="two">
          <v-toolbar color="rgba(0, 0, 0, 0)" :theme="theme">
            <v-list-subheader v-text="queue.name"></v-list-subheader>
            <template v-slot:append>
              <v-switch
                v-if="musics(queue.id)?.length"
                class="m-auto px-auto pr-5 pt-1"
                color="primary"
                :model-value="false"
                label="Show done"
              ></v-switch>

              <v-menu>
                <template v-slot:activator="{ props }">
                  <v-btn
                    icon="mdi-dots-vertical"
                    class="my-3"
                    v-bind="props"
                  ></v-btn>
                </template>

                <v-list nav>
                  <v-list-item>
                    <v-list-item-title>
                      <v-btn
                      variant="plain"
                        color="warning"
                        @click="deleteQueue(queue.id)"
                      >
                        Delete
                      </v-btn>
                    </v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
            </template>
          </v-toolbar>
          <template v-for="(music, index) in musics(queue.id)" :key="music.id">
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
              v-if="index !== musics(queue.id).length - 1"
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
import CreateQueueDialog from "./CreateQueueDialog";
import { useQueueStore, useQueueMusicStore } from "@/stores";
export default {
  name: "QueueList",
  data: () => ({
    theme: useTheme().global.name.value,
    queues: [],
    queueMusic: [],
  }),
  async mounted() {
    await useQueueStore().setQueues();
    const { queues } = storeToRefs(useQueueStore());
    const { queueMusic } = storeToRefs(useQueueMusicStore());
    this.queues = queues;
    this.queueMusic = queueMusic;
  },
  methods: {
    musics(queueId) {
      return this.queueMusic?.find((musics) => musics.queue_id === queueId)
        ?.musics;
    },
    async deleteQueue(queueId) {
      await useQueueStore().delete(queueId);
    }
  },
  components: {
    CreateQueueDialog,
  },
};
</script>
