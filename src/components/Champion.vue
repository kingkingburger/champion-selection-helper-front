<template>
  <div class="hello">
    <!-- <button @click="getData">Get Data</button> -->
    <ul>
      <li v-for="(champ, index) in champions" :key="champ.name">
        {{ champ.name }}
        <img
          :src="`http://ddragon.leagueoflegends.com/cdn/${lolVersion}/img/champion/${champ.image.full}`"
          style="width: 50px; height: 50px"
          v-on:mouseover="handleMouseover(index)"
        />
      </li>
      <div>{{ bestRate }}</div>
      <div>{{ apiResult }}</div>
    </ul>
    <!-- <li v-for="champ in championJson" :key="champ.name"></li> -->
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import axios from "axios";

export default defineComponent({
  name: "CampionHome",
  data() {
    const champions: champ[] = [];
    const lolVersion = "12.24.1";
    const bestRate = "";
    const apiResult = {};
    return { champions, lolVersion, bestRate, apiResult };
  },
  async mounted() {
    const response = (
      await axios.get<championData>(
        `https://ddragon.leagueoflegends.com/cdn/12.23.1/data/ko_KR/champion.json`
      )
    ).data;
    this.champions = response.data;
  },
  methods: {
    async handleMouseover(championIndex: number) {
      this.bestRate = this.champions[championIndex].name;
      console.log(this.bestRate);
      const response = await axios.get<championData>(
        `http://localhost:3586/champion/name/${this.bestRate}`
      );
      this.apiResult = response.data;
    },
  },
});

interface championData {
  data: any;
}

interface champ {
  name: string;
  image: any;
  bestRate1: string;
}
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
</style>
