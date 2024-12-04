<template>
    <div class="not-found">
        <h1>404 - Page Not Found</h1>
        <p>抱歉，您訪問的頁面不存在。</p>
        <router-link to="/">返回首頁</router-link>
    </div>
</template>

<script>
export default {
    name: 'NotFoundPage',
};
</script>

<style scoped>
.not-found {
    text-align: center;
    margin-top: 100px;
}

.not-found h1 {
    font-size: 3em;
    color: #ff0000;
}

.not-found p {
    font-size: 1.2em;
}

.not-found a {
    display: inline-block;
    margin-top: 20px;
    padding: 10px 20px;
    background-color: #007bff;
    color: #fff;
    text-decoration: none;
    border-radius: 5px;
}

.not-found a:hover {
    background-color: #0056b3;
}
</style>