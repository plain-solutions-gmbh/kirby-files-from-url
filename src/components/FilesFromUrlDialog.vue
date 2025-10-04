<template>
  <!-- eslint-disable-next-line attribute-hyphenation -->
  <k-dialog
    v-bind="$props"
    :submit-button="$t('upload')"
    :disabled="loading"
    theme="positive"
    size="medium"
    icon="upload"
    class="k-filesfromurl-dialog"
    @submit="submit"
    @cancel="close()"
  >
    <k-url-field v-model="url" theme="field" name="url" :label="$t('url')" />
    <k-box v-if="error" theme="negative" icon="alert" :text="error" />
    <k-box v-if="loading" theme="info" icon="loader" :text="$t('upload')" />
  </k-dialog>
</template>

<script>
export default {
  extends: "k-dialog",
  props: {
    endpoint: String
  },
  data() {
    return {
      url: "",
      error: false,
      loading: false,
    };
  },
  methods: {
    submit() {
      //const url = "uploadfromurl";

      const url = this.endpoint + "/uploadfromurl"


      this.loading = true;
      this.error = false;

      this.$api
        .get(url, { url: this.url })
        .then((file) => {
          this.loading = false;
          this.$emit("uploaded", file);
          this.close();
        })
        .catch((error) => {
          this.loading = false;
          this.error = error.message;
        });
    },
  },
};
</script>

<style>
.k-filesfromurl-dialog .k-url-field {
  margin-bottom: 0.75rem;
}
</style>
