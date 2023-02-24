<template>
  <div class="d-flex justify-content-center">
    <button @click.prevent="initialize">
      <font-awesome-icon icon="fa-rotate-right" size="100" />
    </button>
    <button @click.prevent="championPickInContest">대회</button>
  </div>
  <!-- 밴 현상황 표 -->
  <div class="row">
    <!-- 레드팀 밴창 -->
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

    <!-- 블루팀 밴창 -->
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
    <!-- 레드팀 픽창 -->
    <div class="col-3 pick-img">
      <img
        class="pt-3 img-thumbnail"
        v-for="(red, index) in redPick"
        :key="index"
        :src="red"
        @error="replaceImg"
      />
    </div>
    <!-- 챔피언 영역-->
    <div class="col-6">
      <div class="justify-content-center">
        <!-- 챔피언 초상화 영역 -->
        <template v-for="(champ, index) in champions" :key="champ.name">
          <!-- 기본 화면 -->
          <li class="col-1" v-if="clickedLine === ''">
            <div>
              <img
                :src="`${champ.img}`"
                @click="championPickInContest(champ, index)"
                class="img-thumbnail mx-auto champion-info-img"
              />
              <div
                :class="
                  champ.name === '선택됨'
                    ? 'bg-danger fw-bold badge text-center text-truncate mx-auto'
                    : 'bg-primary fw-bold badge text-center text-truncate mx-auto'
                "
              >
                {{ champ.name }}
              </div>
            </div>
          </li>
          <!-- :src="`${champ.img}`"-->

          <!-- 카테고리 선택했을 때 -->
          <li class="col-1" v-else-if="champ.line === clickedLine">
            <div>
              <img
                :src="`${champ.img}`"
                @click="championPickInContest(champ, index)"
                class="img-thumbnail mx-auto champion-info-img"
              />
              <div
                :class="
                  champ.name === '선택됨'
                    ? 'bg-danger fw-bold badge text-center text-truncate mx-auto'
                    : 'bg-primary fw-bold badge text-center text-truncate mx-auto'
                "
              >
                {{ champ.name }}
              </div>
            </div>
          </li>
        </template>
      </div>
    </div>
    <!-- 블루팀 픽창 -->
    <div class="col-3 pick-img">
      <img
        class="pt-3 img-thumbnail"
        v-for="(blue, index) in bluePick"
        :key="index"
        :src="blue"
        @error="replaceImg"
      />
    </div>
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
    const lineList: string[] = []; // 라인 카테고리
    const redBan: string[] = []; // 왼쪽 라인 밴 상황
    const blueBan: string[] = []; // 왼쪽 라인 밴 상황
    const redPick: string[] = []; // 왼쪽 라인 밴 상황
    const bluePick: string[] = []; // 왼쪽 라인 밴 상황
    const clickCount = 0;
    const clickedLine = ""; // 클릭된 라인
    return {
      apiURL: apiURL,
      champions,
      lolVersion,
      lineList,
      clickedLine,
      redBan,
      blueBan,
      redPick,
      bluePick,
      clickCount,
    };
  },
  compatConfig: { MODE: 3 },
  async mounted() {
    this.lolVersion = await (
      await axios.get(`${this.apiURL}/champion/version`)
    ).data;
    await this.initialize();
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
    deleteChampion(index: number) {
      this.champions[index].img = require(`../assets/logo.png`);
      this.champions[index].name = "선택됨";
    },
    championPick(clickedChampionInfo: champInfo, index: number) {
      let clickCount = this.clickCount;
      const clickChamp = clickedChampionInfo.img || "";
      const redBan = this.redBan;
      const blueBan = this.blueBan;
      const redPick = this.redPick;
      const bluePick = this.bluePick;
      // red = 0, blue = 1
      const banSequence = [0, 1, 1, 0, 0, 1, 1, 0, 0, 1];
      const banIndex = [4, 0, 1, 3, 2, 2, 3, 1, 0, 4];
      const pickSequence = [0, 1, 1, 0, 0, 1, 1, 0, 0, 1];
      const pickIndex = [0, 0, 1, 1, 2, 2, 3, 3, 4, 4];

      const banStation = banIndex[clickCount];
      // 밴 순서랑 픽 순서랑 배열로 묶어놓으면 되지 않을까?..

      // 밴 순서
      if (banSequence[clickCount] === 0) {
        // redTeam
        redBan[banStation] = clickChamp;
      } else {
        // blueTeam
        blueBan[banStation] = clickChamp;
      }

      // 픽 순서
      if (clickCount <= 19) {
        const pickStation = pickIndex[clickCount % 10];
        if (clickCount >= 10 && pickSequence[clickCount % 10] === 0) {
          // redTeam
          redPick[pickStation] = clickChamp;
        } else if (clickCount >= 10 && pickSequence[clickCount % 10] === 1) {
          // blueTeam
          bluePick[pickStation] = clickChamp;
        }
        this.deleteChampion(index);

        this.clickCount += 1;
      }
    },

    async initialize() {
      try {
        const responseByMadeApi = await (
          await axios.get<Array<champInfo>>(`${this.apiURL}/champion`)
        ).data;
        this.champions = responseByMadeApi; // db안에 있는 전체 테이블
      } catch (err) {
        console.error(err);
      }
      this.lineList = ["탑", "정글", "미드", "원딜", "서폿", "전체"]; // 라인 카테고리
      this.redBan = ["1", "2", "3", "4", "5"]; // 왼쪽 라인 밴 상황
      this.blueBan = ["1", "2", "3", "4", "5"]; // 왼쪽 라인 밴 상황
      this.redPick = ["1", "2", "3", "4", "5"]; // 왼쪽 라인 밴 상황
      this.bluePick = ["1", "2", "3", "4", "5"]; // 왼쪽 라인 밴 상황
      this.clickCount = 0;
      this.clickedLine = ""; // 클릭된 라인
    },
    championPickInContest(clickedChampionInfo: champInfo, index: number) {
      let clickCount = this.clickCount;
      if (clickCount > 19) return;
      const clickChamp = clickedChampionInfo.img || "";
      const redBan = this.redBan;
      const blueBan = this.blueBan;
      const redPick = this.redPick;
      const bluePick = this.bluePick;
      // red = 0, blue = 1
      const banSequence = [0, 1, 0, 1, 0, 1, 0, 1, 0, 1];
      const banIndex = [4, 0, 3, 1, 2, 2, 1, 3, 0, 4];
      const pickSequence = [0, 1, 1, 0, 0, 1, 1, 0, 0, 1];
      const pickIndex = [0, 0, 1, 1, 2, 2, 3, 3, 4, 4];

      const banStation = banIndex[clickCount];
      // 밴 순서랑 픽 순서랑 배열로 묶어놓으면 되지 않을까?..

      // 밴 순서
      if (clickCount < 6) {
        if (banSequence[clickCount] === 0) {
          // redTeam
          redBan[banStation] = clickChamp;
        } else {
          // blueTeam
          blueBan[banStation] = clickChamp;
        }
      }

      // 픽 순서
      if (clickCount >= 6 && clickCount < 12) {
        const pickStation = pickIndex[clickCount % 6];
        const redBlue = pickSequence[clickCount % 6];
        if (redBlue === 0) {
          // redTeam
          redPick[pickStation] = clickChamp;
        } else if (redBlue === 1) {
          // blueTeam
          bluePick[pickStation] = clickChamp;
        }
      }

      // 밴 순서
      if (clickCount >= 12 && clickCount < 16) {
        const banStation = banIndex[clickCount - 6];
        if (banSequence[clickCount - 6] === 0) {
          // redTeam
          redBan[banStation] = clickChamp;
        } else {
          // blueTeam
          blueBan[banStation] = clickChamp;
        }
      }

      if (clickCount >= 16) {
        const pickStation = pickIndex[clickCount % 10];
        const redBlue = pickSequence[clickCount % 10];
        if (redBlue === 0) {
          // redTeam
          redPick[pickStation] = clickChamp;
        } else if (redBlue === 1) {
          // blueTeam
          bluePick[pickStation] = clickChamp;
        }
      }
      this.deleteChampion(index);

      this.clickCount += 1;
    },
  },
});

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
.pick-img {
  width: 7rem;
}
</style>
