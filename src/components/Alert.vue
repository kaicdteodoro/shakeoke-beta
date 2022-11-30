<template>
  <div v-if="alert">
    <v-alert
      :type="alert.type"
      :border="alert.border"
      :variant="alert.variant"
      :density="alert.density"
      :closable="alert.closable"
      :color="alert.color ?? alert.type"
      @click="closeError()"
    >
      <p v-text="alert.message"></p>
    </v-alert>
  </div>
</template>

<script>
import { storeToRefs } from "pinia";
import { useAlertStore } from "@/stores";

export default {
  name: "AlertVue",
  data: () => ({
    alert,
  }),
  mounted() {
    const { alert } = storeToRefs(useAlertStore());
    this.alert = alert;
  },
  methods: {
    closeError() {
      useAlertStore().clear();
    },
  },
};
</script>
