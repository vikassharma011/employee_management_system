import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Employee = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get("https://employee-management-system-bnlb.onrender.com/auth/employee");
        setEmployees(response.data.Result);
      } catch (error) {
        setError(error.message || "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://employee-management-system-bnlb.onrender.com/auth/delete_employee/${id}`);
      setEmployees(employees.filter((employee) => employee.id !== id));
    } catch (error) {
      setError(error.message || "An error occurred");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container mt-3">
      <div className="row">
        <div className="col-12">
          <h3>Employee List</h3>
        </div>
        <div className="col-12 mb-3">
          <Link to="/dashboard/add_employee" className="btn btn-success">
            Add Employee
          </Link>
        </div>
      </div>
      <div className="table-responsive">
        <table className="table table-striped table-bordered">
          <thead className="table-dark">
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Address</th>
              <th>Salary</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr key={employee.id}>
                <td>{employee.name} <br/>
                <button
                      className="btn btn-warning btn-sm"
                      onClick={() => handleDelete(employee.id)}
                    >
                      Delete
                    </button>
                </td>
                <td>{employee.email}</td>
                <td>{employee.address}</td>
                <td>{employee.salary}</td>
                <td>
                  <div className="d-flex flex-row">
                    <Link
                      to={`/dashboard/edit_employee/${employee.id}`}
                      className="btn btn-info btn-sm me-2"
                    >
                      Edit
                    </Link>
                    <button
                      className="btn btn-warning btn-sm"
                      onClick={() => handleDelete(employee.id)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Employee;
