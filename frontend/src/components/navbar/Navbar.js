import React, { useState } from "react";
import { baseUrl } from "../../env_variables";
import './Navbar.css';

const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  // const Navbar = ({navigate}) => {
    //   const [searchTerm, setSearchTerm] = useState('');
    //   const [searchResults, setSearchResults] = useState([]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();

    fetch(`${baseUrl}/search?q=${encodeURIComponent(searchTerm)}`)
      .then(response => response.json())
      .then(data => {
        setSearchResults(data);
      })
      .catch(error =>{
        console.log(error);
      });
  };

  const handleSignOut = () => {
    window.localStorage.removeItem("token");
    window.location.href = "/login";
  };
//     const logout = () => {
//       window.localStorage.removeItem("token");
//       navigate("/login");
//     };
  return (
    <nav className="navbar navbar-expand-lg bg-light rounded">
      <div className="container-fluid">
        <div className="collapse navbar-collapse d-lg-flex">
          <a className="navbar-brand col-lg-3 me-0" href="/">
            Acebookers
          </a>
          <ul className="navbar-nav col-lg-6 justify-content-lg-center">
            <li className="nav-item">
              <a href="/user/:id">
                <button className="btn btn-outline-primary" type="submit">
                  <i className="bi bi-person-square"></i>
                  <span> Profile</span>
                </button>
              </a>
            </li>
            <li className="nav-item">
              <a href="/">
                <button className="btn btn-outline-primary" type="submit">
                  <i className="bi bi-chat-square-text"></i>
                  <span> Feed</span>
                </button>
              </a>
            </li>
            <li className="nav-item">
              <form
                onSubmit={handleSearchSubmit}
                className="d-flex"
                role="search"
              >
                <input
                  className="form-control me-2"
                  type="text"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                />

                <button className="btn btn-primary" type="submit">
                  <span>Search</span>
                </button>
              </form>
            </li>
          </ul>
          <div className="d-lg-flex col-lg-3 justify-content-lg-end">
            <button onClick={handleSignOut} className="btn btn-outline-dark">
              <i className="bi bi-box-arrow-right"></i>
              <span>Sign Out</span>
            </button>
          </div>
        </div>
        {searchResults.length > 0 && (
          <ul>
            {searchResults.map((result) => (
              <li key={result.id}>
                <p>{result.firstName}</p>
                <p>{result.lastName}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </nav>
  );
};

export default Navbar;


