<template>
  <v-card class="mt-6 mr-4">
    <NuxtLink
      style="text-decoration: none; color: inherit"
      to="/folder"
      @click.native="handleOpenFolder"
    >
      <div class="px-4" justify="start">
        <div class="folder-header">
          <div class="header-name">
            <v-icon size="46" color="#5C98DF">mdi-folder</v-icon>
            <div class="title px-2 py-0">{{ attributes.name }}</div>
          </div>
          <v-tooltip top>
            <template v-slot:activator="{ on, attrs }">
              <div class="info-button">
                <v-icon size="18" v-bind="attrs" v-on="on"
                  >mdi-information-outline</v-icon
                >
              </div>
            </template>
            <span>{{ attributes.name }}</span>
          </v-tooltip>
        </div>
        <div>
          <v-icon size="16" color="gray">mdi-folder-open-outline</v-icon>
          <small>{{ attributes.total_projects }} projects</small>
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
    </NuxtLink>
  </v-card>
</template>
<script lang="ts">
import { Vue, Prop, Component } from "vue-property-decorator";
import moment from "moment";
import { IFolder, IFolderAttributes } from "~/types/IFolder";
import { Action } from "vuex-class-decorator";

@Component
export default class Folder extends Vue {
  @Prop() folder!: IFolder;
  @Action("openFolder") openFolder: any;

  reveal: boolean = false;

  get attributes(): IFolderAttributes {
    return this.folder.attributes;
  }

  get createdAt(): string {
    const date = this.folder.attributes.created_at;
    return moment(date).format("LL");
  }

  get updatedAt(): string {
    const date = this.folder.attributes.updated_at;
    return moment(date).format("LL");
  }

  handleOpenFolder() {
    this.openFolder(this.folder);
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
    justify-content: space-between;
    margin: 0.5rem 0;

    .header-name {
      display: flex;
      flex-direction: row;
      height: 2rem;
      width: 95%;

      .title {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }

    .info-button {
      width: 1rem;
      display: flex;
      flex-direction: row;
      justify-content: flex-end;
    }
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