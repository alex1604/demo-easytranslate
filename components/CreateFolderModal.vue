<template>
  <v-row justify="center">
    <v-dialog
      v-model="isVisible"
      persistent
      max-width="600px"
      transition="dialog-bottom-transition"
    >
      <template v-slot:activator="{ on, attrs }">
        <slot v-bind="attrs" v-on="on"></slot>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">Create new folder</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-text-field
                v-model="folderName"
                :color="isNameDuplicated ? 'red' : ''"
                label="Folder name*"
                required
              ></v-text-field>
            </v-row>
            <v-row>
              <small
                v-if="isNameDuplicated"
                :class="isNameDuplicated ? 'warning-duplicate' : ''"
              >
                A folder with this name already exists. Pick a different name.
              </small>
            </v-row>
          </v-container>
          <small>* required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="emitCancel"> Cancel </v-btn>
          <v-btn
            color="#377ADD"
            text
            @click="emitCreate"
            :disabled="isNameDuplicated"
          >
            Create
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Getter } from "vuex-class-decorator";

@Component
export default class CreateFolderModal extends Vue {
  @Prop({ default: true }) isVisible: boolean;

  @Getter("projectNames") projectNames: string[];

  folderName: string = "";

  get isNameDuplicated(): boolean {
    return this.projectNames?.includes(this.folderName);
  }

  clearForm() {
    this.folderName = "";
  }

  emitCancel() {
    this.clearForm();
    this.$emit("cancel");
  }

  emitCreate() {
    this.$emit("create", this.folderName);
    this.clearForm();
  }
}
</script>
<style lang="scss" scoped>
.warning-duplicate {
  color: red;
}
</style>