import React, { useEffect, useState, useRef } from "react";
import "./../App.css";
import "./../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar,
  faTrashAlt,
  faPenToSquare,
} from "@fortawesome/free-regular-svg-icons";
import Example from "./modal";
import { Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

function App() {
  const ref = useRef();
  const [notes, setNotes] = useState([]);
  const [error, setError] = useState("");
  const [operation, setOperation] = useState();
  const [message, setMessage] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const notify = () => toast("Here is your toast.");
  console.log(ref);

  function taostifyyes(message) {
    toast.success(message, {
      position: "bottom-center",
    });
  }

  function taostifynot(message) {
    toast.error(message, {
      position: "bottom-center",
    });
  }

  const handleMessageFromChild = (msg) => {
    setMessage(msg);
    console.log(msg);
    setOperation(Math.random() * 10);
  };

  const handleDelete = async (note) => {
    const response = await fetch(
      `https://tensormodule-1.onrender.com/${note.id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.ok) {
      taostifyyes("Operation success");
      setOperation(Math.random() * 10);
    } else {
      taostifynot("Error deleting note:", response.statusText);
      setOperation(Math.random() * 10);
    }
  };
  // const handleModify = async () => {
  //   const response = await fetch("http://localhost:5000/notes/${note.id}", {
  //     method: "PATCH",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({ favorite: !note.favorite, category: "important" }),
  //   });
  //   if (response.ok) {
  //     taostifyyes("Operation effect，   avec success");
  //     setOperation(Math.random() * 10);
  //   } else {
  //     taostifynot("Error deleting note:", response.statusText);
  //     setOperation(Math.random() * 10);
  //   }
  // };
  const handleFavorite = async (note) => {
    await fetch(`http://localhost:5000/notes/${note.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        favorite: !note.favorite,
        category: "important",
      }),
    });
    taostifyyes("Operation effectué avec succès");
    setOperation(Math.random() * 10);
  };

  useEffect(() => {
    const handleGet = async () => {
      try {
        const response = await fetch("http://localhost:5000/notes");
        const data = await response.json();
        if (data.length === 0) {
          setError("No notes available.");
        } else {
          setNotes(data);
          setError("");
        }
        console.log(data);
      } catch (error) {
        console.error("Error fetching notes:", error);
        setError("Failed to fetch notes.");
      }
    };

    handleGet();
  }, [operation]);
  /* option de filtre */
  const filteredNotes = notes.filter((note) => {
    if (selectedCategory === "All") {
      return true;
    }
    return note.category === selectedCategory.toLowerCase();
  });

  /* option de filtre */

  return (
    <div className="page-content container note-has-grid">
      <Toaster />
      <ul className="nav nav-pills p-3 bg-white mb-3 rounded-pill align-items-center">
        <li className="nav-item">
          <a
            href="#"
            className={`nav-link rounded-pill note-link d-flex align-items-center px-2 px-md-3 mr-0 mr-md-2 ${
              selectedCategory === "All" ? "active" : ""
            }`}
            id="all-category"
            onClick={() => setSelectedCategory("All")}
          >
            <i className="icon-layers mr-1" />
            <span className="d-none d-md-block">All Notes</span>
          </a>
        </li>
        <li className="nav-item">
          <a
            href="#"
            className={`nav-link rounded-pill note-link d-flex align-items-center px-2 px-md-3 mr-0 mr-md-2 ${
              selectedCategory === "Business" ? "active" : ""
            }`}
            id="note-business"
            onClick={() => setSelectedCategory("Business")}
          >
            <i className="icon-briefcase mr-1" />
            <span className="d-none d-md-block">Business</span>
          </a>
        </li>
        <li className="nav-item">
          <a
            href="#"
            className={`nav-link rounded-pill note-link d-flex align-items-center px-2 px-md-3 mr-0 mr-md-2 ${
              selectedCategory === "Social" ? "active" : ""
            }`}
            id="note-social"
            onClick={() => setSelectedCategory("Social")}
          >
            <i className="icon-share-alt mr-1" />
            <span className="d-none d-md-block">Social</span>
          </a>
        </li>
        <li className="nav-item">
          <a
            href="#"
            className={`nav-link rounded-pill note-link d-flex align-items-center px-2 px-md-3 mr-0 mr-md-2 ${
              selectedCategory === "Important" ? "active" : ""
            }`}
            id="note-important"
            onClick={() => setSelectedCategory("important")}
          >
            <i className="icon-tag mr-1" />
            <span className="d-none d-md-block">Important</span>
          </a>
        </li>
        <li className="nav-item ml-auto">
          <a
            href="#"
            className="nav-link btn-primary rounded-pill d-flex align-items-center px-3"
            id="add-notes"
          >
            <i className="icon-note m-1" />
            <Example onMessage={handleMessageFromChild} />
          </a>
        </li>
      </ul>
      <div className="row col-12">
        {error ? (
          <div className="alert alert-danger col-12" role="alert">
            {error}
          </div>
        ) : (
          filteredNotes.map((note, index) => (
            <div
              className={`col-12 col-md-4 single-note-item all-category 
                ${note.favorite ? "note-favourite" : ""} 
                ${note.category === "business" ? "note-business" : ""} 
                ${note.category === "important" ? "note-important" : ""} 
                ${note.category === "social" ? "note-social" : ""}`}
              key={index}
            >
              <div className="card card-body">
                <span className="side-stick" />
                <h5
                  className="note-title text-truncate w-75 mb-0"
                  data-noteheading={note.content}
                  id={index}
                >
                  {note.title} <i className="point fa fa-circle ml-1 font-10" />
                </h5>
                <p className="note-date font-12 text-muted">
                  {new Date(note.date).toLocaleDateString()}
                </p>
                <div className="note-content">
                  <p
                    className="note-inner-content text-muted"
                    data-notecontent="Blandit tempus porttitor."
                  >
                    {note.content}
                  </p>
                </div>
                <div className="d-flex align-items-center">
                  <span className="mr-1">
                    <FontAwesomeIcon
                      className={`single-note-item all-category ${
                        note.favorite ? "favourite-note" : ""
                      }`}
                      icon={faStar}
                      onClick={() => handleFavorite(note)}
                    />
                  </span>
                  <span className="mx-2">
                    <FontAwesomeIcon
                      className="delete-color"
                      icon={faTrashAlt}
                      onClick={() => handleDelete(note)}
                    />
                  </span>
                  <span className="mx-2">
                    <FontAwesomeIcon
                      className="delete-color"
                      icon={faPenToSquare}
                      data-bs-toggle="modal"
                      data-bs-target="#staticBackdrop"
                      style={{
                        color: "blue",
                      }}
                    />
                  </span>
                  <div className="ml-auto">
                    <div className="category-selector btn-group">
                      <a
                        className="nav-link dropdown-toggle category-dropdown label-group p-0"
                        data-toggle="dropdown"
                        href="#"
                        role="button"
                        aria-haspopup="true"
                        aria-expanded="true"
                      />
                      <div className="dropdown-menu dropdown-menu-right category-menu">
                        <a
                          className="note-business badge-group-item badge-business dropdown-item position-relative category-business text-success"
                          href="javascript:void(0);"
                        >
                          <i className="mdi mdi-checkbox-blank-circle-outline mr-1" />
                          Business
                        </a>
                        <a
                          className="note-social badge-group-item badge-social dropdown-item position-relative category-social text-info"
                          href="javascript:void(0);"
                        >
                          <i className="mdi mdi-checkbox-blank-circle-outline mr-1" />{" "}
                          Social
                        </a>
                        <a
                          className="note-important badge-group-item badge-important dropdown-item position-relative category-important text-danger"
                          href="javascript:void(0);"
                        >
                          <i className="mdi mdi-checkbox-blank-circle-outline mr-1" />{" "}
                          Important
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      {/* ma modal*/}
      <div
        class="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabindex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="staticBackdropLabel">
                Modal title
              </h1>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">...</div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button type="button" class="btn btn-primary">
                Understood
              </button>
            </div>
          </div>
        </div>
      </div>

      {/** fin notes corps du dev */}
    </div>
  );
}

export default App;
