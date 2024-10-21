import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { handleError, handleSuccess } from '../../utils';

const Home = () => {
  const [loggedInUser, setLoggedInUser] = useState("");
  const [products, setProducts] = useState();
  const navigate = useNavigate();
  useEffect(() => {
    setLoggedInUser(localStorage.getItem("loggedInUser"));
  }, []);

  const handleLogout = (e) => {
    localStorage.removeItem("token");
    localStorage.removeItem("loggedInUser");
    handleSuccess("User Loggedout");
    navigate("/login");
    setTimeout(() => {
      navigate("/login");
    }, 1000);
    console.log(e);
  };

  const fetchProducts = async () => {
    try {
      const url = "http://localhost:8080/products";
      const headers = {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      };
      const response = await fetch(url, headers);
      const result = await response.json();
      console.log(result);
      setProducts(result);
    } catch (err) {
      handleError(err);
    }
  };
  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div>
      <div className="bg-gray-100">
        {/* Header */}
        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold">Welcome to {loggedInUser}</h1>
            <nav>
              <ul className="flex space-x-4">
                <li>
                  <a
                    href="#features"
                    className="text-gray-600 hover:text-blue-600"
                  >
                    Features
                  </a>
                </li>
                <button onClick={handleLogout}>Logout</button>
              </ul>
            </nav>
          </div>
        </header>

        {/* Hero Section */}
        <section className="bg-blue-600 text-white py-20">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-4">Welcome to AuthApp</h2>
            <p className="mb-8">
              Your secure authentication solution for accessing your favorite
              apps.
            </p>
            <div>
              {products &&
                products.map((item, index) => (
                  <ul key={index}>
                    <p className="">
                      {item.name} : {item.price}
                    </p>
                  </ul>
                ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-8">Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
              <div className="bg-white shadow rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-4">
                  Secure Authentication
                </h3>
                <p>
                  We use state-of-the-art security measures to protect your
                  data.
                </p>
              </div>
              <div className="bg-white shadow rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-4">
                  User-Friendly Interface
                </h3>
                <p>Our platform is designed to be simple and easy to use.</p>
              </div>
              <div className="bg-white shadow rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-4">24/7 Support</h3>
                <p>
                  Our support team is available around the clock to assist you.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-800 text-white py-4">
          <div className="max-w-7xl mx-auto text-center">
            <p>&copy; 2024 AuthApp. All rights reserved.</p>
          </div>
        </footer>
      </div>
      

      <ToastContainer />
    </div>
  );
};

export default Home;
