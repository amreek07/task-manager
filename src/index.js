const app = require('./app');
const connectDB = require('./config/db');
const config = require('./config/config');

connectDB().then(()=>{
    app.listen(config.PORT, ()=>{
        console.log(`Server is running on port ${config.PORT}`);
    })
}).catch((err)=> {
    console.error(`Error while connecting db: ${err.message}`);
    process.exit(1);
})