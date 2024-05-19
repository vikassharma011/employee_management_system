import axios from 'axios'
import  { useEffect, useState } from 'react'


const Home = () => {
  // const [adminTotal, setAdminTotal] = useState(0)
  const [employeeTotal, setemployeeTotal] = useState(0)
  const [salaryTotal, setSalaryTotal] = useState(0)
  const [admins, setAdmins] = useState([])

  useEffect(() => {
    // adminCount();
    employeeCount();
    salaryCount();
    AdminRecords();
  }, [])

  const AdminRecords = () => {
    axios.get('http://localhost:5000/auth/admin_records')
    .then(result => {
      if(result.data.Status) {
        setAdmins(result.data.Result)
      } else {
         alert(result.data.Error)
      }
    })
  }

  // const adminCount = () => {
  //   axios.get('http://localhost:5000/auth/admin_count')
  //   .then(result => {
  //     if(result.data.Status) {
  //       setAdminTotal(result.data.Result[0].admin)
  //     }
  //   })
  // }

  const employeeCount = () => {
    axios.get('http://localhost:5000/auth/employee_count')
    .then(result => {
      if(result.data.Status) {
        setemployeeTotal(result.data.Result[0].employee)
      }
    })
  }

  const salaryCount = () => {
    axios.get('http://localhost:5000/auth/salary_count')
    .then(result => {
      if(result.data.Status) {
        setSalaryTotal(result.data.Result[0].salaryOFEmp)
      } else {
        alert(result.data.Error)
      }
    })
  }

  return (
    <div>
      <div className='container mt-3'>
        <div className='row'>
          <div className='col-12 col-md-4 mb-3'>
            <div className='p-3 border shadow-sm text-center bg-light h-100'>
              <h4>Admin</h4>
              <hr />
              <div className='d-flex justify-content-between'>
                <h5>Total:</h5>
                <h5>shown in list</h5>
              </div>
            </div>
          </div>
          <div className='col-12 col-md-4 mb-3'>
            <div className='p-3 border shadow-sm text-center bg-light h-100'>
              <h4>Employee</h4>
              <hr />
              <div className='d-flex justify-content-between'>
                <h5>Total:</h5>
                <h5>{employeeTotal}</h5>
              </div>
            </div>
          </div>
          <div className='col-12 col-md-4 mb-3'>
            <div className='p-3 border shadow-sm text-center bg-light h-100'>
              <h4>Salary</h4>
              <hr />
              <div className='d-flex justify-content-between'>
                <h5>Total:</h5>
                <h5>${salaryTotal}</h5>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='container mt-4'>
        <h3>List of Admins</h3>
        <div className='table-responsive'>
          <table className='table table-striped'>
            <thead>
              <tr>
                <th>Email</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {admins.map((a, index) => (
                <tr key={index}>
                  <td>{a.email}</td>
                  <td>
                    <button className="btn btn-info btn-sm me-2">
                      Edit
                    </button>
                    <button className="btn btn-warning btn-sm">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Home
