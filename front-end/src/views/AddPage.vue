<template>
  <div class="body">
    <form
      id="addForm"
      onsubmit="handleAddForm(event)"
      enctype="multipart/form-data"
    >
      <h1>新增頁面</h1>
      <div class="inputBox">
        <input type="file" class="form-control" name="file" required />
      </div>

      <div class="inputBox">
        <input
          type="text"
          class="form-control"
          id="groceryName"
          placeholder="商品名稱"
        />
      </div>

      <div class="inputBox">
        <input
          type="text"
          class="form-control"
          id="originalPrice"
          placeholder="原價格"
        />
      </div>

      <div class="inputBox">
        <input
          type="text"
          class="form-control"
          id="discount"
          placeholder="折扣百分比"
        />
      </div>

      <div class="inputBox">
        <input
          type="text"
          class="form-control"
          id="expirationDate"
          placeholder="賞味期限"
        />
      </div>

      <div class="inputBox">
        <input
          type="text"
          class="form-control"
          id="storeName"
          placeholder="商店名稱"
        />
      </div>

      <div id="map"></div>
      <button
        class="button btn btn-outline-primary"
        onclick="panToCurrentLocation()"
      >
        定位後提交
      </button>
    </form>
  </div>
</template>

<script>
export default {
  name: "AddPage",
};
</script>

<style scoped>
h1 {
  color: cornflowerblue;
}
</style>