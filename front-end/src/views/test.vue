<template>
    <div class="container">
        <h1>下載商品資料</h1>
        <button @click="fetchAndDownloadData">下載資料為 TXT</button>
    </div>
</template>

<script>
export default {
    name: "DownloadPage",
    methods: {
        async fetchAndDownloadData() {
            try {
                // 從後端獲取資料
                const response = await fetch("/db/generate");
                if (!response.ok) {
                    throw new Error("無法獲取資料，請檢查後端服務！");
                }
                const data = await response.json();

                // 將 JSON 轉為字串格式
                const dataString = JSON.stringify(data, null, 2);

                // 建立下載連結
                const blob = new Blob([dataString], { type: "text/plain" });
                const url = URL.createObjectURL(blob);

                // 建立 a 元素並觸發下載
                const link = document.createElement("a");
                link.href = url;
                link.download = "grocery_data.txt";
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);

                // 釋放 URL 物件
                URL.revokeObjectURL(url);

                alert("資料下載完成！");
            } catch (error) {
                console.error("下載資料失敗:", error);
                alert("下載過程中發生錯誤！");
            }
        },
    },
};
</script>

<style scoped>
.container {
    font-family: Arial, sans-serif;
    max-width: 600px;
    margin: 0 auto;
    text-align: center;
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

button {
    margin-top: 20px;
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