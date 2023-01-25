<template>
  <span class="easy-champion">쉬운적</span>
  <div v-for="(champinfo, index) in greatArray" :key="index" class="row">
    <img
      :src="`http://ddragon.leagueoflegends.com/cdn/${lolVersion}/img/champion/${champinfo}`"
      class="img-thumbnail champion-info-img col-4"
    />

    <span class="col" v-if="greatNameArray && greatRateArray"
      >{{ greatNameArray[index] }} {{ greatRateArray[index] }}</span
    >
  </div>
</template>

<script lang="ts">
import { PropType, defineComponent } from "vue";

export default defineComponent({
  name: "EasyChampion",
  //다른 컴포넌트를 쓰고 싶을 때

  compatConfig: { MODE: 3 },
  props: {
    lolVersion: String,
    greatArray: Array as PropType<string[]>,
    greatNameArray: Array as PropType<string[]>,
    greatRateArray: Array as PropType<string[]>,
  },
  methods: {},
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

.champion-info-img {
  width: 5rem;
}
</style>
