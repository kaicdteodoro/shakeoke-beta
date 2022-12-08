<template>
  <v-row>
    <v-row justify="end" class="mx-6 my-1">
      <queue-dialog create />
    </v-row>
    <v-col v-for="(queue, index) in queues" :key="queue.id" cols="12">
      <v-card>
        <v-list lines="two">
          <v-toolbar color="rgba(0, 0, 0, 0)" :theme="theme">
            <v-list-subheader>
              <v-tooltip :text="dateText(queue.created_at)">
                <template v-slot:activator="{ props }">
                  <p
                    v-text="queue.name"
                    class="mt-5"
                    v-bind="props"
                    theme="plain"
                  ></p>
                </template>
              </v-tooltip>
              <v-chip
                v-if="queue.closing_date"
                color="error"
                text-color="white"
                variant="plain"
                class="mb-5 d-flex float-left"
                @click="openCloseQueue(queue.id, true)"
              >
                closed
              </v-chip>
              <v-chip
                v-else
                color="success"
                text-color="white"
                variant="plain"
                class="mb-5 d-flex float-left"
                @click="openCloseQueue(queue.id, false)"
              >
                open
              </v-chip>
            </v-list-subheader>
            <template v-slot:append>
              <v-chip
                v-if="!queue.closing_date"
                :color="this.done[index] ? 'warning' : 'default'"
                variant="plain"
                class="mt-5 d-flex float-left"
                @click="showDone(queue.id, index)"
              >
                show done
              </v-chip>

              <v-menu>
                <template v-slot:activator="{ props }">
                  <v-btn
                    icon="mdi-dots-vertical"
                    class="my-3"
                    v-bind="props"
                  ></v-btn>
                </template>

                <v-list>
                  <template v-if="!queue.closing_date">
                    <v-list-item>
                      <v-list-item-title>
                        <queue-music-dialog :queueId="queue.id" />
                      </v-list-item-title>
                    </v-list-item>

                    <v-list-item>
                      <v-list-item-title>
                        <v-qr-code-dialog :queueId="queue.id" />
                      </v-list-item-title>
                    </v-list-item>
                  </template>

                  <v-list-item>
                    <v-list-item-title>
                      <queue-dialog :queueId="queue.id" />
                    </v-list-item-title>
                  </v-list-item>

                  <v-list-item>
                    <v-list-item-title>
                      <v-btn
                        icon="mdi-delete"
                        variant="plain"
                        @click="deleteQueue(queue.id)"
                      >
                      </v-btn>
                    </v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
            </template>
          </v-toolbar>
          <template
            v-for="(music, indexMusic) in musics(queue.id)"
            :key="music.id"
          >
            <v-list-item :disabled="queue.closing_date">
              <template v-slot:prepend>
                <v-avatar color="grey-darken-1">{{ music.order }}°</v-avatar>
              </template>
              <div v-if="!queue.closing_date" class="d-flex float-right">
                <div v-if="!music.done">
                  <template
                    v-for="(upDown, index) in [true, false]"
                    :key="index"
                  >
                    <v-btn
                      variant="text"
                      :icon="upDown ? 'mdi-arrow-up' : 'mdi-arrow-down'"
                      size="x-small"
                      @click.stop="
                        musicUpDown(index, queue.id, music.id, upDown)
                      "
                    ></v-btn>
                  </template>
                </div>

                <v-btn
                  variant="text"
                  :icon="music.done ? 'mdi-lock-open' : 'mdi-check'"
                  size="x-small"
                  @click="
                    markMusicAsDone(index, queue.id, music.id, !music.done)
                  "
                ></v-btn>
                <v-btn
                  variant="text"
                  icon="mdi-delete-outline"
                  size="x-small"
                  @click="
                    removeMusic(index, queue.id, music.id)
                  "
                ></v-btn>
              </div>
              <v-list-item-title>
                <v-row class="my-1 mx-1">
                  <p v-text="music.reference_name"></p>
                  <v-chip
                    v-if="music.done"
                    class="ml-2"
                    size="x-small"
                    color="warning"
                  >
                    done
                  </v-chip>
                </v-row>
              </v-list-item-title>
              <v-list-item-subtitle v-text="music.url"> </v-list-item-subtitle>
            </v-list-item>
            <v-divider
              v-if="indexMusic !== musics(queue.id).length - 1"
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
import QueueDialog from "./QueueDialog";
import VQrCodeDialog from "./QRCodeDialog";
import QueueMusicDialog from "./QueueMusicDialog";
import { useQueueStore, useQueueMusicStore } from "@/stores";
export default {
  name: "QueueList",
  data: () => ({
    theme: useTheme().global.name.value,
    queues: [],
    done: [],
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
    dateText(value) {
      return `Created at ${new Date(value).toLocaleString()}`;
    },
    musics(queueId) {
      return this.queueMusic?.find((musics) => musics.queue_id === queueId)
        ?.musics;
    },
    async musicUpDown(queueIndex, queueId, musicId, up) {
      await useQueueMusicStore().turnPosition(queueId, musicId, up ? 1 : 0);
      await useQueueMusicStore().setMusics(queueId, false, {
        show_done: this.done[queueIndex] ? 1 : 0,
      });
    },
    async deleteQueue(queueId) {
      await useQueueStore().delete(queueId);
    },
    async openCloseQueue(queueId, closed) {
      if (closed) {
        await useQueueStore().open(queueId);
      } else {
        await useQueueStore().close(queueId);
      }
    },
    //TODO:Concertar a visualização entre done
    async markMusicAsDone(index, queueId, musicId, isDone) {
      this.done[index] = isDone;
      await useQueueMusicStore().doneMusic(queueId, musicId, isDone ? 1 : 0);
    },
    async removeMusic(index, queueId, musicId) {
      await useQueueMusicStore().deleteMusic(queueId, musicId);
      await useQueueMusicStore().setMusics(queueId, false, {
        show_done: this.done[index] ? 1 : 0,
      });
    },
    async showDone(queueId, index) {
      this.done[index] = !this.done[index];
      await useQueueMusicStore().setMusics(queueId, false, {
        show_done: this.done[index] ? 1 : 0,
      });
    },
  },
  components: {
    QueueDialog,
    VQrCodeDialog,
    QueueMusicDialog,
  },
};
</script>
