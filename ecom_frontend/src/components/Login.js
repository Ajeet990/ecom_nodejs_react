import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import Loading from '../components/Loading'
import {toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
const Login = () => {
    // toast.configure()
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [userLoginDetail, setUserLoginDetail] = useState({
        userEmail:'',
        userPassword:''
    })
    const handleInput = (e) => {
        e.persist()
        // console.log(e.target.name)
        setUserLoginDetail({...userLoginDetail, [e.target.name] : e.target.value})
        // console.log(userLoginDetail);

    }
    const handleSubmit = (e) => {
        e.preventDefault()
        // console.log("handle submit")
        // console.log(e)
        if (userLoginDetail.userEmail == '' || userLoginDetail.userPassword == '') {
            toast('Please fill all fields', {
                position: "top-right",
                type:'warning',
                autoClose: 2000
            });
        } else {
            const loginDetail = {
                email:userLoginDetail.userEmail,
                password:userLoginDetail.userPassword
            }
            axios.post(`http://localhost:8000/api/login`, loginDetail)
            .then((res) => {
                if (res.data.isSuccess == true) {
                    toast(res.data.message, {
                        position: "top-right",
                        type:'success',
                        autoClose: 2000
                    });
                    navigate('/users')
                } else {
                    toast(res.data.message, {
                        position: "top-right",
                        type:'error',
                        autoClose: 3000
                    });
                    
                }
            })
            .catch (function (error) {
                console.log(error)
            })
        }
    }

    if (loading) {
        return (<Loading />)
    }
    return (
        <div className='container mt-5'>
            <div className='row'>
                <div className='col-md-12'>
                    <div className='card col-md-6 '>
                        <div className='card-header'>
                            <b>Login Form</b>
                        </div>
                        <div className='card-body'>
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label className="form-label">User Email</label>
                                    <input type="email" value={userLoginDetail.userEmail} name="userEmail" onChange={handleInput} className="form-control" id="userEmail" aria-describedby="emailHelp" />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Password</label>
                                    <input type="password" value={userLoginDetail.userPassword} name="userPassword" onChange={handleInput} className="form-control" id="userPassword" aria-describedby="emailHelp" />
                                </div>
                                <button type="submit" className="btn btn-primary">Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login