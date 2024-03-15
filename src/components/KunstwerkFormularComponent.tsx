import { Container, Form, Button, Col, Row } from "react-bootstrap";
import { useAdminIDContext } from "./AdminIDContext";
import { KuenstlerinnenResource, KunstwerkResource, ValidationMessages } from "./Resources";
import { Fragment, useEffect, useRef, useState } from "react";
import Benachrichtigung from "./Benachrichtigung";
import { postKunstwerk, putKunstwerk } from "../backend/apidavid";
import { getAlleKuenstler } from "../backend/apidavid";
import { GalerienResource } from "./Resources";
import { useNavigate } from "react-router-dom";
import { getGalerien } from "../backend/api";

export default function KunstwerkForm(props: { kunstwerk: KunstwerkResource | undefined }) {
    // Benachrichtigung
    const [benachrichtigung, setBenachrichtigung] = useState<string>("");
    const [showBenachrichtigung, setShowBenachrichtigung] = useState<boolean>(false);

    // Validierung
    const [validationErrors, setValidationErrors] = useState<ValidationMessages<KunstwerkResource>>({});
    const [validated, setValidated] = useState(false);

    const [kuenstlerinnen, setKuenstlerinnen] = useState<KuenstlerinnenResource | null>();
    const [galerien, setGalerien] = useState<GalerienResource | null>();
    const { adminID } = useAdminIDContext();
    // const navigate = useNavigate();

    // useRef für die Werte
    const refTitel = useRef<HTMLInputElement>(null);
    const refKuenstlerID = useRef<HTMLSelectElement>(null);
    const refPreis = useRef<HTMLInputElement>(null);
    const refBeschreibung = useRef<HTMLTextAreaElement>(null);
    const refGalerie = useRef<HTMLSelectElement>(null);
    const refErscheinung = useRef<HTMLInputElement>(null);
    const refUrsprung = useRef<HTMLInputElement>(null);
    const refVerkauft = useRef<HTMLInputElement>(null);
    const refBilder = useRef<HTMLInputElement>(null);
    const refTyp = useRef<HTMLSelectElement>(null);

    const refLaenge = useRef<HTMLInputElement>(null);
    const refBreite = useRef<HTMLInputElement>(null);
    const refHoehe = useRef<HTMLInputElement>(null);
    const refMaterial = useRef<HTMLInputElement>(null);
    const refTechnik = useRef<HTMLInputElement>(null);
    const refGewicht = useRef<HTMLInputElement>(null);

    const navigate = useNavigate();


    let pageTitle = "Kunstwerk erstellen";

    let cancelButton =
        <Button style={{ borderRadius: '0', borderColor: 'black', backgroundColor: 'white', color: 'black' }} size='lg' onClick={() => navigate("/dashboard/kunstwerk")}>
            Abbrechen
        </Button>;

    if (props.kunstwerk) {
        pageTitle = "Kunstwerk bearbeiten"
        cancelButton =
            <Button style={{ borderRadius: '0', borderColor: 'black', backgroundColor: 'white', color: 'black' }} size='lg' onClick={() => navigate("/dashboard/kunstwerk")}>
                Abbrechen
            </Button>;
    }

    function validate(e: React.FocusEvent<HTMLInputElement>) { // FocusEventHandler

        const numRegEx = /^[0-9]+$/;

        switch (e.target.name) {
            case "titel":
                setValidationErrors({
                    ...validationErrors,
                    titel: (refTitel.current!.value.length < 3 || refTitel.current!.value.length > 60)
                        ? "Der Titel des Kunstwerkes muss zwischen 3 und 60 Buchstaben enthalten." : undefined
                });
                break;
            // case "kuenstlerID":
            //     setValidationErrors({
            //         ...validationErrors,
            //         kuenstlerID: (refKuenstlerID.current!.value.length < 3 || refKuenstlerID.current!.value.length > 60)
            //             ? "KuenstlerID.." : undefined
            //     });
            //     if (validationErrors.kuenstlerID) e.currentTarget.setCustomValidity(validationErrors.kuenstlerID!);
            //     break;
            case "preis":
                setValidationErrors({
                    ...validationErrors,
                    preis: (refPreis.current!.value.length < 1 || refPreis.current!.value.length > 12 || !numRegEx.test(refPreis.current!.value))
                        ? "Der Preis des Kunstwerkes muss eine Zahl und zwischen 1 und 12 Ziffern lang sein." : undefined
                });
                break;
            case "beschreibung":
                setValidationErrors({
                    ...validationErrors,
                    beschreibung: (refBeschreibung.current!.value.length < 15 || refBeschreibung.current!.value.length > 500)
                        ? "Die Beschreibung des Kunstwerkes muss zwischen 15 und 500 Buchstaben enthalten." : undefined
                });
                break;
            // case "galerieID":
            //     setValidationErrors({
            //         ...validationErrors,
            //         galerieID: (refGalerie.current!.value.length < 3 || refGalerie.current!.value.length > 60)
            //             ? "GalerieID..." : undefined
            //     });
            //     break;
            case "erscheinung":
                setValidationErrors({
                    ...validationErrors,
                    erscheinung: (refErscheinung.current!.value.length < 4 || refErscheinung.current!.value.length > 4 || !numRegEx.test(refErscheinung.current!.value))
                        ? "Das Erscheinungsjahr des Kunstwerkes muss 4 Ziffern lang sein." : undefined
                });
                break;
            case "ursprung":
                setValidationErrors({
                    ...validationErrors,
                    ursprung: (refUrsprung.current!.value.length < 3 || refUrsprung.current!.value.length > 60)
                        ? "Der Ursprung des Kunstwerkes muss zwischen 3 und 60 Buchstaben enthalten." : undefined
                });
                break;
            case "verkauft":
                setValidationErrors({
                    ...validationErrors,
                    verkauft: (refVerkauft.current!.checked === true || refVerkauft.current!.checked === false)
                        ? "Verkauft..." : undefined
                });
                break;
            // case "bilder":
            //     setValidationErrors({
            //         ...validationErrors,
            //         bilder: (refTitel.current!.value.length < 3 || refTitel.current!.value.length > 60)
            //             ? "Der Titel des Kunstwerk muss zwischen 3 und 60 Buchstaben enthalten." : undefined
            //     });
            //     break;
            // case "typ":
            //     setValidationErrors({
            //         ...validationErrors,
            //         typ: (refTyp.current!.value.length < 3 || refTyp.current!.value.length > 60)
            //             ? "Der Typ des Kunstwerkes muss zwischen 3 und 60 Buchstaben enthalten." : undefined
            //     });
            //     break;
            case "laenge":
                setValidationErrors({
                    ...validationErrors,
                    laenge: (refLaenge.current!.value.length < 1 || refLaenge.current!.value.length > 3 || !numRegEx.test(refLaenge.current!.value))
                        ? "Die Länge des Kunstwerkes muss zwischen 1 und 3 Ziffern lang sein." : undefined
                });
                break;
            case "breite":
                setValidationErrors({
                    ...validationErrors,
                    breite: (refBreite.current!.value.length < 1 || refBreite.current!.value.length > 3 || !numRegEx.test(refBreite.current!.value))
                        ? "Die Breite des Kunstwerkes muss zwischen 1 und 3 Ziffern lang sein." : undefined
                });
                break;
            case "hoehe":
                setValidationErrors({
                    ...validationErrors,
                    hoehe: (refHoehe.current!.value.length < 1 || refHoehe.current!.value.length > 3 || !numRegEx.test(refHoehe.current!.value))
                        ? "Die Höhe des Kunstwerkes muss zwischen 1 und 3 Ziffern lang sein." : undefined
                });
                break;
            case "material":
                setValidationErrors({
                    ...validationErrors,
                    material: (refMaterial.current!.value.length < 3 || refMaterial.current!.value.length > 60)
                        ? "Das Material des Kunstwerkes muss zwischen 3 und 60 Buchstaben enthalten." : undefined
                });
                break;
            case "technik":
                setValidationErrors({
                    ...validationErrors,
                    technik: (refTechnik.current!.value.length < 3 || refTechnik.current!.value.length > 60)
                        ? "Die Technik des Kunstwerkes muss zwischen 3 und 60 Buchstaben enthalten." : undefined
                });
                break;
            case "gewicht":
                setValidationErrors({
                    ...validationErrors,
                    gewicht: (refGewicht.current!.value.length < 1 || refGewicht.current!.value.length > 4 || !numRegEx.test(refGewicht.current!.value))
                        ? "Das Gewicht des Kunstwerkes muss zwischen 1 und 4 Ziffern lang sein." : undefined
                });
                break;
        }
    }

    function validateSelected(e: React.FocusEvent<HTMLSelectElement>) {
        switch (e.target.name) {
            case "typ":
                setValidationErrors({
                    ...validationErrors,
                    typ: (!refTyp.current!.value)
                        ? "Bitte wähle einen Typen des Kunstwerkes aus." : undefined
                });
                break;
            case "kuenstlerID":
                setValidationErrors({
                    ...validationErrors,
                    kuenstlerID: (!refKuenstlerID.current!.value)
                        ? "Bitte wähle einen Künstler aus." : undefined
                });
                break;
            case "galerieID":
                setValidationErrors({
                    ...validationErrors,
                    galerieID: (!refGalerie.current!.value)
                        ? "Bitte wähle eine Galerie aus." : undefined
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
                const kunstwerkRes: KunstwerkResource = {
                    titel: refTitel.current!.value,
                    kuenstlerID: refKuenstlerID.current!.value,
                    preis: parseInt(refPreis.current!.value), //.valueAsNumber,
                    beschreibung: refBeschreibung.current!.value,
                    galerieID: refGalerie.current!.value,
                    erscheinung: parseInt(refErscheinung.current!.value),
                    ursprung: refUrsprung.current!.value,
                    verkauft: refVerkauft.current!.checked,
                    // bilder: refBilder.current!.files,
                    typ: refTyp.current!.value,

                    laenge: parseInt(refLaenge.current!.value),
                    breite: parseInt(refBreite.current!.value),
                    hoehe: parseInt(refHoehe.current!.value),
                    material: refMaterial.current!.value,
                    technik: refTechnik.current!.value,
                    gewicht: parseInt(refGewicht.current!.value),
                }

                if (props.kunstwerk) {
                    kunstwerkRes.id = props.kunstwerk.id;
                    const kunstwerkAktualisiert = await putKunstwerk(kunstwerkRes, refBilder.current!.files);
                    if (kunstwerkAktualisiert) {
                        setBenachrichtigung("Kunstwerk im System gespeichert");
                        // navigate(`/galerie/${galerieRes.id}`)
                        navigate('/dashboard/kunstwerk')
                    } else {
                        setBenachrichtigung("Bearbeitung fehlgeschlagen");
                    }
                    setShowBenachrichtigung(true);
                } else {
                    const kunstwerkErstellt = await postKunstwerk(kunstwerkRes, refBilder.current!.files);
                    if (kunstwerkErstellt) {
                        setBenachrichtigung("Kunstwerk wurde im System gespeichert");
                        // navigate(`/galerien`)
                        navigate('/dashboard/kunstwerk')
                    } else {
                        setBenachrichtigung("Erstellung fehlgeschlagen");
                    }
                    setShowBenachrichtigung(true);
                }
            } catch (err) {
                // handleError(err)
                alert(err);
            }
        }
    }

    async function load() {
        try {
            const kuenstlerinnen = await getAlleKuenstler();
            setKuenstlerinnen(kuenstlerinnen);

            const galerien = await getGalerien();
            setGalerien(galerien);
        } catch (err) {
            setKuenstlerinnen(null);
            setGalerien(null);
        }
    }

    useEffect(() => { load(); }, []);

    if (!adminID) {
        return (
            <Container>
                <h1>Zutritt zu dieser Seite nicht erlaubt.</h1>
            </Container>
        )
    } else {
        return (
            <Fragment>
                <Container fluid style={{ paddingRight: "50px", paddingLeft: "50px" }}>
                    <div className="hr p-0 m-0" />
                    <h1 className="display-5 pad-top-4 pad-bottom-2">{pageTitle}</h1>
                    <Form encType="multipart/form-data" className="" onSubmit={handleSubmit} validated={validated}>
                        <h1 className="display-7 fw-bold">Art des Kunstwerks</h1>

                        {/* Typ */}
                        <Form.Group className="pad-bottom-1">
                            {/* {props.kunstwerk ? <Form.Label className="fs-3 pt-3">Art</Form.Label> : undefined} */}
                            <Form.Select
                                // className='fs-3'
                                className={validationErrors.typ ? "InputError fs-3" : "InputOK fs-3"}
                                ref={refTyp}
                                name="typ"
                                // type="text"
                                defaultValue={props.kunstwerk ? props.kunstwerk.typ : undefined} placeholder="Typ" onBlur={validateSelected}
                                // minLength={3}
                                // maxLength={60}
                                required
                                style={{
                                    border: '0',
                                    borderBottom: '1px solid black',
                                    borderRadius: '0'
                                }}
                            >
                                <option value="Gemaelde">Gemälde</option>
                                <option value="Skulptur">Skulptur</option>
                            </Form.Select>
                            <Form.Control.Feedback type="invalid" className="d-block" >{validationErrors.typ}</Form.Control.Feedback>
                        </Form.Group>

                        <h1 className="display-7 fw-bold">Kunstwerk</h1>

                        {/* Titel */}
                        <Form.Group >
                            <Form.Control
                                // className='fs-3'
                                className={validationErrors.titel ? "InputError fs-3" : "InputOK fs-3"}
                                ref={refTitel}
                                name="name"
                                type="text"
                                defaultValue={props.kunstwerk ? props.kunstwerk.titel : undefined} placeholder="Titel" onBlur={validate}
                                minLength={3}
                                maxLength={60}
                                required
                                style={{
                                    border: '0',
                                    borderBottom: '1px solid black',
                                    borderRadius: '0'
                                }}
                            >
                            </Form.Control>
                            <Form.Control.Feedback type="invalid" className="d-block" >{validationErrors.titel}</Form.Control.Feedback>
                        </Form.Group>

                        {/* Beschreibung */}
                        <Form.Group>
                            <Form.Control
                                // className='fs-3'
                                className={validationErrors.beschreibung ? "InputError fs-3" : "InputOK fs-3"}
                                ref={refBeschreibung}
                                name="beschreibung"
                                type="text" as="textarea"
                                defaultValue={props.kunstwerk ? props.kunstwerk.beschreibung : undefined} placeholder="Beschreibung" onBlur={validate}
                                minLength={15}
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

                        <Row>
                            <Col>
                                {/* Erscheinung */}
                                <Form.Group>
                                    <Form.Control
                                        // className='fs-3'
                                        className={validationErrors.erscheinung ? "InputError fs-3" : "InputOK fs-3"}
                                        ref={refErscheinung}
                                        name="erscheinung"
                                        type="text"
                                        defaultValue={props.kunstwerk ? props.kunstwerk.erscheinung : undefined} placeholder="Erscheinung" onBlur={validate}
                                        minLength={4}
                                        maxLength={4}
                                        required
                                        style={{
                                            border: '0',
                                            borderBottom: '1px solid black',
                                            borderRadius: '0'
                                        }}
                                    >
                                    </Form.Control>
                                    <Form.Control.Feedback type="invalid" className="d-block" >{validationErrors.erscheinung}</Form.Control.Feedback>
                                </Form.Group>
                            </Col>

                            <Col>
                                {/* Ursprung */}
                                <Form.Group>
                                    <Form.Control
                                        // className='fs-3'
                                        className={validationErrors.ursprung ? "InputError fs-3" : "InputOK fs-3"}
                                        ref={refUrsprung}
                                        name="ursprung"
                                        type="text"
                                        defaultValue={props.kunstwerk ? props.kunstwerk.ursprung : undefined} placeholder="Ursprung" onBlur={validate}
                                        minLength={3}
                                        maxLength={60}
                                        required
                                        style={{
                                            border: '0',
                                            borderBottom: '1px solid black',
                                            borderRadius: '0'
                                        }}
                                    >
                                    </Form.Control>
                                    <Form.Control.Feedback type="invalid" className="d-block" >{validationErrors.ursprung}</Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                        </Row>

                        {/* Preis */}
                        <Form.Group>
                            <Form.Control
                                // className='fs-3'
                                className={validationErrors.preis ? "InputError fs-3" : "InputOK fs-3"}
                                ref={refPreis}
                                name="preis"
                                type="text"
                                defaultValue={props.kunstwerk ? props.kunstwerk.preis : undefined} placeholder="Preis" onBlur={validate}
                                minLength={1}
                                maxLength={12}
                                required
                                style={{
                                    border: '0',
                                    borderBottom: '1px solid black',
                                    borderRadius: '0'
                                }}
                            >
                            </Form.Control>
                            <Form.Control.Feedback type="invalid" className="d-block" >{validationErrors.preis}</Form.Control.Feedback>
                        </Form.Group>

                        <h1 className="display-7 fw-bold pt-5">Künstler und Galerie</h1>

                        {/* KuenstlerID */}
                        <Form.Group>
                            <Form.Select
                                // className='fs-3'
                                className={validationErrors.kuenstlerID ? "InputError fs-3" : "InputOK fs-3"}
                                ref={refKuenstlerID}
                                name="kuenstlerID"
                                // type="text"
                                defaultValue={props.kunstwerk ? props.kunstwerk.kuenstlerID : undefined} placeholder="KunstlerID" onBlur={validateSelected}
                                // minLength={3}
                                // maxLength={60}
                                // required
                                style={{
                                    border: '0',
                                    borderBottom: '1px solid black',
                                    borderRadius: '0'
                                }}
                            >
                                {kuenstlerinnen?.kuenstlerinnen.map(
                                    (k) =>
                                        <option value={k.id}>{k.name}</option>
                                )}
                            </Form.Select>
                            <Form.Control.Feedback type="invalid" className="d-block" >{validationErrors.kuenstlerID}</Form.Control.Feedback>
                        </Form.Group>

                        {/* GalerieID */}
                        <Form.Group>
                            <Form.Select
                                // className='fs-3'
                                className={validationErrors.galerieID ? "InputError fs-3" : "InputOK fs-3"}
                                ref={refGalerie}
                                name="galerieID"
                                // type="text"
                                defaultValue={props.kunstwerk ? props.kunstwerk.galerieID : undefined} placeholder="GalerieID" onBlur={validateSelected}
                                // minLength={3}
                                // maxLength={60}
                                // required
                                style={{
                                    border: '0',
                                    borderBottom: '1px solid black',
                                    borderRadius: '0'
                                }}
                            >
                                {galerien?.galerien.map(
                                    (g) =>
                                        <option value={g.id}>{g.name}</option>
                                )}
                            </Form.Select>
                            <Form.Control.Feedback type="invalid" className="d-block" >{validationErrors.galerieID}</Form.Control.Feedback>
                        </Form.Group>

                        {/* Verkauft */}
                        <Form.Group>
                            <h1 className="display-7 fw-bold pt-5">Verkauft</h1>
                            <Form.Check
                                // formNoValidate
                                // required
                                className='fs-3'
                                ref={refVerkauft}
                                name="verkauft"
                                type="switch"
                                defaultChecked={props.kunstwerk?.verkauft ? true : false}
                            >
                            </Form.Check>
                        </Form.Group>

                        <h1 className="display-7 fw-bold pt-5">Maße und Sonstiges</h1>

                        {/* Laenge */}
                        <Row>
                            <Col>
                                <Form.Group>
                                    <Form.Control
                                        // className='fs-3'
                                        className={validationErrors.laenge ? "InputError fs-3" : "InputOK fs-3"}
                                        ref={refLaenge}
                                        name="laenge"
                                        type="text"
                                        defaultValue={props.kunstwerk ? props.kunstwerk.laenge : undefined} placeholder="Länge" onBlur={validate}
                                        minLength={1}
                                        maxLength={3}
                                        required
                                        style={{
                                            border: '0',
                                            borderBottom: '1px solid black',
                                            borderRadius: '0'
                                        }}
                                    >
                                    </Form.Control>
                                    <Form.Control.Feedback type="invalid" className="d-block" >{validationErrors.laenge}</Form.Control.Feedback>
                                </Form.Group>
                            </Col>

                            <Col>
                                {/* Breite */}
                                <Form.Group>
                                    <Form.Control
                                        // className='fs-3'
                                        className={validationErrors.breite ? "InputError fs-3" : "InputOK fs-3"}
                                        ref={refBreite}
                                        name="breite"
                                        type="text"
                                        defaultValue={props.kunstwerk ? props.kunstwerk.breite : undefined} placeholder="Breite" onBlur={validate}
                                        minLength={1}
                                        maxLength={3}
                                        required
                                        style={{
                                            border: '0',
                                            borderBottom: '1px solid black',
                                            borderRadius: '0'
                                        }}
                                    >
                                    </Form.Control>
                                    <Form.Control.Feedback type="invalid" className="d-block" >{validationErrors.breite}</Form.Control.Feedback>
                                </Form.Group>
                            </Col>

                            <Col>
                                {/* Hoehe */}
                                <Form.Group>
                                    <Form.Control
                                        // className='fs-3'
                                        className={validationErrors.hoehe ? "InputError fs-3" : "InputOK fs-3"}
                                        ref={refHoehe}
                                        name="hoehe"
                                        type="text"
                                        defaultValue={props.kunstwerk ? props.kunstwerk.hoehe : undefined} placeholder="Höhe" onBlur={validate}
                                        minLength={1}
                                        maxLength={3}
                                        // required
                                        style={{
                                            border: '0',
                                            borderBottom: '1px solid black',
                                            borderRadius: '0'
                                        }}
                                    >
                                    </Form.Control>
                                    <Form.Control.Feedback type="invalid" className="d-block" >{validationErrors.hoehe}</Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                        </Row>

                        {/* Gewicht */}
                        <Form.Group>
                            <Form.Control
                                // className='fs-3'
                                className={validationErrors.gewicht ? "InputError fs-3" : "InputOK fs-3"}
                                ref={refGewicht}
                                name="gewicht"
                                type="text"
                                defaultValue={props.kunstwerk ? props.kunstwerk.gewicht : undefined} placeholder="Gewicht" onBlur={validate}
                                minLength={1}
                                maxLength={4}
                                // required
                                style={{
                                    border: '0',
                                    borderBottom: '1px solid black',
                                    borderRadius: '0'
                                }}
                            >
                            </Form.Control>
                            <Form.Control.Feedback type="invalid" className="d-block" >{validationErrors.gewicht}</Form.Control.Feedback>
                        </Form.Group>

                        {/* Material */}
                        <Form.Group>
                            <Form.Control
                                // className='fs-3'
                                className={validationErrors.material ? "InputError fs-3" : "InputOK fs-3"}
                                ref={refMaterial}
                                name="material"
                                type="text"
                                defaultValue={props.kunstwerk ? props.kunstwerk.material : undefined} placeholder="Material" onBlur={validate}
                                minLength={3}
                                maxLength={60}
                                // required
                                style={{
                                    border: '0',
                                    borderBottom: '1px solid black',
                                    borderRadius: '0'
                                }}
                            >
                            </Form.Control>
                            <Form.Control.Feedback type="invalid" className="d-block" >{validationErrors.material}</Form.Control.Feedback>
                        </Form.Group>

                        {/* Technik */}
                        <Form.Group>
                            <Form.Control
                                // className='fs-3'
                                className={validationErrors.technik ? "InputError fs-3" : "InputOK fs-3"}
                                ref={refTechnik}
                                name="technik"
                                type="text"
                                defaultValue={props.kunstwerk ? props.kunstwerk.technik : undefined} placeholder="Technik" onBlur={validate}
                                minLength={3}
                                maxLength={60}
                                // required
                                style={{
                                    border: '0',
                                    borderBottom: '1px solid black',
                                    borderRadius: '0'
                                }}
                            >
                            </Form.Control>
                            <Form.Control.Feedback type="invalid" className="d-block" >{validationErrors.technik}</Form.Control.Feedback>
                        </Form.Group>

                        <h1 className="display-7 fw-bold pt-5">Bilder</h1>

                        {/* Bilder */}
                        <Form.Group>
                            <Form.Control
                                className="fs-3"
                                name="bilder"
                                type="file"
                                multiple
                                ref={refBilder}
                            >
                            </Form.Control>
                        </Form.Group>

                        {/* Submit */}
                        <Form.Group className="pt-5 pad-bottom-3">
                            <Row>
                                <Col xs="auto">
                                    {props.kunstwerk ?
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