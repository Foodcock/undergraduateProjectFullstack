<template>
  <div class="body">
    <div class="row row-cols-md-2 row-cols-lg-5 row-cols-sm-1 g-2 g-lg-3 m-4">
      <div class="col" v-for="item in items" :key="item.id">
        <div class="card mb-3 text-center" style="width: 300px">
          <div>
            <img
              :src="getImageUrl(item.groceryName)"
              class="food-img"
              style="max-width: 64px"
              alt="item.groceryName"
            />
          </div>
          <div class="item">
            <p>商店名稱: {{ item.storeName }}</p>
            <p>商店地址: 台北市XX區XX路</p>
            <p>商品名: {{ item.groceryName }}</p>
            <p>折扣價: {{ item.discountedPrice }}</p>
            <p>過期日期: {{ item.expirationDate }}</p>
            <button class="btn btn-primary" @click="addToCart(item)">
              加入購物車
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "StorePage",
  data() {
    return {
      items: [],
    };
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      let storeName = this.$route.params.storeName;
      const url = "/db/items/" + storeName;
      fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          if (response.ok) {
            console.log("成功");
            return response.json();
          } else {
            console.log("錯誤");
            throw new Error("錯誤");
          }
        })
        .then((data) => {
          console.log(data);
          this.items = data;
        })
        .catch((error) => {
          console.error("錯誤:", error);
        });
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
    addToCart(item) {
      let cart = JSON.parse(localStorage.getItem("cart")) || [];
      cart.push(item);
      localStorage.setItem("cart", JSON.stringify(cart));
      const index = this.items.indexOf(item);

      if (index > -1) {
        this.items.splice(index, 1);
      }
      alert(item.groceryName + "已加入購物車!");
    },
  },
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.body {
  font-family: "Noto Sans", "Microsoft JhengHei";
  background: rgba(144, 189, 231, 0.479);
  background-size: cover;
  background-position: center;
}

/* 下面是頁首的設定 */
.wrap-content {
  box-sizing: border-box;
  width: 1024px;
}
.header-content {
  position: sticky;
  top: 0;
  background-color: rgb(144, 189, 231);
  border-bottom: 2px solid rgb(10, 90, 136);
  height: 70px;
  padding-left: 30px;
  padding-right: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 1;
}
.search {
  position: relative;
  float: left;
}
.search-bar {
  width: 90%;
  height: 32px;
  font-size: 20px;
  border: 3px solid #3d1101;
  background-color: #efe9e7;
}
.search-btn {
  width: 36px;
  height: 32px;
  background-color: chocolate;
  color: #efe9e7;
  outline: none;
  border: 3px solid #3d1101;
  cursor: pointer;
  position: absolute;
  top: 0;
  right: 0;
}

.navbar {
  border: #ffb500 3px solid;
}
.collapse {
  background-color: #3d1101;
}
.nav-item {
  background-color: wheat;
}
.dropdown-item {
  background-color: wheat;
}
.logo {
  font-family: "Fira Sans Extra Condensed", sans-serif;
  text-decoration: underline;
}
.link-text:hover {
  transition: all 0.2s;
  color: #ffb500;
}
.content-img {
  margin: 0 auto;
  text-align: center;
}

main {
  display: flex;
}

/* 資料呈現方式 */
#dataDisplay {
  margin: 0px;
  padding: 10px 0px 10px 0px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.item {
  min-width: auto;
  margin: 3px;
  background-color: whitesmoke;
  border: 3px solid black;
}
</style>