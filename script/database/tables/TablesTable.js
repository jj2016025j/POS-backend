module.exports = `
  CREATE TABLE IF NOT EXISTS Tables (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    TableNumber INT NOT NULL,
    TablesStatus ENUM('空桌', '點餐中', '待確認', '製作中', '用餐中', '清潔中') NOT NULL DEFAULT '空桌',
    MainOrderId VARCHAR(255) NULL
  );
`;
