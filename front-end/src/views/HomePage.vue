<template>
  <div class="body">
    <div class="header-content wrapper-content">
      <h1 class="logo">HomePage</h1>
      <div class="search">
        <input
          class="search-bar"
          type="text"
          name="search"
          id="search"
          placeholder="輸入你想尋找的店家"
        />
        <button class="search-btn">
          <i class="fa-solid fa-magnifying-glass"></i>
        </button>
      </div>

      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navDropdown"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navDropdown">
          <ul class="navbar-nav">
            <li class="nav-item dropdown">
              <a
                class="nav-link dropdown-toggle"
                data-bs-toggle="dropdown"
                href="#"
                ><i class="fa-solid fa-user"></i>User</a
              >
              <div class="dropdown-menu">
                <a
                  class="dropdown-item"
                  onclick="window.location.href='loginPage.html'"
                  >登入</a
                >
                <a class="dropdown-item" onclick="logout()">登出</a>
              </div>
            </li>
            <li class="nav-item dropdown">
              <a
                class="nav-link dropdown-toggle"
                data-bs-toggle="dropdown"
                href="#"
                ><i class="fa-solid fa-globe"></i>語言</a
              >
              <div class="dropdown-menu">
                <a class="dropdown-item" href="#">繁體中文</a>
                <a class="dropdown-item" href="#">ENG</a>
              </div>
            </li>
            <li class="nav-item dropdown">
              <a
                class="nav-link dropdown-toggle"
                data-bs-toggle="dropdown"
                href="#"
                ><i class="fa-solid fa-globe"></i>購物車</a
              >
              <div class="dropdown-menu">
                <a class="dropdown-item" href="#">我的購物車</a>
                <a class="dropdown-item" href="#">tmep</a>
              </div>
            </li>
          </ul>
        </div>
      </nav>
    </div>
    <main class="content-body">
      <aside class="side-menu">
        <div class="side-header">
          <h4 class="side-title">小道消息</h4>
          <div class="col-lg-auto right">
            <nav class="navbar navbar-expand-lg navbar-light bg-light">
              <button
                class="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navDropdown"
              >
                <span class="navbar-toggler-icon"></span>
              </button>
              <div class="collapse navbar-collapse" id="navDropdown">
                <ul class="navbar-nav">
                  <li class="nav-item dropdown">
                    <a
                      class="nav-link dropdown-toggle"
                      data-bs-toggle="dropdown"
                      href="#"
                    >
                      <i class="fa-solid fa-sort"></i
                      ><span id="sortLabel">排序</span>
                    </a>
                    <div class="dropdown-menu">
                      <a
                        class="dropdown-item"
                        onclick="sortByPrice('highToLow')"
                        >價格(低至高)</a
                      >
                      <a class="dropdown-item" onclick="sortByPrice()"
                        >價格(高至低)</a
                      >
                      <a
                        class="dropdown-item"
                        onclick="sortByDistance('highToLow')"
                        >距離(近到遠)</a
                      >
                      <a class="dropdown-item" onclick="sortByDistance()"
                        >距離(遠到近)</a
                      >
                    </div>
                  </li>
                </ul>
              </div>
            </nav>
          </div>
        </div>
        <div class="side-body">
          <div
            class="card mb-3"
            style="max-width: 600px"
            onclick="redirectToDetail()"
          >
            <div class="row g-0">
              <div class="pic col-md-4">
                <img
                  src="https://th.bing.com/th/id/OIP.d4b5Mivbu8__5GpelvRekQHaF7?rs=1&pid=ImgDetMain"
                  class="img-fluid rounded-start"
                  alt="..."
                />
              </div>
              <div class="col-md-8">
                <div class="card-body">
                  <h5 class="card-title">艋舺雞排</h5>
                  <p class="card-text">79</p>
                  <p class="card-footer">
                    <small class="text-body-secondary"
                      >106台北市大安區敦化南路二段331巷14號</small
                    >
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div
            class="card mb-3"
            style="max-width: 600px"
            onclick="redirectToDetail()"
          >
            <div class="row g-0">
              <div class="pic col-md-4">
                <img
                  src="https://www.woaisha.com/wp-content/uploads/2021/04/%E7%85%A7%E7%87%92%E8%B1%9A%E8%82%89%E4%BE%BF%E7%95%B6-641.jpg"
                  class="img-fluid rounded-start"
                  alt="..."
                />
              </div>
              <div class="col-md-8">
                <div class="card-body">
                  <h5 class="card-title">大安區某200塊便當</h5>
                  <p class="card-text">180</p>
                  <p class="card-footer">
                    <small class="text-body-secondary"
                      >106台北市大安區基隆路三段85號</small
                    >
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div
            class="card mb-3"
            style="max-width: 600px"
            onclick="redirectToDetail()"
          >
            <div class="row g-0">
              <div class="pic col-md-4">
                <img
                  src="https://image.taiwantoday.tw/images/content_info/img20240116151958055.jpg"
                  class="img-fluid rounded-start"
                  alt="..."
                />
              </div>
              <div class="col-md-8">
                <div class="card-body">
                  <h5 class="card-title">新店區某100塊的麵</h5>
                  <p class="card-text">88</p>
                  <p class="card-footer">
                    <small class="text-body-secondary"
                      >231新北市新店區中正路542之5號1樓</small
                    >
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="side-footer">
          <button id="toAddPageButton" onclick="toAddPage()">
            <i class="fa-solid fa-plus"></i>
          </button>
        </div>
      </aside>

      <section class="secondary-content wrapper-content">
        <h2 class="secondary__title section__title"></h2>
        <div class="row mx-4 pt-6 ps-4">
          <div
            class="wrapper-work"
            data-store="7-11"
            @click="redirectToStore('7-11')"
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/7-eleven_logo.svg/250px-7-eleven_logo.svg.png"
              alt=""
            />
            <h3 class="work_title">7-11</h3>
          </div>
          <div
            class="wrapper-work"
            data-store="全家"
            @click="redirectToStore('全家')"
          >
            <img
              src="https://static.104.com.tw/b_profile/cust_picture/5268/130000000165268/logo.png?v=20210418003147"
              alt=""
            />
            <h3 class="work_title">全家</h3>
          </div>
          <div
            class="wrapper-work"
            data-store="萊爾富"
            @click="redirectToStore('萊爾富')"
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/zh/5/54/Hi-Life.svg"
              alt=""
            />
            <h3 class="work_title">萊爾富</h3>
          </div>
          <div
            class="wrapper-work"
            data-store="OK"
            @click="redirectToStore('OK')"
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/OK_LOGO-%E6%96%B9%E5%BD%A2-01.png/220px-OK_LOGO-%E6%96%B9%E5%BD%A2-01.png"
              alt=""
            />
            <h3 class="work_title">OK</h3>
          </div>
          <div
            class="wrapper-work"
            data-store="全聯"
            @click="redirectToStore('全聯')"
          >
            <img
              src="https://curation.culture.tw/api/pic?id=User022cdfcd8-a336-483b-83dc-7a89288f6863&w=1000"
              alt=""
            />
            <h3 class="work_title">全聯</h3>
          </div>
          <div
            class="wrapper-work"
            data-store="其他店家"
            @click="redirectToStore('其他店家')"
          >
            <img
              src="https://storage.googleapis.com/opinion-cms-cwg-tw/article/201808/article-5b75318dc7be2.jpg"
              alt=""
            />
            <h3 class="work_title">其他店家</h3>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script>
export default {
  name: "HomePage",
  methods: {
    redirectToStore(storeName) {
      window.location.href = "store/" + storeName;
    },
  },
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
.side-title {
  background-color: #4e7d8b;
}
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
}
.card .pic img {
  width: 100%;
  height: 100%;
  object-fit: cover;
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
</style>