const connection = require('./connection');
const userData = require('./userData');

async function insertInitialData() {
  const values = userData.map(user => [
    user.id,
    user.name,
    user.googleID,
    user.date,
    user.thumbnail,
    user.email,
    user.password,
    user.lineID,
    user.reset_token
  ]);

  const insertQuery = `
    USE googledb;
    INSERT INTO users (id, name, googleID, date, thumbnail, email, password, lineID, reset_token) VALUES ?;
  `;

  try {
    await connection.query(insertQuery, [values]);
    console.log('Initial data inserted successfully.');
  } catch (err) {
    console.error('Error inserting initial data:', err.message);
  }
}

module.exports = insertInitialData;
