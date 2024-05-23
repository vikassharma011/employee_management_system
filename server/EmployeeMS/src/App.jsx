import './App.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Dashboard from './components/Dashboard'
import Login from './components/Login'
import Home from './components/Home'
import Employee from './components/Employee'
import Category from './components/Category'
import Profile from './components/Profile'
import AddEmployee from './components/AddEmployee'
import EditEmployee from './components/EditEmployee'
import AddCategory from './components/AddCategory'
import Start from './components/Start'
import EmployeeLogin from './components/EmployeeLogin'
import EmployeeDetail from './components/EmployeeDetail'
// import PrivateRoute from './components/PrivateRoute'

function App() {
  

  return (
    
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Start />}></Route>
      <Route path='/adminlogin' element={<Login />}></Route>
      <Route path='/employee_login' element={<EmployeeLogin />}></Route>
      <Route path='/employee_detail/:id' element={<EmployeeDetail />}></Route>
      <Route path='/dashboard' element={
        // <PrivateRoute >
          <Dashboard />
        // </PrivateRoute> 
      }>
        <Route path='' element={<Home />}></Route>
        <Route path='/dashboard/employee' element={<Employee />}></Route>
        <Route path='/dashboard/category' element={<Category />}></Route>
        <Route path='/dashboard/profile' element={<Profile />}></Route>
        <Route path='/dashboard/add_category' element={<AddCategory />}></Route>
        <Route path='/dashboard/add_employee' element={<AddEmployee />}></Route>
        <Route path='/dashboard/edit_employee/:id' element={<EditEmployee />}></Route>
      </Route>
    </Routes>
    </BrowserRouter>
    
  
  )
}

export default App
