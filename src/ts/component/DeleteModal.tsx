import React from "react";
import {useState} from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "../../css/ShareModal.scss";
import { Alert, Form } from "react-bootstrap";
import axios from "axios";
import { BsTrash } from "react-icons/bs";

type Props = {
  id: string;
  name: string;
  owner: string;
};

export default function ShareModal(props: Props) {
  const [show, setShow] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setInputValue(event.currentTarget?.value);
  }

  function deleteDocument() {
    axios.get(`http://localhost:8080/files/delete/${props.id}`).
    then((response) => {
      if (response.status === 200) {
        handleClose();
      }
      else {
        return (
          <Alert key={"danger"} variant={"danger"}>
            Could not delete Document
          </Alert>
        )
      }
    });

  }

  const secureWord = props.name.split(/[._ -]/)[0];

  return (
    <>
      <Button style={{ background: "none", border: "none" }} onClick={handleShow}>
        <BsTrash className={"trashcan"}/>
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton >
          <Modal.Title>Löschen</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Falls Sie &quot;{props.name}&quot; wirklich löschen möchten, geben Sie bitte <b>{secureWord}</b> ein:
          <Form>
            <Form.Group className="mb-3" controlId="formBasicGivenName">
              <Form.Label></Form.Label>
              <Form.Control type="Text" placeholder="Sicherheitswort" value={inputValue} onChange={handleChange}/>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Abbrechen
          </Button>
          {(inputValue === secureWord)?
            <Button variant="danger" onClick={deleteDocument}>
              Unwiderruflich löschen
            </Button>
            :
            <Button variant="danger" disabled >
              Unwiderruflich löschen
            </Button>
          }

        </Modal.Footer>
      </Modal>
    </>
  );
}