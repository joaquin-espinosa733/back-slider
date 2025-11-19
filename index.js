const { testConnection } = require('./src/r2');
const server = require('./src/server');
const port = 3000;
const { connectDB } = require('./src/db/db');



(async () => {
    await testConnection();
    await connectDB();
    server.get('/', (req, res) => res.send('Hello World!'));

    server.listen(port, () => console.log(`🚀 App listening on port ${port}!`));
})();
