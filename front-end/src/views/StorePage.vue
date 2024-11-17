<template>
  <div class="body">
    <NavBar @update-search-query="handleSearchQuery" />
    <div class="main">
      <div class="datadisplay">
        <div class="row row-cols-md-2 row-cols-lg-5 row-cols-sm-1 g-2 g-lg-3 m-4">
          <div class="col" v-for="item in filteredItems" :key="item.id">
            <div class="card mb-3 text-center" style="width: 300px">
              <div>
                <img :src="getImageUrl(item.groceryName)" class="food-img" style="max-width: 64px"
                  alt="item.groceryName" />
              </div>
              <div class="item">
                <p>商店名稱: {{ item.storeName }}</p>
                <p>商店地址: {{ item.storeAddress }}</p>
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
    </div>
  </div>
</template>

<script>
import NavBar from "@/components/NavBar.vue";

export default {
  name: "StorePage",
  data() {
    return {
      searchQuery: "",
      items: [],
    };
  },
  created() {
    this.getData();
  },
  computed: {
    filteredItems() {
      if (!this.searchQuery) {
        return this.items;
      }
      return this.items.filter((item) =>
        JSON.stringify(item).includes(this.searchQuery)
      );
    },
  },
  components: {
    NavBar,
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
    handleSearchQuery(query) {
      this.$nextTick(() => {
        this.searchQuery = query;
      });
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
  min-height: 100vh;
  background: rgba(144, 189, 231, 0.479);
  background-size: cover;
  background-position: center;
}

.main {
  display: flex;
}

/* 資料呈現方式 */
.dataDisplay {
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