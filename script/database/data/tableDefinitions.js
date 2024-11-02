// db/tableDefinitions.js

module.exports = {
    CategoryTable: `
      CREATE TABLE IF NOT EXISTS Category (
        Id INT AUTO_INCREMENT PRIMARY KEY,
        CategoryName VARCHAR(255) NOT NULL,
        Description TEXT,
        sort INT DEFAULT 0
      );
    `,
  
    MenuItemsTable: `
      CREATE TABLE IF NOT EXISTS MenuItems (
        Id INT AUTO_INCREMENT PRIMARY KEY,
        MenuItemName VARCHAR(255) NOT NULL,
        CategoryId INT NOT NULL,
        Price INT NOT NULL,
        image_url TEXT,
        Insupply BOOLEAN DEFAULT TRUE,
        CreateTime TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UpdateTime TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (CategoryId) REFERENCES Category(Id) ON DELETE CASCADE
      );
    `,
  
    TablesTable: `
      CREATE TABLE IF NOT EXISTS Tables (
        Id INT AUTO_INCREMENT PRIMARY KEY,
        TableNumber INT NOT NULL,
        TablesStatus ENUM('空桌', '點餐中', '待確認', '製作中', '用餐中', '清潔中') NOT NULL DEFAULT '空桌',
        MainOrderId VARCHAR(255) NULL
      );
    `,
  
    MainOrdersTable: `
      CREATE TABLE IF NOT EXISTS MainOrders (
        Id INT AUTO_INCREMENT PRIMARY KEY,
        MainOrderId VARCHAR(255) NOT NULL,
        SubTotal INT DEFAULT 0,
        ServiceFee INT DEFAULT 0,
        Total INT DEFAULT 0,
        TableId INT NOT NULL,
        OrderStatus ENUM('未結帳', '已結帳', '已取消') NOT NULL DEFAULT '未結帳',
        CreateTime TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UpdateTime TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        UserId INT,
        FOREIGN KEY (TableId) REFERENCES Tables(Id)
      );
    `,
  
    MainOrderMappingsTable: `
      CREATE TABLE IF NOT EXISTS MainOrderMappings (
        Id INT AUTO_INCREMENT PRIMARY KEY,
        MainOrderId VARCHAR(255) NOT NULL,
        MenuItemId INT NOT NULL,
        quantity INT NOT NULL,
        unit_price INT NOT NULL,
        total_price INT NOT NULL,
        FOREIGN KEY (MenuItemId) REFERENCES MenuItems(Id) ON DELETE CASCADE ON UPDATE CASCADE
      );
    `,
  
    SubOrdersTable: `
      CREATE TABLE IF NOT EXISTS SubOrders (
        Id INT AUTO_INCREMENT PRIMARY KEY,
        SubOrderId VARCHAR(255) NOT NULL,
        MainOrderId VARCHAR(255) NOT NULL,
        SubTotal INT DEFAULT 0,
        TableId INT NOT NULL,
        OrderStatus ENUM('未製作', '製作中', '已完成', '已取消') NOT NULL DEFAULT '未製作',
        CreateTime TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UpdateTime TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      );
    `,
  
    SubOrderMappingsTable: `
      CREATE TABLE IF NOT EXISTS SubOrderMappings (
        Id INT AUTO_INCREMENT PRIMARY KEY,
        SubOrderId VARCHAR(255) NOT NULL,
        MenuItemId INT NOT NULL,
        quantity INT NOT NULL,
        unit_price INT NOT NULL,
        total_price INT NOT NULL,
        FOREIGN KEY (MenuItemId) REFERENCES MenuItems(Id) ON DELETE CASCADE ON UPDATE CASCADE
      );
    `,
  
    UsersTable: `
      CREATE TABLE IF NOT EXISTS Users (
        Id INT AUTO_INCREMENT PRIMARY KEY,
        Name VARCHAR(255) NOT NULL,
        GoogleID VARCHAR(255) DEFAULT NULL,
        Date DATETIME DEFAULT CURRENT_TIMESTAMP,
        Thumbnail VARCHAR(255) DEFAULT 'https://img.league-funny.com/imgur/148292128067.jpg',
        Email VARCHAR(255) UNIQUE,
        Password VARCHAR(1024) DEFAULT NULL,
        LineID VARCHAR(255) DEFAULT NULL,
        ResetToken VARCHAR(255) DEFAULT NULL
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
    `,
  
    TableOperationsLogTable: `
      CREATE TABLE IF NOT EXISTS TableOperationsLog (
        Id BIGINT AUTO_INCREMENT PRIMARY KEY,
        TableName VARCHAR(64) NOT NULL,
        Operation ENUM('INSERT', 'UPDATE', 'DELETE') NOT NULL,
        OperationTime TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        User VARCHAR(64) DEFAULT NULL,
        RecordId VARCHAR(255) DEFAULT NULL,
        BeforeValue TEXT,
        AfterValue TEXT
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `,
  };
  