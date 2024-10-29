const pool = require('./connection');

// 初始化資料庫
async function initializeDatabase() {
    try {
        await pool.query(`DROP DATABASE IF EXISTS fang_project2`);
        await pool.query(`CREATE DATABASE fang_project2`);
        await pool.query(`USE fang_project2`);

        const createTables = [
            `CREATE TABLE IF NOT EXISTS users (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                googleID VARCHAR(255) DEFAULT NULL,
                date DATETIME DEFAULT CURRENT_TIMESTAMP,
                thumbnail VARCHAR(255) DEFAULT 'https://img.league-funny.com/imgur/148292128067.jpg',
                email VARCHAR(255) DEFAULT NULL,
                password VARCHAR(1024) DEFAULT NULL,
                lineID VARCHAR(255) DEFAULT NULL,
                reset_token VARCHAR(255) DEFAULT NULL,
                UNIQUE KEY email_unique (email)
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;`,
            `CREATE TABLE IF NOT EXISTS foods_category (
                id INT AUTO_INCREMENT PRIMARY KEY,
                category VARCHAR(255) NOT NULL,
                sort INT DEFAULT 0
            )`,
            `CREATE TABLE IF NOT EXISTS foods (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                category_id INT NOT NULL,
                price INT NOT NULL,
                image_url TEXT NULL,
                deleted_at TIMESTAMP NULL,
                sort INT DEFAULT 0
            )`,
            `CREATE TABLE IF NOT EXISTS table_orders (
                id INT AUTO_INCREMENT PRIMARY KEY,
                trade_no VARCHAR(255) NOT NULL,
                food_price INT NULL,
                service_fee INT NULL,
                trade_amt INT NULL,
                table_number INT NOT NULL,
                order_status TINYINT DEFAULT 1,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                payment_at TIMESTAMP NULL
            )`,
            `CREATE TABLE IF NOT EXISTS orders_items (
                id INT AUTO_INCREMENT PRIMARY KEY,
                order_id INT NOT NULL,
                food_id INT NOT NULL,
                quantity INT NOT NULL,
                unit_price INT NOT NULL,
                total_price INT NOT NULL
            )`,
            `
                CREATE DATABASE IF NOT EXISTS googledb;
                USE googledb;

                CREATE TABLE IF NOT EXISTS users (
                    id INT(11) NOT NULL AUTO_INCREMENT,
                    name VARCHAR(255) NOT NULL,
                    googleID VARCHAR(255) DEFAULT NULL,
                    date DATETIME DEFAULT CURRENT_TIMESTAMP,
                    thumbnail VARCHAR(255) DEFAULT 'https://img.league-funny.com/imgur/148292128067.jpg',
                    email VARCHAR(255) DEFAULT NULL,
                    password VARCHAR(1024) DEFAULT NULL,
                    lineID VARCHAR(255) DEFAULT NULL,
                    reset_token VARCHAR(255) DEFAULT NULL,
                    PRIMARY KEY (id),
                    UNIQUE KEY email_unique (email)
                ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
            `
        ];

        for (const query of createTables) {
            await pool.query(query);
        }

        console.log('Database and tables initialized.');
    } catch (err) {
        console.error('Error initializing database:', err);
    }
}

// 呼叫初始化函數
initializeDatabase();

module.exports = initializeDatabase;
