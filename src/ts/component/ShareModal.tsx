import React from "react";
import {useState} from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "../../css/ShareModal.scss";
import { GiShare } from "react-icons/gi";
import { Form } from "react-bootstrap";
import axios from "axios";

const mockData = [
  {"id": 1, "name": "Eine Ärztin Ihres Vertrauens", "street": "Musterstraße 42", "plz": "20120", "city": "Glückstadt"},
]

export default function ShareModal() {
  const [show, setShow] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [docs, setDocs] = useState(mockData)
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  async function docSearch(event: any) {
    setInputValue(event?.target?.value);
    axios.get("http://localhost:8080/doctors/"+event.target.value).
    then(async (response) => {
      const doctors = response.data;
      setDocs(doctors);
    });
  }


  return (
    <>
      <Button className="nextButton" onClick={handleShow}>
        <GiShare />
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton >
          <Modal.Title>Freigeben</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Wählen Sie die Ärztin / den Arzt Ihres Vertrauens aus und geben Sie Ihr Dokument frei:
          <Form>
            <Form.Group className="mb-3" controlId="formBasicGivenName">
              <Form.Label></Form.Label>
              <Form.Control type="Text" placeholder="Arzt/Ärztin" value={inputValue} onChange={docSearch}/>
            </Form.Group>
          </Form>
          <Form>
          {docs.map((record) => (
            <Form.Check key={record.id}
              type={"checkbox"}
              id={String(record.id)}
              label=
                {
                  <div>
                    <b>
                      {record.name}
                    </b>
                    <br />
                    <span>
                    {record.street}, {record.plz} {record.city}
                  </span>
                  </div>
                }
            />
          ))}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Abbrechen
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Freigeben
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}