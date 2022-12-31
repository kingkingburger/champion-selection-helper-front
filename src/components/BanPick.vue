<template>
  <div>
    <div>챔피언 이름 : {{ championName }}</div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  // compatConfig: { MODE: 3 },
  name: "BanRecomend",
  data() {
    return { name: "공통버튼" };
  },
  props: {
    championName: String,
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}

/* .champion {
    width: 1500px;
  } */

.champion-info {
  position: absolute;
  background-color: aliceblue;
  border: 1px solid;
  border-radius: 20px;
  padding: 10px 10px 10px 10px;
}

.hard-champion {
  color: brown;
}

.easy-champion {
  color: aquamarine;
}
</style>
