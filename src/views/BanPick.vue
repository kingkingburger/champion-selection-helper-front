<template>
  <!-- 밴 현상황 표 -->
  <div class="row">
    <div class="col">
      <div class="d-flex justify-content-center">
        <img
          class="px-2 mx-1 img-thumbnail mx-auto champion-info-img"
          v-for="(imgSrc, index) in redBan"
          :key="index"
          :src="imgSrc"
          @error="replaceImg"
        />
      </div>
    </div>
    <div class="col">
      <div class="d-flex justify-content-center">
        <img
          class="px-2 mx-1 img-thumbnail mx-auto champion-info-img"
          v-for="(imgSrc, index) in blueBan"
          :key="index"
          :src="imgSrc"
          @error="replaceImg"
        />
      </div>
    </div>
  </div>
  <div class="d-flex justify-content-center">
    <!-- 라인 카테고리 영역 -->
    <button
      class="px-2 mx-1 border fw-bold bg-primary"
      v-for="(line, index) in lineList"
      :key="index"
      @click="clickLine(line)"
    >
      {{ line }}
    </button>
  </div>
  <div class="row justify-content-center">
    <!-- 챔피언 초상화 영역 -->
    <template v-for="(champ, index) in champions" :key="champ.name">
      <!-- 기본 화면 -->
      <li class="col-1" v-if="clickedLine === ''">
        <div>
          <img
            :src="`${champ.img}`"
            @click="championPick(champ, index)"
            class="img-thumbnail mx-auto champion-info-img"
          />
          <div
            class="fw-bold badge bg-primary text-center text-truncate mx-auto"
          >
            {{ champ.name }}
          </div>
        </div>
      </li>
      <!-- 카테고리 선택했을 때 -->
      <li class="col-1" v-else-if="champ.line === clickedLine">
        <div>
          <img
            :src="`${champ.img}`"
            @click="championPick(champ, index)"
            class="img-thumbnail mx-auto champion-info-img"
          />
          <div
            class="fw-bold badge bg-primary text-center text-truncate mx-auto"
          >
            {{ champ.name }}
          </div>
        </div>
      </li>
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import axios from "axios";

export default defineComponent({
  name: "CampionHome",
  //다른 컴포넌트를 쓰고 싶을 때
  components: {},
  data() {
    const apiURL: string =
      process.env.VUE_APP_API_SERVER_URL || "http://localhost:3586";
    const champions: champInfo[] = [];
    const lolVersion = ""; // lol 버전
    const choiseChampion = "";
    const apiResult = {};
    const overedChampion = ""; // 선택된 챔피언
    const checkChamp = ""; // 클릭한 챔피언
    const propChampionImage = ""; // 클릭한 챔피언의 이미지
    const lineList: string[] = ["탑", "정글", "미드", "원딜", "서폿", "전체"]; // 라인 카테고리
    const redBan: string[] = ["1", "2", "3", "4", "5"]; // 왼쪽 라인 밴 상황
    const blueBan: string[] = ["1", "2", "3", "4", "5"]; // 왼쪽 라인 밴 상황
    const clickCount = 0;
    const clickedLine = ""; // 클릭된 라인
    return {
      apiURL: apiURL,
      champions,
      lolVersion,
      choiseChampion,
      apiResult,
      overedChampion,
      checkChamp,
      propChampionImage,
      lineList,
      clickedLine,
      redBan,
      blueBan,
      clickCount,
    };
  },
  compatConfig: { MODE: 3 },
  async mounted() {
    try {
      this.lolVersion = await (
        await axios.get(`${this.apiURL}/champion/version`)
      ).data;
      const responseByMadeApi = await (
        await axios.get<Array<champInfo>>(`${this.apiURL}/champion`)
      ).data;

      this.champions = responseByMadeApi; // db안에 있는 전체 테이블
    } catch (err) {
      console.error(err);
    }
  },
  methods: {
    replaceImg(e: { target: { src: string } }) {
      e.target.src = require(`../assets/logo.png`);
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
      else if (lineIndex === 5) this.clickedLine = "";
    },
    championPick(clickedChampionInfo: champInfo, index: number) {
      const banSequence = [
        this.redBan[4], // 0
        this.blueBan[0], //1
        this.blueBan[1], // 2
        this.redBan[3], //3
        this.redBan[2], //4
        this.blueBan[2], // 5
        this.blueBan[3], // 6
        this.redBan[1], // 7
        this.redBan[0], // 8
        this.blueBan[0], // 9
      ];

      switch (this.clickCount) {
        case 0:
          this.redBan[4] = clickedChampionInfo.img || "";
          break;
        case 1:
          this.blueBan[0] = clickedChampionInfo.img || "";
          break;
        case 2:
          this.blueBan[1] = clickedChampionInfo.img || "";
          break;
        case 3:
          this.redBan[3] = clickedChampionInfo.img || "";
          break;
        case 4:
          this.redBan[2] = clickedChampionInfo.img || "";
          break;
        case 5:
          this.blueBan[2] = clickedChampionInfo.img || "";
          break;
        case 6:
          this.blueBan[3] = clickedChampionInfo.img || "";
          break;
        case 7:
          this.redBan[1] = clickedChampionInfo.img || "";
          break;
        case 8:
          this.redBan[0] = clickedChampionInfo.img || "";
          break;
        case 9:
          this.blueBan[0] = clickedChampionInfo.img || "";
          break;
      }
      this.clickCount += 1;
      console.log(this.redBan, this.blueBan);
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

export interface champInfo {
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

.champion-info-img {
  width: 5rem;
}
</style>
