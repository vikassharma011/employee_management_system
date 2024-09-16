import mysql from "mysql"

const conn = mysql.createConnection({
    "host": "sql12.freemysqlhosting.net",
    "user":"sql12731626",
    "password":"YydlqIAds4",
    "database":"sql12731626"
})

conn.connect((err)=>{
    if(err){
        console.log(err);
    }
    else{
        console.log("connected succesfully");
    }
})

export {conn};
