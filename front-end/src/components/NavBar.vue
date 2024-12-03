<template>
  <div id="nav-bar">
    <div class="header-content wrapper-content">
      <router-link to="/home" id="home-link">
        <h1 class="logo">Food Synergy</h1>
      </router-link>
      <div class="search">
        <input class="search-bar" type="text" name="search" id="search" placeholder="輸入你想尋找的店家" v-model="searchQuery"
          @input="$emit('update-search-query', searchQuery)" />
        <button class="search-btn">
          <i class="fa-solid fa-magnifying-glass"></i>
        </button>
      </div>

      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navDropdown">
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navDropdown">
          <ul class="navbar-nav">
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#"><i
                  class="fa-solid fa-user"></i>User</a>
              <div class="dropdown-menu">
                <router-link to="/login" id="login-link" class="dropdown-item" v-if="!isLogin">
                  登入
                </router-link>
                <a class="dropdown-item" @click="logout" v-if="isLogin">登出</a>
                <a class="dropdown-item" @click="toMemberDetail">會員資料</a>
              </div>
            </li>
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#"><i
                  class="fa-solid fa-cart-shopping"></i>購物車</a>
              <div class="dropdown-menu">
                <router-link to="/cart" id="cart-link">
                  <a class="dropdown-item" href="#">我的購物車</a>
                </router-link>
              </div>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  </div>
</template>

<script>
export default {
  name: "NavBar",
  data() {
    return {
      searchQuery: "",
      isLogin: false,
    };
  },
  methods: {
    logout() {
      fetch("/auth/logout", {
        method: "POST",
      })
        .then((response) => {
          if (response.ok) {
            alert("登出成功");
            localStorage.setItem("isLogin", JSON.stringify(false));
            localStorage.setItem("role", "quest");
            localStorage.setItem("userEmail", "");
            this.isLogin = JSON.parse(localStorage.getItem("isLogin"));
            this.$router.push("/login");
          } else {
            console.log("錯誤");
          }
        })
        .catch((error) => {
          console.error("錯誤:", error);
        });
    },
    toMemberDetail() {
      this.$router.push("/memberDetail");
    },
  },
  created() {
    this.isLogin = JSON.parse(localStorage.getItem("isLogin"));
  },
};
</script>

<style scoped>
a {
  text-decoration: none;
}

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
  text-decoration: none;
}

.link-text:hover {
  transition: all 0.2s;
  color: #ffb500;
}

.content-img {
  margin: 0 auto;
  text-align: center;
}
</style>
