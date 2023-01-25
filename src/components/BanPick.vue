<template>
  <div>
    <div class="randomBanPickTtile">랜덤 조합기!</div>
    <span>챔피언을 클릭하면 나옵니다</span>
    <div>기준 챔피언 이름 : {{ championName }}</div>
    <div>
      <div>
        <img
          :src="`${propChampionImage}`"
          class="img-thumbnail champion-info-img"
        />
      </div>

      <div>
        <img
          :src="`${randomChampion1}`"
          class="img-thumbnail champion-info-img"
        />
      </div>

      <div>
        <img
          :src="`${randomChampion2}`"
          class="img-thumbnail champion-info-img"
        />
      </div>

      <div>
        <img
          :src="`${randomChampion3}`"
          class="img-thumbnail champion-info-img"
        />
      </div>

      <div>
        <img
          :src="`${randomChampion4}`"
          class="img-thumbnail champion-info-img"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  // compatConfig: { MODE: 3 },
  name: "BanRecomend",
  data() {
    const lolVersion = "13.1.1";
    return { lolVersion };
  },
  props: {
    championName: String,
    propChampionImage: String, // 부모에서 받아온 이미지 경로(이미지.png)
    randomChampion1: String, // 부모에서 받아온 랜덤 이미지 경로(이미지.png)
    randomChampion2: String, // 부모에서 받아온 랜덤 이미지 경로(이미지.png)
    randomChampion3: String, // 부모에서 받아온 랜덤 이미지 경로(이미지.png)
    randomChampion4: String, // 부모에서 받아온 랜덤 이미지 경로(이미지.png)
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
.randomBanPickTtile {
  color: brown;
  size: 100px;
}

.champion-info-img {
  width: 5rem;
}
</style>
