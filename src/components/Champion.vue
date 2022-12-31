<template>
  <div class="hello">
    <!-- <button @click="getData">Get Data</button> -->
    <div class="col-6 container">
      <ul class="row">
        <li
          v-for="(champ, index) in champions"
          :key="champ.name"
          class="col-1 p-2"
        >
          <!-- <div> style="width: 50px; height: 50px"-->
          <img
            :src="`http://ddragon.leagueoflegends.com/cdn/${lolVersion}/img/champion/${champ.image.full}`"
            v-on:mouseover="handleMouseover(index)"
            v-on:mouseleave="handleMouseleave"
            class="img-thumbnail"
          />
          <span class="fw-bold badge bg-primary text-center text-truncate">
            {{ champ.name }}
          </span>
          <div class="champion-info" v-if="champ.name === overedChampion">
            <!-- {{ apiResult }} -->
            <span class="hard-champion">어려운적</span>
            <div>
              <img
                :src="`http://ddragon.leagueoflegends.com/cdn/${lolVersion}/img/champion/${worst1NameImage}`"
                class="img-thumbnail"
              />
              {{ worst1Name }} : {{ worst1Rate }}
            </div>
            <div>
              <img
                :src="`http://ddragon.leagueoflegends.com/cdn/${lolVersion}/img/champion/${worst2NameImage}`"
                class="img-thumbnail"
              />{{ worst2Name }} : {{ worst2Rate }}
            </div>
            <div>
              <img
                :src="`http://ddragon.leagueoflegends.com/cdn/${lolVersion}/img/champion/${worst3NameImage}`"
                class="img-thumbnail"
              />{{ worst3Name }} : {{ worst3Rate }}
            </div>
            <span class="easy-champion">쉬운적</span>
            <div>
              <img
                :src="`http://ddragon.leagueoflegends.com/cdn/${lolVersion}/img/champion/${great1NameImage}`"
                class="img-thumbnail"
              />{{ great1Name }} : {{ great1Rate }}
            </div>
            <div>
              <img
                :src="`http://ddragon.leagueoflegends.com/cdn/${lolVersion}/img/champion/${great2NameImage}`"
                class="img-thumbnail"
              />{{ great2Name }} : {{ great2Rate }}
            </div>
            <div>
              <img
                :src="`http://ddragon.leagueoflegends.com/cdn/${lolVersion}/img/champion/${great3NameImage}`"
                class="img-thumbnail"
              />{{ great3Name }} : {{ great3Rate }}
            </div>
          </div>
          <div v-else></div>
          <!-- </div> -->
        </li>
        <div>{{ bestRate }}</div>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import BanRecomend from "@/components/BanPick.vue";
import axios from "axios";

export default defineComponent({
  compatConfig: { MODE: 3 },
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
    const worst1NameImage = ""; // 어려운적1 이미지 경로(이미지.png)
    const worst2NameImage = ""; // 어려운적2 이미지 경로(이미지.png)
    const worst3NameImage = ""; // 어려운적3 이미지 경로(이미지.png)
    const great1NameImage = ""; // 쉬운적1 이미지 경로(이미지.png)
    const great2NameImage = ""; // 쉬운적2 이미지 경로(이미지.png)
    const great3NameImage = ""; // 쉬운적3 이미지 경로(이미지.png)
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
      worst1NameImage,
      worst2NameImage,
      worst3NameImage,
      great1NameImage,
      great2NameImage,
      great3NameImage,
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
      this.bestRate = this.champions[championIndex].name; // 선택된 챔피언 인덱스로 이름 가져오기
      this.overedChampion = this.bestRate; //선택된 챔피언들 넣기
      console.log(this.bestRate);
      const response = await axios.get<championData>(
        `http://localhost:3586/champion/name/${this.bestRate}`
      ); // 어려운적, 쉬운적 받아오는 api

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

      // 이름을 가지고 image 찾는 로직
      for (const key in this.champions) {
        if (this.champions[key].name === this.worst1Name) {
          this.worst1NameImage = `${key}.png`;
        }
        if (this.champions[key].name === this.worst2Name) {
          this.worst2NameImage = `${key}.png`;
        }
        if (this.champions[key].name === this.worst3Name) {
          this.worst3NameImage = `${key}.png`;
        }
        if (this.champions[key].name === this.great1Name) {
          this.great1NameImage = `${key}.png`;
        }
        if (this.champions[key].name === this.great2Name) {
          this.great2NameImage = `${key}.png`;
        }
        if (this.champions[key].name === this.great3Name) {
          this.great3NameImage = `${key}.png`;
        }
      }
    },
    handleMouseleave() {
      this.overedChampion = "";
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
