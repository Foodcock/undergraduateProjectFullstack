<template>
  <div class="body">
    <h1>商家功能</h1>
    <button @click="generateData">產生假資料</button>
    <button @click="append">把假資料中符合條件的資料匯入資料庫</button>
  </div>
</template>

<script>
export default {
  name: "MerchantPage",
  data() {
    return {};
  },
  methods: {
    generateData() {
      fetch("/db/generateItems", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          if (response.ok) {
            console.log("成功");
            alert("成功");
          } else {
            console.log("失敗");
            alert("失敗");
          }
        })
        .catch((error) => {
          console.error("錯誤:", error);
        });
    },
    append() {
      fetch("/db/append", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          if (response.ok) {
            console.log("成功");
            alert("成功");
          } else {
            console.log("失敗");
            alert("失敗");
          }
        })
        .catch((error) => {
          console.error("錯誤:", error);
        });
    },
  },
};
</script>
<style scoped>
.body {
  font-family: "Arial", sans-serif;
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}
</style>