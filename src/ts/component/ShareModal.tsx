import React from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "../../css/ShareModal.scss";
import {
  BsCheckCircleFill,
  BsExclamationCircleFill,
  BsFillXCircleFill,
  BsPlusLg,
  BsShare,
  BsTrash
} from "react-icons/bs";
import { Alert, Form } from "react-bootstrap";
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
  role: "DOCTOR" | "PATIENT";
};

type InsNumState = "NULL" | "PENDING" | "INVALID" | "VALID_USER" | "VALID_NO_USER";

const mockData: User[] = [];
const checkMock: DocActions[] = [];

export default function ShareModal(props: Props) {
  function getPermissions() {
    const permittedDocs: User[] = [];
    props.permissions.forEach((doc) => {
      if (doc.permission === 0 && doc.userId !== null && doc.userId !== undefined) {
        axios.get(`http://localhost:8080/users/${doc.userId}`).then((docMeta) => {
          const currentDoc: User = {
            id: docMeta.data.id,
            first_name: docMeta.data.first_name,
            last_name: docMeta.data.last_name,
            number: docMeta.data.number,
            street: docMeta.data.street,
            postcode: docMeta.data.postcode,
            city: docMeta.data.city,
            insurance_number: docMeta.data.insurance_number,
            insurance: docMeta.data.insurance
          };
          permittedDocs.push(currentDoc);
        });
      }
    });
    return permittedDocs;
  }

  const [show, setShow] = useState(false);
  const [insValidity, setInsValidity] = useState<InsNumState>("NULL");
  const [permissions, setPermissions] = useState<User[]>(() => getPermissions());
  const [inputValue, setInputValue] = useState<string>("");
  const [docsActions, setDocsActions] = useState<DocActions[]>(checkMock);
  const [docs, setDocs] = useState<User[]>(mockData);

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
            action: permission.action,
            role: permission.role
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
    const role = (id.length === 10? "PATIENT" : "DOCTOR");
    if (id.length === 10) {
      n_docsActions.push({ docId: id, action: "ADD", role: role });
    }
    else {
      n_docsActions.push({ docId: id, action: "ADD", role: role });
    }

    let selectedDoc;
    if (role === "DOCTOR") {
      selectedDoc = docs.find((element) => {
        return String(element.id) === id;
      });
    }
    else {
      selectedDoc = {id: id, insurance_number: id, first_name: "", last_name: "", street: "", number: 0, city: "", postcode: 0};
    }

    console.log(selectedDoc);
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

    const selectedDoc = permissions.find((element) => {
      return String(element.id) === id;
    });

    const n_permissions = permissions;

    if (selectedDoc !== undefined) {
      if (selectedDoc.insurance_number !== "") {
        n_docsActions.push({ docId: id, action: "DELETE", role: "PATIENT" });
      }
      else {
        n_docsActions.push({ docId: id, action: "DELETE", role: "DOCTOR" });
      }
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

  function insNumValidate(event: React.ChangeEvent<HTMLInputElement>) {
    setInputValue(event.target.value);
    setInsValidity("NULL");
    if (event.target.value.length === 10) {
      const numToCheck = event.target.value;
      const regex = /^([A-Z])([0-9]{8})([0-9])$/
      const m = regex.exec(numToCheck)
      if (m) {
        const cardNo = ("0" + (m[1].charCodeAt(0) - 64)).slice(-2) + m[2];
        let sum = 0;
        for (let i = 0; i < 10; i++) {
          // eslint-disable-next-line security/detect-object-injection
          let d = Number(cardNo[i]);
          if (i % 2 === 1) {
            d *= 2
          }
          if (d > 9) {
            d -= 9;
          }
          sum += d;
        }
        if (sum % 10 === Number(m[3])) {
          axios.get(`http://localhost:8080/users/search/${numToCheck}`).then((response) => {
            if (response.data === true) {
              setInsValidity("VALID_USER");
            }
            else {
              setInsValidity("VALID_NO_USER");
            }
          })
        }
        else {
          setInsValidity("INVALID");
        }
      }
      else {
        setInsValidity("INVALID");
      }
    }
    else if (event.target.value.length > 10) {
      setInsValidity("INVALID");
    }
    else {
      setInsValidity("PENDING");
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
          {permissions.length === 0? <span><b>{props.name}</b> ist noch für keine Personen freigegeben.</span> : <span><b>{props.name}</b> ist für folgende Personen freigegeben:</span>}
          <div>
            {permissions.map((record) => (
              <div key={record.id} className={"permittedDoc"}>
                {(record.id.length === 10 || (record.insurance_number !== "" && record.approbation === ""))?
                  <div>
                    <div style={{ "display": "inline-block" }}>
                      <b>
                        {record.insurance_number}
                      </b>
                      <br />
                      <span>
                        <br/>
                    </span>
                    </div>
                    <Button className={"btn-delete"} id={String(record.id)} onClick={removePermission}>
                      <BsTrash className={"trashcan no-margin"}></BsTrash>
                    </Button>
                  </div>
                  :
                  <div>
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
                  </div>}
              </div>
            ))}

          </div>
          <br />
          Weitere Freigaben hinzufügen:
          {props.role === "PATIENT"?
            <Form>
              <Form.Group className="mb-3" controlId="formBasicGivenName">
                <Form.Label></Form.Label>
                <Form.Control type="Text" placeholder="Behandler:in suchen ..." value={inputValue} onChange={docSearch} />
              </Form.Group>
            </Form>
            :
            <Form>
              <Form.Group className="mb-3" controlId="formBasicGivenName">
                <Form.Label></Form.Label>
                <Form.Control type="Text" placeholder="Versicherungsnummer eingeben ..." value={inputValue} onChange={insNumValidate} style={{width: "79%", float: "left"}}/>
                <div style={{display: "inline"}}>
                  {insValidity === "PENDING"? <BsExclamationCircleFill className={"check pending"}></BsExclamationCircleFill> : ""}
                  {(insValidity === "VALID_USER" || insValidity === "VALID_NO_USER")? <BsCheckCircleFill className={"check valid"}></BsCheckCircleFill> : ""}
                  {insValidity === "INVALID"? <BsFillXCircleFill className={"check invalid"}></BsFillXCircleFill> : ""}
                </div>
                <Button className={"btn-add"}  disabled={insValidity !== "VALID_USER"} id={inputValue} onClick={addPermission}>
                  <BsPlusLg className={"trashcan no-margin"}></BsPlusLg>
                </Button>
                {insValidity === "VALID_NO_USER"?
                  <Alert variant={"danger"} className={"alert"}>
                    Die Person mit dieser Versicherungsnummer hat einer Freigabe von Dokumenten nicht zugestimmt.
                  </Alert>
                  : ""}
              </Form.Group>
            </Form>

          }

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
            Speichern
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
