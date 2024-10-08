<template>
  <div class="body">
    <form
      id="addForm"
      @submit.prevent="handleAddForm"
      enctype="multipart/form-data"
    >
      <h1>新增頁面</h1>
      <div class="inputBox">
        <input
          type="file"
          class="form-control"
          name="file"
          @change="handleFileUpload"
          required
        />
      </div>

      <div class="inputBox">
        <input
          type="text"
          class="form-control"
          id="groceryName"
          v-model="groceryName"
          placeholder="商品名稱"
        />
      </div>

      <div class="inputBox">
        <input
          type="text"
          class="form-control"
          id="originalPrice"
          v-model="originalPrice"
          placeholder="原價格"
        />
      </div>

      <div class="inputBox">
        <input
          type="text"
          class="form-control"
          id="discount"
          v-model="discount"
          placeholder="折扣百分比"
        />
      </div>

      <div class="inputBox">
        <input
          type="text"
          class="form-control"
          id="expirationDate"
          v-model="expirationDate"
          placeholder="賞味期限"
        />
      </div>

      <div class="inputBox">
        <input
          type="text"
          class="form-control"
          id="storeName"
          v-model="storeName"
          placeholder="商店名稱"
        />
      </div>

      <div id="map">
        <GoogleMap
          api-key="AIzaSyCpuN3PhDWXAlLBIJcS5iy9Kr7_R4Be74o"
          style="width: 100%; height: 100%"
          :center="center"
          :zoom="14"
        >
          <Marker :options="{ position: center }" />
        </GoogleMap>
      </div>
      <button
        class="button btn btn-outline-primary"
        @click="getCurrentLocationAndHandleAddForm"
      >
        定位後提交
      </button>
    </form>
  </div>
</template>

<script>
import { GoogleMap, Marker } from "vue3-google-map";
export default {
  name: "AddPage",
  components: {
    GoogleMap,
    Marker,
  },
  data() {
    return {
      groceryName: "",
      originalPrice: "",
      discount: "",
      expirationDate: "",
      storeName: "",
      file: null,
      storeAddress: "",
      center: { lat: 40.689247, lng: -74.044502 },
    };
  },
  methods: {
    handleFileUpload(event) {
      this.file = event.target.files[0];
    },
    async getCurrentLocationAndHandleAddForm() {
      await this.getCurrentLocation(); // 等待第一个函数完成
      this.handleAddForm(); // 然后执行第二个函数
    },
    handleAddForm() {
      let formData = {};
      this.getImageUrl()
        .then((imageUrl) => {
          formData = {
            groceryName: this.groceryName,
            originalPrice: this.originalPrice,
            discount: this.discount,
            discountedPrice:
              (this.originalPrice * parseFloat(this.discount)) / 100,
            expirationDate: this.expirationDate,
            storeName: this.storeName,
            storeAddress: this.storeAddress,
            imageUrl: imageUrl,
            addedBy: localStorage.getItem("userEmail"),
          };

          return fetch("/db/items", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          });
        })
        .then((response) => {
          if (response.ok) {
            alert("新增成功");
            this.encrypt(formData);
          } else {
            alert("嘗試次數過多");
          }
        })
        .catch((error) => {
          console.error("錯誤:", error);
        });
    },
    getImageUrl() {
      const formData = new FormData();
      formData.append("file", this.file);

      return fetch("/imgur/upload", {
        method: "POST",
        body: formData,
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error("上傳圖片失敗");
          }
        })
        .then((data) => {
          console.log("文件已成功上傳，Imgur URL:", data.imgurUrl);
          return data.imgurUrl;
        })
        .catch((error) => {
          console.error("錯誤:", error);
          throw error;
        });
    },
    encrypt(plaintext) {
      const socket = new WebSocket("ws://localhost:8000");

      fetch("/crypto/encrypt", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ plaintext: plaintext }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("加密完成");
          console.log(JSON.stringify(data));
          socket.send(JSON.stringify(data));
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    },
    async getCurrentLocation() {
      // 獲取當前地理位置
      if (navigator.geolocation) {
        await navigator.geolocation.getCurrentPosition(
          (position) => {
            this.center = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            };

            // 使用 Google Geocoding API 將經緯度轉換為地址
            this.getGeocode(this.center.lat, this.center.lng)
              .then((address) => {
                this.storeAddress = address;
                console.log(this.storeAddress);
              })
              .catch((error) => {
                console.error("Geocoding 失敗:", error);
              });
          },
          (error) => {
            console.error("獲取當前位置失敗", error);
            alert("無法獲取當前位置");
          }
        );
      } else {
        alert("瀏覽器不支援地理位置");
      }
    },
    getGeocode(lat, lng) {
      const geocoder = new window.google.maps.Geocoder();
      const latlng = { lat: parseFloat(lat), lng: parseFloat(lng) };

      return new Promise((resolve, reject) => {
        geocoder.geocode({ location: latlng }, (results, status) => {
          if (status === "OK") {
            if (results[0]) {
              resolve(results[0].formatted_address); // 返回格式化的地址
            } else {
              reject("沒有找到結果");
            }
          } else {
            reject("Geocoder 失敗，原因：" + status);
          }
        });
      });
    },
  },
};
</script>

<style scoped>
.body {
  background-color: #ffffff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  width: 100%;
}

h1 {
  text-align: center;
  color: #333;
  margin-bottom: 20px;
}

.inputBox {
  margin-bottom: 15px;
}

.inputBox input[type="text"],
.inputBox input[type="file"] {
  width: calc(100% - 20px);
  padding: 10px;
  margin: 0;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-sizing: border-box;
  font-size: 16px;
  color: #555;
}

.inputBox input[type="text"]:focus,
.inputBox input[type="file"]:focus {
  border-color: #007bff;
  outline: none;
}

.button {
  display: block;
  width: 100%;
  padding: 10px;
  margin-top: 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  text-align: center;
}

.button:hover {
  background-color: #0056b3;
}

#map {
  width: 100%;
  height: 200px;
  margin-top: 20px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.form-control::placeholder {
  color: #999;
  opacity: 1;
}

@media (max-width: 480px) {
  .body {
    padding: 15px;
    max-width: 100%;
  }

  h1 {
    font-size: 20px;
  }

  .inputBox input[type="text"],
  .inputBox input[type="file"] {
    font-size: 14px;
  }

  .button {
    font-size: 14px;
  }
}
</style>