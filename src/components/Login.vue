<template>
  <v-dialog v-model="dialog" persistent max-width="600px" min-width="360px">
    <v-card class="mx-auto" prepend-icon="mdi-login">
      <template v-slot:title> Login </template>
      <v-card-text>
        <v-card-text>
          <v-form
            ref="loginForm"
            v-model="valid"
            lazy-validation
            @submit.stop.prevent="validate()"
          >
            <v-row>
              <v-col cols="12">
                <v-text-field
                  v-model="loginEmail"
                  :rules="loginEmailRules"
                  label="E-mail"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="loginPassword"
                  :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                  :rules="[rules.required, rules.min]"
                  :type="show1 ? 'text' : 'password'"
                  name="input-10-1"
                  label="Password"
                  hint="At least 8 characters"
                  counter
                  @click:append="show1 = !show1"
                ></v-text-field>
              </v-col>
              <v-col class="d-flex" cols="12" sm="9" xsm="12">
                <alert-vue class="d-flex float-left" position="absolute" />
              </v-col>
              <v-spacer></v-spacer>
              <v-col class="d-flex mb-none" cols="12" sm="3" xsm="12" align-end>
                <v-card-actions>
                  <v-btn
                    x-large
                    block
                    :disabled="!valid"
                    variant="plain"
                    color="success"
                    type="submit"
                    @click="validate"
                  >
                    Login
                  </v-btn>
                </v-card-actions>
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import AlertVue from "./Alert.vue";
import { useAuthStore, useAlertStore } from "@/stores";

export default {
  name: "LoginVue",
  data: () => ({
    dialog: true,
    valid: true,
    loginPassword: "",
    loginEmail: "",
    loginEmailRules: [
      (v) => !!v || "Required",
      (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
    ],
    show1: false,
    rules: {
      required: (value) => !!value || "Required.",
      min: (v) => (v && v.length >= 8) || "Min 8 characters",
    },
  }),
  computed: {},
  methods: {
    async validate() {
      if (this.$refs.loginForm.validate()) {
        await useAuthStore().login(this.loginEmail, this.loginPassword);
      }
    },
  },
  mounted() {
    useAlertStore().info("complete the fields to continue");
  },
  components: {
    AlertVue,
  },
};
</script>
