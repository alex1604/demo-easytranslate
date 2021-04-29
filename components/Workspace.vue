<template>
  <v-container>
    <section class="my-4">
      <v-row justify="space-between" align="center">
        <h2 class="section-title">My Folders</h2>
        <v-spacer></v-spacer>
        <create-folder-modal
          :isVisible="showCreateFolderModal"
          @cancel="toggleCreateFolderModal"
          @create="handleCreateFolder"
        >
          <v-btn depressed color="primary" @click="toggleCreateFolderModal">
            <v-icon size="18" class="mr-2" color="white">mdi-plus</v-icon>
            <span class="button-text">New folder</span>
          </v-btn>
        </create-folder-modal>
        <a class="ml-8" @click="toggleShowAllFolders">{{ folderToggleText }}</a>
      </v-row>
      <div class="loader" v-if="loadingFolders">
        <v-progress-circular
          indeterminate
          color="primary"
        ></v-progress-circular>
      </div>
      <v-row
        v-else
        :class="showAllFolders ? 'show-all' : 'show-less'"
        justify="start"
        align="start"
        class="flex-wrap"
      >
        <folder v-for="folder in folders" :folder="folder" :key="folder.id" />
      </v-row>
    </section>
    <section>
      <v-row justify="space-between" align="center">
        <h2 class="section-title">My Projects</h2>
        <a class="ml-8" @click="toggleShowAllProjects">{{
          projectToggleText
        }}</a>
      </v-row>
      <div class="loader" v-if="loadingProjects">
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
          v-for="project in singleProjects"
          :project="project"
          :key="project.id"
        />
      </v-row>
    </section>
  </v-container>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import Folder from "@/components/Folder.vue";
import Project from "@/components/Project.vue";
import CreateFolderModal from "@/components/CreateFolderModal.vue";
import { Action, State } from "vuex-class-decorator";

@Component({
  components: {
    Folder,
    Project,
    CreateFolderModal,
  },
})
export default class ProjectsOverview extends Vue {
  @State("folders") folders: Object[];
  @State("singleProjects") singleProjects: Object[];
  @State("user") user: Object;
  @Action("loadApplication") loadApplication: any;
  @Action("createFolder") createFolder: any;

  showAllFolders: boolean = false;
  showAllProjects: boolean = false;
  showCreateFolderModal: boolean = false;

  get loadingFolders() {
    return this.folders.length === 0;
  }

  get loadingProjects() {
    return this.singleProjects.length === 0;
  }

  get folderToggleText(): string {
    return this.showAllFolders ? "View less" : "View all";
  }

  get projectToggleText(): string {
    return this.showAllProjects ? "View less" : "View all";
  }

  created() {
    this.loadApplication();
  }

  handleCreateFolder(name: string) {
    this.createFolder(name);
    this.toggleCreateFolderModal();
  }

  toggleCreateFolderModal() {
    this.showCreateFolderModal = !this.showCreateFolderModal;
  }

  toggleShowAllFolders() {
    this.showAllFolders = !this.showAllFolders;
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
.button-text {
  text-transform: none !important;
}

.section-title {
  font-weight: normal;
}

.show-less {
  height: 12rem;
  overflow: hidden;
}

.show-less-projects {
  height: 30rem;
  overflow: hidden;
}

.show-all {
  height: auto;
}

.loader {
  height: 12rem;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
</style>
