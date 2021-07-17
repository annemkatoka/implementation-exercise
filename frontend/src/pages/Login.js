import React, { useState } from "react";
import { useHistory } from "react-router";


const Login = (props) => {
  let history = useHistory();

  const [user, setUser] = useState({
    username: "",
    pass: "",
  });

  const [error, setError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(user);

    if (user.username !== "" && user.pass !== "") {
      const requestOptions = {
        method: "POST",
        body: JSON.stringify(user),
        headers: new Headers({
          "Content-Type": "application/json",
          Accept: "application/json",
        }),
      };

      try {
        const response = await fetch(
          "http://localhost:5000/login",
          requestOptions
        );
        console.log("Ok");
        console.log(response.status);
        if (response.status != "200"){setError(true)}
        else{
            history.push('/');
            props.setToken(true)

        }
      } catch (e) {
        console.log(e);
      }
    }
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUser({
      ...user,
      [name]: value,
    });

    console.log(user);
  };

  return (
    <div className="d-flex justify-content-center ">
      <form onSubmit={handleSubmit}>
        {error ? (
          <div className="alert alert-danger" role="alert">
            Invalid username or password
          </div>
        ) : null}
        <div className="row m-2">
          <input
            type="text"
            id="username"
            className="col-sm-12"
            name="username"
            placeholder="username"
            value={user.username}
            onChange={handleChange}
          />
        </div>
        <div className="row m-2">
          <input
            type="password"
            id="pass"
            className="col-sm-12"
            name="pass"
            placeholder="password"
            value={user.pass}
            onChange={handleChange}
          />
        </div>

        <div className="row m-2">
          <input type="submit" className="col-sm-12" value="Log In" />
        </div>
      </form>
    </div>
  );
};

export default Login;
