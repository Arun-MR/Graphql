import postgres from 'postgres'
const sql = postgres('postgres://myuser:password@host:5432/mydatabase', {
    host                 : 'localhost',            // Postgres ip address[s] or domain name[s]
    port                 : 5432,          // Postgres server port[s]
    database             : 'mydatabase',            // Name of database to connect to
    username             : 'myuser',            // Username of database user
    password             : 'password',            // Password of database user
  });
async function testConnection() {
    try {
        const result = await sql`SELECT 1 + 1 AS result`;
        console.log('Connection successful:', result);
    } catch (error) {
        console.error('Connection error:', error);
    } 
}
testConnection();
export default sql

// import  { Client } from 'pg';
// import pkg from 'pg';
// const { Client } = pkg;


// // PostgreSQL connection configuration
// const client = new Client({
//   user: 'myuser',
//   host: 'localhost',
//   database: 'mydatabase',
//   password: 'password',
//   port: 5432,
// });
 
// // Connect to PostgreSQL
// client.connect() 
//   .then(() => {
//     console.log('Connected to PostgreSQL'); 
//     // Execute a simple query
//     return client.query('SELECT * FROM your_table');
//   })
//   .then((result) => {
//     console.log('Query result:', result.rows);
//   })
//   .catch((error) => {
//     console.error('Error connecting to PostgreSQL:', error);
//   })
//   .finally(() => {
//     // Close the PostgreSQL client
//     client.end();
//   });

//   export default client