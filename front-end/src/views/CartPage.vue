<template>
  <div class="body">
    <div id="grocery-list">
      <div v-for="(item, index) in groceries" :key="item.groceryName" class="grocery-item">
        <input type="checkbox" v-model="item.checked" />
        <img :src="getImageUrl(item.groceryName)" alt="商品圖片" />
        <h2>商品名稱: {{ item.groceryName }}</h2>
        <p>店名: {{ item.storeName }}</p>
        <p>折扣價: {{ item.discountedPrice }} 元</p>
        <p>有效期至: {{ item.expirationDate }}</p>
        <div class="actions">
          <button @click="removeItem(index)">刪除</button>
          <button @click="findBetterDeal(item)">更優惠</button>
        </div>
      </div>
    </div>
    <div id="totalPrice">
      <h2>總價: {{ totalPrice }} 元</h2>
    </div>
    <button @click="toHomePage">繼續選購</button>
    <button @click="toPayPage">結帳</button>

    <!-- 彈出視窗 -->
    <div v-if="showModal" class="modal-overlay" @click.self="closeModal">
      <div class="modal-content">
        <h2>更優惠的商品</h2>
        <div v-if="betterDeals.length > 0" class="deals-container">
          <div v-for="deal in betterDeals" :key="deal.id" class="deal-item">
            <p>商品名稱: {{ deal.groceryName }}</p>
            <p>店名: {{ deal.storeName }}</p>
            <p>折扣價: {{ deal.discountedPrice }} 元</p>
            <p>有效期至: {{ deal.expirationDate }}</p>
            <button @click="addToCart(deal)">加入購物車</button>
          </div>
        </div>
        <div v-else>
          <p>目前沒有找到更優惠的價格。</p>
        </div>
        <button @click="closeModal">關閉</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CartPage",
  data() {
    let groceries = JSON.parse(localStorage.getItem("cart")) || [];
    groceries = groceries.map((item) => ({ ...item, checked: true }));
    return {
      groceries,
      showModal: false,
      betterDeals: [],
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
      this.$router.push("/pay");
    },
    toHomePage() {
      this.$router.push("/home");
    },
    removeItem(index) {
      this.groceries.splice(index, 1);
      localStorage.setItem("cart", JSON.stringify(this.groceries));
    },
    addToCart(item) {
      this.groceries.push({ ...item, checked: true });
      localStorage.setItem("cart", JSON.stringify(this.groceries));
      alert(`${item.groceryName} 已加入購物車！`);
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
    async findBetterDeal(item) {
      try {
        const response = await fetch(
          `/db/better/${item.discountedPrice}/${item.groceryName}`
        );
        const data = await response.json();
        this.betterDeals = data;
        this.showModal = true;
      } catch (error) {
        console.error("查詢優惠時發生錯誤:", error);
        alert("查詢優惠失敗，請稍後再試。");
      }
    },
    closeModal() {
      this.showModal = false;
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
  align-items: flex-start;
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

.actions {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.grocery-item button {
  background-color: #ff6666;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 8px 12px;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-bottom: 5px;
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

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background-color: #ffffff;
  padding: 20px;
  border-radius: 10px;
  max-width: 500px;
  width: 90%;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
}

.modal-content h2 {
  margin-top: 0;
}

.modal-content .deal-item {
  margin-bottom: 10px;
}

.deals-container {
  max-height: 300px;
  overflow-y: auto;
}
</style>