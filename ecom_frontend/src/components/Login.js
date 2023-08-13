import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import Loading from '../components/Loading'

const Login = () => {
    const [loading, setLoading] = useState(false)
    const handleSubmit = (e) => {
        e.preventDefault()
        console.log("handle submit")
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
                                    <input type="email" name="userEmail" className="form-control" id="userEmail" aria-describedby="emailHelp" />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Password</label>
                                    <input type="password" name="userPassword" className="form-control" id="userPassword" aria-describedby="emailHelp" />
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