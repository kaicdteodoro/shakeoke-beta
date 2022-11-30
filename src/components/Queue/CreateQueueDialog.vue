<template>
  <v-row justify="end" class="mx-6 my-1">
    <v-dialog v-model="dialog" persistent>
      <template v-slot:activator="{ props }">
        <v-btn
          icon="mdi-plus"
          variant="plain"
          size="x-large"
          v-bind="props"
          @click="clearInputs()"
        ></v-btn>
      </template>
      <v-card class="mx-auto">
        <template v-slot:title> Create New Queue </template>
        <v-card-text>
          <v-card-text>
            <v-form
              ref="createForm"
              v-model="valid"
              lazy-validation
              @submit.stop.prevent="validate()"
            >
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    v-model="newQueueName"
                    :rules="newQueueNameRules"
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
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import { useQueueStore } from "@/stores";
export default {
  name: "CreateQueueDialog",
  data: () => ({
    valid: true,
    dialog: false,
    newQueueName: "",
    newQueueNameRules: [(v) => !!v || "Required"],
  }),
  methods: {
    clearInputs() {
      this.newQueueName = "";
    },
    async validate() {
      if (this.$refs.createForm.validate()) {
        await useQueueStore().create(this.newQueueName);
        this.dialog = false;
      }
    },
  },
};
</script>
