<template>
  <div class="body">
    <div id="grocery-list">
      <div
        v-for="item in groceries"
        :key="item.groceryName"
        class="grocery-item"
      >
        <h2>商品名稱: {{ item.groceryName }}</h2>
        <img :src="getImageUrl(item.groceryName)" alt="商品圖片" />
        <p>店名: {{ item.storeName }}</p>
        <p>折扣價: {{ item.discountedPrice }} 元</p>
        <p>有效期至: {{ item.expirationDate }}</p>
        <button @click="removeItem(index)">刪除</button>
        <div>
          <input type="checkbox" v-model="item.checked" />
        </div>
      </div>
    </div>
    <div id="totalPrice">
      <h2>總價: {{ totalPrice }}</h2>
    </div>
    <button @click="toHomePage">繼續選購</button>
    <button @click="toPayPage">結帳</button>
  </div>
</template>

<script>
export default {
  name: "CartPage",
  data() {
    let groceries = JSON.parse(localStorage.getItem("cart")) || [];
    console.log(groceries);
    groceries = groceries.map((item) => ({ ...item, checked: true }));
    return {
      groceries,
    };
  },
  computed: {
    totalPrice() {
      return this.groceries
        .filter((item) => item.checked)
        .reduce((acc, item) => acc + parseInt(item.discountedPrice), 0);
    },
  },
  methods: {
    toPayPage() {
      window.location.href = "pay";
    },
    toHomePage() {
      window.location.href = "home";
    },
    removeItem(index) {
      this.groceries.splice(index, 1);
      localStorage.setItem("cart", JSON.stringify(this.groceries));
    },
    getImageUrl(groceryName) {
      const images = {
        飯糰: require("../assets/onigiri.png"),
        麵包: require("../assets/bread.png"),
        漢堡: require("../assets/burger.png"),
        三明治: require("../assets/sandwich.png"),
        便當: require("../assets/bento.png"),
      };
      return images[groceryName] || "images/default.png";
    },
  },
};
</script>

<style scoped>
h1 {
  color: cornflowerblue;
}
</style>