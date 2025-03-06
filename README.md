# 點餐POS系統後端

提供顧客線上點餐，本項目包含後台點餐POS系統後端。

## 功能特點

- **線上點餐**：顧客可通過網站瀏覽菜單，選擇心儀的餐點並在線支付。
- **POS系統**：為店內工作人員提供強大的點餐、結帳和訂單管理功能。

## 技術棧

- 後端：Node.js, Express
- 數據庫：MySQL

## 安裝指南

# 克隆項目
```bash
git clone https://github.com/jj2016025j/POS-backend.git
```

# 建立.env檔案 並貼上以下內容
```bash
MYSQL_HOST = 'localhost'
MYSQL_USER = 'root'
MYSQL_PASSWORD = ''
MYSQL_DATABASE = 'fang_pos_system'
TEST_MYSQL_DATABASE = 'fang_pos_system'
```

# 安裝依賴
```bash
npm i
```

# 運行項目
```bash
npm start
```

## **使用說明**

- **網站訪問**：
```bash
pos系後端: http://localhost:8000
```

## **貢獻指南**

我們歡迎任何形式的貢獻，無論是功能建議、錯誤報告或是代碼提交。請先通過Issues討論您的想法或報告錯誤，然後您可以開始提交 Pull Request。

請從 feature 分支開發
並對 feature 分支發送pull request

管理者會確認 feature 分支執行有無問題
無問題會 merge 至 main 分支

## **授權信息**

本項目採用 MIT授權。

## **聯絡方式**

如有任何問題或建議，請通過以下方式聯絡我們：

- 郵件：jj2016025j@gmail.com
