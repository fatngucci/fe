import { Container, Form, Button, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Benachrichtigung from "./Benachrichtigung";
import { NewsletterResource, ValidationMessages } from "./Resources";
import { useAdminIDContext } from "./AdminIDContext";
import { Fragment, useRef, useState } from "react";
import { postNewsletter, putNewsletter } from "../backend/api";

export default function NewsletterForm(props: { newsletter: NewsletterResource | undefined }) {
    let pageTitle = "Newsletter erstellen";

    let cancelButton =
        <Button style={{ borderRadius: '0', borderColor: 'black', backgroundColor: 'white', color: 'black' }} size='lg' onClick={() => navigate("/dashboard/newsletter")}>
            Abbrechen
        </Button>;

    if (props.newsletter) {
        pageTitle = "Newsletter bearbeiten"
        cancelButton =
            <Button style={{ borderRadius: '0', borderColor: 'black', backgroundColor: 'white', color: 'black' }} size='lg' onClick={() => navigate("/dashboard/newsletter")}>
                Abbrechen
            </Button>;
    }

    const { adminID } = useAdminIDContext();

    const refUeberschrift = useRef<HTMLInputElement>(null);
    const refBeschreibung = useRef<HTMLTextAreaElement>(null);
    const refFile = useRef<HTMLInputElement>(null);


    const navigate = useNavigate();

    const [benachrichtigung, setBenachrichtigung] = useState<string>("");
    const [showBenachrichtigung, setShowBenachrichtigung] = useState<boolean>(false);

    // Validierung
    const [validationErrors, setValidationErrors] = useState<ValidationMessages<NewsletterResource>>({});
    const [validated, setValidated] = useState(false);

    function validate(e: React.FocusEvent<HTMLInputElement>) {
        switch (e.target.name) {
            case "ueberschrift":
                setValidationErrors({
                    ...validationErrors,
                    ueberschrift: (refUeberschrift.current!.value.length < 1 || refUeberschrift.current!.value.length > 100)
                        ? "Die Ueberschrift muss mehr als 1 und weniger als 100 Buchstaben haben" : undefined
                });
                break;

            case "beschreibung":
                setValidationErrors({
                    ...validationErrors,
                    beschreibung: (refBeschreibung.current!.value.length < 1 || refBeschreibung.current!.value.length > 1000)
                        ? "Die Beschreibung muss mehr als 1 und weniger als 1000 Buchstaben haben" : undefined
                });
                break;
        }
    }



    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        const form = e.currentTarget as HTMLFormElement;
        if (!form.checkValidity()) {
            e.stopPropagation();
            return;
        }

        setValidated(true);
        if (adminID) {
            try {
                const newsletterRes: NewsletterResource = {
                    ueberschrift: refUeberschrift.current!.value,
                    beschreibung: refBeschreibung.current!.value,
                    publish: true
                }

                if (props.newsletter) {
                    newsletterRes.id = props.newsletter.id;
                    const newsletterAktualisiert = await putNewsletter(newsletterRes, refFile.current!.files);

                    if (newsletterAktualisiert) {
                        setBenachrichtigung("Newsletter im System gespeichert");
                        navigate('/dashboard/newsletter')
                    } else {
                        setBenachrichtigung("Bearbeitung fehlgeschlagen");
                    }
                    setShowBenachrichtigung(true);
                } else {
                    const newsletterErstellt = await postNewsletter(newsletterRes, refFile.current!.files);
                    if (newsletterErstellt) {
                        setBenachrichtigung("Newsletter im System gespeichert");
                        navigate('/dashboard/newsletter')
                    } else {
                        setBenachrichtigung("Erstellung fehlgeschlagen");
                    }
                    setShowBenachrichtigung(true);
                }
            } catch (err) {
                alert("nope");
            }
        }
    }


    if (!adminID) {
        return (
            <Container>
                <h1> Nicht erlaubt</h1>
            </Container>
        )
    } else {
        return (

            <Fragment>
                <Container fluid className="vh-auto" style={{ paddingRight: "50px", paddingLeft: "50px" }}>
                    <div className="hr p-0 m-0" />

                    <h1 className="display-5 pad-top-4 pad-bottom-2">{pageTitle}</h1>

                    <Form encType="multipart/form-data" onSubmit={handleSubmit} validated={validated}>

                        {/* ueberschrift */}
                        <Form.Group className="pad-bottom-1">
                            <Form.Control
                                className={validationErrors.ueberschrift ? "InputError fs-3" : "InputOK fs-3"}
                                ref={refUeberschrift}
                                name="ueberschrift"
                                type="text"
                                defaultValue={props.newsletter ? props.newsletter.ueberschrift : undefined}
                                placeholder="Ueberschrift"
                                onBlur={validate}
                                minLength={1}
                                maxLength={100}
                                required
                                style={{
                                    border: '0',
                                    borderBottom: '1px solid black',
                                    borderRadius: '0'
                                }}
                            >
                            </Form.Control>
                            <Form.Control.Feedback type="invalid" className="d-block"> {validationErrors.ueberschrift}
                            </Form.Control.Feedback>

                        </Form.Group>

                        {/* beschreibung */}
                        <Form.Group className="pad-bottom-1">
                            <Form.Control
                                className={validationErrors.beschreibung ? "InputError fs-3" : "InputOK fs-3"}
                                ref={refBeschreibung}
                                name="beschreibung"
                                type="text" as="textarea"
                                defaultValue={props.newsletter ? props.newsletter.beschreibung : undefined}
                                placeholder="Beschreibung"
                                onBlur={validate}
                                minLength={1}
                                maxLength={5000}
                                required
                                style={{
                                    border: '0',
                                    borderBottom: '1px solid black',
                                    borderRadius: '0'
                                }}
                            >
                            </Form.Control>
                            <Form.Control.Feedback type="invalid" className="d-block"> {validationErrors.beschreibung}
                            </Form.Control.Feedback>

                        </Form.Group>


                        <Form.Group className="pad-bottom-3">
                            <Form.Control
                                className="fs-3"
                                name="bilder"
                                type="file"
                                multiple
                                ref={refFile}
                            >
                            </Form.Control>
                        </Form.Group>

                        <Form.Group className="pad-bottom-3">
                            <Row>
                                <Col xs="auto">
                                    {props.newsletter ?
                                        <Button style={{ borderRadius: '0', borderColor: 'black', backgroundColor: '#FAFF00', color: 'black' }} size='lg' type="submit">
                                            Aktualisieren
                                        </Button>
                                        :
                                        <Button style={{ borderRadius: '0', borderColor: 'black', backgroundColor: '#FAFF00', color: 'black' }} size='lg' type="submit">
                                            Erstellen
                                        </Button>}
                                </Col>
                                <Col xs="auto">
                                    {cancelButton}
                                </Col>
                            </Row>
                        </Form.Group>
                    </Form>
                </Container>
                <Benachrichtigung show={showBenachrichtigung} handleClose={setShowBenachrichtigung} nachricht={benachrichtigung}></Benachrichtigung>
            </Fragment>
        )
    }

}