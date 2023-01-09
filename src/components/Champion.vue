<template>
  <div class="row">
    <div class="position-fixed bottom-0 end-0 p-3" style="z-index: 11">
      <div
        id="liveToast"
        class="toast"
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
      >
        <div class="toast-header">
          <strong class="me-auto">Bootstrap</strong>
          <small>11 mins ago</small>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="toast"
            aria-label="Close"
          ></button>
        </div>
        <div class="toast-body">Hello, world! This is a toast message.</div>
      </div>
    </div>
    <div class="col-8">
      <ul class="row">
        <li v-for="(champ, index) in champions" :key="champ.name" class="col-1">
          <div class="row">
            <img
              :src="`http://ddragon.leagueoflegends.com/cdn/${lolVersion}/img/champion/${champ.image.full}`"
              v-on:click="handleMouseover(index)"
              v-on:mouseleave="handleMouseleave"
              @click="clickChampion(index)"
              class="img-thumbnail mx-auto chamption-info-img"
            />
            <div
              class="fw-bold badge bg-primary text-center text-truncate mx-auto"
            >
              {{ champ.name }}
            </div>
          </div>

          <div
            class="position-fixed top-0 end-0 p-3 bg-success text-dark bg-opacity-10"
            aria-live="assertive"
            aria-atomic="true"
            v-if="champ.name === overedChampion"
          >
            <div class="row">
              <div class="col">
                <span class="hard-champion">어려운적</span>

                <div
                  v-for="(champinfo, index) in worstArray"
                  :key="index"
                  class="row"
                >
                  <img
                    :src="`http://ddragon.leagueoflegends.com/cdn/${lolVersion}/img/champion/${champinfo}`"
                    class="img-thumbnail chamption-info-img col-4"
                  />

                  <span class="col"
                    >{{ worstNameArray[index] }}
                    {{ worstRateArray[index] }}</span
                  >
                </div>
              </div>

              <div class="col">
                <span class="easy-champion">쉬운적</span>
                <div
                  v-for="(champinfo, index) in greatArray"
                  :key="index"
                  class="row"
                >
                  <img
                    :src="`http://ddragon.leagueoflegends.com/cdn/${lolVersion}/img/champion/${champinfo}`"
                    class="img-thumbnail chamption-info-img col-4"
                  />

                  <span class="col"
                    >{{ greatNameArray[index] }}
                    {{ greatRateArray[index] }}</span
                  >
                </div>
              </div>
            </div>
            <BanRecomend
              class="col"
              :championName="checkChamp"
              :propChampionImage="propChampionImage"
              :randomChampion1="randomChampion1"
              :randomChampion2="randomChampion2"
              :randomChampion3="randomChampion3"
              :randomChampion4="randomChampion4"
            ></BanRecomend>
          </div>
          <div v-else></div>
          <!-- </div> -->
        </li>
      </ul>
    </div>
    <!-- <BanRecomend
      class="col"
      :championName="checkChamp"
      :propChampionImage="propChampionImage"
      :randomChampion1="randomChampion1"
      :randomChampion2="randomChampion2"
      :randomChampion3="randomChampion3"
      :randomChampion4="randomChampion4"
    ></BanRecomend> -->
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import BanRecomend from "@/components/BanPick.vue";
import axios from "axios";

export default defineComponent({
  name: "CampionHome",
  //다른 컴포넌트를 쓰고 싶을 때
  components: {
    BanRecomend,
  },
  data() {
    const champions: champ[] = [];
    const lolVersion = "12.23.1";
    const choiseChampion = "";
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
    const checkChamp = ""; // 클릭한 챔피언
    const propChampionImage = ""; // 클릭한 챔피언의 이미지
    const randomChampion1 = ""; // 랜덤 챔피언1
    const randomChampion2 = ""; // 랜덤 챔피언2
    const randomChampion3 = ""; // 랜덤 챔피언3
    const randomChampion4 = ""; // 랜덤 챔피언4
    const championEngName: string[] = []; // 챔피언의 영어이름을 저장하기위한 배열
    const worstArray: string[] = []; // 상대하기 어려운거 3개 모아둔것
    const worstNameArray: string[] = []; // 상대하기 어려운거 3개 모아둔것
    const worstRateArray: string[] = []; // 상대하기 어려운거 3개 모아둔것
    const greatArray: string[] = []; // 상대하기 쉬운것 3개 모아둔곳
    const greatNameArray: string[] = []; // 상대하기 어려운거 3개 모아둔것
    const greatRateArray: string[] = []; // 상대하기 어려운거 3개 모아둔것
    return {
      champions,
      lolVersion,
      choiseChampion,
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
      checkChamp,
      propChampionImage,
      randomChampion1,
      randomChampion2,
      randomChampion3,
      randomChampion4,
      championEngName,
      worstArray,
      greatArray,
      worstNameArray,
      worstRateArray,
      greatNameArray,
      greatRateArray,
    };
  },
  compatConfig: { MODE: 3 },

  async mounted() {
    const response = (
      await axios.get<championData>(
        `https://ddragon.leagueoflegends.com/cdn/${this.lolVersion}/data/ko_KR/champion.json`
      )
    ).data;
    this.champions = response.data;
    // 챔피언의 영어이름을 저장하기
    for (const key in this.champions) {
      this.championEngName.push(key);
    }
  },
  methods: {
    async handleMouseover(championIndex: number) {
      this.choiseChampion = this.champions[championIndex].name; // 선택된 챔피언 인덱스로 이름 가져오기
      this.overedChampion = this.choiseChampion; //선택된 챔피언들 넣기
      const response = await axios.get<championData>(
        `http://localhost:3586/champion/name/${this.choiseChampion}`
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

      //어려운거 3개 모아두기

      //쉬운거 3개 모아두기

      // 이름을 가지고 image 찾는 로직
      for (const key in this.champions) {
        if (this.champions[key].name === this.worst1Name) {
          this.worst1NameImage = `${key}.png`;
          this.worstArray.push(this.worst1NameImage);
          this.worstNameArray.push(this.worst1Name);
          this.worstRateArray.push(this.worst1Rate);
        }
        if (this.champions[key].name === this.worst2Name) {
          this.worst2NameImage = `${key}.png`;
          this.worstArray.push(this.worst2NameImage);
          this.worstRateArray.push(this.worst2Rate);
          this.worstNameArray.push(this.worst2Name);
        }
        if (this.champions[key].name === this.worst3Name) {
          this.worst3NameImage = `${key}.png`;
          this.worstArray.push(this.worst3NameImage);
          this.worstRateArray.push(this.worst3Rate);
          this.worstNameArray.push(this.worst3Name);
        }
        if (this.champions[key].name === this.great1Name) {
          this.great1NameImage = `${key}.png`;
          this.greatNameArray.push(this.great1Name);
          this.greatRateArray.push(this.great1Rate);
          this.greatArray.push(this.great1NameImage);
        }
        if (this.champions[key].name === this.great2Name) {
          this.great2NameImage = `${key}.png`;
          this.greatNameArray.push(this.great2Name);
          this.greatRateArray.push(this.great2Rate);
          this.greatArray.push(this.great2NameImage);
        }
        if (this.champions[key].name === this.great3Name) {
          this.great3NameImage = `${key}.png`;
          this.greatNameArray.push(this.great3Name);
          this.greatRateArray.push(this.great3Rate);
          this.greatArray.push(this.great3NameImage);
        }
      }
    },
    handleMouseleave() {
      this.overedChampion = "";
      // 마우스 때면 챔피언 정보들 초기화
      this.worstArray = [];
      this.worstNameArray = [];
      this.worstRateArray = [];
      this.greatArray = [];
      this.greatNameArray = [];
      this.greatRateArray = [];
    },
    clickChampion(championIndex: number) {
      this.propChampionImage = this.champions[championIndex].image.full; // 선택된 챔피언의 영어 닉네임
      this.checkChamp = this.champions[championIndex].name; // 선택된 챔피언 인덱스로 이름 가져오기

      // 랜덤한 챔피언 영어이름으로 자식 컴포넌트에 보내주기
      this.randomChampion1 = `${
        this.championEngName[Math.floor(Math.random() * 100)]
      }.png`;
      this.randomChampion2 = `${
        this.championEngName[Math.floor(Math.random() * 100)]
      }.png`;
      this.randomChampion3 = `${
        this.championEngName[Math.floor(Math.random() * 100)]
      }.png`;
      this.randomChampion4 = `${
        this.championEngName[Math.floor(Math.random() * 100)]
      }.png`;
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
.chamption-info-img {
  width: 5rem;
}
</style>
