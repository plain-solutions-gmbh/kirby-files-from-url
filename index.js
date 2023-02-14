(function() {
  "use strict";
  const Files_vue_vue_type_style_index_0_lang = "";
  function normalizeComponent(scriptExports, render, staticRenderFns, functionalTemplate, injectStyles, scopeId, moduleIdentifier, shadowMode) {
    var options = typeof scriptExports === "function" ? scriptExports.options : scriptExports;
    if (render) {
      options.render = render;
      options.staticRenderFns = staticRenderFns;
      options._compiled = true;
    }
    if (functionalTemplate) {
      options.functional = true;
    }
    if (scopeId) {
      options._scopeId = "data-v-" + scopeId;
    }
    var hook;
    if (moduleIdentifier) {
      hook = function(context) {
        context = context || this.$vnode && this.$vnode.ssrContext || this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext;
        if (!context && typeof __VUE_SSR_CONTEXT__ !== "undefined") {
          context = __VUE_SSR_CONTEXT__;
        }
        if (injectStyles) {
          injectStyles.call(this, context);
        }
        if (context && context._registeredComponents) {
          context._registeredComponents.add(moduleIdentifier);
        }
      };
      options._ssrRegister = hook;
    } else if (injectStyles) {
      hook = shadowMode ? function() {
        injectStyles.call(
          this,
          (options.functional ? this.parent : this).$root.$options.shadowRoot
        );
      } : injectStyles;
    }
    if (hook) {
      if (options.functional) {
        options._injectStyles = hook;
        var originalRender = options.render;
        options.render = function renderWithStyleInjection(h, context) {
          hook.call(context);
          return originalRender(h, context);
        };
      } else {
        var existing = options.beforeCreate;
        options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
      }
    }
    return {
      exports: scriptExports,
      options
    };
  }
  const _sfc_main$1 = {
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
              { icon: "url", text: this.$t("url"), click: "fromurl" }
            ]
          };
        }
        return {
          options: [
            { icon: "check", text: this.$t("select"), click: () => this.open() }
          ]
        };
      }
    },
    methods: {
      onUrlUpload(requestUrl) {
        var _a;
        const url = "uploadfromurl";
        const fieldinfo = {
          image: this.image,
          info: (_a = this.info) != null ? _a : false,
          model: this.model,
          text: this.text
        };
        this.$api.get(url, {
          url: requestUrl,
          endpoint: this.endpoints.field,
          fieldinfo: JSON.stringify(fieldinfo),
          ...this.uploads
        }).then((file) => {
          if (this.multiple === false) {
            this.selected = [];
          }
          if (!this.isSelected(file)) {
            this.selected.push(file);
          }
          this.onInput();
          this.$refs.filesFromUrl.close();
        }).catch((error) => {
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
      }
    }
  };
  var _sfc_render$1 = function render() {
    var _vm = this, _c = _vm._self._c;
    return _c("k-field", _vm._b({ staticClass: "k-files-field", scopedSlots: _vm._u([_vm.more && !_vm.disabled ? { key: "options", fn: function() {
      return [_c("k-button-group", { staticClass: "k-field-options" }, [_c("k-options-dropdown", _vm._b({ ref: "options", on: { "action": _vm.onAction } }, "k-options-dropdown", _vm.options, false))], 1)];
    }, proxy: true } : null], null, true) }, "k-field", _vm.$props, false), [_c("k-dropzone", { attrs: { "disabled": !_vm.moreUpload }, on: { "drop": _vm.drop } }, [_c("k-collection", _vm._b({ on: { "empty": _vm.prompt, "sort": _vm.onInput, "sortChange": function($event) {
      return _vm.$emit("change", $event);
    } }, scopedSlots: _vm._u([{ key: "options", fn: function({ index: index2 }) {
      return [!_vm.disabled ? _c("k-button", { attrs: { "tooltip": _vm.$t("remove"), "icon": "remove" }, on: { "click": function($event) {
        return _vm.remove(index2);
      } } }) : _vm._e()];
    } }]) }, "k-collection", _vm.collection, false))], 1), _c("k-files-dialog", { ref: "selector", on: { "submit": _vm.select } }), _c("k-upload", { ref: "fileUpload", on: { "success": _vm.upload } }), _c("k-filesfromurl-dialog", { ref: "filesFromUrl", on: { "submit": _vm.onUrlUpload } })], 1);
  };
  var _sfc_staticRenderFns$1 = [];
  _sfc_render$1._withStripped = true;
  var __component__$1 = /* @__PURE__ */ normalizeComponent(
    _sfc_main$1,
    _sfc_render$1,
    _sfc_staticRenderFns$1,
    false,
    null,
    null,
    null,
    null
  );
  __component__$1.options.__file = "/Users/roman/Cloud/01_Microman/Plain/_webdata/site/plugins/kirby-filesfromurl/src/components/Files.vue";
  const Files = __component__$1.exports;
  const FilesFromUrlDialog_vue_vue_type_style_index_0_lang = "";
  const _sfc_main = {
    data() {
      return {
        error: false,
        loading: false
      };
    },
    created() {
    },
    methods: {
      open(uploadParams) {
        this.loading = false;
        this.$refs.filesFromUrl.open();
      },
      close() {
        this.error = false;
        this.loading = false;
        this.url = "";
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
      }
    }
  };
  var _sfc_render = function render() {
    var _vm = this, _c = _vm._self._c;
    return _c("k-dialog", { ref: "filesFromUrl", staticClass: "k-filesfromurl-dialog", attrs: { "submitButton": this.$t("upload"), "disabled": _vm.loading, "theme": "positive", "size": "medium", "icon": "upload" }, on: { "submit": _vm.submit } }, [_c("k-url-field", { ref: "url", attrs: { "name": "url", "label": this.$t("url") }, model: { value: _vm.url, callback: function($$v) {
      _vm.url = $$v;
    }, expression: "url" } }), _vm.error ? _c("k-info-field", { attrs: { "theme": "negative", "text": _vm.error } }) : _vm._e(), _vm.loading ? _c("k-box", { attrs: { "theme": "info" } }, [_c("k-loader"), _vm._v(" " + _vm._s(this.$t("upload")) + " ")], 1) : _vm._e()], 1);
  };
  var _sfc_staticRenderFns = [];
  _sfc_render._withStripped = true;
  var __component__ = /* @__PURE__ */ normalizeComponent(
    _sfc_main,
    _sfc_render,
    _sfc_staticRenderFns,
    false,
    null,
    null,
    null,
    null
  );
  __component__.options.__file = "/Users/roman/Cloud/01_Microman/Plain/_webdata/site/plugins/kirby-filesfromurl/src/components/FilesFromUrlDialog.vue";
  const FilesFromUrlDialog = __component__.exports;
  const index = "";
  window.panel.plugin("microman/filesfromurl", {
    fields: {
      files: Files
    },
    components: {
      "k-filesfromurl-dialog": FilesFromUrlDialog
    }
  });
})();
