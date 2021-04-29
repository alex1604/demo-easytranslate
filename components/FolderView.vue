<template>
  <v-container>
    <section>
      <v-row justify="space-between" align="center">
        <v-breadcrumbs :items="items">
          <template v-slot:divider>
            <v-icon>mdi-chevron-right</v-icon>
          </template>
        </v-breadcrumbs>
        <a class="ml-8" @click="toggleShowAllProjects">{{
          projectToggleText
        }}</a>
      </v-row>
      <div class="loader" v-if="loadingFolderProjects">
        <v-progress-circular
          indeterminate
          color="primary"
        ></v-progress-circular>
      </div>
      <v-row
        v-else
        :class="showAllProjects ? 'show-all' : 'show-less-projects'"
        justify="start"
        align="start"
        class="flex-wrap"
      >
        <project
          v-for="project in openFolderProjects"
          :project="project"
          :key="project.id"
        />
      </v-row>
    </section>
  </v-container>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Folder from "@/components/Folder.vue";
import Project from "@/components/Project.vue";
import CreateFolderModal from "@/components/CreateFolderModal.vue";
import { State } from "vuex-class-decorator";
import { IFolder } from "~/types/IFolder";
import { IProject } from "~/types/IProject";

@Component({
  components: {
    Folder,
    Project,
    CreateFolderModal,
  },
})
export default class FolderView extends Vue {
  @State("openFolder") openFolder: IFolder;
  @State("openFolderProjects") openFolderProjects: IProject[];
  @State("loadingFolderProjects") loadingFolderProjects: boolean;

  showAllProjects: boolean = false;

  get projectToggleText(): string {
    return this.showAllProjects ? "View less" : "View all";
  }

  get items() {
    return [
      {
        text: "My Workspace",
        disabled: false,
        href: "/",
      },
      {
        text: this.openFolder?.attributes?.name,
        disabled: true,
        href: "folder",
      },
    ];
  }

  toggleShowAllProjects() {
    this.showAllProjects = !this.showAllProjects;
  }
}
</script>
<style lang="scss" scoped>
.wrap {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
}

.show-less-projects {
  height: 30rem;
  overflow: hidden;
}

.show-all {
  height: auto;
}

.loader {
  height: 30rem;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
</style>
