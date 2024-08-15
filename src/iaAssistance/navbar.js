import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css"; // Assurez-vous d'avoir importé votre fichier CSS

export default function Navbar() {
  const [activeTab, setActiveTab] = useState("all-category");

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };

  return (
    <div>
      <ul className="nav nav-pills p-3 bg-white mb-3 rounded-pill align-items-center">
        <li className="nav-item">
          <Link
            to="/"
            className={`nav-link rounded-pill note-link d-flex align-items-center px-2 px-md-3 mr-0 mr-md-2 ${
              activeTab === "all-category" ? "active" : ""
            }`}
            id="all-category"
            onClick={() => handleTabClick("all-category")}
          >
            <i className="icon-briefcase mr-1" />
            <span className="d-none d-md-block">All Notes</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link
            to="/business"
            className={`nav-link rounded-pill note-link d-flex align-items-center px-2 px-md-3 mr-0 mr-md-2 ${
              activeTab === "note-business" ? "active" : ""
            }`}
            id="note-business"
            onClick={() => handleTabClick("note-business")}
          >
            <i className="icon-layers mr-1" />
            <span className="d-none d-md-block">Business</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link
            to="/social"
            className={`nav-link rounded-pill note-link d-flex align-items-center px-2 px-md-3 mr-0 mr-md-2 ${
              activeTab === "note-social" ? "active" : ""
            }`}
            id="note-social"
            onClick={() => handleTabClick("note-social")}
          >
            <i className="icon-share-alt mr-1" />
            <span className="d-none d-md-block">Social</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link
            to="/important"
            className={`nav-link rounded-pill note-link d-flex align-items-center px-2 px-md-3 mr-0 mr-md-2 ${
              activeTab === "note-important" ? "active" : ""
            }`}
            id="note-important"
            onClick={() => handleTabClick("note-important")}
          >
            <i className="icon-tag mr-1" />
            <span className="d-none d-md-block">Important</span>
          </Link>
        </li>
        <li className="nav-item ml-auto">
          <Link
            to="/add"
            className={`nav-link btn-primary rounded-pill d-flex align-items-center px-3 ${
              activeTab === "add-notes" ? "active" : ""
            }`}
            id="add-notes"
            onClick={() => handleTabClick("add-notes")}
          >
            <i className="icon-note m-1" />
          </Link>
        </li>
      </ul>
    </div>
  );
}
