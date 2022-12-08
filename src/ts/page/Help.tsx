import React from "react";
import { Accordion, Button, Container, Row } from "react-bootstrap";
import "../../css/Security.scss";
import { BsPlusLg, BsShare, BsTrash } from "react-icons/bs";
import { AiOutlineMail } from "react-icons/ai";

// eslint-disable-next-line @typescript-eslint/ban-types
type Props = {};
// eslint-disable-next-line @typescript-eslint/ban-types
type State = {};

export class Help extends React.Component<Props, State> {
  render() {
    return (
      <Container className="security">
        <Row>
          <h3>
            Über die Anwendung
          </h3>
          <Accordion>
            <Accordion.Item eventKey="0">
              <Accordion.Header>Was ist Doctor Docs?</Accordion.Header>
              <Accordion.Body>
                Doctor Docs ist eine Plattform, die es Ihnen als Patient ermöglicht, Ihre individuellen Befunddaten
                sicher und digital zu verwahren und mit von Ihnen ausgewählten Behandler:innen zu teilen. So müssen Sie
                sich keine Gedanken mehr darüber machen, wo Sie wichtige Arztbriefe aufbewahren, vermeiden unnötige
                Fahrten zur Arztpraxis und haben eine einfache Möglichkeit, auch anderen Ärzten Ihre Daten unter Ihrer
                vollen Kontrolle zur Verfügung zu stellen.
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
              <Accordion.Header>Wer steht hinter Doctor Docs?</Accordion.Header>
              <Accordion.Body>
                Doctor Docs ist ein studentisches Projekt im Auftrag der Kassenärztlichen Vereinigung in Deutschland.
                Teilnehmende gesetzliche Krankenkassen schalten die Anwendung mit einem Lizenzerwerb für Ihre
                Versicherten frei, sind aber weder für Finanzierung, noch für Betrieb der Plattform verantwortlich. <br/><br/>
                Der Betrieb der Plattform wird gewährleistet durch:
                <br/>
                <b>
                  Happy-Crappy Webdevelopment eG</b><br/>
                  Coblitzallee 1-9<br/>
                  68163 Mannheim <br/><br/>
                  E-Mail: <a href={"mailto:reanimated_nanosensors@simplelogin.com"}>reanimated_nanosensors(at)simplelogin.com</a>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="2">
              <Accordion.Header>Wie ist die Geschichte von Doctor Docs?</Accordion.Header>
              <Accordion.Body>
                Eine Webanwendung sollte her, okay, nicht so schwer, dachten sich drei-einhalb Herren ganz kühnerweise,
                und da begann die Reise durch die Dependency-Hölle schon im Kern kaputter Sprachen, über die nicht nur
                andere sehr zurecht tagtäglich lachen. Wo ist denn der Sinn in React versteckt, mag so mancher fragen,
                nun, wir können es Ihnen schlicht nicht sagen.
                So viele Stunden, so viele Extrarunden, so viele neue Wunden am Geduldsfaden - Und, hat es sich gelohnt?
                Nun, wenn uns der Herr Dozent mit einer Nachprüfung verschont: Vielleicht. 😉
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
          <br/>&nbsp;<br/>
          <h3>
            Anmeldung
          </h3>
          <Accordion>
            <Accordion.Item eventKey="0">
              <Accordion.Header>Wie kann ich mich bei Doctor Docs anmelden?</Accordion.Header>
              <Accordion.Body>
                Die Anmeldung bei Doctor Docs verläuft zweischrittig:
                <ol>
                  <li>
                    <b>Anmeldung mit Ihrem Microsoft-Konto über die Login-Seite</b><br/>
                    Wenn Sie Doctor Docs aufrufen, müssen Sie sich zunächst mit einem Microsoft-Konto anmelden.
                    So ersparen wir Ihnen ein weiteres Passwort, dass Sie sich sonst merken müssten und können
                    die Sicherheitsfunktionen (wie Multi-Factor-Authentification) unseres Partners mitnutzen.
                  </li>
                  <li>
                    <b>Registrierung mit Ihren personenbezogenen Daten</b><br/>
                    Im zweiten Schritt gelangen Sie zu einem Formular, in das Sie Ihre Daten eintragen.
                    Um Sie zweifelsfrei identifizieren zu können, ist die Eingabe aller Daten erforderlich.
                    Die Angabe Ihrer Versichertennummer ermöglicht es Ärzten, Ihnen Dateien zur Verfügung zu stellen.
                  </li>
                </ol>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
              <Accordion.Header>Ich habe kein Microsoft-Konto. Wie kann ich Doctor Docs trotzdem nutzen?</Accordion.Header>
              <Accordion.Body>
                Gegenwärtig ist eine Nutzung der Anwendung ohne Microsoft-Konto leider <b>nicht möglich</b>.
                Wir arbeiten daran, Ihnen künftig auch andere Authentifizierungsoptionen anbieten zu können.
                Ein Microsoft-Konto ist für Privatpersonen kostenlos. Häufig nutzen Unternehmen Microsoft-Konten für Ihre
                Mitarbeitenden - auch diese Konten können Sie für Doctor Docs verwenden.
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="2">
              <Accordion.Header>Ich habe ein Microsoft-Konto, kann mich damit aber nicht anmelden. Was kann ich tun?</Accordion.Header>
              <Accordion.Body>
                Manche Microsoft-Kontotypen werden durch unsere Anwendung leider nicht unterstützt.
                Bitte verwenden Sie nach Möglichkeit ein anderes Konto oder wenden Sie sich unter Angabe
                Ihres Kontos an uns:<br/>
                <a href={"mailto:reanimated_nanosensors@simplelogin.com"}>reanimated_nanosensors(at)simplelogin.com</a>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="3">
              <Accordion.Header>Wie kann ich mein Microsoft-Konto wechseln?</Accordion.Header>
              <Accordion.Body>
                Sie können das mit Ihrem Doctor-Docs-Konto verknüpft Microsoft-Konto aus Sicherheitsgründen nicht
                selbstständig wechseln. Bitte erstellen Sie sich mit Ihrem neuen Konto ein neues Doctor-Docs-Konto und
                senden Sie uns bitte unter Angabe Ihres alten Kontos, Ihres neuen Kontos und eines Bildes Ihrer
                Versichertenkarte zur Legitimation eine E-Mail an <a href={"mailto:reanimated_nanosensors@simplelogin.com"}>reanimated_nanosensors(at)simplelogin.com</a><br/><br/>
                Unser Support-Team wird Ihre Anfrage anschließend bearbeiten und Ihre Dokumente in Ihr neues Konto übertragen.
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="4">
              <Accordion.Header>Ich bin Privatpatient. Kann ich Doctor Docs nutzen?</Accordion.Header>
              <Accordion.Body>
                Gegenwärtig ist die Anwendung nur für gesetzlich versicherte Patient:innen nutzbar.
                Für Privatversicherte bieten wir in Kürze die Version <b>Doctor Docs Premium</b>
                - wie Sie es gewohnt sind - mit noch kürzeren Wartezeiten und einem größeren Leistungsumfang an.
                Die Kosten für diese Version sind selbstverständlich privat zu tragen.
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
          <br/>&nbsp;<br/>
          <h3>
            Freigaben und Freigeben
          </h3>
          <Accordion>
            <Accordion.Item eventKey="0">
              <Accordion.Header>Wie kann ich Dokumente hochladen?</Accordion.Header>
              <Accordion.Body>
                <ol>
                  <li>Melden Sie sich über die Login-Seite mit Ihrem Microsoft-Konto an.</li>
                  <li>Sofern noch nicht geschehen, füllen Sie das Registrierungsformular aus und speichern Sie es.</li>
                  <li>Sie werden nun automatisch zur Übersicht Ihrer Dokumente (Reiter &quot;Akte&quot;) weitergeleitet.</li>
                  <li>Klicken Sie nun auf das blaue Plus-Symbol, um ein neues Dokument hochzuladen. </li>
                  <li>Laden Sie die Seite nach dem Hochladen neu. Nun sollte das neue Dokument in Ihrer Liste erscheinen.</li>
                </ol>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
              <Accordion.Header>Wie kann ich Dokumente mit meinen Behandler:innen teilen?</Accordion.Header>
              <Accordion.Body>
                <ol>
                  <li>Klicken Sie dafür im Bereich &quot;Akte&quot; auf das Teilen-Symbol <BsShare></BsShare> der betreffenden Datei.</li>
                  <li>Geben Sie in das Suchfeld nun den Namen, die Straße oder den Ort der:des Behandlers:in ein.</li>
                  <li>Fügen Sie die gewünschte Person mit einem Klick auf das Hinzufügen-Symbol <BsPlusLg></BsPlusLg> hinzu.</li>
                  <li>Sobald Sie alle zu berechtigenden Personen hinzugefügt haben, klicken Sie auf &quot;Speichern&quot;. Erst dann werden Ihre Freigaben wirksam.</li>
                </ol>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="2">
              <Accordion.Header>Wie kann ich Dokumente mit meinen Patient:innen teilen?</Accordion.Header>
              <Accordion.Body>
                <ol>
                  <li>Klicken Sie dafür im Bereich &quot;Akte&quot; auf das Teilen-Symbol <BsShare></BsShare> der betreffenden Datei.</li>
                  <li>Geben Sie in das Suchfeld nun die Versichertennummer der:des Patienten:in ein.</li>
                  <li>Sofern die Person Doctor Docs nutzt, können Sie die gewünschte Person mit einem Klick auf das Hinzufügen-Symbol <BsPlusLg></BsPlusLg> hinzufügen.</li>
                  <li>Sobald Sie alle zu berechtigenden Personen hinzugefügt haben, klicken Sie auf &quot;Speichern&quot;. Erst dann werden Ihre Freigaben wirksam.</li>
                </ol>
                Sollte Ihnen kein Teilen-Symbol <BsShare></BsShare> angezeigt werden, so fehlt Ihnen die Berechtigung zum Teilen dieses Dokumentes.
                Das ist dann der Fall, wenn Ihre Verifikation noch aussteht oder die Datei nicht durch Sie hochgeladen, sondern Ihnen nur freigegeben wurde.
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="3">
              <Accordion.Header>Wie kann ich Freigaben rückgängig machen?</Accordion.Header>
              <Accordion.Body>
                <ol>
                  <li>Klicken Sie dafür im Bereich &quot;Akte&quot; auf das Teilen-Symbol <BsShare></BsShare> der betreffenden Datei.</li>
                  <li>Wählen Sie aus die betreffende Person aus den Freigaben aus und klicken Sie auf das Löschen-Symbol <BsTrash></BsTrash>.</li>
                  <li>Sobald Sie alle zu entfernenden Personen entfernt haben, klicken Sie auf &quot;Speichern&quot;. Erst dann werden Ihre Änderungen wirksam.</li>
                </ol>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="4">
              <Accordion.Header>Wie kann ich Dokumente löschen?</Accordion.Header>
              <Accordion.Body>
                <ol>
                  <li>Klicken Sie dafür im Bereich &quot;Akte&quot; auf das Löschen-Symbol <BsTrash></BsTrash> der betreffenden Datei.</li>
                  <li>Geben Sie zur Bestätigung das fettgedruckte Wort (Teil des Dateinamens) in das Feld ein.</li>
                  <li>Klicken Sie dann auf &quot;Unwiderruflich löschen&quot;. Es gibt für uns keine Möglichkeit, ein gelöschtes Dokument wiederherzustellen.</li>
                </ol>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion><br/>&nbsp;<br/>
          <h3>
            Kontaktmöglichkeiten
          </h3>

          <Button variant={"primary"} title={"E-Mail senden"} style={{margin: "0% 0% 5% 0%", height: "3em"}} type={"button"}
                  /* eslint-disable-next-line no-restricted-globals */
                  onClick={() => {open("mailto:reanimated_nanosensors@simplelogin.com")}}>
            <span>
              <AiOutlineMail title={"Mail"}></AiOutlineMail> E-Mail</span></Button>
        </Row>
      </Container>
    );
  }
}
