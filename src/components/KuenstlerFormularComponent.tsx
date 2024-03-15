import React, { Fragment } from "react";
import { KuenstlerResource, ValidationMessages } from "./Resources";
import { useAdminIDContext } from "./AdminIDContext";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { postKuenstler, putKuenstler } from "../backend/apidavid";
import { useNavigate } from "react-router-dom";
import NotAllowedPage from "../pages/NotAllowedPage";


interface Props {
    kuenstler?: KuenstlerResource;
}

export default function KuenstlerFormularComponent(
    { kuenstler }: Props
) {

    let pageTitle = "Künstler erstellen";

    let cancelButton =
        <Button style={{ borderRadius: '0', borderColor: 'black', backgroundColor: 'white', color: 'black' }} size='lg' onClick={() => navigate("/dashboard/kuenstler")}>
            Abbrechen
        </Button>;

    if (kuenstler) {
        pageTitle = "Künstler bearbeiten"
        cancelButton =
            <Button style={{ borderRadius: '0', borderColor: 'black', backgroundColor: 'white', color: 'black' }} size='lg' onClick={() => navigate("/dashboard/kuenstler")}>
                Abbrechen
            </Button>;
    }

    const [validationErrors, setValidationErrors] = React.useState<ValidationMessages<KuenstlerResource>>({});
    const [validated, setValidated] = React.useState(false);

    const { adminID, setAdminID } = useAdminIDContext();

    const navigate = useNavigate();

    const refName = React.useRef<HTMLInputElement>(null);
    const refDesc = React.useRef<HTMLTextAreaElement>(null);
    const refFile = React.useRef<HTMLInputElement>(null);

    // async function load() {
    //     if(kuenstler && adminID){
    //         refName.current!.value = kuenstler.name;
    //         refDesc.current!.value = kuenstler.beschreibung;
    //     }
    // }

    // React.useEffect(() => { load(); }, [adminID])

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        const form = e.currentTarget as HTMLFormElement;
        if (!form.checkValidity()) {
            e.stopPropagation();
            return;
        }
        setValidated(true);

        if (!adminID) {
            throw new Error('You are not allowed to do that.')
        }

        const kuenstlerRef = {
            name: refName.current!.value,
            beschreibung: refDesc.current!.value
        } as KuenstlerResource

        if (kuenstler) {
            kuenstlerRef.id = kuenstler.id
            const editedKuenstler = await putKuenstler(kuenstlerRef, refFile.current?.files);
            if (!editedKuenstler) {
                throw new Error('Failed to save kuenstler.')
            } else {
                navigate('/dashboard/kuenstler')
            }
        } else {
            const newKuenstler = await postKuenstler(kuenstlerRef, refFile.current?.files);
            if (!newKuenstler) {
                throw new Error('Failed to create the keunstler.')
            } else {
                navigate('/dashboard/kuenstler')
            }
        }
    }

    function validate(e: React.FocusEvent<HTMLInputElement>) {
        switch (e.target.name) {
            case "name": setValidationErrors({
                ...validationErrors,
                name:
                    (refName.current!.value.length < 3 || refName.current!.value.length > 100) ?
                        "There have to be 3 characters at least and 100 max."
                        :
                        undefined
            }); break;
            case "beschreibung": setValidationErrors({
                ...validationErrors,
                beschreibung:
                    (refDesc.current!.value.length < 5 || refDesc.current!.value.length > 1000) ?
                        "There have to be 5 characters at least and 1000 max."
                        :
                        undefined
            }); break;
        }
    }

    if (!adminID) {
        return <NotAllowedPage />
    }

    return (
        <Fragment>
            <Container fluid className="vh-auto" style={{ paddingRight: "50px", paddingLeft: "50px" }}>
                <div className="hr p-0 m-0" />
                <h1 className="display-5 pad-top-4 pad-bottom-2">{pageTitle}</h1>
                <Form onSubmit={handleSubmit} validated={validated}>
                    <Form.Group className="pad-bottom-1">
                        <Form.Label className="display-7 fw-bold"> Name </Form.Label>
                        <Form.Control
                            className={validationErrors.name ? "InputError fs-3" : "InputOK fs-3"}
                            name="name"
                            ref={refName}
                            type="text"
                            defaultValue={kuenstler ? kuenstler.name : undefined}
                            minLength={3}
                            maxLength={100}
                            onBlur={validate}
                            required
                            style={{
                                border: '0',
                                borderBottom: '1px solid black',
                                borderRadius: '0'
                            }}
                        />
                        <Form.Control.Feedback type="invalid" className="d-block">{validationErrors.name}</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="pad-bottom-1">
                        <Form.Label className="display-7 fw-bold"> Beschreibung </Form.Label>
                        <Form.Control
                            className={validationErrors.beschreibung ? "InputError fs-3" : "InputOK fs-3"}
                            name="beschreibung"
                            ref={refDesc}
                            type="text" as="textarea"
                            defaultValue={kuenstler ? kuenstler.beschreibung : undefined}
                            minLength={5}
                            maxLength={5000}
                            onBlur={validate}
                            required
                            style={{
                                border: '0',
                                borderBottom: '1px solid black',
                                borderRadius: '0'
                            }}
                        />
                        <Form.Control.Feedback type="invalid" className="d-block">{validationErrors.beschreibung}</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="pad-bottom-3">
                        <Form.Control name='bilder' type='file' multiple ref={refFile} className="fs-3" />
                    </Form.Group>
                    <Form.Group className="pad-bottom-3">
                        <Row>
                            <Col xs="auto">
                                {kuenstler ?
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
        </Fragment>
    )
}