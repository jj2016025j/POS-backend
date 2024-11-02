// db/tables/SubOrderMappingsTable.js
module.exports = `
  CREATE TABLE IF NOT EXISTS SubOrderMappings (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    SubOrderId VARCHAR(255) NOT NULL,
    MenuItemId INT NOT NULL,
    quantity INT NOT NULL,
    unit_price INT NOT NULL,
    total_price INT NOT NULL,
    FOREIGN KEY (MenuItemId) REFERENCES MenuItems(Id) ON DELETE CASCADE ON UPDATE CASCADE
  );
`;
