module.exports = `
  CREATE TABLE IF NOT EXISTS Category (    Id INT AUTO_INCREMENT PRIMARY KEY,    CategoryName VARCHAR(255) NOT NULL,    Description TEXT,    sort INT DEFAULT 0  );
`;
