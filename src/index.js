import FilesFromUrl from "./components/FilesFromUrl.vue";
import FilesFromUrlDialog from "./components/FilesFromUrlDialog.vue";
import "./index.css";

window.panel.plugin("microman/filesfromurl", {
  fields: {
    files: FilesFromUrl,
  },
  components: {
    "k-filesfromurl-dialog": FilesFromUrlDialog,
  },
});
