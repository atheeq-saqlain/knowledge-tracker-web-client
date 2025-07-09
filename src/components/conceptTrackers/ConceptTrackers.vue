<template>
  <div>
    <q-card v-for="conceptData in conceptTrackers" :key="conceptData.id">
      <q-card-section>
        <span class="text-h6"
          >{{ conceptData.concept.name }} -
          <span v-if="conceptData.conceptTracker">{{ (conceptData.conceptTracker.masteryLevel * 100) / 5 }}%</span>
        </span>
        <div>
          <q-linear-progress
            v-if="conceptData.conceptTracker"
            :value="conceptData.conceptTracker.masteryLevel / 5"
            class="q-my-lg"
          />
          <q-linear-progress v-else :value="0" class="q-my-lg" />
        </div>
        <div class="row justify-end q-gutter-md">
          <q-btn @click="addTracker(conceptData.concept, 0)">Reset</q-btn>
          <q-btn color="primary" @click="addTracker(conceptData.concept, 5)">Done</q-btn>
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
import ConceptTrackerApi from "src/services/api/ConceptTracker.api";
import { userStore } from "src/stores/user-store";
const store = userStore();

export default {
  name: "ConceptTrakcers",
  props: ["conceptTrackers", "question"],
  computed: {
    user() {
      return store.user;
    },
  },

  methods: {
    async addTracker(concept, score) {
      let tracker = {
        concept: concept._id,
        student: this.user.student,
        masteryLevel: score,
      };
      if (this.question) {
        tracker.question = this.question._id;
      }
      let conceptTracker = await ConceptTrackerApi.addConceptTracker(tracker);
      this.$emit("conceptTrackerAdded", conceptTracker);
    },
  },
};
</script>

<style scoped></style>
