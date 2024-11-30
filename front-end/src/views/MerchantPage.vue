<template>
  <div class="body">
    <h1>商家功能</h1>
    <input type="file" @change="handleFileUpload" accept=".txt" />
    <p>請上傳商品檔案，檔案格式為 TXT 格式。</p>
    <div v-if="loading" class="loading-overlay">
      <div class="loading-spinner"></div>
      <p>正在處理，請稍候...</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "MerchantPage",
  data() {
    return {
      uploadedData: null,
      loading: false,
    };
  },
  methods: {
    async handleFileUpload(event) {
      const fileInput = event.target;
      const file = fileInput.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = async (e) => {
          try {
            this.uploadedData = JSON.parse(e.target.result);
            alert("檔案上傳成功並已解析！");
            console.log("上傳的資料:", this.uploadedData);

            this.loading = true;

            await this.store();
            await this.append();
          } catch (error) {
            console.error("解析檔案時發生錯誤:", error);
            alert("檔案格式不正確，請確認檔案內容為 JSON 格式！");
          } finally {
            this.loading = false;
          }
        };
        reader.readAsText(file);
      }
      fileInput.value = "";
    },
    async store() {
      try {
        const response = await fetch("/db/store", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(this.uploadedData),
        });

        if (response.ok) {
          console.log("成功");
          alert("資料已成功儲存！");
        } else {
          console.log("失敗");
          alert("儲存失敗！");
        }
      } catch (error) {
        console.error("錯誤:", error);
        alert("儲存過程中發生錯誤！");
      }
    },
    async append() {
      try {
        const response = await fetch("/db/append", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          console.log("成功");
          alert("資料已成功追加！");
        } else {
          console.log("失敗");
          alert("追加失敗！");
        }
      } catch (error) {
        console.error("錯誤:", error);
        alert("追加過程中發生錯誤！");
      }
    },
  },
};
</script>

<style scoped>
.body {
  font-family: "Arial", sans-serif;
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

input[type="file"] {
  margin-bottom: 20px;
}

.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.8);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.loading-spinner {
  width: 50px;
  height: 50px;
  border: 5px solid rgba(0, 0, 0, 0.2);
  border-top-color: #007bff;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

button {
  margin-right: 10px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  border: none;
  border-radius: 4px;
  background-color: #007bff;
  color: white;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #0056b3;
}
</style>