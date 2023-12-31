import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../landing/ui/header";

//logs all tge available cookies
const logCookies = () => {
  const allCookies = document.cookie;
  console.log("All available cookies:", allCookies);
};

export default function SignIn({ backendUrl }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const CSRF_TOKEN = getCookie("csrftoken");
    const headers = {
      accept: "application/json",
      "content-type": "application/json",
      "X-CSRFToken": CSRF_TOKEN,
    };

    const formData = {
      username: email,
      password: password,
      rememberMe: rememberMe,
    };

    // Use backendUrl from props, fallback to localhost if not provided
    const apiUrl = backendUrl || "http://localhost:8080";
    console.log(backendUrl + "this is the backend url");

    try {
      const response = await fetch(`${apiUrl}/api/login`, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(formData),
        credentials: "include",
      });

      if (response.ok) {
        const responseData = await response.json();
        const { token } = responseData.data;
        // setCookie("auth_token", token, 7); // Expires in 7 days
        navigate("/welcome");
      } else {
        console.error("Login failed");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }

    logCookies();
  };

  // function setCookie(name, value, days) {
  //   const expires = new Date(
  //     Date.now() + days * 24 * 60 * 60 * 1000
  //   ).toUTCString();
  //   document.cookie = `${name}=${value};expires=${expires};path=/;Secure;SameSite=None`;
  // }

  function getCookie(name) {
    const cookieValue = document.cookie.match(
      `(^|;)\\s*${name}\\s*=\\s*([^;]+)`
    );
    return cookieValue ? cookieValue.pop() : "";
  }
  return (
    <>
      <Header />
      <section className="relative h-screen">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="pt-32 pb-12 md:pt-40 md:pb-20">
            {/* Page header */}
            <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
              <h1 className="text-5xl font-bold leading-tight tracking-tighter">
                Sign In
              </h1>
            </div>

            {/* Form */}
            <div className="max-w-sm mx-auto">
              <form>
                <div className="flex flex-wrap -mx-3">
                  <div className="w-full px-3">
                    <button className="px-8 py-3 text-white bg-red-600 hover:bg-red-700 w-full relative flex items-center">
                      <svg
                        className="w-4 h-4 fill-current text-white opacity-75 shrink-0 mx-4"
                        viewBox="0 0 16 16"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M7.9 7v2.4H12c-.2 1-1.2 3-4 3-2.4 0-4.3-2-4.3-4.4 0-2.4 2-4.4 4.3-4.4 1.4 0 2.3.6 2.8 1.1l1.9-1.8C11.5 1.7 9.9 1 8 1 4.1 1 1 4.1 1 8s3.1 7 7 7c4 0 6.7-2.8 6.7-6.8 0-.5 0-.8-.1-1.2H7.9z" />
                      </svg>
                      <span
                        className="h-6 flex items-center border-r border-white border-opacity-25 mr-4"
                        aria-hidden="true"
                      ></span>
                      <span className="flex-auto pl-16 pr-8 -ml-16">
                        Sign in with Google
                      </span>
                    </button>
                  </div>
                </div>
              </form>
              <div className="flex items-center my-6">
                <div
                  className="border-t border-gray-700 border-dotted grow mr-3"
                  aria-hidden="true"
                ></div>
                <div className="text-gray-400">Or, sign in with your email</div>
                <div
                  className="border-t border-gray-700 border-dotted grow ml-3"
                  aria-hidden="true"
                ></div>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="flex flex-wrap -mx-3 mb-4">
                  <div className="w-full px-3">
                    <label
                      className="block text-gray-500 text-sm font-medium mb-1"
                      htmlFor="email"
                    >
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      className="py-3 px-4 placeholder-gray-500 w-full text-gray-300 rounded-sm bg-transparent border border-gray-700 focus:border-gray-500"
                      placeholder="you@yourcompany.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-4">
                  <div className="w-full px-3">
                    <label
                      className="block text-gray-500 text-sm font-medium mb-1"
                      htmlFor="password"
                    >
                      Password
                    </label>
                    <input
                      id="password"
                      type="password"
                      className="py-3 px-4 placeholder-gray-500 w-full text-gray-300 rounded-sm bg-transparent border border-gray-700 focus:border-gray-500"
                      placeholder="Password (at least 10 characters)"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-4">
                  <div className="w-full px-3">
                    <div className="flex justify-between">
                      <label className="flex items-center">
                        <input
                          id="remember_me"
                          name="remember_me"
                          type="checkbox"
                          className=" text-purple-600 bg-transparent  focus:border-purple-800 rounded-sm"
                          checked={rememberMe}
                          onChange={(e) => setRememberMe(e.target.checked)}
                        />
                        <span className="text-gray-500 ml-2">
                          Keep me signed in
                        </span>
                      </label>
                      <Link
                        to="/reset-password"
                        className="text-purple-600 hover:text-purple-800 transition duration-150 ease-in-out"
                      >
                        Forgot Password?
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="flex flex-wrap -mx-3 mt-6">
                  <div className="w-full px-3">
                    <button className="px-8 py-3 text-white bg-purple-600 hover:bg-purple-700 w-full">
                      Sign in
                    </button>
                  </div>
                </div>
              </form>
              <div className="text-gray-400 text-center mt-6">
                Don’t you have an account?{" "}
                <Link
                  to="/signup"
                  className="text-purple-600 hover:text-gray-200 transition duration-150 ease-in-out"
                >
                  Sign up
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
