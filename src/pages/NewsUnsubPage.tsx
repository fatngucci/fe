import { Fragment, useEffect, useRef, useState } from "react";
import { Col, Container, Row, Image, Button, Form } from "react-bootstrap";
import { checkEmail, newsletterAboBeenden, newsletterAbonnieren } from "../backend/api";
import Benachrichtigung from "../components/Benachrichtigung";
import { useNavigate, useParams } from "react-router-dom";
import { newsletterAboBeenden2 } from "../backend/apidavid";



export default function NewsUnsubPage() {


    // Benachrichtigung
    const [benachrichtigung, setBenachrichtigung] = useState<string>("");
    const [showBenachrichtigung, setShowBenachrichtigung] = useState<boolean>(false);

    const params = useParams();
    const mailId = params.mailId!;
    const navigate = useNavigate();


    async function handleClick(e: React.FormEvent) {
        e.preventDefault();

        try {
            const geloescht = await newsletterAboBeenden2(mailId);
            if (geloescht) {
            } else {
                setBenachrichtigung("Beim Versenden ist etwas fehlgeschlagen");
            }
            setShowBenachrichtigung(true);
            setBenachrichtigung("Email vom System gelöscht");
            const timer = setTimeout(() => {
                navigate("/");
            }, 1500);
        }
        catch (err) {
            alert(err);
        }
    }

    useEffect(() => {
        window.scrollTo(
            {
                top: 0,
                behavior: "smooth",
            }
        )
    }, [])

    return (
        <Fragment>

            <Container fluid>
                <Container className="p-5 mt-5 mb-2">
                    <Container className="">
                        <Row className="mb-5">
                            <Row>
                                <h1 className="display-5">
                                    Du willst nicht mehr up-to-date bleiben?
                                </h1>
                                <p className="my-5 fs-4">
                                    Dann drücke einfach auf den Button unten um von uns keine Newsletter Mails mehr zu erhalten.
                                </p>
                            </Row>
                            <Row xs={2} className="py-5 justify-content-md-center">
                            </Row>
                            <Row xs={4} className="justify-content-md-center">
                                <Button style={{ borderRadius: '0', borderColor: 'black', backgroundColor: 'white', color: 'black' }} size='lg' onClick={handleClick} id='admin-login-btn' variant='primary'> Abmelden </Button>
                            </Row>
                        </Row>
                    </Container>
                </Container>
            </Container>
            <Benachrichtigung show={showBenachrichtigung} handleClose={setShowBenachrichtigung} nachricht={benachrichtigung}></Benachrichtigung>
        </Fragment>

    )
}