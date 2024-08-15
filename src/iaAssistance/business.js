import React, { useEffect, useState } from "react";
import "./../App.css";
import "./../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faTrashAlt } from "@fortawesome/free-regular-svg-icons";
import Example from "./modal";

import toast, { Toaster } from "react-hot-toast";
import Navbar from "./navbar";

export default function Business() {
  const [operation, setoperation] = useState();
  const [message, setMessage] = useState("");
  const [notes, setNotes] = useState([]);
  const [error, setError] = useState();

  const handleDelete = async (note) => {
    const response = await fetch(`http://localhost:5000/notes/${note.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}),
    });

    if (response.ok) {
      taostifyyes("operation success");
      setoperation(Math.random() * 10);
    } else {
      taostifynot("Error deleting note:", response.statusText);
      setoperation(Math.random() * 10);
    }
  };
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

  const handleFavorite = async (note) => {
    await fetch(`http://localhost:5000/notes/${note.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        favorite: !note.favorite,
      }),
    });
    taostifyyes("operation effectué avec success");
    setoperation(Math.random() * 10);
  };

  /* Déclaration des constantes */

  const handleMessageFromChild = (msg) => {
    setMessage(msg);
    console.log(msg);
    setoperation(Math.random() * 10);
  };
  /* Récupération des données pour la catégorie "business" */
  useEffect(() => {
    const handleFetch = async () => {
      try {
        const response = await fetch("http://localhost:5000/notes");
        const data = await response.json();
        const businessNotes = data.filter(
          (note) => note.category === "business"
        );
        setNotes(businessNotes);
      } catch (error) {
        setError("Erreur lors de la récupération des notes");
      }
    };
    handleFetch();
  }, [operation]);
  const place = "business";
  /* Affichage des notes filtrées */
  return (
    <div className="page-content container note-has-grid">
      <Toaster />
      <Navbar place={place}>
        {" "}
        <Example />
      </Navbar>

      {/** notes corps du dev */}
      <div className="row col-12">
        {error ? (
          <div className="alert alert-danger col-12" role="alert">
            {error}
          </div>
        ) : (
          notes.map((note, index) => (
            <div
              className={`col-12 col-md-4 single-note-item all-category 
    ${note.favorite ? "note-favourite" : ""} 
    ${note.category === "business" ? "note-business" : ""} 
    ${note.category === "important" ? "note-important" : ""} 
    ${note.category === "social" ? "note-social" : ""}`}
              key={index}
            >
              <div className="card card-body">
                <span className="side-stick  " />
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
                    data-notecontent="Blandit tempus porttitor aasfs. Integer posuere erat a ante venenatis."
                  >
                    {note.content}
                  </p>
                </div>
                <div className="d-flex align-items-center ">
                  <span className="mr-1">
                    <FontAwesomeIcon
                      className={` single-note-item all-category ${
                        note.favorite ? "favourite-note" : ""
                      }`}
                      icon={faStar}
                      onClick={() => handleFavorite(note)}
                    />
                  </span>{" "}
                  <span className="mx-2">
                    <FontAwesomeIcon
                      className="delete-color "
                      icon={faTrashAlt}
                      onClick={() => handleDelete(note)}
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
                      ></a>
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
      {/** fin notes corps du dev */}
    </div>
  );
}
