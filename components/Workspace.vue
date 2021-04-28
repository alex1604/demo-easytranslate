<template></template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { Action } from "vuex-class-decorator";

@Component
export default class Workspace extends Vue {
  @Action("getToken") getToken: any;

  mounted() {
    this.getToken();
  }
}
</script>

<style>
</style>
