import { Fragment, useEffect, useRef, useState } from "react";
import { checkEmail, getImageUrl, getNewsletters, newsletterAboBeenden, newsletterAbonnieren } from "../backend/api";
import { Button, Image, Col, Container, Form, Row } from "react-bootstrap"
import React from "react";
import { NewslettersResource } from "../components/Resources";


export default function NewNewsPage() {

    const refEmail = useRef<HTMLInputElement>(null);
    const [emailImSystem, setEmailImSystem] = useState<boolean>(false);
    const [imgUrl, setImgUrl] = useState<string[] | undefined>(require("../assets/imgs/loadingGif.gif"));

    // Benachrichtigung
    const [benachrichtigung, setBenachrichtigung] = useState<string>("");
    const [showBenachrichtigung, setShowBenachrichtigung] = useState<boolean>(false);

    const [news, setNews] = React.useState<NewslettersResource | null>();

    async function handleCheckEmail(e: React.FocusEvent<HTMLInputElement>) {
        if (e.target.value === "") {
            setEmailImSystem(false)
        } else {
            const emailFound = await checkEmail(e.target.value);
            setEmailImSystem(emailFound);
        }

    }

    async function load() {
        try {
            const newsRes = await getNewsletters();
            setNews(newsRes);

            if (newsRes) {
                let imgs = [];
                for (let i = 0; i < newsRes.newsletters.length; i++) {
                    const url = await getImageUrl("newsletter", newsRes.newsletters[i].id!);
                    imgs[i] = url;
                }
                setImgUrl(imgs);
            }
        } catch (err) {
            setNews(null)
        }
    }

    async function handleAboSubmit(e: React.FormEvent) {
        e.preventDefault();

        try {
            // anmelden
            if (!emailImSystem) {

                const abonniert = await newsletterAbonnieren(refEmail.current!.value);
                if (abonniert) {
                    setBenachrichtigung("Die Nachricht wurde versendet. Sie erhalten in kürze eine Bestätigungs E-Mail");
                    refEmail.current!.value = "";
                    setEmailImSystem(false)
                } else {
                    setBenachrichtigung("Beim Versenden ist etwas fehlgeschlagen");
                }
            }

            // löschen
            else {
                const geloescht = await newsletterAboBeenden(refEmail.current!.value);
                if (geloescht) {
                    setBenachrichtigung("Die Nachricht wurde versendet. Sie erhalten in kürze eine Bestätigungs E-Mail");
                    refEmail.current!.value = "";
                    setEmailImSystem(false)
                } else {
                    setBenachrichtigung("Beim Versenden ist etwas fehlgeschlagen");
                }
            }
            setShowBenachrichtigung(true);

        } catch (err) {
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
        load();
    }, [])

    return (
        <Container fluid className="p-0">
            <Container fluid className="px-5">
                <div className="hr p-0 m-0"></div>
                <Row className="pad-top-4">
                    <Col xs={8}>
                        <p className="fs-2 fw-bold"> Stay in Touch </p>
                        <h1 className="display-4 pad-top-1">
                            Verpasse keine Event und News mehr!
                            Melde dich jetzt für unseren Newsletter an
                            und erhalte regelmäßig Updates direkt in dein Postfach.
                        </h1>
                    </Col>
                </Row>
                <Row>
                    <Col xs={4}>
                        <p className="pad-top-2 fs-4">
                            Deine Privatsphäre liegt uns am Herzen!
                            Wir verwenden deine Daten ausschließlich, um dir den Newsletter zuzusenden.
                            Du kannst dich jederzeit abmelden.
                        </p>
                        <Form onSubmit={handleAboSubmit}>
                            <Form.Group>
                                <Form.Label />
                                <Form.Control className='fs-3' ref={refEmail} placeholder="name@email.com"
                                    required
                                    type="email"
                                    onChange={handleCheckEmail}
                                    style={{
                                        border: '0',
                                        borderBottom: '1px solid black',
                                        borderRadius: '0'
                                    }} />
                                {emailImSystem
                                    ? <Form.Control.Feedback className="d-block" >Diese E-Mail ist im System vorhanden. Sie können sie löschen</Form.Control.Feedback>
                                    : ""
                                }
                            </Form.Group>
                            <Col className="pad-top-3">
                                {emailImSystem
                                    // ? <div className='button text-center'> Löschen </div>
                                    // : <div className='button text-center'> Anmelden </div>
                                    ? <Button type="submit" className='button' style={{
                                        background: "white",
                                        color: "black",
                                        border: "1px solid black",
                                        borderRadius: "0%",
                                        padding: "1.75em",
                                        maxWidth: "260px",
                                        maxHeight: "80px",
                                        display: "flex",
                                        justifyContent: "center",
                                    }}> Löschen </Button>
                                    : <Button type="submit" className='button' style={{
                                        background: "white",
                                        color: "black",
                                        border: "1px solid black",
                                        borderRadius: "0%",
                                        padding: "1.75em",
                                        maxWidth: "260px",
                                        maxHeight: "80px",
                                        display: "flex",
                                        justifyContent: "center",
                                    }}> Anmelden </Button>
                                }
                            </Col>
                            <Col>
                            </Col>
                        </Form>
                    </Col>
                </Row>
            </Container>
            <Container fluid className="px-5 pad-top-4 pad-bottom-4">
                <div className="hr m-0"></div>
                <Row className="pad-top-4">
                    <p className="fs-2 fw-bold"> News </p>
                    {news?.newsletters.map(
                        (n, i) =>
                            <Row className="m-0 px-0 pad-top-3">
                                <Col xs={5} className="d-flex justify-content-start">
                                    <Image className="crop" src={imgUrl![i]} />
                                </Col>
                                <Col xs={6} className="ps-5">
                                    <h1 className='display-4'> {n.ueberschrift} </h1>
                                    {/* <p> {n.createdAt}</p> */}
                                    <p className='fs-4 pad-top-2'> {n.beschreibung} </p>
                                </Col>
                            </Row>
                    )}
                </Row>
            </Container>
        </Container>
    )
}