import React from 'react'
import Table from 'react-bootstrap/Table';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const Users = () => {
    const [userList, setUserList] = useState([])
    let userToken = JSON.parse(localStorage.getItem('userDetail'))
    useEffect(() => {
        axios({
            headers: {
                Authorization: `Bearer ${userToken.token}`
            },
            method: "GET",
            url: `http://localhost:8000/api/getUsers`
        }).then((res) => {
            console.log('this is res',res)
            setUserList(res.data)
            console.log('this is useList', userList)
        }).catch((err) => {
            toast(err.response.data.error.message, {
                type: 'error',
                autoClose: 2000
            })
        })
    }, [])
    return (
        <div className='container mt-2'>
            <Table striped bordered hover variant="dark">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Address</th>
                        <th>Phone</th>
                        <th>Profile</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        userList.map((item, index) => {
                            return (<tr key={index}>
                                <td>{item.id}</td>
                                <td>{item.name}</td>
                                <td>{item.email}</td>
                                <td>{item.address}</td>
                                <td>{item.phone}</td>
                                <td>{item.profile}</td>
                            </tr>)
                        })
                    }
                    {/* <tr>
                        <td>1</td>
                        <td>Mark</td>
                        <td>Otto</td>
                        <td>@mdo</td>
                        <td>@mdo</td>
                        <td>@mdo</td>
                    </tr> */}
                </tbody>
            </Table>
        </div>
    )
}

export default Users