
const mongoose = require("mongoose");


// This is currently connected to the db i used for ayuda
const MONGO_CONNECTION =`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@ayuda.pp23z.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`


//`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@tenten-pp23z.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`

//const MONGO_CONNECTION = `mongodb://127.0.0.1:27017/${process.env.MONGO_DB}`

mongoose.set('useFindAndModify', false);


const connect = async () => {
  let database;
  const client =  await mongoose.connect(
    MONGO_CONNECTION,
    { useUnifiedTopology: true, useNewUrlParser: true },
    function (err, client) {
      const db = client.db;
      database = db
      //console.log(db);
      //console.log(client)
      return db;
    }
  );
  //console.log(database)
    return database
}


module.exports = connect;
