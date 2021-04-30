<template>
  <v-progress-circular indeterminate :color="color"></v-progress-circular>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class Loader extends Vue {
  @Prop({ default: "primary" }) color: string;
}
</script>
<style lang="scss" scoped>
</style>
