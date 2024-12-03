<template>
    <div>
        <h1>商品詳情</h1>
        <div>
            <img :src="imageUrl" alt="Image" />
            <h2>{{ groceryName }}</h2>
            <p>折扣價: {{ discountedPrice }}</p>
            <p>店家地址: {{ storeAddress }}</p>
            <button @click="addToCart(item)" class="add-to-cart-btn">加入購物車</button>
        </div>
    </div>
</template>

<script>
export default {
    name: "DetailsPage",
    data() {
        return {
            imageUrl: this.$route.query.imageUrl || '',
            groceryName: this.$route.query.groceryName || '',
            discountedPrice: this.$route.query.discountedPrice || '',
            storeAddress: this.$route.query.storeAddress || '',
            item: {
                _id: this.$route.query._id || '',
                groceryName: this.$route.query.groceryName || '',
                price: this.$route.query.price || '',
                discount: this.$route.query.discount || false,
                discountedPrice: this.$route.query.discountedPrice || '',
                expirationDate: this.$route.query.expirationDate || '',
                storeName: this.$route.query.storeName || '',
                storeAddress: this.$route.query.storeAddress || '',
            },
        };
    },
    methods: {
        addToCart(item) {
            fetch("/db/items/user", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(item),
            })
                .then((response) => {
                    if (!response.ok) {
                        return response.json().then((error) => {
                            throw new Error(error.message);
                        });
                    }
                    let cart = JSON.parse(localStorage.getItem("cart")) || [];
                    cart.push(item);
                    localStorage.setItem("cart", JSON.stringify(cart));
                    alert(item.groceryName + " 已加入購物車!");
                    this.$router.push("/home");
                })
                .catch((error) => {
                    console.error("錯誤:", error);
                    alert("加入購物車失敗: " + error.message);
                });
        },
    },
};
</script>

<style scoped>
.add-to-cart-btn {
    display: inline-block;
    margin-top: 20px;
    padding: 10px 20px;
    font-size: 1rem;
    font-weight: bold;
    color: #fff;
    background-color: #5cb85c;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    margin-left: 300px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    transition: background-color 0.3s ease;
}

.add-to-cart-btn:hover {
    background-color: #4cae4c;
}

/* 整體容器樣式 */
div {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
    font-family: Arial, sans-serif;
    color: #333;
    background-color: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

/* 標題樣式 */
h1 {
    text-align: center;
    font-size: 2rem;
    color: #444;
    margin-bottom: 20px;
}

/* 商品圖片樣式 */
img {
    display: block;
    max-width: 100%;
    height: auto;
    margin: 0 auto;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

/* 商品名稱樣式 */
h2 {
    text-align: center;
    font-size: 1.5rem;
    color: #222;
    margin-top: 20px;
}

/* 文字描述樣式 */
p {
    font-size: 1rem;
    line-height: 1.6;
    margin: 10px 0;
    text-align: center;
    color: #555;
}

/* 價格加重顯示 */
p:nth-child(3) {
    font-weight: bold;
    color: #d9534f;
}

/* 地址樣式 */
p:nth-child(4) {
    font-style: italic;
}

/* 響應式設計 */
@media (max-width: 600px) {
    h1 {
        font-size: 1.5rem;
    }

    h2 {
        font-size: 1.2rem;
    }

    p {
        font-size: 0.9rem;
    }
}
</style>
