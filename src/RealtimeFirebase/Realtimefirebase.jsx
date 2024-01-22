import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { EmpData } from '../App'
import { get, onValue, ref, remove } from 'firebase/database'
import { db } from './firebase'
import bin from '../Component/images/bin.png'
import edit from '../Component/images/editp.png'

const Realtimefirebase = () => {

    const empDatas = useContext(EmpData)
    // console.log(empDatas);
    const employees = empDatas.emp
    const setEmployees = empDatas.setEmp
    // console.log(employees)
    const setInput = empDatas.setInput
    const input = empDatas.input
    // const id = empDatas.id
    const setId = empDatas.setId
    // const editMode = empDatas.editMode
    const setEditMode = empDatas.setEditMode

    useEffect(() => {
        const userRef = ref(db, "Employees")
        onValue(userRef, (snapshot) => {
            var list = []
            snapshot.forEach((snapchild) => {
                var id = snapchild.key
                var data = snapchild.val()
                var details = { id, ...data }
                list.push(details)
            })
            setEmployees(list)
        })
    }, [])

    const handleEdit = (id) => {
        const userRef = ref(db, `Employees/${id}`)
        get(userRef).then((item) => {
            var data = item.val()
            // console.log(data);
            setInput({...input, ...data})
            setEditMode(true)
            setId(id)
        })
    }

    const handleDelete = (id) => {
        const userRef = ref(db, `Employees/${id}`)
        remove(userRef).then()
    }

    return (
        <>
            <section className='my-5'>
                <div className="container">
                    <div className="area p-4 px-5 bg-white bor-rad shadow">
                        <table className='table table-hover table-bordered table-rounded p-3 text-center caption-top align-middle'>
                            <caption className='mb-3'>
                                <div className="d-flex justify-content-between">
                                    <h1 className='mb-4 fs-3'>Employees Management</h1>
                                    <div>
                                        <Link to='/addemployee' className='btn btn-dark'><i className="fa-solid fa-user-group me-2"></i> New Employee</Link>
                                    </div>
                                </div>
                                <div className="d-flex align-items-center justify-content-between">
                                    <h3 className='m-0'>Real Time Firebase </h3>
                                    <div className="form-group col-3">
                                        <input type="text" placeholder="Search Employee..." name='search'></input>
                                        <label>Filters</label>
                                    </div>
                                    <div className="form-group col-3">
                                        <input type="text" placeholder="Search Ott platform..." name='search'></input>
                                        <label>OTT</label>
                                    </div>
                                    <button className='btn btn-dark bor-rad'><i className="fa-solid fa-circle-up ms-2"></i></button>
                                    <div className="form-group col-2">
                                        <select className='bor-rad w-100 pyy-2'>
                                            <option value="Term" className='pyy-2 bor-rad'>--Term--</option>
                                            <option value="Yearly" className='pyy-2 bor-rad'>Yearly</option>
                                            <option value="Quarterly" className='pyy-2 bor-rad'>Quarterly</option>
                                            <option value="Monthly" className='pyy-2 bor-rad'>Monthly</option>
                                        </select>
                                    </div>
                                </div>
                            </caption>
                            <thead className='table-dark'>
                                <tr>
                                    <th className='gr-text'>Sr.</th>
                                    <th className='gr-text'>Name</th>
                                    <th className='gr-text'>Position</th>
                                    <th className='gr-text'>Department</th>
                                    <th className='gr-text col-2' colSpan={2}>Action</th>
                                </tr>
                            </thead>
                            <tbody className='table-group-divider'>
                                {
                                    employees.map((user, id) => {
                                        return <tr key={id}>
                                            <td>{id + 1}</td>
                                            <td>{user.name}</td>
                                            <td>{user.position}</td>
                                            <td>{user.department}</td>

                                            <td className=''>
                                                <Link to={'/addemployee'} className="btn btn-light" onClick={() => handleEdit(user.id)}>
                                                    <img src={edit} alt="" width="24px" />
                                                </Link></td>
                                            <td className=''>
                                                <button className="btn btn-light" onClick={() => handleDelete(user.id)}>
                                                    <img src={bin} alt="" width="24px" />
                                                </button></td>
                                        </tr>
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Realtimefirebase;