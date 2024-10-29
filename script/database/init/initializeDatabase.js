const pool = require('./connection');
const Queries = require('./queries');

const DatabaseInitializer = {
    async initialize() {
        const connection = await pool.getConnection();
        try {
            await connection.query(Queries.createDatabase);
            await connection.query(Queries.createUsersTable);
            const insertUsersQuery = Queries.generateInsertUsersQuery(Queries.initialUsers);
            await connection.query(insertUsersQuery);
            console.log('Database and tables created successfully, and initial data inserted.');
        } catch (err) {
            console.error('Error initializing database:', err.message);
        } finally {
            connection.release();
        }
    }
};

module.exports = DatabaseInitializer;
