<template>
  <div>
    <h6>Question Render</h6>
    <p>
      {{ question }}
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
