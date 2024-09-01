import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { API_URL } from "../constants/Constants";
import logo from "../assests/images/msgLogo.png";
import "react-toastify/dist/ReactToastify.css";
import SignUp from "../components/Signup";

export default function Login({ setIsLoggedIn, setUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showSignup, setShowSignup] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    if (!email || !password) {
      return toast.error("Invalid Credentials");
    }
    try {
      const loginCredentials = { email, password };
      const response = await axios.post(
        `${API_URL}/auth/sign_in`,
        loginCredentials
      );
      const { data, headers } = response;
      if (data && headers) {
        const accessToken = headers["access-token"];
        const expiry = headers["expiry"];
        const client = headers["client"];
        const uid = headers["uid"];

        const user = {
          accessToken,
          expiry,
          client,
          uid,
          id: data.data.id,
        };

        setUser(user);
        setIsLoggedIn(true);
      }
    } catch (error) {
      toast.error("Invalid Credentials");
    }
  }
  function toggleSignup() {
    showSignup ? setShowSignup(false) : setShowSignup(true);
  }

  return (
    <div>
      {!showSignup && (
        <section className="bg-gray-900 dark:bg-gray-900">
          <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <a
              href=""
              className="flex items-center mb-6 text-2xl font-semibold text-white dark:text-white"
            >
              <img className="w-8 h-8 mr-2" src={logo} alt="logo" />
              Mensahe
            </a>
            <div className="w-full bg-gray-800 rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
              <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 className="text-center text-xl font-bold leading-tight tracking-tight text-white md:text-2xl dark:text-white">
                  Login
                </h1>
                <form
                  onSubmit={handleSubmit}
                  className="space-y-4 md:space-y-6"
                >
                  <div>
                    <label
                      htmlFor="email"
                      className="block mb-1 text-sm font-medium text-white dark:text-white"
                    >
                      Your email
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      onChange={(event) => setEmail(event.target.value)}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="name@company.com"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="password"
                      className="block mb-1 text-sm font-medium text-white dark:text-white"
                    >
                      Password
                    </label>
                    <input
                      type="password"
                      name="password"
                      id="password"
                      onChange={(event) => setPassword(event.target.value)}
                      placeholder="********"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="text-base w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                  >
                    Sign in
                  </button>

                  <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                    Don't have an account?{" "}
                    <a
                      href="#"
                      onClick={toggleSignup}
                      className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                    >
                      Sign Up
                    </a>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </section>
      )}
      <ToastContainer />
      {showSignup && <SignUp setShowSignup={setShowSignup}></SignUp>}
    </div>
  );
}
