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
      <div v-for="item in groceries" :key="item.groceryName" class="grocery-item">
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
          <input type="radio" v-model="deliveryOptions.deliveryType" value="delivery" />
          外送
        </label>
        <label>
          <input type="radio" v-model="deliveryOptions.deliveryType" value="pickup" />
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
    generateHtmlMessage(method) {
      const { name, phone, address } = this.userInfo;
      const deliveryType =
        this.deliveryOptions.deliveryType === "delivery" ? "外送" : "自取";
      const orderNote = this.orderNote;
      const totalPrice = this.totalPrice;

      const groceryItemsHtml = this.groceries
        .map(
          (item) => `
        <div>
          <h3>商品名稱: ${item.groceryName}</h3>
          <img src="${this.getImageUrl(
            item.groceryName
          )}" alt="商品圖片" style="max-width: 100px;" />
          <p>店名: ${item.storeName}</p>
          <p>折扣價: ${item.discountedPrice} 元</p>
          <p>有效期至: ${item.expirationDate}</p>
        </div>
      `
        )
        .join("");

      return `
      <div>
        <h1>訂單確認</h1>
        <h2>購買人資訊</h2>
        <p>姓名: ${name}</p>
        <p>電話: ${phone}</p>
        ${deliveryType === "外送" ? `<p>地址: ${address}</p>` : ""}
        
        <h2>購買商品</h2>
        ${groceryItemsHtml}
        <h2>總價: ${totalPrice} 元</h2>
        
        <h2>備註</h2>
        <p>${orderNote}</p>
        
        <h2>配送方式</h2>
        <p>${deliveryType}</p>
        
        <h2>支付方式</h2>
        <p>${method || "未選擇"}</p>
      </div>
    `;
    },
    pay(method) {
      if (this.deliveryOptions.deliveryType == "") {
        alert("請選擇自取或外送");
        return;
      }
      fetch("/mail/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: localStorage.getItem("userEmail"),
          message: this.generateHtmlMessage(method),
        }),
      })
        .then((response) => {
          if (response.ok) {
            alert("付款成功，使用: " + method);
          } else {
            alert("錯誤");
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    },
    getImageUrl(groceryName) {
      const images = {
        飯糰: "https://i.imgur.com/0zadqbP.png",
        麵包: "https://i.imgur.com/auWtXfJ.png",
        漢堡: "https://i.imgur.com/DyoeYkM.png",
        三明治: "https://imgur.com/RKYPT9e.png",
        便當: "https://imgur.com/TKNueow.png",
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

input[type="radio"]+label {
  margin-right: 15px;
}
</style>