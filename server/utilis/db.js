import mysql from "mysql"

const conn = mysql.createConnection({
    "host": "localhost",
    "user":"root",
    "password":"",
    "database":"employees"
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