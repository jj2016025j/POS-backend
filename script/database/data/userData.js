const initialUsers = [
  {
    id: 4,
    name: 'jq chan',
    googleID: '117319014509002144253',
    date: '2024-02-20 16:47:04',
    thumbnail: 'https://lh3.googleusercontent.com/a/ACg8ocLeS_ytsSXsmzklVUvTYT-Iu75CFybF_7DGR7DqOrV9=s96-c',
    email: 'jqchan136309@gmail.com',
    password: null,
    lineID: null,
    reset_token: '085748660c0eb03d35a304c1861b6ddaef040a01'
  },
  {
    id: 6,
    name: '김가은',
    googleID: '111190776991571478286',
    date: '2024-02-20 16:52:37',
    thumbnail: 'https://lh3.googleusercontent.com/a/ACg8ocIFSFmCPuGqkOQD0uwiYOFZCk3hoKk43FzEy2Ym3j-E=s96-c',
    email: 's90526905@gmail.com',
    password: null,
    lineID: null,
    reset_token: null
  },
  {
    id: 22,
    name: '0319',
    googleID: null,
    date: '2024-03-19 11:54:25',
    thumbnail: 'https://img.league-funny.com/imgur/148292128067.jpg',
    email: '0319@gmail.com',
    password: '$2b$12$WNx/bR40CQqbHDpKvpEL/ubMFZVZC/.oprtwyvk0pqKwLrpq5DUdO',
    lineID: null,
    reset_token: null
  },
  {
    id: 27,
    name: '0322',
    googleID: null,
    date: '2024-03-22 10:04:00',
    thumbnail: 'https://img.league-funny.com/imgur/148292128067.jpg',
    email: '0322@gmail.com',
    password: '$2b$12$jRFB1z4NplVD7VkvMVsZNupzzFfZco76McB1U4AFkWToD4bLEiYZ2',
    lineID: null,
    reset_token: null
  }
];

function generateInsertUsersQuery(users) {
  const values = users.map(user => `(${user.id}, '${user.name}', ${user.googleID ? `'${user.googleID}'` : 'NULL'}, 
  '${user.date}', '${user.thumbnail}', '${user.email}', ${user.password ? `'${user.password}'` : 'NULL'}, 
  ${user.lineID ? `'${user.lineID}'` : 'NULL'}, ${user.reset_token ? `'${user.reset_token}'` : 'NULL'})`);

  return `INSERT INTO users (id, name, googleID, date, thumbnail, email, password, lineID, reset_token) VALUES ${values.join(', ')};`;
}

module.exports = { initialUsers, generateInsertUsersQuery };
