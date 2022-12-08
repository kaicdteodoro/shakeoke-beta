<template>
  <v-dialog v-model="dialog" persistent>
    <template v-slot:activator="{ props }">
      <v-btn
        :icon="btnIcon"
        :size="sizeIcon"
        variant="plain"
        v-bind="props"
        @click="clearInputs()"
      >
      </v-btn>
    </template>
    <v-card class="w-25 mx-auto">
      <v-card-title class="text-h5" v-text="formTitle"></v-card-title>

      <v-card-text>
        <v-form
          ref="dialogForm"
          v-model="valid"
          lazy-validation
          @submit.stop.prevent="validate()"
        >
          <v-row>
            <v-col cols="12">
              <v-text-field
                v-model="referenceName"
                :rules="rules"
                label="Reference Name"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="urlMusic"
                :rules="urlRules"
                label="Url"
                required
              ></v-text-field>
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="error" variant="plain" @click="dialog = false">
          Cancel
        </v-btn>
        <v-btn
          color="success"
          :disabled="!valid"
          variant="plain"
          @click="validate"
        >
          Save
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { useQueueMusicStore } from "@/stores";

export default {
  name: "QueueMusicDialog",
  props: {
    sizeIcon: String,
    create: Boolean,
    queueId: Number,
    musicId: Number,
  },
  data: () => ({
    valid: true,
    dialog: false,
    urlMusic: "",
    referenceName: "",
    rules: [(v) => !!v || "Required"],
    urlRules: [
      (v) => !!v || "Required",
      /* eslint-disable no-useless-escape */
      (v) =>
        /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/.test(
          v
        ) || "Url must be valid",
    ],
  }),
  methods: {
    clearInputs() {
      this.referenceName = "";
      this.urlMusic = "";
    },
    async validate() {
      if (this.$refs.dialogForm.validate()) {
        let data = { reference_name: this.referenceName, url: this.urlMusic };
        if (this.create) {
          await useQueueMusicStore().create(this.queueId, data);
        } else if (this.queueId && this.musicId) {
          await useQueueMusicStore().update(this.queueId, this.musicId, data);
        }
        this.dialog = false;
      }
    },
  },
  computed: {
    formTitle() {
      return this.create ? "New Music" : "Update Music";
    },
    btnIcon() {
      return this.create ? "mdi-plus" : "mdi-pencil-outline";
    },
  },
};
</script>
