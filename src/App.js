import './App.css';
import Header from './Component/Header';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Component/Home';
import Users from './Routing Crud/Users';
import Adduser from './Routing Crud/Adduser';
import { createContext, useEffect, useState } from 'react';
import Edituser from './Routing Crud/Edituser';
import error from "./Component/images/error-404.png"
import Filter from './Filter/Filter';
import Products from './ReduxThunkAddtoCart/Products'
import Cart from './ReduxThunkAddtoCart/SubComponent/Cart'
import Realtimefirebase from './RealtimeFirebase/Realtimefirebase';
import AddEmployee from './RealtimeFirebase/AddEmployee';


// Create Context for PR 11 RealtimeFirebase
export const EmpData = createContext()

function App() {

  const [users, setUsers] = useState(() => {
    return JSON.parse(localStorage.getItem('list')) || []
  })

  useEffect(() => {
    localStorage.setItem('list', JSON.stringify(users))
  }, [users])

  // EMployee Data
  const init = {
    name: "",
    position: "",
    department: ""
  }

  const [emp, setEmp] = useState([])
  const [input, setInput] = useState(init)
  const [editMode, setEditMode] = useState(false)
  const [id, setId] = useState()

  return (
    <>
      <BrowserRouter>
        <Header />
        <EmpData.Provider value={{ emp, setEmp, input, setInput, init, editMode, setEditMode, id, setId}}>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/users' element={<Users users={users} setUsers={setUsers} />} />
            <Route path='/adduser' element={<Adduser users={users} setUsers={setUsers} />} />
            <Route path='/edituser/:id' element={<Edituser users={users} setUsers={setUsers} />} />
            <Route path='/filter' element={<Filter users={users} setUsers={setUsers} />} />
            <Route path='/products' element={<Products />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='/realtimefirebase' element={<Realtimefirebase />} />
            <Route path='/addemployee' element={<AddEmployee />} />
            <Route path='*' element={<h1 className='text-center mt-5'><img src={error} width="250px"></img></h1>} />
          </Routes>
        </EmpData.Provider>
      </BrowserRouter>
    </>
  );
}

export default App;
