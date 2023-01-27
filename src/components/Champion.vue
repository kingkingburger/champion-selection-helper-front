<template>
  <div class="row">
    <div class="col-8">
      <div class="d-flex justify-content-center">
        <!-- 라인 카테고리 영역 -->
        <button class="px-2 mx-1 border" v-for="(line, index) in lineList" :key="index" @click="clickLine(line)">
          {{ line }}
        </button>
      </div>

      <!-- 챔피언 초상화 영역 -->
      <template v-for="(champ, index) in champions" :key="champ.name">
        <!-- 기본 화면 -->
        <li class="col-1" v-if="clickedLine === ''">
          <div>
            <img
              :src="`${champ.img}`"
              v-on:click="handleMouseover(index)"
              @click="clickChampion(champ, index)"
              class="img-thumbnail mx-auto chamption-info-img"
            />
            <div class="fw-bold badge bg-primary text-center text-truncate mx-auto">
              {{ champ.name }}
            </div>
          </div>
        </li>
        <!-- 카테고리 선택했을 때 -->
        <li class="col-1" v-else-if="champ.line === clickedLine">
          <div>
            <img
              :src="`${champ.img}`"
              v-on:click="handleMouseover(index)"
              @click="clickChampion(champ, index)"
              class="img-thumbnail mx-auto chamption-info-img"
            />
            <div class="fw-bold badge bg-primary text-center text-truncate mx-auto">
              {{ champ.name }}
            </div>
          </div>
        </li>
      </template>
    </div>
    <!-- 오른쪽 추천 화면 -->
    <div
      class="col-4 bg-success text-dark bg-opacity-10 overflow-auto"
      aria-live="assertive"
      aria-atomic="true"
      v-if="overedChampion"
    >
      <div class="row">
        <div class="col">
          <HardChampion
            :worstArray="worstArray"
            :lolVersion="lolVersion"
            :worstNameArray="worstNameArray"
            :worstRateArray="worstRateArray"
          ></HardChampion>
        </div>

        <div class="col">
          <EasyChampion
            :greatArray="greatArray"
            :lolVersion="lolVersion"
            :greatNameArray="greatNameArray"
            :greatRateArray="greatRateArray"
          ></EasyChampion>
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
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import BanRecomend from "@/components/BanPick.vue";
import EasyChampion from "@/components/EasyChampion.vue";
import HardChampion from "@/components/HardChampion.vue";
import axios from "axios";

export default defineComponent({
  name: "CampionHome",
  //다른 컴포넌트를 쓰고 싶을 때
  components: {
    BanRecomend,
    EasyChampion,
    HardChampion,
  },
  data() {
    const apiURL: string = process.env.VUE_APP_API_SERVER_URL || "http://localhost:3586";
    const champions: champInfo[] = [];
    const lolVersion = ""; // lol 버전
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
    const lineList: string[] = ["탑", "정글", "미드", "원딜", "서폿"]; // 라인 카테고리
    const clickedLine = ""; // 클릭된 라인
    return {
      apiURL: apiURL,
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
      lineList,
      clickedLine,
    };
  },
  compatConfig: { MODE: 3 },
  async mounted() {
    this.lolVersion = await (await axios.get(`${this.apiURL}/champion/version`)).data;
    const responseByMadeApi = await (await axios.get<Array<champInfo>>(`${this.apiURL}/champion`)).data;

    this.champions = responseByMadeApi; // db안에 있는 전체 테이블

    // 챔피언의 영어이름을 저장하기
    for (const key in this.champions) {
      this.championEngName.push(this.champions[key].engName ?? ""); // !은 무조건 있다는 표시, ?? 은 undefine, null이면 뒤에꺼 표시
      // 챔피언의 라인을 저장하기
      responseByMadeApi.forEach((info) => {
        if (info.engName === key) this.champions[key].line = info.line || "";
      });
    }
  },
  methods: {
    async handleMouseover(championIndex: number) {
      this.initChampionData();
      this.choiseChampion = this.champions[championIndex].name || ""; // 선택된 챔피언 인덱스로 이름 가져오기
      this.overedChampion = this.choiseChampion; //선택된 챔피언들 넣기
      const response = await axios.get<championData>(`${this.apiURL}/champion/name/${this.choiseChampion}`); // 어려운적, 쉬운적 받아오는 apiURL
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
          this.worst1NameImage = `${this.champions[key].engName}.png`;
          this.worstArray.push(this.worst1NameImage);
          this.worstNameArray.push(this.worst1Name);
          this.worstRateArray.push(this.worst1Rate);
        }
        if (this.champions[key].name === this.worst2Name) {
          this.worst2NameImage = `${this.champions[key].engName}.png`;
          this.worstArray.push(this.worst2NameImage);
          this.worstRateArray.push(this.worst2Rate);
          this.worstNameArray.push(this.worst2Name);
        }
        if (this.champions[key].name === this.worst3Name) {
          this.worst3NameImage = `${this.champions[key].engName}.png`;
          this.worstArray.push(this.worst3NameImage);
          this.worstRateArray.push(this.worst3Rate);
          this.worstNameArray.push(this.worst3Name);
        }
        if (this.champions[key].name === this.great1Name) {
          this.great1NameImage = `${this.champions[key].engName}.png`;
          this.greatNameArray.push(this.great1Name);
          this.greatRateArray.push(this.great1Rate);
          this.greatArray.push(this.great1NameImage);
        }
        if (this.champions[key].name === this.great2Name) {
          this.great2NameImage = `${this.champions[key].engName}.png`;
          this.greatNameArray.push(this.great2Name);
          this.greatRateArray.push(this.great2Rate);
          this.greatArray.push(this.great2NameImage);
        }
        if (this.champions[key].name === this.great3Name) {
          this.great3NameImage = `${this.champions[key].engName}.png`;
          this.greatNameArray.push(this.great3Name);
          this.greatRateArray.push(this.great3Rate);
          this.greatArray.push(this.great3NameImage);
        }
      }
    },
    initChampionData() {
      this.overedChampion = "";
      // 마우스 때면 챔피언 정보들 초기화
      this.worstArray = [];
      this.worstNameArray = [];
      this.worstRateArray = [];
      this.greatArray = [];
      this.greatNameArray = [];
      this.greatRateArray = [];
    },

    // 배열의 랜덤한 element를 반환
    getRandomElement<T>(arr: Array<T>): T {
      return arr[Math.floor(Math.random() * arr.length)];
    },

    clickChampion(clickedChampionInfo: champInfo, index: number) {
      let lineArray = ["top", "jug", "mid", "ad", "sup"];

      this.propChampionImage = clickedChampionInfo.img || ""; // 선택된 챔피언의 이미지 경로
      this.checkChamp = clickedChampionInfo.name || ""; // 선택된 챔피언 인덱스로 이름 가져오기
      const checkedChampLine = clickedChampionInfo.line || ""; // 선택된 챔피언 라인

      // 선택한 라인 제외하기 (4개의 라인만 남음)
      lineArray = lineArray.filter((line) => line !== checkedChampLine);

      // 4개 라인중의 랜덤한 챔피언 보여주기
      this.randomChampion1 =
        this.getRandomElement(this.champions.filter((champ) => champ.line === lineArray[0])).img ?? "";
      this.randomChampion2 =
        this.getRandomElement(this.champions.filter((champ) => champ.line === lineArray[1])).img ?? "";
      this.randomChampion3 =
        this.getRandomElement(this.champions.filter((champ) => champ.line === lineArray[2])).img ?? "";
      this.randomChampion4 =
        this.getRandomElement(this.champions.filter((champ) => champ.line === lineArray[3])).img ?? "";
    },

    clickLine(lineParam: string) {
      this.clickedLine = lineParam;
      // 라인 선택하기
      const lineIndex = this.lineList.findIndex((line) => line === lineParam);
      if (lineIndex === 0) this.clickedLine = "top";
      else if (lineIndex === 1) this.clickedLine = "jug";
      else if (lineIndex === 2) this.clickedLine = "mid";
      else if (lineIndex === 3) this.clickedLine = "ad";
      else if (lineIndex === 4) this.clickedLine = "sup";
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
  line: string;
}

interface champInfo {
  id?: number;
  key?: number;
  name?: string;
  engName?: string;
  line?: string;
  img?: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
  championRateName?: {
    id?: number;
    name?: string;
    worst1Name?: string;
    worst2Name?: string;
    worst3Name?: string;
    worst1Rate?: string;
    worst2Rate?: string;
    worst3Rate?: string;
    great1Name?: string;
    great2Name?: string;
    great3Name?: string;
    great1Rate?: string;
    great2Rate?: string;
    great3Rate?: string;
  };
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

.chamption-info-img {
  width: 5rem;
}
</style>
