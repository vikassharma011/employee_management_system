import axios from "axios";
import { useEffect } from "react";
// import "./start.css"
import { useNavigate } from "react-router-dom";

const Start = () => {
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;

  useEffect(() => {
    const verifyUser = async () => {
      try {
        const result = await axios.get('https://employee-management-system-bnlb.onrender.com/verify');
        console.log(result.data); // Debugging
        if (result.data.Status) {
          if (result.data.role === "admin") {
            navigate('/dashboard');
          } else {
            navigate(`/employee_detail/${result.data.id}`);
          }
        }
      } catch (err) {
        console.log(err);
      }
    };

    verifyUser();
  }, [navigate]);

  const handleEmployeeLogin = () => {
    navigate('/employee_login');
  };

  const handleAdminLogin = () => {
    navigate('/adminlogin');
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 loginPage">
      <div className="p-3 rounded w-100 w-md-50 w-lg-25 border loginForm">
        <h2 className="text-center">Login As </h2>
        <h3 className="text-center">default email:admin@gmail.com,password:employee@123</h3>
        <div className="d-flex justify-content-around mt-5 mb-2">
          <button type="button" className="btn btn-primary" onClick={handleEmployeeLogin}>
            Employee
          </button>
          <button type="button" className="btn btn-success" onClick={handleAdminLogin}>
            Admin
          </button>
        </div>
      </div>
    </div>
  );
};

export default Start;
