<template>
  <v-card class="mt-4 mx-4">
    <v-card-title
      >{{ folder.attributes.name }}
      <v-spacer></v-spacer>
    </v-card-title>

    <v-col justify="center" align="center">
      <h1>{{ folder.attributes.total_projects }} projects</h1>
    </v-col>
    <v-card-actions class="justify-center">
      <v-btn text color="teal accent-5" @click="toggleExpandedSection">
        <v-icon>mdi-chevron-down</v-icon>
      </v-btn>
    </v-card-actions>

    <v-expand-transition>
      <v-card
        v-if="reveal"
        class="transition-fast-in-fast-out v-card--reveal"
        style="height: 100%"
      >
        <v-card-text class="expand-card-text">
          <p class="text--secondary">
            Created at: {{ folder.attributes.created_at }}
          </p>
          <p>Last updated: {{ folder.attributes.updated_at }}</p>
          <small>folder: {{ folder.id }}</small>
        </v-card-text>
        <v-card-actions class="pt-0 justify-center">
          <v-btn text color="teal accent-4" @click="toggleExpandedSection">
            <v-icon>mdi-chevron-up</v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-expand-transition>
  </v-card>
</template>
<script lang="ts">
import { Vue, Prop, Component } from "vue-property-decorator";
import { IFolder } from "~/types/IFolder";

@Component
export default class Folder extends Vue {
  @Prop() folder!: IFolder;

  reveal: boolean = false;

  toggleExpandedSection() {
    this.reveal = !this.reveal;
  }
}
</script>
<style lang="scss" scoped>
.v-card {
  min-width: 20rem;
  width: 30%;
  height: 15rem;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
.expand-card-text {
  padding-bottom: 0;
  height: 100%;
}
.v-card--reveal {
  bottom: 0;
  opacity: 1 !important;
  position: absolute;
  width: 100%;
}
</style>