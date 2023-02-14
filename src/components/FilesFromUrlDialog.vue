<template>
  <k-dialog
    ref="filesFromUrl"
    :submitbutton="$t('upload')"
    :disabled="loading"
    theme="positive"
    size="medium"
    icon="upload"
    class="k-filesfromurl-dialog"
    @submit="submit"
  >
    <k-url-field ref="url" v-model="url" name="url" :label="$t('url')" />
    <k-info-field v-if="error" theme="negative" :text="error" />
    <k-box v-if="loading" theme="info"> <k-loader /> {{ $t("upload") }} </k-box>
  </k-dialog>
</template>

<script>
export default {
  data() {
    return {
      error: false,
      loading: false,
    };
  },
  created() {},
  methods: {
    open() {
      this.error = false;
      this.loading = false;
      this.url = "";
      this.$refs.filesFromUrl.open();
    },
    close() {
      this.error = false;
      this.loading = false;
      this.$refs.filesFromUrl.close();
    },
    onError(msg) {
      this.loading = false;
      this.error = msg;
    },
    submit() {
      this.loading = true;
      this.error = "";
      this.$emit("submit", this.url);
    },
  },
};
</script>

<style>
.k-filesfromurl-dialog .k-box[data-theme="info"] {
  display: flex;
  margin-top: 0.75rem;
  align-items: center;
}

.k-filesfromurl-dialog .k-loader {
  display: inline-block;
  padding-right: 0.5rem;
}
</style>
