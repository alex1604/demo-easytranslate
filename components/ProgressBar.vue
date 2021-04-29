<template>
  <v-progress-linear
    v-if="value"
    class="progress-bar"
    :height="height"
    :rounded="rounded"
    :color="color"
    :value="value"
  ></v-progress-linear>
</template>
<script lang="ts">
import { Vue, Prop, Component } from "vue-property-decorator";

@Component
export default class ProgressBar extends Vue {
  @Prop({ default: 12 }) height: number;
  @Prop({ default: true }) rounded: boolean;
  @Prop({ default: "#1FC499" }) color: string;
  @Prop() value!: number;
}
</script>
<style lang="scss" scoped>
.progress-bar {
  border-radius: 1rem;
}
</style>