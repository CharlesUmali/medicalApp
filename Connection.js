const mysql = require('mysql');

let conn = mysql.createConnection({
  host: '', //Hostname for the Databse
  user: '', //Username for the Host
  password: '', //Password for the Host
  database: '', //Database found in Host
  multipleStatements: true
});

conn.connect((err) => {
  if(!err){
    console.log('Connection is Successful!');
  }
  else {
    console.log('Connection Failed! \n Error: ' + JSON.stringify(error, undefined, 2));
  }
})

module.exports.conn = conn;
