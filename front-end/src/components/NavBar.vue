<template>
    <div id="nav-bar">
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
    </div>
</template>

<script>
export default {
    name: 'NavBar',
}
</script>

<style scoped>
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
</style>
