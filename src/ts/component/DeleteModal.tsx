import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "../../css/ShareModal.scss";
import { Alert, Form } from "react-bootstrap";
import axios from "axios";
import { BsTrash } from "react-icons/bs";
import { getIdToken } from "../utils/AuthHelper";
import { BackendEndpoint } from "../utils/Config";

type Props = {
  id: string;
  name: string;
  owner: string;
  onSuccess: (id: string) => void;
};

export default function ShareModal(props: Props) {
  const [show, setShow] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [showAlert, setShowAlert] = useState<boolean>(false);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setInputValue(event.currentTarget?.value);
  }

  async function deleteDocument() {
    const uri = `${BackendEndpoint}/files/delete/${props.id}`;
    const body = { jwt: await getIdToken() };
    const response = await axios.post(uri, body, { responseType: "json" });

    if (response.status === 204) {
      setShowAlert(false);
      props.onSuccess(props.id);
      handleClose();
    } else {
      setShowAlert(true);
    }
  }

  const secureWord = props.name.split(/[._ -]/)[0];

  return (
    <>
      <Button title={"Löschen"} style={{ background: "none", border: "none" }} onClick={handleShow}>
        <BsTrash title={"Löschen"} className={"trashcan"} />
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Löschen</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {showAlert && (
            <Alert key={"danger"} variant={"danger"}>
              Could not delete document
            </Alert>
          )}
          Falls Sie &quot;{props.name}&quot; wirklich löschen möchten, geben Sie bitte <b>{secureWord}</b> ein:
          <Form>
            <Form.Group className="mb-3" controlId="formBasicGivenName">
              <Form.Label></Form.Label>
              <Form.Control type="Text" placeholder="Sicherheitswort" value={inputValue} onChange={handleChange} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Abbrechen
          </Button>
          {inputValue === secureWord ? (
            <Button variant="danger" onClick={deleteDocument}>
              Unwiderruflich löschen
            </Button>
          ) : (
            <Button variant="danger" disabled>
              Unwiderruflich löschen
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
}
