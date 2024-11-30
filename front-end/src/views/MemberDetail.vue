<template>
  <div class="body">
    <div class="member-detail">
      <h1>會員資料</h1>
      <div class="info-box">
        <div class="info-item">
          <label for="name">名字:</label>
          <span>{{ member.name }}</span>
        </div>
        <div class="info-item">
          <label for="email">Email:</label>
          <span>{{ member.email }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      member: {
        name: "",
        email: localStorage.getItem("userEmail"), // 初始為本地儲存的 email
        phone: ""
      }
    };
  },
  async mounted() {
    try {
      // 從 localStorage 獲取 email
      const email = localStorage.getItem("userEmail");

      // 向伺服器發送請求
      const response = await fetch('/db/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email })
      });

      // 解析伺服器回應的 JSON
      if (response.ok) {
        const data = await response.json();
        // 更新 member 資料
        this.member.name = data.name;
        this.member.phone = data.phoneNumber;
      } else {
        console.error("伺服器回應錯誤", response.status);
      }
    } catch (error) {
      console.error("請求失敗", error);
    }
  }
};
</script>

<style scoped>
.member-detail {
  font-family: Arial, sans-serif;
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  background-color: #f9f9f9;
}

h1 {
  text-align: center;
  color: #333;
  font-size: 1.5em;
  margin-bottom: 20px;
}

.info-box {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.info-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background-color: #ffffff;
  border-radius: 4px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.05);
}

label {
  font-weight: bold;
  color: #666;
}

span {
  color: #333;
}
</style>