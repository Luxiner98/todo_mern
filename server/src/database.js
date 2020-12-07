const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const {
    MONGO_HOSTNAME,
    MONGO_DB,
    MONGO_PORT
} = process.env;

const dbConnectionURL = {
    'LOCALURL': `mongodb://${MONGO_HOSTNAME}:${MONGO_PORT}/${MONGO_DB}`
};

mongoose.connect(dbConnectionURL.LOCALURL,{useUnifiedTopology: true,useNewUrlParser:true});

const db = mongoose.connection;
db.on('error', console.error.bind(console,'connection error:'));
db.once('open',()=>{
    console.log('DB started!');
})