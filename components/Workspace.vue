<template>
  <v-container>
    <v-row justify="space-between" align="center">
      <h2 class="section-title">My Folders</h2>
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
    </v-row>
    <v-row justify="center" align="center" class="flex-wrap">
      <folder v-for="folder in folders" :folder="folder" :key="folder.id" />
    </v-row>
    <v-row justify="center" align="center" class="flex-wrap">
      <!-- <project
        v-for="project in singleProjects"
        :project="project"
        :key="project.id"
      /> -->
    </v-row>
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

  created() {
    this.loadApplication();
  }

  handleCreateFolder(name: string) {
    this.createFolder(name);
    this.toggleCreateFolderModal();
  }

  showCreateFolderModal: boolean = false;
  showRemovePrompt: boolean = false;
  showArchivePrompt: boolean = false;
  activeProjectId: string = "";

  toggleCreateFolderModal() {
    this.showCreateFolderModal = !this.showCreateFolderModal;
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
</style>
