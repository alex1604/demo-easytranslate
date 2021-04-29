<template>
  <v-card class="mt-6 mr-4">
    <div class="px-4" justify="start">
      <div class="folder-header">
        <v-icon size="46" color="#5C98DF">mdi-folder</v-icon>
        <v-card-title class="px-2 py-0"
          >{{ folder.attributes.name }}
        </v-card-title>
      </div>
      <div>
        <v-icon size="16" color="gray">mdi-folder-open-outline</v-icon>
        <small>{{ folder.attributes.total_projects }} projects</small>
      </div>
      <div>
        <v-icon size="16" color="gray">mdi-clock-outline</v-icon>
        <small>Created: {{ createdAt }}</small>
      </div>
      <v-card-actions class="justify-center">
        <v-btn text color="#5C98DF" @click="toggleExpandedSection">
          <v-icon>mdi-chevron-down</v-icon>
        </v-btn>
      </v-card-actions>
    </div>

    <v-expand-transition>
      <v-card
        v-if="reveal"
        class="transition-fast-in-fast-out v-card--reveal"
        style="height: 100%"
      >
        <v-card-text class="expand-card-text">
          <p>Last updated: {{ updatedAt }}</p>
          <small>folder_id: {{ folder.id }}</small>
        </v-card-text>
        <v-card-actions class="pt-0 justify-center">
          <v-btn text color="#5C98DF" @click="toggleExpandedSection">
            <v-icon>mdi-chevron-up</v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-expand-transition>
  </v-card>
</template>
<script lang="ts">
import { Vue, Prop, Component } from "vue-property-decorator";
import moment from "moment";
import { IFolder } from "~/types/IFolder";

@Component
export default class Folder extends Vue {
  @Prop() folder!: IFolder;

  reveal: boolean = false;

  get createdAt(): string {
    const date = this.folder.attributes.created_at;
    return moment(date).format("LL");
  }

  get updatedAt(): string {
    const date = this.folder.attributes.updated_at;
    return moment(date).format("LL");
  }

  toggleExpandedSection() {
    this.reveal = !this.reveal;
  }
}
</script>
<style lang="scss" scoped>
.v-card {
  min-width: 20rem;
  width: 30%;
  height: 10rem;
  display: flex;
  flex-direction: column;
  justify-content: space-around;

  .folder-header {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    margin: 0.5rem 0;
  }
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