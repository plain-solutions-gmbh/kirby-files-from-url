<script>
export default {
  extends: "k-files-field",
  computed: {
    buttons() {
      const button = this.$options.extends.options.computed.buttons.call(this);

      button.push({
        icon: "url",
        text: this.$t("url"),
        responsive: true,
        click: () =>
          this.$panel.dialog.open({
            component: "k-filesfromurl-dialog",
            props: {
              endpoint: this.endpoints.field
            },
            on: { uploaded: (file) => this.uploaded(file) },
          }),
      });

      return button;
    },
    // uploadinfo() {
    //   return {
    //     fieldinfo: JSON.stringify({
    //       image: this.image,
    //       info: this.info ?? false,
    //       model: this.model,
    //       text: this.text,
    //     }),
    //     ...this.uploads,
    //   };
    // },
  },
  methods: {
    uploaded(file) {
      if (this.multiple === false) {
        this.selected = [];
      }

      this.selected.push(file);

      this.onInput();
      this.$events.emit("file.upload");
      this.$events.emit("model.update");
    },
  },
};
</script>

<style></style>
