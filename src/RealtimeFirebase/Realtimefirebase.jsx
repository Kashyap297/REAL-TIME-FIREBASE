import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { EmpData } from '../App'
import { endAt, get, onValue, orderByChild, query, ref, remove, startAt } from 'firebase/database'
import { db } from './firebase'
import bin from '../Component/images/bin.png'
import edit from '../Component/images/editp.png'
import page from '../Component/images/page.png'

const Realtimefirebase = () => {

    const empDatas = useContext(EmpData)
    // console.log(empDatas);
    const employees = empDatas.emp
    const setEmployees = empDatas.setEmp
    // console.log(employees)
    const setInput = empDatas.setInput
    const input = empDatas.input
    const setId = empDatas.setId
    const setEditMode = empDatas.setEditMode

    const [noRecord, setNoRecord] = useState(false)
    const [findEmp, setFindEmp] = useState('')
    const [department, setDepartment] = useState('')
    const [sortOrder, setSortOrder] = useState('asc');

    useEffect(() => {
        if (employees.length === 0) {
            setNoRecord(true)
        } else {
            setNoRecord(false)
        }
    }, [employees])

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
            setInput({ ...input, ...data })
            setEditMode(true)
            setId(id)
        })
    }

    const handleDelete = (id) => {
        const userRef = ref(db, `Employees/${id}`)
        remove(userRef).then()
    }

    const handleFind = (e) => {
        const findValue = e.target.value.toLowerCase();
        setFindEmp(findValue)

        const userRef = ref(db, "Employees")
        const recentPostsRef = query(userRef, orderByChild('name'), startAt(findValue), endAt(findValue + '\uf8ff'))

        onValue(recentPostsRef, (snapshot) => {
            var list = []
            snapshot.forEach((snapchild) => {
                var id = snapchild.key
                var data = snapchild.val()
                var details = { id, ...data }
                list.push(details)
            })
            setEmployees(list)
        })

    }
    const handleDeptChange = (e) => {
        const findValue = e.target.value
        setDepartment(findValue)

        const userRef = ref(db, "Employees")
        const recentPostsRef = query(userRef, orderByChild('department'), startAt(findValue), endAt(findValue + '\uf8ff'))

        onValue(recentPostsRef, (snapshot) => {
            var list = []
            snapshot.forEach((snapchild) => {
                var id = snapchild.key
                var data = snapchild.val()
                var details = { id, ...data }
                list.push(details)
            })
            setEmployees(list)
        })
    }

    const sortEmployee = () => {
        const userRef = ref(db, 'Employees');
        const orderType = sortOrder === 'asc' ? 'desc' : 'asc';

        const sortedPostsRef = query(userRef, orderByChild('name'));

        onValue(sortedPostsRef, (snapshot) => {
            var list = [];
            snapshot.forEach((snapchild) => {
                var id = snapchild.key;
                var data = snapchild.val();
                var details = { id, ...data };
                list.push(details);
            });
            if (orderType === 'desc') {
                list.reverse()
            }
            setEmployees(list);
            setSortOrder(orderType)
        });
    };

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
                                        <input type="text" placeholder="Employee..." name='find' value={findEmp} onChange={handleFind}></input>
                                        <label>Find</label>
                                    </div>
                                    {/* <div className="form-group col-3">
                                        <input type="text" placeholder="Search Ott platform..." name='search'></input>
                                        <label>OTT</label>
                                    </div> */}
                                    <button className='btn btn-dark bor-rad' onClick={sortEmployee}>SORT{sortOrder === 'asc' ? <i className="fa-solid fa-circle-up ms-2"></i> : <i className="fa-solid fa-circle-down ms-2"></i>}</button>
                                    <div className="form-group col-2">
                                        <select className='bor-rad w-100 pyy-2' value={department} onChange={handleDeptChange}>
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
                                    </div>
                                </div>
                            </caption>
                            <thead className='table-dark'>
                                <tr>
                                    <th className='gr-text'>Sr.</th>
                                    <th className='gr-text'>Employee Name</th>
                                    <th className='gr-text'>Position</th>
                                    <th className='gr-text'>Department</th>
                                    <th className='gr-text col-2' colSpan={2}>Action</th>
                                </tr>
                            </thead>
                            <tbody className='table-group-divider'>
                                {
                                    noRecord ? (
                                        <>
                                            <tr>
                                                <td className='text-center fw-bold pe-0 py-3 fs-3 text-danger' colSpan={6}><img src={page} alt="" className='d-block m-auto' width="150px" />
                                                    Empty Records</td>
                                            </tr>
                                        </>
                                    ) : (
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
                                    )

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