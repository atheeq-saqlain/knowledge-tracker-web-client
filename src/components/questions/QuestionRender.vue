<template>
  <div>
    <p>
      {{ question.statement }}
    </p>
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "QuestionRender",
  props: ["question"],

  mounted() {
    MathJax.typeset();
  },
});
</script>
