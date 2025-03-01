import FilesFromUrl from "./components/FilesFromUrl.vue";
import FilesFromUrlDialog from "./components/FilesFromUrlDialog.vue";

window.panel.plugin("plain/filesfromurl", {
  fields: {
    files: FilesFromUrl,
  },
  components: {
    "k-filesfromurl-dialog": FilesFromUrlDialog,
  },
});
