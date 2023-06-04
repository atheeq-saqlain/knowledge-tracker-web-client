<template>
  <q-page padding>
    <div class="row">
      <div class="col-8 q-pa-sm">
        <!-- Add the custom component here  -->
        <!-- <select-concept :section-concepts="sectionConcepts" v-model="selectedConcept"></select-concept> -->
        <question-form
          syllabus-id="6470f66b633c23dfb7cde2f1"
          :suggested-concepts-array="sectionConcepts"
          @question-added="eventHandler"
        ></question-form>
      </div>

      <div class="col q-pa-sm">
        <!-- Variable to check the value of the coomponent -->
        <div class="text-h6">component output values</div>
        <span v-if="selectedConcept">{{ selectedConcept.name }}</span>
      </div>
    </div>
  </q-page>
</template>

<script>
import SelectConcept from "src/components/concepts/SelectConcept.vue";
import QuestionForm from "src/components/questions/QuestionForm.vue";

export default {
  components: { QuestionForm },

  data() {
    return {
      selectedConcept: null,
      sectionConcepts: [
        {
          name: "Arithmetic progression",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem, eius reprehenderit eos corrupti commodi magni quaerat ex numquam, dolorum officiis modi facere maiores architecto suscipit iste eveniet doloribus ullam aliquid. ",
        },
        {
          name: "geometric progression",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem, eius reprehenderit eos corrupti commodi magni quaerat ex numquam, dolorum officiis modi facere maiores architecto suscipit iste eveniet doloribus ullam aliquid. ",
        },
      ],
    };
  },

  methods: {
    eventHandler(val) {
      console.log("Event recived from component ... value :  ", val);
    },
  },
};
</script>

<style scoped></style>
