### 想要推送內容
請從 feature 分支開發
並對 feature 分支發送pull request

管理者會確認 feature 分支執行有無問題
無問題會 merge 至 main 分支

### 如何使用

1.
# 更改環境變數
開啟.env檔案
MYSQL_DATABASE為要使用的資料庫名稱
TEST_MYSQL_DATABASE為測試用資料庫名稱

2.
# 初始化
使用InitDB.js會執行資料庫初始化
建立名稱為 TEST_MYSQL_DATABASE 參數內容的資料庫
傳入所有品項
及生成歷史訂單

3.
# 執行
確保 MYSQL_DATABASE 名稱已經用 TEST_MYSQL_DATABASE 名稱建立過資料庫
輸入 npm start 即可啟動系統



目前問題:
有時候結帳在首頁並不會刷新當前狀況
