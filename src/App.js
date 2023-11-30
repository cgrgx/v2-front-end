import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

import Landing from "./components/landing/Landing";
import SignUp from "./components/auth/signup";
import SignIn from "./components/auth/signin";
import { Welcome } from "./components/app/welcome";
import { Categories } from "./components/app/categories";
import { Activities } from "./components/app/activities";
import ChatApp from "./components/chat/chatapp";

//graphql end point
const client = new ApolloClient({
  uri: "https://swapi-graphql.netlify.app/.netlify/functions/index",
  cache: new InMemoryCache(),
});

function App() {
  const [userData, setUserData] = useState(null);
  const [loadingUserData, setLoadingUserData] = useState(true);

  // Access backend URL from environment variable
  const backendUrl =
    process.env.REACT_APP_BACKEND_URL || "http://localhost:8080";

  useEffect(() => {
    // Fetch user data when the app loads
    console.log("Backend URL:", backendUrl);

    // Construct the fetching URL and log it
    const fetchUrl = `${backendUrl}/api/user`;
    console.log("Fetching URL:", fetchUrl);

    // Fetch user data when the app loads
    fetch(fetchUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }
        return response.json();
      })
      .then((data) => {
        setUserData(data.data);
        setLoadingUserData(false);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error.message);
        setLoadingUserData(false);
      });
  }, [backendUrl]); // Adding backendUrl as a dependency for useEffect
  return (
    <Router>
      <ApolloProvider client={client}>
        <Routes>
          <Route path="/" element={<Landing backendUrl={backendUrl} />} />
          <Route path="/signup" element={<SignUp backendUrl={backendUrl} />} />
          <Route path="/signin" element={<SignIn backendUrl={backendUrl} />} />
          <Route
            path="/welcome"
            element={
              loadingUserData ? (
                <p>Loading user data...</p> //spinner here
              ) : (
                <Welcome userData={userData} />
              )
            }
          ></Route>
          {/*
           * TODO : will go to welcome route later for auth
           */}
          <Route path="/catagories" element={<Categories />} />
          <Route path="/category/:categoryId" element={<Activities />} />
          <Route path="/chat" element={<ChatApp />} />
          <Route path="*" element={<p>Page Not found</p>} />
        </Routes>
      </ApolloProvider>
    </Router>
  );
}

export default App;
