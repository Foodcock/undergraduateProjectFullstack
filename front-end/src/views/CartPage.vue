<template>
  <div class="body">
    <div id="grocery-list">
      <div
        v-for="item in groceries"
        :key="item.groceryName"
        class="grocery-item"
      >
        <img :src="getImageUrl(item.groceryName)" alt="商品圖片" />
        <h2>商品名稱: {{ item.groceryName }}</h2>
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
.body {
  font-family: "Arial", sans-serif;
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

#grocery-list {
  margin-bottom: 20px;
}

.grocery-item {
  background-color: #ffffff;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 15px;
  margin-bottom: 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.grocery-item h2 {
  margin: 0;
  font-size: 20px;
  color: #333;
}

.grocery-item img {
  max-width: 80px;
  max-height: 80px;
  object-fit: cover;
  border-radius: 8px;
  margin-right: 15px;
}

.grocery-item p {
  margin: 5px 0;
  color: #666;
}

.grocery-item button {
  background-color: #ff6666;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 8px 12px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.grocery-item button:hover {
  background-color: #cc0000;
}

input[type="checkbox"] {
  transform: scale(1.5);
  margin-left: 10px;
  cursor: pointer;
}

#totalPrice {
  font-size: 24px;
  font-weight: bold;
  color: #333;
  text-align: right;
}

#totalPrice h2 {
  margin: 0;
}

button {
  background-color: #3399ff;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 10px 15px;
  font-size: 16px;
  cursor: pointer;
  margin-right: 10px;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #0066cc;
}
</style>