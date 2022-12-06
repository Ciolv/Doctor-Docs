import React from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "../../css/ShareModal.scss";
import { BsPlusLg, BsShare, BsTrash } from "react-icons/bs";
import { Form } from "react-bootstrap";
import axios from "axios";
import { getUserAccountId } from "../utils/AuthHelper";
import { User } from "../models/User";

type Props = {
  id: string;
  name: string;
  owner: string;
  identityToken: string;
  permissions: UserPermission[];
  role: "DOCTOR" | "PATIENT";
};

type UserPermission = {
  userId: string;
  permission: number;
};

type DocActions = {
  docId: string;
  action: "ADD" | "DELETE";
};

const mockData: User[] = [];
const checkMock: DocActions[] = [];

export default function ShareModal(props: Props) {
  function getPermissions() {
    const permittedDocs: User[] = [];
    props.permissions.forEach((doc) => {
      if (doc.permission === 1 && doc.userId !== null && doc.userId !== undefined) {
        axios.get(`http://localhost:8080/doctors/data/${doc.userId}`).then((docMeta) => {
          const currentDoc: User = {
            id: docMeta.data.id,
            first_name: docMeta.data.first_name,
            last_name: docMeta.data.last_name,
            number: docMeta.data.last_name,
            street: docMeta.data.street,
            postcode: docMeta.data.postcode,
            city: docMeta.data.city
          };
          permittedDocs.push(currentDoc);
        });
      }
    });
    return permittedDocs;
  }

  const [show, setShow] = useState(false);
  const [permissions, setPermissions] = useState(() => getPermissions());
  const [inputValue, setInputValue] = useState("");
  const [docsActions, setDocsActions] = useState(checkMock);
  const [docs, setDocs] = useState(mockData);

  const handleShow = () => {
    setShow(true);
  };
  const handleClose = () => {
    setShow(false);
  };

  function handlePermit() {
    setShow(false);
    const userId = getUserAccountId();
    if (docsActions.length > 0) {
      docsActions.forEach((permission) => {
        axios
          .post(`http://localhost:8080/files/permit/${props.id}?userId=${userId}`, {
            userId: permission.docId,
            action: permission.action
          })
          .then((response) => {
            console.log(response);
          });
      });
    }
  }


  function addPermission(event: React.MouseEvent<HTMLElement, MouseEvent>) {
    const n_docsActions = docsActions;
    const id = (event.currentTarget as HTMLElement
    ).id;
    n_docsActions.push({ docId: id, action: "ADD" });

    const selectedDoc = docs.find((element) => {
      return String(element.id) === id;
    });
    const n_permissions = permissions;

    const isAlreadyPermitted = permissions.find((element) => {
      return String(element.id) === id;
    });
    if (selectedDoc !== undefined && !isAlreadyPermitted) {
      n_permissions.push(selectedDoc);
    }
    setPermissions([...n_permissions]);
    setDocsActions([...n_docsActions]);
  }

  function removePermission(event: React.MouseEvent<HTMLElement, MouseEvent>) {
    const n_docsActions = docsActions;
    const id = (event.currentTarget as HTMLElement
    ).id;
    n_docsActions.push({ docId: id, action: "DELETE" });

    const selectedDoc = permissions.find((element) => {
      return String(element.id) === id;
    });
    console.log(selectedDoc);
    const n_permissions = permissions;
    if (selectedDoc !== undefined) {

      n_permissions.splice(permissions.indexOf(selectedDoc), 1);
    }
    setPermissions([...n_permissions]);
    setDocsActions([...n_docsActions]);
  }

  function docSearch(event: React.ChangeEvent<HTMLInputElement>) {
    setInputValue(event.target.value);
    if (event.target.value !== "" && event.target.value !== undefined) {
      axios.get(`http://localhost:8080/doctors/${event.target.value}`).then((response) => {
        const doctors = response.data;
        setDocs(doctors);
      });
    }
  }

  return (
    <>
      <Button style={{ background: "none", border: "none" }} onClick={handleShow}>
        <BsShare className={"trashcan"}/>
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Freigeben</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <b>{props.name}</b> ist für folgende Behandler:innen freigegeben:
          <div>
            {permissions.map((record) => (
              <div key={record.id} className={"permittedDoc"}>
                <div style={{ "display": "inline-block" }}>
                  <b>
                    {record.first_name} {record.last_name}
                  </b>
                  <br />
                  <span>
                    {record.street} {record.number}, {record.postcode} {record.city}
                  </span>
                </div>
                <Button className={"btn-delete"} id={String(record.id)} onClick={removePermission}>
                  <BsTrash className={"trashcan no-margin"}></BsTrash>
                </Button>
              </div>
            ))}

          </div>
          <br />
          Weitere Freigaben hinzufügen:
          <Form>
            <Form.Group className="mb-3" controlId="formBasicGivenName">
              <Form.Label></Form.Label>
              <Form.Control type="Text" placeholder="Behandler:in suchen ..." value={inputValue} onChange={docSearch} />
            </Form.Group>
          </Form>
          {docs.map((record) => (
            <div key={record.id} className={"permittedDoc"}>
              <div style={{"display": "inline-block"}}>
                <b>
                  {record.first_name} {record.last_name}
                </b>
                <br />
                <span>
                  {record.street} {record.number}, {record.postcode} {record.city}
                </span>
              </div>
              <Button className={"btn-add"} id={String(record.id)} onClick={addPermission}>
                <BsPlusLg className={"trashcan no-margin"}></BsPlusLg>
              </Button>
            </div>
          ))}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Abbrechen
          </Button>
          <Button variant="primary" onClick={handlePermit}>
            Freigeben
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
