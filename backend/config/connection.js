const mongoose = require('mongoose');

async function db_connect(){
    try{
        const conn = await mongoose.connect(process.env.DB_CONNECTION);
        if(conn.connection != null)
            console.log('MongoDB connected :', conn.connection.host);
        else 
            console.log('MongoDB Failed to connect');
    }
    catch(err){
        console.log(err)
        throw new Error(err.stack);
    }
}

module.exports = db_connect;