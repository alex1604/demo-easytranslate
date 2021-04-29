<template>
  <v-card class="mt-6 mr-4">
    <div class="px-4">
      <v-icon class="info-button mt-4 mr-4" size="14"
        >mdi-information-outline</v-icon
      >
      <v-card-title>{{ attributes.name }}</v-card-title>
      <v-card-text>
        <small class="project-id">{{ project.id }}</small>
      </v-card-text>
    </div>

    <v-divider></v-divider>
    <div class="px-4 pb-4">
      <div class="info-group">
        <div class="label">DATE OF ORDER</div>
        <p>{{ createdAt }}</p>
      </div>

      <div class="info-group">
        <div class="label">PRICE</div>
        <p>{{ `${attributes.price.amount} ${attributes.price.currency}` }}</p>
      </div>

      <div class="info-row" justify="space-between">
        <div class="info-group">
          <div class="label">FROM</div>
          <p>{{ attributes.source_language.toUpperCase() }}</p>
        </div>
        <div class="info-group">
          <div class="label">TO</div>
          <p>{{ targetLanguages }}</p>
        </div>
      </div>
    </div>

    <v-divider></v-divider>

    <div v-if="!isCompleted" class="progress-footer">
      <progress-bar :value="progress" />
    </div>
    <div v-else class="completed-footer">Translation is ready</div>
  </v-card>
</template>
<script lang="ts">
import { Vue, Prop, Component } from "vue-property-decorator";
import moment from "moment";
import { IProject, IProjectAttributes } from "~/types/IProject";
import ProgressBar from "@/components/ProgressBar.vue";

@Component({
  components: {
    ProgressBar,
  },
})
export default class Folder extends Vue {
  @Prop() project!: IProject;

  reveal: boolean = false;

  get createdAt(): string {
    const date = this.project.attributes.created_at;
    return moment(date).fromNow();
  }

  get updatedAt(): string {
    const date = this.project.attributes.updated_at;
    return moment(date).format("LL");
  }

  get attributes(): IProjectAttributes {
    return this.project.attributes;
  }

  get targetLanguages(): string {
    return this.attributes.target_languages.join(", ").toUpperCase();
  }

  get progress(): number {
    const { completed_tasks, percent } = this.attributes.progress;
    return Math.round((completed_tasks / percent) * 100);
  }

  get isCompleted(): boolean {
    return this.attributes.status === "COMPLETED";
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
  height: 30rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;

  .project-id {
    color: #1876d1;
  }

  .info-button {
    width: 100%;
    justify-content: flex-end;
  }

  .info-row {
    display: flex;
    justify-content: space-between;
    padding-right: 2rem;
  }

  .info-group {
    padding: 1rem 0 0 1rem;

    .label {
      font-size: 0.8rem;
      font-weight: 500;
      color: lightslategray;
    }
    p {
      margin: 0;
    }
  }

  .progress-footer {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 1rem;
  }
  .completed-footer {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: #1fc499;
    background-color: #e3f5ed;
    font-weight: 500;
  }
}
</style>