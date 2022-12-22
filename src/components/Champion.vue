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
        <div>{{ bestRate }}</div>
      </li>
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
    return { champions, lolVersion, bestRate };
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
    // async getData() {
    //   const response = await (
    //     await axios.get<championData>(
    //       `https://ddragon.leagueoflegends.com/cdn/12.23.1/data/ko_KR/champion.json`
    //     )
    //   ).data;
    //   this.champions = response.data;
    // },
    handleMouseover(championIndex: number) {
      // this.champions.find((data) => data === name) = "123";
      console.log(championIndex);
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
