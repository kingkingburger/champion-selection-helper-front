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
        <div v-if="champ.name === overedChampion">
          <!-- {{ apiResult }} -->
          여려운적
          <div>{{ worst1Name }} : {{ worst1Rate }}</div>
          <div>{{ worst2Name }} : {{ worst2Rate }}</div>
          <div>{{ worst3Name }} : {{ worst3Rate }}</div>
          쉬운적
          <div>{{ great1Name }} : {{ great1Rate }}</div>
          <div>{{ great2Name }} : {{ great2Rate }}</div>
          <div>{{ great3Name }} : {{ great3Rate }}</div>
        </div>
      </li>
      <div>{{ bestRate }}</div>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import axios from "axios";

export default defineComponent({
  name: "CampionHome",
  data() {
    const champions: champ[] = [];
    const lolVersion = "12.23.1";
    const bestRate = "";
    const apiResult = {};
    const overedChampion = ""; // 선택된 챔피언
    const worst1Name = "";
    const worst2Name = "";
    const worst3Name = "";
    const worst1Rate = "";
    const worst2Rate = "";
    const worst3Rate = "";
    const great1Name = "";
    const great2Name = "";
    const great3Name = "";
    const great1Rate = "";
    const great2Rate = "";
    const great3Rate = "";
    // "worst1Name": "워윅", "worst2Name": "다리우스", "worst3Name":
    //"일라오이", "worst1Rate": "37.62%", "worst2Rate": "39.94%", "worst3Rate": "42.37%",
    // "great1Name": "아칼리", "great2Name": "리븐", "great3Name": "요네", "great1Rate": "61.93%",
    //"great2Rate": "61.36%", "great3Rate": "56.59%"
    return {
      champions,
      lolVersion,
      bestRate,
      apiResult,
      overedChampion,
      worst1Name,
      worst2Name,
      worst3Name,
      worst1Rate,
      worst2Rate,
      worst3Rate,
      great1Name,
      great2Name,
      great3Name,
      great1Rate,
      great2Rate,
      great3Rate,
    };
  },
  async mounted() {
    const response = (
      await axios.get<championData>(
        `https://ddragon.leagueoflegends.com/cdn/${this.lolVersion}/data/ko_KR/champion.json`
      )
    ).data;
    this.champions = response.data;
  },
  methods: {
    async handleMouseover(championIndex: number) {
      this.bestRate = this.champions[championIndex].name;
      this.overedChampion = this.bestRate; //선택된 챔피언들 넣기
      console.log(this.bestRate);
      const response = await axios.get<championData>(
        `http://localhost:3586/champion/name/${this.bestRate}`
      );
      // 결과값 반환되는 곳
      const responseJson = response.data as Record<string, any>;
      this.worst1Name = responseJson[0].championRateName.worst1Name;
      this.worst2Name = responseJson[0].championRateName.worst2Name;
      this.worst3Name = responseJson[0].championRateName.worst3Name;
      this.worst1Rate = responseJson[0].championRateName.worst1Rate;
      this.worst2Rate = responseJson[0].championRateName.worst2Rate;
      this.worst3Rate = responseJson[0].championRateName.worst3Rate;
      this.great1Name = responseJson[0].championRateName.great1Name;
      this.great2Name = responseJson[0].championRateName.great2Name;
      this.great3Name = responseJson[0].championRateName.great3Name;
      this.great1Rate = responseJson[0].championRateName.great1Rate;
      this.great2Rate = responseJson[0].championRateName.great2Rate;
      this.great3Rate = responseJson[0].championRateName.great3Rate;
      // this.apiResult = responseJson[0].championRateName; //
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
