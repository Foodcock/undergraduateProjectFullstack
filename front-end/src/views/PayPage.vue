<template>
  <div class="body">
    <h1>結帳頁面</h1>
    <div>
      <h2>購買人資訊</h2>
      <label>
        姓名:
        <input type="text" v-model="userInfo.name" />
      </label>
      <label>
        電話:
        <input type="text" v-model="userInfo.phone" />
      </label>
      <label v-if="deliveryOptions.deliveryType === 'delivery'">
        地址:
        <input type="text" v-model="userInfo.address" />
      </label>
    </div>

    <div>
      <h2>購買商品</h2>
      <div
        v-for="item in groceries"
        :key="item.groceryName"
        class="grocery-item"
      >
        <h3>商品名稱: {{ item.groceryName }}</h3>
        <img :src="getImageUrl(item.groceryName)" alt="商品圖片" />
        <p>店名: {{ item.storeName }}</p>
        <p>折扣價: {{ item.discountedPrice }} 元</p>
        <p>有效期至: {{ item.expirationDate }}</p>
      </div>
      <p>總價: {{ totalPrice }} 元</p>
    </div>

    <div>
      <h2>備註</h2>
      <textarea v-model="orderNote" placeholder="請輸入備註"></textarea>
    </div>

    <div>
      <div>
        <label>
          <input
            type="radio"
            v-model="deliveryOptions.deliveryType"
            value="delivery"
          />
          外送
        </label>
        <label>
          <input
            type="radio"
            v-model="deliveryOptions.deliveryType"
            value="pickup"
          />
          自取
        </label>
      </div>
      <h2>支付方式</h2>
      <button @click="pay('Line Pay')">使用 Line Pay 付款</button>
      <button @click="pay('Apple Pay')">使用 Apple Pay 付款</button>
      <button @click="pay('現金')">使用 現金 付款</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "PayPage",
  data() {
    let groceries = JSON.parse(localStorage.getItem("cart")) || [];
    return {
      groceries,
      userInfo: {
        name: "",
        phone: "",
        address: "",
      },
      deliveryOptions: {
        deliveryType: "",
      },
      orderNote: "",
    };
  },
  computed: {
    totalPrice() {
      return this.groceries.reduce(
        (acc, item) => acc + parseInt(item.discountedPrice),
        0
      );
    },
  },
  methods: {
    pay(method) {
      if (this.deliveryOptions.deliveryType == "") {
        alert("請選擇自取或外送");
        return;
      }
      if (this.deliveryOptions.deliveryType == "pickup") {
        alert("自取");
        alert(method + "扣款成功!");
      } else if (this.deliveryOptions.deliveryType == "delivery") {
        alert(method + "扣款成功!");
        alert("外送");
      }
    },
    getImageUrl(groceryName) {
      const images = {
        飯糰: "images/onigiri.png",
        麵包: "images/bread.png",
        漢堡: "images/burger.png",
        三明治: "images/sandwich.png",
        便當: "images/bento.png",
      };
      return images[groceryName] || "images/default.png";
    },
  },
};
</script>

<style scoped>
body {
  font-family: Arial, sans-serif;
  background-color: #f7f7f7;
  margin: 0;
  padding: 20px;
}

.body {
  max-width: 800px;
  margin: auto;
  background-color: #ffffff;
  padding: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

h1 {
  font-size: 2em;
  color: #333;
  margin-bottom: 20px;
}

h2 {
  font-size: 1.5em;
  color: #555;
  margin-top: 20px;
  margin-bottom: 10px;
}

label {
  display: block;
  margin-bottom: 10px;
}

label input[type="text"] {
  width: 100%;
  padding: 8px;
  margin-top: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

textarea {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  resize: vertical;
  margin-bottom: 20px;
}

.grocery-item {
  background-color: #f9f9f9;
  padding: 15px;
  margin-bottom: 15px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.grocery-item h3 {
  margin-top: 0;
}

.grocery-item img {
  max-width: 100px;
  display: block;
  margin-bottom: 10px;
}

button {
  background-color: cornflowerblue;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-right: 10px;
  margin-bottom: 10px;
}

button:hover {
  background-color: #0056b3;
}

input[type="radio"] {
  margin-right: 5px;
}

input[type="radio"] + label {
  margin-right: 15px;
}
</style>