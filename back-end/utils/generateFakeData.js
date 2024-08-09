const faker = require('faker');

const foodNames = [
    "便當",
    "漢堡",
    "飯糰",
    "三明治",
    "麵包",
];

const stores = [
    { name: "7-11富陽", address: "106台北市大安區和平東路三段298號300號1樓" },
    { name: "7-11台大", address: "100台北市中正區林森南路53號55號" },
    { name: "7-11長星", address: "106台北市大安區基隆路三段85號" },
    { name: "7-11台科", address: "106台北市大安區基隆路四段43號" },
    { name: "7-11丹陽", address: "台北市中正區杭州南路一段83號" },
    { name: "7-11昆福", address: "台北市萬華區昆明街30-1號30-2號1樓" },
    { name: "7-11國館", address: "台北市大安區光復南路240巷25號" },
    { name: "7-11六福", address: "台北市萬華區漢口街二段73號1樓" },
    { name: "7-11千翔", address: "台北市中正區許昌街17號1樓" },
    { name: "7-11港興", address: "台北市南港區興華路117號119號121號123號125號" },

];

let fakeData = [];
function generateFakeData() {
    for (let i = 0; i < 100; i++) {
        let groceryName = faker.random.arrayElement(foodNames);
        let price = Math.floor((Math.random() * (200 - 10)) + 10);
        let discount = faker.datatype.boolean();
        let discountedPrice = discount ? Math.round(price * (Math.random() * (0.9 - 0.1) + 0.1)) : price;
        let expirationDate = faker.date.future().toISOString().substring(0, 10);
        let storeName = faker.random.arrayElement(stores).name;
        let storeAddress = faker.random.arrayElement(stores).address;
        fakeData.push({
            groceryName,
            price,
            discount,
            discountedPrice,
            expirationDate,
            storeName,
            storeAddress
        });
    }
    return fakeData;
}

module.exports = {
    generateFakeData,
};
