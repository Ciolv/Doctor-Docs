import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "../../css/ShareModal.scss";
import {
  BsCheckCircleFill,
  BsExclamationCircleFill,
  BsFillXCircleFill,
  BsPlusLg,
  BsShare,
  BsTrash,
} from "react-icons/bs";
import { Alert, Form } from "react-bootstrap";
import axios from "axios";
import { getIdToken, getUserAccountId } from "../utils/AuthHelper";
import { User } from "../models/User";
import { FilePermission } from "../models/File";
import { BackendEndpoint } from "../utils/Config";
import { isInsuranceNumber } from "../utils/Validation";

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
    getIdToken().then((jwt) => {
      const body = { jwt };
      props.permissions.forEach((doc) => {
        const url = `${BackendEndpoint}/doctors/data/${doc.userId}`;
        const canRead = doc.permission >= FilePermission.Read;
        const hasId = doc.userId !== null && doc.userId !== undefined;
        const alreadyIncluded = permissions
          ? permissions.some((d) => permittedDocs.some((doctor) => d.id === doctor.id))
          : false;
        const isOwnAccount = getUserAccountId() === doc.userId;

        if (canRead && hasId && !alreadyIncluded && !isOwnAccount) {
          axios.post(url, body).then((docMeta) => {
            const currentDoc: User = {
              id: docMeta.data.id,
              first_name: docMeta.data.first_name,
              last_name: docMeta.data.last_name,
              number: docMeta.data.number,
              street: docMeta.data.street,
              postcode: docMeta.data.postcode,
              city: docMeta.data.city,
              insurance_number: docMeta.data.insurance_number,
              insurance: docMeta.data.insurance,
            };

            permittedDocs.push(currentDoc);
          });
        }
      });
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

  async function handlePermit() {
    setShow(false);
    if (docsActions.length > 0) {
      const jwt = await getIdToken();
      for (const permission of docsActions) {
        const uri = `${BackendEndpoint}/files/permit/${props.id}`;
        const body = {
          jwt,
          userId: permission.docId,
          action: permission.action,
          role: permission.role,
        };
        axios.post(uri, body, { responseType: "json" }).then((_) => _);
      }
    }
  }

  function addPermission(event: React.MouseEvent<HTMLElement, MouseEvent>) {
    const n_docsActions = docsActions;
    const id = (event.currentTarget as HTMLElement).id;
    const role = id.length === 10 ? "PATIENT" : "DOCTOR";
    if (id.length === 10) {
      n_docsActions.push({ docId: id, action: "ADD", role });
    } else {
      n_docsActions.push({ docId: id, action: "ADD", role });
    }

    let selectedDoc: User | undefined;
    if (role === "DOCTOR") {
      selectedDoc = docs.find((element) => element.id === id);
    } else {
      selectedDoc = {
        id,
        insurance_number: id,
        first_name: "",
        last_name: "",
        street: "",
        number: "",
        city: "",
        postcode: "",
      };
    }

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
    const id = (event.currentTarget as HTMLElement).id;

    const selectedDoc = permissions.find((element) => {
      return String(element.id) === id;
    });
    const n_permissions = permissions;

    if (selectedDoc !== undefined) {
      if (selectedDoc.insurance_number !== "") {
        n_docsActions.push({ docId: id, action: "DELETE", role: "PATIENT" });
      } else {
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
      getIdToken().then((jwt) => {
        const uri = `${BackendEndpoint}/doctors/${event.target.value}`;
        const body = {
          jwt,
        };
        axios.post(uri, body).then((response) => {
          const doctors = response.data;
          setDocs(doctors);
        });
      });
    }
  }

  async function insNumValidate(event: React.ChangeEvent<HTMLInputElement>) {
    setInputValue(event.target.value);
    setInsValidity("NULL");
    if (event.target.value.length === 10) {
      const numToCheck = event.target.value;
      if (isInsuranceNumber(numToCheck)) {
        const jwt = await getIdToken();
        const body = {
          jwt,
        };
        axios.post(`${BackendEndpoint}/users/search/${numToCheck}`, body).then((response) => {
          if (response.data === true) {
            setInsValidity("VALID_USER");
          } else {
            setInsValidity("VALID_NO_USER");
          }
        });
      } else {
        setInsValidity("INVALID");
      }
    } else {
      if (event.target.value.length > 10) {
        setInsValidity("INVALID");
      } else {
        setInsValidity("PENDING");
      }
    }
  }

  return (
    <>
      <Button title={"Teilen"} style={{ background: "none", border: "none" }} onClick={handleShow}>
        <BsShare title={"L??schen"} className={"trashcan"} />
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Freigeben</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {permissions.length === 0 ? (
            <span>
              <b>{props.name}</b> ist noch f??r keine Personen freigegeben.
            </span>
          ) : (
            <span>
              <b>{props.name}</b> ist f??r folgende Personen freigegeben:
            </span>
          )}
          <div>
            {permissions.map((record) => (
              <div key={record.id} className={"permittedDoc"}>
                {record.id.length === 10 || (record.insurance_number !== "" && record.approbation === "") ? (
                  <div>
                    <div style={{ display: "inline-block" }}>
                      <b>{record.insurance_number}</b>
                      <br />
                      <span>
                        <br />
                      </span>
                    </div>
                    <Button className={"btn-delete"} id={String(record.id)} onClick={removePermission}>
                      <BsTrash title={"L??schen"} className={"trashcan no-margin"}></BsTrash>
                    </Button>
                  </div>
                ) : (
                  <div>
                    <div style={{ display: "inline-block" }}>
                      <b>
                        {record.first_name} {record.last_name}
                      </b>
                      <br />
                      <span>
                        {record.street} {record.number}, {record.postcode} {record.city}
                      </span>
                    </div>
                    <Button className={"btn-delete"} id={String(record.id)} onClick={removePermission}>
                      <BsTrash title={"L??schen"} className={"trashcan no-margin"}></BsTrash>
                    </Button>
                  </div>
                )}
              </div>
            ))}
          </div>
          <br />
          Weitere Freigaben hinzuf??gen:
          {props.role === "PATIENT" ? (
            <Form>
              <Form.Group className="mb-3" controlId="formBasicGivenName">
                <Form.Label></Form.Label>
                <Form.Control
                  type="Text"
                  placeholder="Behandler:in suchen ..."
                  value={inputValue}
                  onChange={docSearch}
                />
              </Form.Group>
            </Form>
          ) : (
            <Form>
              <Form.Group className="mb-3" controlId="formBasicGivenName">
                <Form.Label></Form.Label>
                <Form.Control
                  type="Text"
                  placeholder="Versicherungsnummer eingeben ..."
                  value={inputValue}
                  onChange={insNumValidate}
                  style={{ width: "79%", float: "left" }}
                />
                <div style={{ display: "inline" }}>
                  {insValidity === "PENDING" ? (
                    <BsExclamationCircleFill
                      title={"Unvollst??ndig"}
                      className={"check pending"}
                    ></BsExclamationCircleFill>
                  ) : (
                    ""
                  )}
                  {insValidity === "VALID_USER" || insValidity === "VALID_NO_USER" ? (
                    <BsCheckCircleFill title={"G??ltig"} className={"check valid"}></BsCheckCircleFill>
                  ) : (
                    ""
                  )}
                  {insValidity === "INVALID" ? (
                    <BsFillXCircleFill title={"Ung??ltig"} className={"check invalid"}></BsFillXCircleFill>
                  ) : (
                    ""
                  )}
                </div>
                <Button
                  className={"btn-add"}
                  disabled={insValidity !== "VALID_USER"}
                  id={inputValue}
                  onClick={addPermission}
                >
                  <BsPlusLg title={"Hinzuf??gen"} className={"trashcan no-margin"}></BsPlusLg>
                </Button>
                {insValidity === "VALID_NO_USER" ? (
                  <Alert variant={"danger"} className={"alert"}>
                    Die Person mit dieser Versicherungsnummer hat einer Freigabe von Dokumenten nicht zugestimmt.
                  </Alert>
                ) : (
                  ""
                )}
              </Form.Group>
            </Form>
          )}
          {docs.map((record) => (
            <div key={record.id} className={"permittedDoc"}>
              <div style={{ display: "inline-block" }}>
                <b>
                  {record.first_name} {record.last_name}
                </b>
                <br />
                <span>
                  {record.street} {record.number}, {record.postcode} {record.city}
                </span>
              </div>
              <Button className={"btn-add"} id={String(record.id)} onClick={addPermission}>
                <BsPlusLg title={"Hinzuf??gen"} className={"trashcan no-margin"}></BsPlusLg>
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
