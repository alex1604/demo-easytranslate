<template>
  <div class="text-center">
    <v-btn :color="buttonColor" rounded @click="emitClick">
      <v-icon class="mr-4" color="white">mdi-plus-circle-outline</v-icon>
      <span class="button-text">{{ text }}</span>
    </v-btn>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class RoundedButton extends Vue {
  @Prop() text!: string;
  @Prop({ default: "#377ADD" }) color: string;

  get buttonColor() {
    return this.color;
  }

  emitClick() {
    this.$emit("click");
  }
}
</script>
<style lang="scss" scoped>
.button-text {
  color: white;
}
</style>