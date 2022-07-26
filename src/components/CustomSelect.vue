<template>
  <v-select
    @input="handleInput"
    autocomplete="on"
    :reduce="(item) => item.id"
    :multiple="multiple"
    :value="value"
    :closeOnSelect="!multiple"
    :loading="loading"
    :disabled="disabled"
    :placeholder="placeholder"
    :options="
      items.map(function (item) {
        return {
          label: labelMask ? applyMask(item) : item[label],
          id: item[customKey],
        };
      }, this)
    "
  >
    <span slot="no-options">Não há dados</span>
  </v-select>
</template>

<script>
export default {
  methods: {
    handleInput(e) {
      this.$emit("input", e);
    },
    applyMask(item) {
      return this.label.split("$").reduce(function (string, to_sum) {
        return string + (item[to_sum] ? item[to_sum] : to_sum);
      }, "");
    },
  },
  props: {
    value: {
      type: [Array, String, Number],
      default: null,
      description: "Dados selecionados",
    },
    placeholder: {
      type: String,
      default: 'Selecione',
    },
    customKey: {
      type: String,
      default: "id",
      description: "Chave primária",
    },
    label: {
      type: String,
      default: "name",
      description: "Label",
    },
    loading: {
      type: Boolean,
      default: false,
      description: "Loading",
    },
    disabled: {
      type: Boolean,
      default: false,
      description: "Desabilitar",
    },
    labelMask: {
      type: Boolean,
      default: false,
      description: "Ativa máscara para label",
    },
    multiple: {
      type: Boolean,
      default: false,
      description: "Permitir múltiplos dados",
    },
    items: {
      type: Array,
      default: [],
      description: "Dados a selecionar",
    },
  },
};
</script>
<style></style>