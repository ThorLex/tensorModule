import { useEffect, useState, useRef } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import toast, { Toaster } from "react-hot-toast";
import "./../App.css";
function Example({ onMessage }) {
  const [show, setShow] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [categorie, setCategorie] = useState("");
  const [operation, setoperation] = useState();
  const [signal, setsignal] = useState(false);
  const [error, setError] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  /*signal */

  /* signal */

  /* les taosts */
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
  /* fin taost*/

  /* ajout notes  */
  const handleAddNote = async (e, title, content, categorie) => {
    e.preventDefault();
    if (title.lenght < 3 || content.lenght < 3) {
      taostifynot("Title and content must be at least 3 characters long");
    } else {
      await fetch("`https://tensormodule-1.onrender.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: title,
          content: content,
          category: categorie,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Success:", data);
          setTitle("");
          setContent("");
          setCategorie("");
          /* debut signal */
          onMessage("Bonjour aux parents!");
          /* fin signal */

          taostifyyes("operation effectée avec success");
          setoperation(Math.random() * 10);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }

    // Optionnel: Fermer la modal après avoir ajouté la note
    handleClose();
  };

  /* finb ajout notes  */

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Add notes
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Create a new note</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="form-group">
              <label htmlFor="noteTitle">Add title</label>
              <input
                value={title}
                type="text"
                onChange={(e) => setTitle(e.target.value)}
                className="form-control"
                placeholder="Enter a title for this note"
              />
            </div>
            <div className="form-group">
              <label htmlFor="noteContent">Description</label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="form-control mb-2"
                placeholder="Enter the content of the note"
              ></textarea>
            </div>
            <div className="form-group">
              <label htmlFor="noteContent">Categorie</label>
              <select
                class="form-select  mb-2"
                aria-label=".form-select-lg example"
                value={categorie}
                onChange={(e) => setCategorie(e.target.value)}
              >
                <option disabled>veuillez chosir une categorie</option>
                <option value="social">social</option>
                <option value="business">bussiness</option>
                <option value="important">Important</option>
                <option value="">autre</option>
              </select>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            onClick={(e) => handleAddNote(e, title, content, categorie)}
            variant="success"
          >
            Create
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Example;
