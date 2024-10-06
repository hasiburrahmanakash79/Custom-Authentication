import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from '../../utils';

function SignUp() {

    const [signupInfo, setSignupInfo] = useState({
        name: '',
        email: '',
        password: ''
    })

    const navigate = useNavigate();
    const handleChange = (e) => {
        const { name, value } = e.target;
        const copySignupInfo = { ...signupInfo };
        copySignupInfo[name] = value;
        setSignupInfo(copySignupInfo);
    }
  

  const handleSignup = async (e) => {
    e.preventDefault();
    console.log('Form submitted:', e);

    const { name, email, password } = signupInfo;

    // Validate input fields
    if (!name || !email || !password) {
        return handleError('Name, email, and password are required');
    }

    try {
        const url = `http://localhost:8080/auth/signup`;
        const response = await fetch(url, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(signupInfo),
        });

        console.log('Response:', response);
        console.log('signupInfo:', signupInfo);

        // Check if the response is ok
        if (response.ok) {
            const contentType = response.headers.get("content-type");

            let result;
            if (contentType && contentType.includes("application/json")) {
                result = await response.json(); // Read the response as JSON
            } else {
                const text = await response.text(); // Read as text if not JSON
                result = { success: true, message: text }; // Create a result object
            }

            const { success, message, error } = result;

            // Handle success or errors from the API
            if (success) {
                handleSuccess(message);
                setTimeout(() => {
                    navigate('/login');
                }, 1000);
            } else if (error) {
                const details = error?.details[0]?.message || message;
                handleError(details);
            } else {
                handleError(message);
            }
        } else {
            const errorText = await response.text(); // Read the response as text
            handleError(errorText); // Use the text response as an error message
        }

    } catch (err) {
        console.error('Error during signup:', err);
        handleError(err.message || 'An error occurred while signing up');
    }
};


    return (
        <div className="flex justify-center items-center h-screen">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md border">
                <h1 className="text-2xl font-bold mb-6 text-center">Sign up</h1>
                <form onSubmit={handleSignup} className="flex flex-col gap-2">
                    <div className="flex flex-col mb-4">
                        <label htmlFor='name' className="text-sm">Name</label>
                        <input
                            onChange={handleChange}
                            type='text'
                            name='name'
                            autoFocus
                            placeholder='Enter your name'
                            value={signupInfo.name}
                            className="w-full p-2 mt-1 border rounded"
                        />
                    </div>
                    <div className="flex flex-col mb-4">
                        <label htmlFor='email' className="text-sm">Email</label>
                        <input
                            onChange={handleChange}
                            type='email'
                            name='email'
                            placeholder='Enter your email'
                            value={signupInfo.email}
                            className="w-full p-2 mt-1 border rounded"
                        />
                    </div>
                    <div className="flex flex-col mb-4">
                        <label htmlFor='password' className="text-sm">Password</label>
                        <input
                            onChange={handleChange}
                            type='password'
                            name='password'
                            placeholder='Enter your password'
                            value={signupInfo.password}
                            className="w-full p-2 mt-1 border rounded"
                        />
                    </div>
                    <button
                        type='submit'
                        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition"
                    >
                        Sign Up
                    </button>
                    <span className="mt-2 text-center">
                        Already have an account? 
                        <Link to="/login" className="text-blue-500"> Login</Link>
                    </span>
                </form>
                <ToastContainer />
            </div>
        </div>
    )
}

export default SignUp

