import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { handleError, handleSuccess } from "../../utils";

function Login() {
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    const copyLoginInfo = { ...loginInfo };
    copyLoginInfo[name] = value;
    setLoginInfo(copyLoginInfo);
  };

  // const handleLogin = async (e) => {
  //   e.preventDefault();
  //   console.log(e);
  //   const { email, password } = loginInfo;
  //   if (!email || !password) {
  //     return handleError("email and password are required");
  //   }
  //   // http://localhost:3000/
  //   try {
  //     const url = `http://localhost:3000/auth/login`;
  //     const response = await fetch(url, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(loginInfo),
  //     });
  //     console.log(response);
  //     const result = await response.json();
  //     const { success, message, jwtToken, name, error } = result;
  //     if (success) {
  //       handleSuccess(message);
  //       localStorage.setItem("token", jwtToken);
  //       localStorage.setItem("loggedInUser", name);
  //       setTimeout(() => {
  //         navigate("/home");
  //       }, 1000);
  //     } else if (error) {
  //       const details = error?.details[0].message;
  //       handleError(details);
  //     } else if (!success) {
  //       handleError(message);
  //     }
  //     console.log(result);
  //   } catch (err) {
  //     handleError(err);
  //   }
  // };

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log('Form submitted:', e);
    
    const { email, password } = loginInfo;

    if (!email || !password) {
        return handleError("Email and password are required");
    }

    try {
        const url = `http://localhost:8080/auth/login`;
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(loginInfo),
        });

        console.log('Response:', response);
        console.log('LoginInfo:', loginInfo);

        // Check if the response is OK
        if (response.ok) {
            const contentType = response.headers.get("content-type");
            let result;

            // Check if the response is JSON
            if (contentType && contentType.includes("application/json")) {
                result = await response.json();
            } else {
                const text = await response.text(); // Handle as text if not JSON
                result = { success: true, message: text }; // Create a fallback result
            }

            console.log('Parsed result:', result);

            const { success, message, jwtToken, name, error } = result;

            console.log(success);
            if (success) {
                handleSuccess(message);
                localStorage.setItem("token", jwtToken);
                localStorage.setItem("loggedInUser", name);
                setTimeout(() => {
                    navigate("/home");
                }, 1000);
            } else if (error) {
                const details = error?.details[0]?.message || message; // Added fallback for details
                handleError(details);
            } else {
                handleError(message);
            }
        } else {
            const errorText = await response.text(); // Read the error response as text
            handleError(errorText); // Use the text as an error message
        }

    } catch (err) {
        console.error('Error during login:', err);
        handleError(err.message || 'An error occurred during login');
    }
};


  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md border">
        <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
        <form onSubmit={handleLogin} className="flex flex-col gap-2">
          <div className="flex flex-col mb-4">
            <label htmlFor="email" className="text-sm">
              Email
            </label>
            <input
              onChange={handleChange}
              type="email"
              name="email"
              placeholder="Enter your email"
              value={loginInfo.email}
              className="w-full p-2 mt-1 border rounded"
            />
          </div>
          <div className="flex flex-col mb-4">
            <label htmlFor="password" className="text-sm">
              Password
            </label>
            <input
              onChange={handleChange}
              type="password"
              name="password"
              placeholder="Enter your password"
              value={loginInfo.password}
              className="w-full p-2 mt-1 border rounded"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition"
          >
            Login
          </button>
          <span className="mt-2 text-center">
            Doesn't have an account?{" "}
            <Link to="/sign-up" className="text-blue-500 ">
              Sign up
            </Link>
          </span>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
}

export default Login;
