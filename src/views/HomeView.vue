<template>
  <div class="home">
    <CampionHome />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
// import HelloWorld from "@/components/HelloWorld.vue"; // @ is an alias to /src
// components는 import로 가져온 Vue 컴포넌트를 사용하기 위해 import 한 이름으로 등록합니다.
// 그리고 등록된 Vue 컴포넌트는 <template>에서 태그로 사용되어야 합니다.
import CampionHome from "@/components/Champion.vue";
export default defineComponent({
  name: "CampionHome",
  components: {
    CampionHome,
  },
});
</script>
