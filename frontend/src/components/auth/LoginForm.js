import React, { useState } from 'react';
import "./LoginForm.css";


const LogInForm = ({ navigate }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    let response = await fetch( 'https://acebookers-5bku.onrender.com/tokens', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: email, password: password })
    })

    if(response.status !== 201) {
      console.log("login unsuccessful")
      navigate('/login')
    } else {
      console.log("login successful")
      let data = await response.json()
      window.localStorage.setItem("token", data.token)
      navigate('/');
    }
  }

  const handleEmailChange = (event) => {
    setEmail(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }


    return (
      <body className="text-center">
        <main className="form-signin w-100 m-auto">
          <div className="form-floating">
            <h1 className="h3 mb-3 fw-normal">Log In</h1>
            <form className="row g-3 needs-validation" onSubmit={handleSubmit}>
              <input
                className="form-control"
                placeholder="Email"
                id="email"
                type="email"
                value={email}
                onChange={handleEmailChange}
                required
              />
              <input
                className="form-control"
                placeholder="Password"
                id="password"
                type="password"
                value={password}
                onChange={handlePasswordChange}
                required
                minLength={8}
              />
              <div className="col-12">
                  <button className="btn btn-primary active" type="submit">
                  Log In
                </button>
              </div>

              <div>
                <p>New to Acebookers? Sign up here!</p>
                <div className="col-12">
                  <a href="/signup">
                    <button className="btn btn-primary active" type="button">
                      Sign up
                    </button>
                  </a>
                </div>
              </div>
            </form>
          </div>
        </main>
      </body>
    );
}

export default LogInForm;
