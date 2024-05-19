import express from 'express'
import { conn } from '../utilis/db.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
// import multer from 'multer';
// import path from "path";

const router = express.Router()

router.post('/adminlogin', (req, res) => {
  const sql = 'SELECT * FROM admin WHERE email = ? AND password = ?'
  conn.query(sql, [req.body.email, req.body.password], (err, result) => {
    if (err) {
      return res.json({ LoginStatus: false, Error: 'Query Error' })
    }
    if (result.length > 0) {
      const email = result[0].email
      const token = jwt.sign(
        { role: 'admin', email: email },
        'jwt_secret_key',
        { expiresIn: '1d' },
      )
      res.cookie('token',token);
      return res.json({ LoginStatus: true})
    }
    else{
        return res.json({ LoginStatus: false, Error: 'Wrong Email or Password' })
    }
  })
})

router.get('/category', (req, res) => {
  const sql = "SELECT * FROM category";
  conn.query(sql, (err, result) => {
      if(err) return res.json({Status: false, Error: "Query Error"})
      return res.json({Status: true, Result: result})
  })
})

router.post('/add_category', (req, res) => {
  const sql = "INSERT INTO category (`name`) VALUES (?)"
  conn.query(sql, [req.body.category], (err, result) => {
      if(err) return res.json({Status: false, Error: "Query Error"})
      return res.json({Status: true})
  })
})

// image upload 
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//       cb(null, 'Public/Images')
//   },
//   filename: (req, file, cb) => {
//       cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname))
//   }
// })
// const upload = multer({
//   storage: storage
// })
// // end imag eupload 

router.post('/add_employee', (req, res) => {
  const { name, email, password, address, salary, category_id } = req.body;

  // Check if all required fields are provided
  if (!name || !email || !password || !address || !salary || !category_id) {
    return res.json({ Status: false, Error: "All fields are required" });
  }

  // Hash the password
  bcrypt.hash(password, 10, (err, hash) => {
    if (err) {
      console.error("Password hashing error:", err); // Log the error
      return res.json({ Status: false, Error: "Password hashing error" });
    }

    // Save employee data to the database
    const sql = `INSERT INTO employee (name, email, password, address, salary, category_id) VALUES (?, ?, ?, ?, ?, ?)`;
    const values = [name, email, hash, address, salary, category_id];

    conn.query(sql, values, (err, result) => {
      if (err) {
        console.error("Database insertion error:", err); // Log the error
        return res.json({ Status: false, Error: err });
      }
      return res.json({ Status: true });
    });
  });
});

router.get('/employee', (req, res) => {
  const sql = "SELECT * FROM employee";
  conn.query(sql, (err, result) => {
      if(err) return res.json({Status: false, Error: "Query Error"})
      return res.json({Status: true, Result: result})
  })
})

router.put('/edit_employee/:id', (req, res) => {
  const id = req.params.id;
  const sql = `UPDATE employee 
      set name = ?, email = ?, salary = ?, address = ?, category_id = ? 
      Where id = ?`
  const values = [
      req.body.name,
      req.body.email,
      req.body.salary,
      req.body.address,
      req.body.category_id
  ]
  conn.query(sql,[...values, id], (err, result) => {
      if(err) return res.json({Status: false, Error: "Query Error"+err})
      return res.json({Status: true, Result: result})
  })
})

router.delete('/delete_employee/:id', (req, res) => {
  const id = req.params.id;
  const sql = "delete from employee where id = ?"
  conn.query(sql,[id], (err, result) => {
      if(err) return res.json({Status: false, Error: "Query Error"+err})
      return res.json({Status: true, Result: result})
  })
})
router.get('/employee_count', (req, res) => {
  const sql = "select count(id) as employee from employee";
  conn.query(sql, (err, result) => {
      if(err) return res.json({Status: false, Error: "Query Error"+err})
      return res.json({Status: true, Result: result})
  })
})

router.get('/salary_count', (req, res) => {
  const sql = "select sum(salary) as salaryOFEmp from employee";
  conn.query(sql, (err, result) => {
      if(err) return res.json({Status: false, Error: "Query Error"+err})
      return res.json({Status: true, Result: result})
  })
})
router.get('/admin_records', (req, res) => {
  const sql = "select * from admin"
  conn.query(sql, (err, result) => {
      if(err) return res.json({Status: false, Error: "Query Error"+err})
      return res.json({Status: true, Result: result})
  })
})

router.get('/logout', (req, res) => {
  res.clearCookie('token')
  return res.json({Status: true})
})

export { router as adminRouter }
