<template>
  <div>
    <h6>math equation test</h6>
    <p>
      When \(a \ne 0\), there are two solutions to \(ax^2 + bx + c = 0\) and they are \[x = {-b \pm \sqrt{b^2-4ac} \over
      2a}.\]
    </p>
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "QuestionRender",

  mounted() {
    console.log("page is mounted");
    MathJax.typeset();
  },
});
</script>
