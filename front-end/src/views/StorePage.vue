<template>
  <div class="body">
    <NavBar @update-search-query="handleSearchQuery" />
    <div class="main">
      <div class="dataDisplay">
        <div class="accordion" id="accordionPanel">
          <div class="accordion-item" v-for="(storeItems, storeName, index) in groupedItems" :key="storeName">
            <h2 class="accordion-header" :id="'panels-heading-' + index">
              <button
                class="accordion-button text-dark fs-5 fw-bold"
                type="button"
                :data-bs-toggle="'collapse'"
                :data-bs-target="'#panels-collapse-' + index"
                aria-expanded="true"
                :aria-controls="'panels-collapse-' + index"
              >
                {{ storeName }}
              </button>
            </h2>
            <div
              :id="'panels-collapse-' + index"
              class="accordion-collapse collapse"
              :aria-labelledby="'panels-heading-' + index"
            >
              <div class="accordion-body bg-light">
                <div class="row row-cols-md-2 row-cols-lg-5 row-cols-sm-1 g-2 g-lg-3 m-4">
                  <div class="col" v-for="item in storeItems" :key="item.id">
                    <div class="card mb-3 text-center" style="width: 300px">
                      <div>
                        <img :src="getImageUrl(item.groceryName)" class="food-img" style="max-width: 64px" alt="item.groceryName" />
                      </div>
                      <div class="item">
                        <h4>折扣價: {{ Math.floor(item.discountedPrice) }}</h4>
                        <p>商店名稱: {{ item.storeName }}</p>
                        <p>商店地址: {{ item.storeAddress }}</p>
                        <p>商品名: {{ item.groceryName }}</p>
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
        </div>
        <!-- <div v-for="(storeItems, storeName) in groupedItems" :key="storeName">
          <p class="flex h-12 items-center justify-between px-4 bg-secondary"><span class="text-lg font-bold">{{ storeName }}</span></p>
          <div class="row row-cols-md-2 row-cols-lg-5 row-cols-sm-1 g-2 g-lg-3 m-4">
            <div class="col"  v-for="item in storeItems" :key="item.id">
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
        </div> -->
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
    groupedItems() {
      return this.filteredItems.reduce((groups, item) => {
        if (!groups[item.storeName]) {
          groups[item.storeName] = [];
        }
        groups[item.storeName].push(item);
        return groups;
      }, {});
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
  position: relative;
  font-family: "Noto Sans", "Microsoft JhengHei";
  min-height: 100vh;
  background: rgba(144, 189, 231, 0.479);
  background-size: cover;
  background-position: center;
  z-index: 0;
}

.main {
  position: relative;
  display: flex;
  z-index: -1;
}

/* 資料呈現方式 */
.dataDisplay {
  width: 100vw;
  margin: 0px;
  padding: 0px 0px 10px 0px;
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

.accordion-body {
  background-color: rgba(144, 189, 231, 0.479); /* 設定和背景一致的顏色 */
}

.accordion-button {
  background-color: rgba(144, 189, 231, 0.479); /* 確保按鈕背景色也一致 */
}

.accordion-button:not(.collapsed) {
  background-color: rgba(144, 189, 231, 0.479); /* 展開時按鈕背景色 */
}

.accordion-button:hover {
  background-color: rgba(144, 189, 231, 0.6); /* 滑鼠移上去的效果 */
}
</style>