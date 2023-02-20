import React, { useState } from "react";
import "./SignUpForm.css";
import { baseUrl } from "../../env_variables";

const SignUpForm = ({ navigate }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [emailError, setEmailError] = useState(false);

  const validateEmail = () => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validateEmail()) {
      setEmailError(false);
      fetch(`${baseUrl}/users`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
          firstName: firstName,
          lastName: lastName,
          dateOfBirth: dateOfBirth
        }),
      }).then((response) => {
        if (response.status === 201) {
          navigate("/login");
        } else {
          navigate("/signup");
        }
      })}
      else {
        setEmailError(true); 
      }
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
  };

  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
  };

  const handleDateOfBirthChange = (event) => {
    setDateOfBirth(event.target.value);
  };

  return (
    <>
      <body className="text-center">
        <main className="form-signin w-100 m-auto">
          <form onSubmit={handleSubmit} id="form-signin">
            <img
              className="mb-4"
              src="https://i.postimg.cc/4NCjz5PZ/Acebook-logo-removebg-preview.png"
              alt=""
              width="300"
              height="300"
            ></img>

            <h1 className="h3 mb-3 fw-normal">Join Us</h1>
            <div className="form-floating">
              <input
                className="form-control"
                placeholder="name@example.com"
                id="email"
                type="email"
                value={email}
                onChange={handleEmailChange}
                required
              />

              <label for="floatingInput">Email Address</label>
            </div>
            <div className="form-floating">
              <input
                className="form-control"
                placeholder="Password"
                id="password"
                type="password"
                value={password}
                onChange={handlePasswordChange}
                required
                // pattern="(?=.*?[#?!@$%^&*-\]\[])"
                minLength={8}
                maxLength={20}
              />
              <label for="floatingInput">Password</label>
            </div>
            <div className="form-floating">
              <input
                className="form-control"
                placeholder="First Name"
                id="firstName"
                type="text"
                value={firstName}
                onChange={handleFirstNameChange}
                required
                minLength={2}
              />
              <label for="floatingInput">First Name</label>
            </div>
            <div className="form-floating">
              <input
                className="form-control"
                placeholder="Last Name"
                id="lastName"
                type="text"
                value={lastName}
                onChange={handleLastNameChange}
                required
                minLength={2}
              />
              <label for="floatingInput">Last Name</label>
            </div>
            <div className="form-floating">
              <input
                className="form-control"
                id="dateOfBirth"
                type="date"
                value={dateOfBirth}
                onChange={handleDateOfBirthChange}
                required
                date
              />
            </div>
            <br></br>
            <button
              className="btn btn-primary active btn-lg"
              id="submit"
              type="submit"
              value="Sign up"
            >
              Sign Up
            </button>

            <div className="form-prompt">
              <h4>Already have an account?</h4>
              <div>
                <a href="/login">
                  <button className="btn btn-primary  active" type="button">
                    Log in
                  </button>
                </a>
              </div>
            </div>
          </form>
          {emailError && <p>invalid email address</p>}
        </main>
      </body>
    </>
  );
};

export default SignUpForm;
