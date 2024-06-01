import mysql from "mysql"

const conn = mysql.createConnection({
    "host": "sql12.freesqldatabase.com",
    "user":"sql12711114",
    "password":"FmnSqm6fP1",
    "database":"sql12711114"
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