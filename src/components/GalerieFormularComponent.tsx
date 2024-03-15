import { Col, Container, Form, Row, Button } from "react-bootstrap";
import { useAdminIDContext } from "./AdminIDContext";
import { GalerieResource, ValidationMessages } from "./Resources";
import { Fragment, useRef, useState } from "react";
import { postGalerie, putGalerie } from "../backend/api";
import { useNavigate } from "react-router-dom";
import Benachrichtigung from "./Benachrichtigung";
import AdminPage from "../pages/AdminPage";

export default function GalerieForm(props: { galerie: GalerieResource | undefined }) {
    let pageTitle = "Galerie erstellen";

    let cancelButton =
        <Button style={{ borderRadius: '0', borderColor: 'black', backgroundColor: 'white', color: 'black' }} size='lg' onClick={() => navigate("/dashboard/galerie")}>
            Abbrechen
        </Button>;

    if (props.galerie) {
        pageTitle = "Galerie bearbeiten"
        cancelButton =
            <Button style={{ borderRadius: '0', borderColor: 'black', backgroundColor: 'white', color: 'black' }} size='lg' onClick={() => navigate("/dashboard/galerie")}>
                Abbrechen
            </Button>;
    }

    const { adminID } = useAdminIDContext();

    // useRef für die Werte
    const refName = useRef<HTMLInputElement>(null);
    const refBeschreibung = useRef<HTMLTextAreaElement>(null);
    const refEmail = useRef<HTMLInputElement>(null);
    const refTelefon = useRef<HTMLInputElement>(null);
    const refStrasse = useRef<HTMLInputElement>(null);
    const refHausnummer = useRef<HTMLInputElement>(null);
    const refPlz = useRef<HTMLInputElement>(null);
    const refStadt = useRef<HTMLInputElement>(null);
    const refLand = useRef<HTMLInputElement>(null);
    const refFile = useRef<HTMLInputElement>(null);
    const refTage = useRef<HTMLInputElement>(null);
    const refUhrzeiten = useRef<HTMLInputElement>(null);

    const navigate = useNavigate();

    // Benachrichtigung
    const [benachrichtigung, setBenachrichtigung] = useState<string>("");
    const [showBenachrichtigung, setShowBenachrichtigung] = useState<boolean>(false);

    // Validierung
    const [validationErrors, setValidationErrors] = useState<ValidationMessages<GalerieResource>>({});
    const [validated, setValidated] = useState(false);

    // Telefonnummer prüfen (Number nicht Text)
    // function checkNummer(e: React.FocusEvent<HTMLInputElement>) {

    // }

    function validate(e: React.FocusEvent<HTMLInputElement>) {

        const numRegEx = /^[0-9]+$/;

        switch (e.target.name) {
            case "name":
                setValidationErrors({
                    ...validationErrors,
                    name: (refName.current!.value.length < 1 || refName.current!.value.length > 100)
                        ? "Der Name der Galerie muss mehr als 1 und weniger als 100 Buchstaben haben" : undefined
                });
                break;

            case "beschreibung":
                setValidationErrors({
                    ...validationErrors,
                    beschreibung: (refBeschreibung.current!.value.length < 1 || refBeschreibung.current!.value.length > 500)
                        ? "Die Beschreibung der Galerie muss mehr als 1 und weniger als 500 Buchstaben haben" : undefined
                });
                break;

            case "email":
                setValidationErrors({
                    ...validationErrors,
                    email: (refEmail.current!.value.length < 1 || refEmail.current!.value.length > 100 || !refEmail.current?.checkValidity())
                        ? "Die E-Mail ist inkorrekt" : undefined
                });
                break;

            case "telefon":
                setValidationErrors({
                    ...validationErrors,
                    // telefon: (isNaN(refTelefon.current!.valueAsNumber)) //???
                    telefon: (!numRegEx.test(refTelefon.current!.value))
                        ? "Die Telefonnummer ist inkorrekt" : undefined
                });
                break;

            case "strasse":
                setValidationErrors({
                    ...validationErrors,
                    strasse: (refStrasse.current!.value.length < 1 || refStrasse.current!.value.length > 50)
                        ? "Die Strasse ist inkorrekt" : undefined
                });
                break;

            case "hausnummer":
                setValidationErrors({
                    ...validationErrors,
                    hausnummer: (refHausnummer.current!.value.length < 1 || refHausnummer.current!.value.length > 10)
                        ? "Die Hausnummer ist inkorrekt" : undefined
                });
                break;

            case "plz":
                setValidationErrors({
                    ...validationErrors,
                    plz: (refPlz.current!.value.length !== 5)
                        ? "Die Postleitzahl muss 5-stellig sein" : undefined
                });
                break;

            case "stadt":
                setValidationErrors({
                    ...validationErrors,
                    stadt: (refStadt.current!.value.length < 1 || refStadt.current!.value.length > 30)
                        ? "Die Stadt ist inkorrekt" : undefined
                });
                break;

            case "land":
                setValidationErrors({
                    ...validationErrors,
                    land: (refLand.current!.value.length < 1 || refLand.current!.value.length > 30)
                        ? "Das Land ist inkorrekt" : undefined
                });
                break;

            case "tage":
                setValidationErrors({
                    ...validationErrors,
                    oeffnungszeiten: (refTage.current!.value.length < 1 || refTage.current!.value.length > 30 || refUhrzeiten.current!.value.length < 1 || refUhrzeiten.current!.value.length > 30)
                        ? "Die Tage und/oder Die Uhrzeiten sind inkorrekt" : undefined
                });
                break;

            case "uhrzeiten":
                setValidationErrors({
                    ...validationErrors,
                    oeffnungszeiten: (refTage.current!.value.length < 1 || refTage.current!.value.length > 30 || refUhrzeiten.current!.value.length < 1 || refUhrzeiten.current!.value.length > 30)
                        ? "Die Tage und/oder Die Uhrzeiten sind inkorrekt" : undefined
                });
                break;
        }
    }

    // Submit
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
                const galerieRes: GalerieResource = {
                    name: refName.current!.value,
                    beschreibung: refBeschreibung.current!.value,
                    strasse: refStrasse.current!.value,
                    hausnummer: refHausnummer.current!.value,
                    plz: refPlz.current!.value,
                    stadt: refStadt.current!.value,
                    land: refLand.current!.value,
                    email: refEmail.current!.value,
                    telefon: refTelefon.current!.value,
                    oeffnungszeiten: [refTage.current!.value, refUhrzeiten.current!.value],
                }

                if (props.galerie) {
                    galerieRes.id = props.galerie.id;
                    const galerieAktualisiert = await putGalerie(galerieRes, refFile.current!.files);
                    if (galerieAktualisiert) {
                        setBenachrichtigung("Galerie im System gespeichert");
                        navigate(`/dashboard/galerie`)
                    } else {
                        setBenachrichtigung("Bearbeitung fehlgeschlagen");
                        window.location.reload();
                    }
                    setShowBenachrichtigung(true);
                } else {
                    const galerieErstellt = await postGalerie(galerieRes, refFile.current!.files);
                    if (galerieErstellt) {
                        setBenachrichtigung("Galerie wurde im System gespeichert");
                        navigate(`/dashboard/galerie`)
                    } else {
                        setBenachrichtigung("Erstellung fehlgeschlagen");
                        window.location.reload();
                    }
                    setShowBenachrichtigung(true);
                }
            } catch (err) {
                // handleError(err)
                alert("nope");
            }
        }
    }

    if (!adminID) {
        return <AdminPage />
    } else {
        return (
            <Fragment>

                <Container fluid className="vh-auto" style={{ paddingRight: "50px", paddingLeft: "50px" }}>
                    <div className="hr p-0 m-0" />
                    <h1 className="display-5 pad-top-4 pad-bottom-2">{pageTitle}</h1>
                    <Form encType="multipart/form-data" onSubmit={handleSubmit} validated={validated}>

                        <h1 className="display-7 fw-bold">
                            Allgemeine Infos
                        </h1>
                        {/* Name */}
                        <Form.Group>
                            <Form.Control
                                // className='fs-3'
                                className={validationErrors.name ? "InputError fs-3" : "InputOK fs-3"}
                                ref={refName}
                                name="name"
                                type="text"
                                defaultValue={props.galerie ? props.galerie.name : undefined} placeholder="Name" onBlur={validate}
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
                            <Form.Control.Feedback type="invalid" className="d-block" >{validationErrors.name}</Form.Control.Feedback>
                        </Form.Group>

                        {/* Beschreibung */}
                        <Form.Group>
                            <Form.Control
                                className={validationErrors.beschreibung ? "InputError fs-3" : "InputOK fs-3"}
                                ref={refBeschreibung}
                                name="beschreibung"
                                type="text" as="textarea"
                                defaultValue={props.galerie ? props.galerie.beschreibung : undefined} placeholder="Beschreibung" onBlur={validate}
                                rows={1}
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
                            <Form.Control.Feedback type="invalid" className="d-block" >{validationErrors.beschreibung}</Form.Control.Feedback>
                        </Form.Group>

                        <h1 className="display-7 fw-bold pt-5">
                            Kontakt
                        </h1>


                        {/* Email */}
                        <Form.Group>
                            <Form.Control
                                // className='fs-3'
                                className={validationErrors.email ? "InputError fs-3" : "InputOK fs-3"}
                                ref={refEmail}
                                name="email"
                                type="email"
                                defaultValue={props.galerie ? props.galerie.email : undefined} placeholder="E-Mail" onBlur={validate}
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
                            <Form.Control.Feedback type="invalid" className="d-block" >{validationErrors.email}</Form.Control.Feedback>
                        </Form.Group>

                        {/* Telefon */}
                        <Form.Group>
                            <Form.Control
                                // className='fs-3'
                                className={validationErrors.telefon ? "InputError fs-3" : "InputOK fs-3"}
                                ref={refTelefon}
                                name="telefon"
                                type="tel"
                                defaultValue={props.galerie ? props.galerie.telefon : undefined} placeholder="Telefon" onBlur={validate}
                                minLength={1}
                                maxLength={20}
                                required
                                style={{
                                    border: '0',
                                    borderBottom: '1px solid black',
                                    borderRadius: '0',
                                }}
                            >
                            </Form.Control>
                            <Form.Control.Feedback type="invalid" className="d-block" >{validationErrors.telefon}</Form.Control.Feedback>
                        </Form.Group>

                        <h1 className="display-7 fw-bold pt-5">
                            Adresse
                        </h1>

                        <Row>
                            <Col md={6}>
                                {/* Strasse */}
                                <Form.Group>
                                    <Form.Control
                                        // className='fs-3'
                                        className={validationErrors.strasse ? "InputError fs-3" : "InputOK fs-3"}
                                        ref={refStrasse}
                                        name="strasse"
                                        type="text"
                                        defaultValue={props.galerie ? props.galerie.strasse : undefined} placeholder="Strasse" onBlur={validate}
                                        minLength={1}
                                        maxLength={50}
                                        required
                                        style={{
                                            border: '0',
                                            borderBottom: '1px solid black',
                                            borderRadius: '0'
                                        }}
                                    >
                                    </Form.Control>
                                    <Form.Control.Feedback type="invalid" className="d-block" >{validationErrors.strasse}</Form.Control.Feedback>
                                </Form.Group>
                            </Col>

                            <Col md={3}>
                                {/* Hausnummer */}
                                <Form.Group>
                                    <Form.Control
                                        // className='fs-3'
                                        className={validationErrors.hausnummer ? "InputError fs-3" : "InputOK fs-3"}
                                        ref={refHausnummer}
                                        name="hausnummer"
                                        type="text"
                                        defaultValue={props.galerie ? props.galerie.hausnummer : undefined} placeholder="Hausnummer" onBlur={validate}
                                        minLength={1}
                                        maxLength={10}
                                        required
                                        style={{
                                            border: '0',
                                            borderBottom: '1px solid black',
                                            borderRadius: '0'
                                        }}
                                    >
                                    </Form.Control>
                                    <Form.Control.Feedback type="invalid" className="d-block" >{validationErrors.hausnummer}</Form.Control.Feedback>
                                </Form.Group>
                            </Col>

                            <Col md={3}>
                                {/* PLZ */}
                                <Form.Group>
                                    <Form.Control
                                        // className='fs-3'
                                        className={validationErrors.plz ? "InputError fs-3" : "InputOK fs-3"}
                                        ref={refPlz}
                                        name="plz"
                                        type="number"
                                        defaultValue={props.galerie ? props.galerie.plz : undefined} placeholder="PLZ" onBlur={validate}
                                        max={99999} // Deustschland: 5 stellig
                                        required
                                        style={{
                                            border: '0',
                                            borderBottom: '1px solid black',
                                            borderRadius: '0'
                                        }}
                                    >
                                    </Form.Control>
                                    <Form.Control.Feedback type="invalid" className="d-block" >{validationErrors.plz}</Form.Control.Feedback>
                                </Form.Group>
                            </Col>

                        </Row>

                        <Row>

                            <Col md={6}>
                                {/* Stadt */}
                                <Form.Group>
                                    <Form.Control
                                        // className='fs-3'
                                        className={validationErrors.stadt ? "InputError fs-3" : "InputOK fs-3"}
                                        ref={refStadt}
                                        name="stadt"
                                        type="text"
                                        defaultValue={props.galerie ? props.galerie.stadt : undefined} placeholder="Stadt" onBlur={validate}
                                        minLength={1}
                                        maxLength={30}
                                        required
                                        style={{
                                            border: '0',
                                            borderBottom: '1px solid black',
                                            borderRadius: '0'
                                        }}
                                    >
                                    </Form.Control>
                                    <Form.Control.Feedback type="invalid" className="d-block" >{validationErrors.stadt}</Form.Control.Feedback>
                                </Form.Group>

                            </Col>

                            <Col md={6}>
                                {/* Land */}
                                <Form.Group>
                                    <Form.Control
                                        // className='fs-3'
                                        className={validationErrors.land ? "InputError fs-3" : "InputOK fs-3"}
                                        ref={refLand}
                                        name="land"
                                        type="text"
                                        defaultValue={props.galerie ? props.galerie.land : undefined} placeholder="Land" onBlur={validate}
                                        minLength={1}
                                        maxLength={30}
                                        required
                                        style={{
                                            border: '0',
                                            borderBottom: '1px solid black',
                                            borderRadius: '0'
                                        }}
                                    >
                                    </Form.Control>
                                    <Form.Control.Feedback type="invalid" className="d-block" >{validationErrors.land}</Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                        </Row>

                        <h1 className="display-7 fw-bold pt-5">
                            Öffnungszeiten
                        </h1>

                        {/* Öffnungszeiten */}
                        <Row>
                            {/* Tage */}
                            <Col>
                                <Form.Group>
                                    <Form.Control
                                        // className='fs-3'
                                        className="fs-3"
                                        name="tage"
                                        type="text"
                                        ref={refTage}
                                        placeholder="Tage eingeben"
                                        defaultValue={props.galerie ? props.galerie.oeffnungszeiten![0] : undefined} onBlur={validate} // 
                                        minLength={1}
                                        maxLength={30}
                                        // required
                                        style={{
                                            border: '0',
                                            borderBottom: '1px solid black',
                                            borderRadius: '0'
                                        }}
                                    >
                                    </Form.Control>
                                    <Form.Control.Feedback type="invalid" className="d-block" >{validationErrors.oeffnungszeiten}</Form.Control.Feedback>
                                </Form.Group>
                            </Col>

                            {/* Uhrzeiten */}
                            <Col>
                                <Form.Group>
                                    <Form.Control
                                        // className='fs-3'
                                        className="fs-3"
                                        name="uhrzeiten"
                                        type="text"
                                        ref={refUhrzeiten}
                                        placeholder="Uhrzeiten eingeben"
                                        defaultValue={props.galerie ? props.galerie.oeffnungszeiten![1] : undefined} onBlur={validate} // 
                                        minLength={1}
                                        maxLength={30}
                                        // required
                                        style={{
                                            border: '0',
                                            borderBottom: '1px solid black',
                                            borderRadius: '0'
                                        }}
                                    >
                                    </Form.Control>
                                    {/* <Form.Control.Feedback type="invalid" className="d-block" ></Form.Control.Feedback> */}
                                </Form.Group>
                            </Col>
                        </Row>

                        <h1 className="display-7 fw-bold pt-5">
                            Bilder
                        </h1>

                        <Form.Group>
                            <Form.Control style={{ borderRadius: '0' }}
                                className="fs-3"
                                name="bilder"
                                type="file"
                                multiple
                                ref={refFile}
                            // defaultValue={props.galerie ? props.galerie.email : undefined}  onBlur={validate} // 
                            // required
                            // style={{
                            //     border: '0',
                            //     borderBottom: '4px solid #6D23E7',
                            //     borderRadius: '0'
                            // }}
                            >
                            </Form.Control>
                            {/* <Form.Control.Feedback type="invalid" className="d-block" ></Form.Control.Feedback> */}
                        </Form.Group>

                        {/* https://codepen.io/OptimalLearner/pen/QWMGyZj */}
                        {/* <Form.Group className="upload-files-container"
                        style={{
                            width: '100%',
                            borderRadius: '40px',
                            padding: '30px 60px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexDirection: 'column',
                        }}
                    >
                        <div className="drag-file-area"
                            style={{
                                border: '2px dashed #6D23E7',
                                borderRadius: '40px',
                                margin: '10px 0 15px',
                                padding: '30px 50px',
                                width: '100%',
                                height: '350px',
                                textAlign: 'center',

                            }}
                        >
                            <h3 className="dynamic-message">
                                Dateien ziehen und ablegen
                            </h3>
                            <label className="label">oder
                                <span className="browse-files">
                                    <input type="file" multiple name="bilder" ref={refFile} className="default-file-input" style={{ opacity: '10' }} />
                                    <span>Dateien</span>
                                    <span className="browse-files-text" style={{ cursor: 'pointer', color: '#6D23E7' }}>durchsuchen</span>
                                </span>
                            </label>
                        </div>
                        <div className="file-block">

                        </div>

                    </Form.Group> */}

                        {/* Submit */}

                        <Form.Group className="pt-5 pad-bottom-3">
                            <Row>
                                <Col xs="auto">
                                    {props.galerie ?
                                        <Button style={{ borderRadius: '0', borderColor: 'black', backgroundColor: '#FAFF00', color: 'black' }} size='lg' type="submit">
                                            Aktualisieren
                                        </Button>
                                        :
                                        <Button style={{ borderRadius: '0', borderColor: 'black', backgroundColor: '#FAFF00', color: 'black' }} size='lg' type="submit">
                                            Erstellen
                                        </Button>
                                    }
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