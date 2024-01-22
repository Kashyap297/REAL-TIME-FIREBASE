import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { EmpData } from '../App'
import { db } from './firebase'
import { push, ref, set, update } from 'firebase/database'

const AddEmployee = () => {

    const inputData = useContext(EmpData)

    const input = inputData.input
    const setInput = inputData.setInput
    const init = inputData.init

    // const [input, setInput] = useState(init)
    const [errors, setErrors] = useState({})
    const navigate = useNavigate()
    const empDatas = useContext(EmpData)
    const employees = [empDatas.emp]
    const setEmployees = empDatas.setEmp

    const editMode = inputData.editMode
    const setEditMode = inputData.setEditMode
    const id = inputData.id
    const setId = inputData.setId


    const checkValidation = (input) => {
        const errors = {}

        if (input.name.trim() === "") {
            errors.name = "Invalid Name*"
        }
        if (input.position.trim() === "") {
            errors.position = "Invalid Input*"
        }
        if (input.department.trim() === "") {
            errors.department = "Invalid Data*"
        }

        return errors
    }

    const handleChange = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const validate = checkValidation(input)
        setErrors(validate)
        const check = Object.keys(validate)
        if (check.length < 1) {
            // setEmps([...emps, input])
            if (editMode && id) {
                const userRef = ref(db, `Employees/${id}`)
                update(userRef, input).then()
                setEditMode(false)
                navigate(-1)
                // setInput(init)
            } else {
                const userRef = ref(db, "Employees")
                const newRef = push(userRef)
                set(newRef, input).then(() => {
                    setEmployees(...employees, input)
                    navigate(-1)
                })
            }
        }
        setInput(init)
    }
    // console.log(emps);

    return (
        <section className='mt-5 gr-text'>
            <div className="container">
                <div className="col-4 m-auto">
                    <form action="" className='bg-light p-3 bor-rad lightslategrey shadow-lg' onSubmit={handleSubmit}>
                        <h4 className='text-center mb-3'>{editMode ? "Update Data" : "Add New Employee"}</h4>
                        <div className="form-group mb-3">
                            <input type="text" placeholder="" name='name' value={input ? input.name : ''} onChange={handleChange}></input>
                            <label>Name</label>
                            <div className='text-danger text-end'>{errors.name}</div>
                        </div>
                        <div className="form-group mt-3 mb-3">
                            <input type="text" placeholder="" name='position' value={input ? input.position : ''} onChange={handleChange}></input>
                            <label>Positions</label>
                            <div className='text-danger text-end'>{errors.position}</div>
                        </div>
                        <select className='bor-rad w-100 pyy-2' name='department' onChange={handleChange} value={input ? input.department : ''}>
                            <option value="" className='pyy-2 bor-rad'>--Department--</option>
                            <option value="Human Resources" className='pyy-2 bor-rad'>Human Resources</option>
                            <option value="Finance and Accounting" className='pyy-2 bor-rad'>Finance and Accounting</option>
                            <option value="Sales and Marketing" className='pyy-2 bor-rad'>Sales and Marketing</option>
                            <option value="Information Technology (IT)" className='pyy-2 bor-rad'>Information Technology (IT)</option>
                            <option value="Customer Support" className='pyy-2 bor-rad'>Customer Support</option>
                            <option value="Production" className='pyy-2 bor-rad'>Production</option>
                            <option value="Quality Control" className='pyy-2 bor-rad'>Quality Control</option>
                            <option value="Project Management" className='pyy-2 bor-rad'>Project Management</option>
                            <option value="Business Development" className='pyy-2 bor-rad'>Business Development</option>
                        </select>
                        <div className='text-danger text-end'>{errors.department}</div>
                        <button type='submit' className='button w-100 py-2 mt-3'>{editMode ? "Update" : "Add"}</button>
                    </form>
                </div>
            </div>
        </section>
    )
}

export default AddEmployee