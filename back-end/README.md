# undergraduateProject

壓力測試
個人化(分析客戶喜好，在主頁直接推薦商品)
完善第三方支付(購買視窗)
外送功能 校園uber(賣點)
聊天機器人
nodejs 分散 
針對沒有資料庫的商家 
做模板 下次他們PO東西就不用一直輸入重複的東西
保留新增紀錄供他們直接選擇

//張嘉晉區

//鍾守科區

//洪紫馨區

//詹育豐區
未解決:
imgur 'Too Many Requests' 問題
目前蠻穩定的?

---------程式碼暫存---------
window.location.href = "newsPage.html?username=" + encodeURIComponent(email); 可以用帶參數的方式轉到別的頁面

router.get('/signout', (req, res) => {
    try {
        req.session.destroy(function (err) {
            console.log('session destroyed.');
            res.redirect('/loginPage.html');
        });
    } catch (err) {
        res.status(400).send({ message: 'Failed to sign out user' });
    }
});

           <!-- <div class="remeber-forget">
                <label><input type="checkbox">Remember me</label>
                <a href="#">Forget password?</a>
            </div> -->