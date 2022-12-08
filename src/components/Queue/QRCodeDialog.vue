<template>
  <v-dialog>
    <template v-slot:activator="{ props }">
      <v-btn icon="mdi-qrcode" variant="plain" v-bind="props"> </v-btn>
    </template>
    <v-card class="mx-auto">
      <v-card-title class="text-h5 my-2"> New Music </v-card-title>

      <v-card-text id="card_qr_code">
        <v-qr-code :value="qrCodeUrl" :size="300" level="H" />
      </v-card-text>
      <v-card-actions class="mx-2 my-2">
        <v-spacer></v-spacer>

        <v-btn
          size="large"
          color="surface-variant"
          variant="text"
          icon="mdi-printer-outline"
          v-print="'#card_qr_code'"
        ></v-btn>

        <v-tooltip location="end">
          <template v-slot:activator="{ props }">
            <v-btn
              size="large"
              color="surface-variant"
              variant="text"
              icon="mdi-content-copy"
              v-bind="props"
              @click="copyUrl"
            ></v-btn>
          </template>
          <span v-text="tooltipText"></span>
        </v-tooltip>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import print from "vue3-print-nb";
import VQrCode from "qrcode.vue";

const tooltipTextDefault = "Copy to clipboard";
export default {
  name: "VQrCodeDialog",
  props: {
    queueId: Number,
  },
  data: () => ({
    tooltipText: tooltipTextDefault,
  }),
  methods: {
    async copyUrl() {
      await navigator.clipboard.writeText(this.qrCodeUrl);
      this.tooltipText = "Copied!";
      setInterval(() => {
        this.tooltipText = tooltipTextDefault;
      }, 3000);
    },
    async printUrl() {
      // Pass the element id here
      await this.$htmlToPaper("card_qr_code");
    },
  },
  computed: {
    qrCodeUrl() {
      return window.location.origin + `/queue/${this.queueId}`;
    },
  },
  components: {
    VQrCode,
  },
  directives: {
    print,
  },
};
</script>
