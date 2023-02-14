<template>
  <k-field v-bind="$props" class="k-files-field">
    <template v-if="more && !disabled" #options>
      <k-button-group class="k-field-options">
        <k-options-dropdown ref="options" v-bind="options" @action="onAction" />
      </k-button-group>
    </template>

    <k-dropzone :disabled="!moreUpload" @drop="drop">
      <k-collection
        v-bind="collection"
        @empty="prompt"
        @sort="onInput"
        @sortChange="$emit('change', $event)"
      >
        <template #options="{ index }">
          <k-button
            v-if="!disabled"
            :tooltip="$t('remove')"
            icon="remove"
            @click="remove(index)"
          />
        </template>
      </k-collection>
    </k-dropzone>

    <k-files-dialog ref="selector" @submit="select" />
    <k-upload ref="fileUpload" @success="upload" />
    <k-filesfromurl-dialog ref="filesFromUrl" @submit="onUrlUpload" />
  </k-field>
</template>

<script>
export default {
  extends: "k-files-field",
  computed: {
    options() {
      if (this.uploads) {
        return {
          icon: this.btnIcon,
          text: this.btnLabel,
          options: [
            { icon: "check", text: this.$t("select"), click: "open" },
            { icon: "upload", text: this.$t("upload"), click: "upload" },
            { icon: "url", text: this.$t("url"), click: "fromurl" },
          ],
        };
      }
      return {
        options: [
          { icon: "check", text: this.$t("select"), click: () => this.open() },
        ],
      };
    },
  },
  methods: {
    onUrlUpload(requestUrl) {
      const url = "uploadfromurl";

      const fieldinfo = {
        image: this.image,
        info: this.info ?? false,
        model: this.model,
        text: this.text,
      };

      this.$api
        .get(url, {
          url: requestUrl,
          endpoint: this.endpoints.field,
          fieldinfo: JSON.stringify(fieldinfo),
          ...this.uploads,
        })
        .then((file) => {
          if (this.multiple === false) {
            this.selected = [];
          }

          if (!this.isSelected(file)) {
            this.selected.push(file);
          }

          this.onInput();
          this.$refs.filesFromUrl.close();
        })
        .catch((error) => {
          this.$refs.filesFromUrl.onError(error.message);
        });
    },
    onAction(action) {
      if (!this.moreUpload) {
        return;
      }
      switch (action) {
        case "open":
          return this.open();
        case "upload":
          return this.$refs.fileUpload.open(this.uploadParams);
        case "fromurl":
          return this.$refs.filesFromUrl.open(this.uploadParams);
      }
    },
  },
};
</script>

<style></style>
