import mysql from "mysql"

const conn = mysql.createConnection({
    "host": "sql12.freesqldatabase.com",
    "user":"sql12708398",
    "password":"bAKQGqhfx6",
    "database":"sql12708398"
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