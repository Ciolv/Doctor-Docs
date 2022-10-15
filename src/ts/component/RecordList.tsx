import * as React from "react";
import { Col, Container, Row } from "react-bootstrap";
import "../../css/RecordList.scss";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { ThumbnailMock } from "../utils/MockData";
import { GiShare } from "react-icons/gi";

type Props = {};
type State = {};

const mockData = [{
  id: 1,
  thumbnail: ThumbnailMock,
  fileName: "Doctor.svg",
  fileSize: 0.207,
  modifyDate: new Date(2022, 10, 13)
},
  {
    id: 2,
    thumbnail: ThumbnailMock,
    fileName: "Doc.svg",
    fileSize: 0.217,
    modifyDate: new Date(2022, 10, 1)
  }
];

export class RecordList extends React.Component<Props, State> {
  render() {
    return (
      <Container fluid>
        <Row className="file-record file-record-headline">
          <Col className="file-thumbnail" xs={"1"}></Col>
          <Col className="file-name" xs={"7"}>Name</Col>
          <Col className="file-options" xs={"1"}></Col>
          <Col className="file-size" xs={"1"}>Größe</Col>
          <Col className="file-modify-date" xs={"2"}>Geändert</Col>
          <Col className="file-info" xs={"1"}></Col>
        </Row>

        {
          mockData.map(record =>
                         <Row className="file-record" key={record.id} id={record.id.toString()}>
                           <Col className="file-thumbnail" xs={"1"}><img src={record.thumbnail} /></Col>
                           <Col className="file-name" xs={"7"}>{record.fileName}</Col>
                           <Col className="file-options" xs={"1"}>
                             <div onClick={(e) => console.log((e.currentTarget
                                 .parentNode?.parentNode as HTMLElement
                                                              ).getAttribute("id"))}>
                               <GiShare />
                             </div>
                           </Col>
                           <Col className="file-size" xs={"1"}>{record.fileSize} MB</Col>
                           <Col className="file-modify-date" xs={"2"}>{record.modifyDate.toDateString()}</Col>
                           <Col className="file-info" xs={"1"}><AiOutlineInfoCircle /></Col>
                         </Row>
          )}
      </Container>
    );
  };
}