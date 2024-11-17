<template>
  <div class="body">
    <NavBar @update-search-query="handleSearchQuery" />
    <main class="content-body">
      <aside class="side-menu">
        <div class="side-header">
          <h4 class="side-title">小道消息</h4>
          <div class="col-lg-auto right">
            <nav class="navbar navbar-expand-lg navbar-light bg-light">
              <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navDropdown">
                <span class="navbar-toggler-icon"></span>
              </button>
              <div class="collapse navbar-collapse" id="navDropdown">
                <ul class="navbar-nav">
                  <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#">
                      <i class="fa-solid fa-sort"></i><span id="sortLabel">排序</span>
                    </a>
                    <div class="dropdown-menu">
                      <a class="dropdown-item" onclick="sortByPrice('highToLow')">價格(低至高)</a>
                      <a class="dropdown-item" onclick="sortByPrice()">價格(高至低)</a>
                      <a class="dropdown-item" onclick="sortByDistance('highToLow')">距離(近到遠)</a>
                      <a class="dropdown-item" onclick="sortByDistance()">距離(遠到近)</a>
                    </div>
                  </li>
                </ul>
              </div>
            </nav>
          </div>
        </div>
        <div class="side-body">
          <div v-for="(card, index) in cards" :key="index" class="card mb-3" @click="redirectToDetail(card)"
            style="max-width: 600px">
            <div class="row g-0">
              <div class="pic col-md-4">
                <img :src="card.imageUrl" class="img-fluid rounded-start" alt="Uploaded Image" />
              </div>
              <div class="col-md-8">
                <div class="card-body">
                  <h5 class="card-title">{{ card.groceryName }}</h5>
                  <p class="card-text">{{ card.discountedPrice }}</p>
                  <p class="card-footer">
                    <small class="text-body-secondary">{{
                      card.storeAddress
                    }}</small>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="side-footer">
          <button id="toAddPageButton" data-bs-toggle="modal" data-bs-target="#addItemModal">
            <i class="fa-solid fa-plus"></i>
          </button>
        </div>
      </aside>

      <!-- AddPage Modal -->
      <div class="modal fade" id="addItemModal" tabindex="-1" aria-labelledby="addItemModalLabel" aria-hidden="true"
        ref="addItemModal">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h2 class="modal-title" id="addItemModalLabel">新增商品</h2>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <!-- 引入 AddPage 的表單 -->
              <AddPage @add-success="handleAddSuccess" />
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                關閉
              </button>
            </div>
          </div>
        </div>
      </div>
      <section class="secondary-content wrapper-content">
        <h2 class="secondary__title section__title"></h2>
        <div class="row mx-4 pt-6 ps-4">
          <div v-for="store in filteredStores" :key="store.name" class="wrapper-work" :data-store="store.name"
            @click="redirectToStore(store.name)">
            <img :src="store.image" :alt="store.name" />
            <h3 class="work_title">{{ store.name }}</h3>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script>
import NavBar from "../components/NavBar.vue";
import AddPage from "./AddPage.vue";
import { Modal } from 'bootstrap';

export default {
  name: "HomePage",

  data() {
    return {
      searchQuery: "",
      stores: [
        {
          name: "7-11",
          image:
            "https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/7-eleven_logo.svg/250px-7-eleven_logo.svg.png",
        },
        {
          name: "全家",
          image:
            "https://static.104.com.tw/b_profile/cust_picture/5268/130000000165268/logo.png?v=20210418003147",
        },
        {
          name: "萊爾富",
          image: "https://upload.wikimedia.org/wikipedia/zh/5/54/Hi-Life.svg",
        },
        {
          name: "OK",
          image:
            "https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/OK_LOGO-%E6%96%B9%E5%BD%A2-01.png/220px-OK_LOGO-%E6%96%B9%E5%BD%A2-01.png",
        },
        {
          name: "全聯",
          image:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHX1eoffJgvo-2CSS9ztyRqYeRG6PRMg2FsA&s",
        },
        {
          name: "其他店家",
          image:
            "https://storage.googleapis.com/opinion-cms-cwg-tw/article/201808/article-5b75318dc7be2.jpg",
        },
      ],
      cards: [
        {
          imageUrl:
            "https://th.bing.com/th/id/OIP.d4b5Mivbu8__5GpelvRekQHaF7?rs=1&pid=ImgDetMain",
          groceryName: "即期雞排",
          discountedPrice: 79,
          storeAddress: "106台北市大安區敦化南路二段331巷14號",
        },
        {
          imageUrl:
            "https://www.woaisha.com/wp-content/uploads/2021/04/%E7%85%A7%E7%87%92%E8%B1%9A%E8%82%89%E4%BE%BF%E7%95%B6-641.jpg",
          groceryName: "大安區便當店",
          discountedPrice: 180,
          storeAddress: "106台北市大安區基隆路三段85號",
        },
        {
          imageUrl:
            "https://image.taiwantoday.tw/images/content_info/img20240116151958055.jpg",
          groceryName: "新店區麵店",
          discountedPrice: 88,
          storeAddress: "231新北市新店區中正路542之5號1樓",
        },
      ],
      socket: null,
    };
  },
  mounted() {
    this.socket = new WebSocket("ws://localhost:8000");

    this.socket.onopen = () => {
      console.log("WebSocket connection opened.");
    };

    this.socket.onmessage = (event) => {
      event.data
        .text()
        .then((text) => {
          console.log("Received:", JSON.parse(text).ciphertext);
          this.decrypt(JSON.parse(text));
        })
        .catch((error) => {
          console.error("Error converting Blob to text:", error);
        });
    };

    this.socket.onclose = () => {
      console.log("WebSocket connection closed.");
    };

    this.socket.onerror = (error) => {
      console.error("WebSocket error:", error);
    };
  },
  computed: {
    filteredStores() {
      if (!this.searchQuery) {
        return this.stores;
      }
      return this.stores.filter((store) =>
        store.name.includes(this.searchQuery)
      );
    },
  },
  components: {
    AddPage,
    NavBar,
  },
  methods: {
    redirectToStore(storeName) {
      window.location.href = "store/" + storeName;
    },
    handleSearchQuery(query) {
      this.$nextTick(() => {
        this.searchQuery = query;
      });
    },
    toAddPage() {
      this.$router.push("/add");
    },
    redirectToDetail(card) {
      console.log("Redirect to detail page with:", card);

      this.$router.push("/details");
    },
    decrypt(input) {
      fetch("/crypto/decrypt", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(input),
      })
        .then((response) => response.json())
        .then((data) => {
          this.cards.push(data);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    },
    handleAddSuccess() {
      const modalElement = this.$refs.addItemModal;
      const modalInstance = Modal.getInstance(modalElement);
      if (modalInstance) {
        modalInstance.hide();
      } else {
        const newModalInstance = new Modal(modalElement);
        newModalInstance.hide();
      }

      // 移除任何殘留的 backdrop
      const backdrops = document.querySelectorAll('.modal-backdrop');
      backdrops.forEach(backdrop => backdrop.parentNode.removeChild(backdrop));
    },
  },
  // beforeUnmount() {
  //   if (this.socket) {
  //     this.socket.close();
  //   }
  // },
};
</script>

<style scoped>
.body {
  margin: 0;
  font-family: "Noto Sans", "Microsoft JhengHei";
  letter-spacing: normal;
  background-color: rgba(144, 189, 231, 0.479);
}

a {
  text-decoration: none;
}

/* 下面是文章主要區塊的設定 */
main {
  display: flex;
}

/* 左邊的po文欄 */
.side-menu {
  position: sticky;
  top: 70px;
  display: flex;
  flex-direction: column;
  height: calc(100vh - 70px);
  float: left;
  /* border:3px solid #000; */
  background: white;
  margin-bottom: auto;
  padding: 0 0 10px 0;
  /* overflow: visible;
  transition: 0.5s; */
}

label {
  width: 20px;
  height: 80px;
  background-color: #d1d1d1;
  color: #686666;
  position: absolute;
  right: -20px;
  top: 0;
  bottom: 0;
  margin: auto;
  line-height: 80px;
  text-align: center;
  border-radius: 0 5px 5px 0;
  box-shadow: 5px 0 5px rgba(23, 23, 54, 0.6);
}

/* #side-menu-active:checked + .side-menu {
  transform: translateX(-100%);
  transition: 0.5s;

  label .fas {
    transform: scaleX(-1);
  }
} */
#side-menu-active {
  position: absolute;
  opacity: 0;
  z-index: -1;
}

.side-header {
  padding: 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  float: left;
}

.side-title {}

/* 每個品項的設定 */
.side-body {
  display: flex;
  flex-direction: column;
  height: 100%;
  float: left;
  border: 2px solid #000;
  background: whitesmoke;
  margin-bottom: auto;
  padding: 30px 30px 30px 30px;
  margin-left: 10px;
  margin-right: 10px;
  overflow: auto;
}

.side-footer {
  padding: 10px;
  margin-top: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.side-footer button {
  border-radius: 10px;
  height: 150%;
  padding-left: 15px;
  padding-right: 15px;
}

.side-footer button:hover {
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.9);
  transition: 0.2s;
}

.card {
  border: none !important;
  padding: 3px;
}

.card .title {
  color: #444444;
}

.card .text {
  color: #444444;
}

.card .pic {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.card .pic img {
  width: 100%;
  height: auto;
  max-height: 150px;
  object-fit: cover;
  border-radius: 5px;
}

.card .card-body {
  background-color: #f1f6fa !important;
}

.card-footer {
  margin-bottom: -10px;
}

.card-footer p {
  margin-bottom: 0;
}

/* 右邊區域 */
.secondary-content {
  float: left;
  width: 70%;
  padding: 10px 0px 10px 0px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.work_title {
  font-size: 24px;
  margin-top: 20px;
  margin-bottom: 10px;
}

.wrapper-work {
  width: min-content;
  border-radius: 10px;
  break-inside: avoid;
  background: rgb(255, 255, 255);
  padding: 5px;
  margin: 1em 1em 1em 1em;
}

.wrapper-work:hover {
  box-shadow: 5px 8px 2px rgba(0, 0, 0, 0.7);
  transition: 0.5s;
}

.wrapper-work img {
  width: 236px;
  height: 192px;
}

.wrapper-work h3 {
  text-align: center;
}

@media screen and (min-width: 320px) and (max-width: 768px) {
  .logo {
    font-size: small;
    margin-left: -20px;
  }

  .header-content .navbar {
    margin-right: -40px;
  }
}

/* 彈出視窗區域 */
.modal-body {
  display: flex;
  justify-content: center;
}

.modal-footer {
  display: flex;
  justify-content: center;
}
</style>