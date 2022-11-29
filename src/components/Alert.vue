<template>
  <div v-if="alert">
    <v-alert
      :type="alert.type"
      :density="alert.density"
      :variant="alert.variant"
      v-text="alert.message"
    >
    </v-alert>
  </div>
</template>

<script>
import { storeToRefs } from "pinia";
import { useAlertStore } from "@/stores";


export default {
  name: "AlertVue",
  data: () => ({
    alert
  }),
  mounted() {
    const { alert } = storeToRefs(useAlertStore());
    this.alert = alert;
  },
};
</script>
