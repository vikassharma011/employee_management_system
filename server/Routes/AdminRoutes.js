import express from 'express'
import { conn } from '../utilis/db.js'
import jwt from 'jsonwebtoken'

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

export { router as adminRouter }
