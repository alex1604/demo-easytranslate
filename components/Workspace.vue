<template>
  <v-container>
    <create-folder-modal
      :isVisible="showCreateFolderModal"
      @cancel="toggleCreateFolderModal"
      @create="createFolder"
    >
      <rounded-button
        text="Create new folder"
        class="my-8"
        @click="toggleCreateFolderModal"
      />
    </create-folder-modal>
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
import RoundedButton from "@/components/RoundedButton.vue";
import { Action, State } from "vuex-class-decorator";

@Component({
  components: {
    Folder,
    Project,
    CreateFolderModal,
    RoundedButton,
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
</style>
