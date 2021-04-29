<template>
  <v-card class="mt-6 mr-4">
    <div class="header">
      <v-tooltip top>
        <template v-slot:activator="{ on, attrs }">
          <div class="info-button mt-4">
            <v-icon size="18" v-bind="attrs" v-on="on"
              >mdi-information-outline</v-icon
            >
          </div>
        </template>
        <span>{{ attributes.name }}</span>
      </v-tooltip>
      <div class="header-title">{{ attributes.name }}</div>
      <small class="project-id">{{ project.id }}</small>
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

    <div v-if="!isCompleted" class="footer progress-footer">
      <progress-bar :value="progress" />
    </div>
    <div v-else class="footer completed-footer">Translation is ready</div>
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
  height: 28rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;

  .project-id {
    color: #1876d1;
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

  .header {
    padding: 0 2rem 1rem 2rem;
    .header-title {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      margin-bottom: 1rem;
    }
    .info-button {
      width: 105%;
      display: flex;
      flex-direction: row;
      justify-content: flex-end;
      cursor: pointer;
    }
  }

  .footer {
    height: 7rem;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: absolute;
    bottom: 0;
    border-top: 1px solid #e0e0e0;
  }
  .progress-footer {
    padding: 1rem;
  }
  .completed-footer {
    align-items: center;
    color: #1fc499;
    background-color: #e3f5ed;
    font-weight: 500;
  }
}
</style>