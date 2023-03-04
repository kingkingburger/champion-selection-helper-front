<template>
  <div>
    <p>합계: {{ total }}</p>
    <button @click="changeNumbers">숫자 변경</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      numbers: [1, 2, 3, 4, 5],
    };
  },
  computed: {
    total() {
      console.log("계산합니다.");
      return this.numbers.reduce((acc, cur) => {
        console.log("다시 계산안됨");
        return acc + cur;
      }, 0);
    },
  },
  methods: {
    changeNumbers() {
      // numbers 배열의 값을 변경합니다.
      this.numbers.push(Math.floor(Math.random() * 10) + 1);
    },
  },
  created() {
    // 컴포넌트 생성시 computed 속성을 계산합니다.
    this.total;
  },
};
</script>
