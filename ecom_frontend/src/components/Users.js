import React from 'react'
import Table from 'react-bootstrap/Table';
import { useEffect, useState } from 'react';
import axios from 'axios';
import {toast } from 'react-toastify';

const Users = () => {
    const [userList, setUserList] = useState([])
    useEffect(() => {
        // console.log("yes")
        axios.get('http://localhost:8000/api/getUsers').then((res)=>{
            console.log(res)
        }).catch((err) => {
            console.log("this is error",err)
            toast(err.response.data.error,{
                type:'error',
                autoClose: 2000
            })
        })
    })
    return (
        <div className='container mt-2'>
            <Table striped bordered hover variant="dark">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Username</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>Mark</td>
                        <td>Otto</td>
                        <td>@mdo</td>
                    </tr>
                    <tr>
                        <td>1</td>
                        <td>Mark</td>
                        <td>Otto</td>
                        <td>@mdo</td>
                    </tr>
                </tbody>
            </Table>
        </div>
    )
}

export default Users