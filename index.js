const { testConnection } = require('./src/r2');
const server = require('./src/server');
const { connectDB } = require('./src/db/db');

const port = process.env.PORT || 3000;

(async () => {
    await testConnection();
    await connectDB();
    server.get('/', (req, res) => res.send('Hello World!'));

    server.listen(port, () => console.log(`🚀 App listening on port ${port}!`));
})();
