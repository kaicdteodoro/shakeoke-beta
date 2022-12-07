<template>
  <v-dialog v-model="dialog" persistent>
    <template v-slot:activator="{ props }">
        <v-btn
          :icon="btnIcon"
          variant="plain"
          v-bind="props"
          @click="clearInputs()"
        ></v-btn>
    </template>
    <v-card class="mx-auto">
      <template v-slot:title> <p v-text="formTitle"></p></template>
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
                v-model="queueName"
                :rules="queueNameRules"
                label="Name"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <!-- TODO: DatePicker -->
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
import { useQueueStore } from "@/stores";
export default {
  name: "QueueDialog",
  props: {
    create: Boolean,
    queueId: Number,
  },
  data: () => ({
    valid: true,
    dialog: false,
    queueName: "",
    queueNameRules: [(v) => !!v || "Required"],
  }),
  methods: {
    clearInputs() {
      this.queueName = "";
    },
    async validate() {
      if (this.$refs.dialogForm.validate()) {
        let data = { name: this.queueName };
        if (this.create) {
          await useQueueStore().create(data);
        } else if (this.queueId) {
          await useQueueStore().update(this.queueId, data);
        }
        this.dialog = false;
      }
    },
  },
  computed: {
    formTitle() {
      return this.create ? "Create New Queue" : "Update Queue";
    },
    btnIcon() {
      return this.create ? "mdi-plus" : "mdi-pencil";
    },
  },
};
</script>
