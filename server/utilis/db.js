import mysql from "mysql"

const conn = mysql.createConnection({
    "host": "bpsm3dxrq1izl7ylqtjj-mysql.services.clever-cloud.com",
    "user":"ufsttt81uolk7wik",
    "password":"i7vX4wk5m1u1ZPhEjcj2",
    "database":"bpsm3dxrq1izl7ylqtjj"
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
