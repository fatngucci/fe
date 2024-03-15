import { useEffect, useRef, useState } from "react";
import { Button, Col, Container, Row, Image, Form } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { getKuenstler, getKunstwerk, getKunstwerke } from "../backend/apidavid";
import { GalerieResource, KuenstlerResource, KunstwerkResource, KunstwerkeResource, NachrichtResource } from "../components/Resources";
import { galerieKontaktieren, getGalerie, getImageUrl } from "../backend/api";
import LoadingIndicator from "../components/LoadingIndicator";
import Benachrichtigung from "../components/Benachrichtigung";
import Kunstwerk from "../components/Kunstwerk";
import NewKunstwerk from "../components/NewKunstwerk";
import KunstwerkSpinner from "../components/KunstwerkSpinner";

export default function KunstwerkPage() {
    const [kunstwerk, setKunstwerk] = useState<KunstwerkResource | null>();
    const [kunstwerkeKuenstler, setKunstwerkeKuenstler] = useState<KunstwerkResource[] | null>();
    const [kuenstler, setKuenstler] = useState<KuenstlerResource | null>();
    const [kunstlerImgUrl, setKunstlerImgUrl] = useState(require("../assets/imgs/loadingGif.gif"));
    const [imgUrl, setImgUrl] = useState(require("../assets/imgs/loadingGif.gif"));
    const [galerie, setGalerie] = useState<GalerieResource | null>();

    const params = useParams();
    const kunstwerkId = params.kunstwerkId


    // Kontakt Form

    const refName = useRef<HTMLInputElement>(null);
    const refEmail = useRef<HTMLInputElement>(null);
    const refNachricht = useRef<HTMLInputElement>(null);

    async function handleKontakt(e: React.FormEvent) {
        e.preventDefault();

        try {

            const nRes: NachrichtResource = {
                name: refName.current!.value,
                von: refEmail.current!.value,
                galerie: galerie!.name,
                an: galerie!.email,
                titel: kunstwerk!.titel,
                nachricht: refNachricht.current!.value,
            }

            const geschickt = await galerieKontaktieren(nRes);

            if (geschickt) {
                setBenachrichtigung("Die Nachricht wurde versendet. Sie erhalten in kürze eine Bestätigungs E-Mail");
            } else {
                setBenachrichtigung("Beim Versenden ist etwas fehlgeschlagen");
            }
            setShowBenachrichtigung(true);

        } catch (err) {
            alert(err);
        }
    }

    // Toaster Popup

    const [benachrichtigung, setBenachrichtigung] = useState<string>("");
    const [showBenachrichtigung, setShowBenachrichtigung] = useState<boolean>(false);

    async function load() {

        try {
            /* Kunstwerk */
            if (!kunstwerkId) {
                throw new Error("Kunstwerk-ID durch (useParams) nicht gefunden.")
            }
            const kunstwerk = await getKunstwerk(kunstwerkId);
            setKunstwerk(kunstwerk);

            /* Kuenstler */
            if (!kunstwerk.kuenstlerID) {
                throw new Error("Kunstwerk: KuenstlerID nicht vorhanden.")
            }
            const kuenstler = await getKuenstler(kunstwerk.kuenstlerID);
            setKuenstler(kuenstler);

            /* Kuenstler Bilder */
            if (!kuenstler.bilder) {
                throw new Error("Kunstler Bilder nicht vorhanden.")
            }
            let kUrls = [];
            for (let i = 0; i < kuenstler.bilder.length; i++) {
                const url = await getImageUrl("kuenstler", kuenstler.id!, i);
                kUrls[i] = url;
            }
            setKunstlerImgUrl(kUrls);

            /* Kunstwerke von Kuenstler */
            let kunstwerkeVonKuenstler = [];
            const kunstwerke = await getKunstwerke()
            for (let i = 0; i < kunstwerke.kunstwerke.length; i++) {
                const tempKunstwerk = kunstwerke.kunstwerke[i];
                if (tempKunstwerk.kuenstlerID === kuenstler.id &&
                    tempKunstwerk.id !== kunstwerk.id) {
                    kunstwerkeVonKuenstler.push(tempKunstwerk);
                }
            }
            setKunstwerkeKuenstler(kunstwerkeVonKuenstler);

            /* Kunstwerk Bilder */
            if (!kunstwerk.bilder) {
                throw new Error("KuenstlerID zu Kunstwerk nicht vorhanden.")
            }
            const url = await getImageUrl("kunstwerk", kunstwerkId);
            setImgUrl(url);

            /* Galerie */
            if (!kunstwerk.id) {
                throw new Error("KunstwerkID nicht vorhanden.")
            }
            const galerie = await getGalerie(kunstwerk.galerieID)
            setGalerie(galerie);

            window.scrollTo(
                {
                    top: 0,
                    behavior: "smooth",
                }
            )

        } catch (err) {
            setKunstwerk(undefined);
            setKuenstler(null);
            setImgUrl(null);
            setGalerie(null);
        }
    }

    useEffect(() => {

        load();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    function angepassterPreis() {
        const preis = kunstwerk?.preis;
        if (preis) {
            return preis.toLocaleString('de-DE') + ",00 €";
        }
    }

    if (!kunstwerk) return <LoadingIndicator />

    return (
        <>
            <Container fluid>
                <Container fluid>
                    <div className='hr m-0 p-0'> </div>
                    <Row className="pad-left-2 pad-right-2 pad-top-4 pad-bottom-4 mb-0">
                        <Col style={{ maxWidth: "35%", overflow: "hidden" }}>
                            {/* <Image src={imgUrl} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> */}
                            {/* <KunstwerkSpinner kunstwerk={kunstwerk} /> */}
                            {kunstwerk.typ === "Skulptur" ? <KunstwerkSpinner kunstwerk={kunstwerk} /> : <Image src={imgUrl} style={{ width: '100%', height: 'auto', objectFit: 'cover' }} />}
                        </Col>
                        <Col style={{ maxWidth: "65%", paddingLeft: "50px" }}>
                            <h1 className="display-5 pad-bottom-3">{kunstwerk?.titel}</h1>
                            <p className="fs-text">{kunstwerk?.beschreibung}</p>
                            {
                                kunstwerk?.typ === "Skulptur" ?
                                    <p className='fs-text'>
                                        {kunstwerk?.laenge} cm x {kunstwerk?.breite} cm x {kunstwerk?.hoehe} cm • {kunstwerk?.gewicht}kg • {kunstwerk?.erscheinung} • {kunstwerk?.typ}
                                    </p>
                                    :
                                    <p className='fs-text'>
                                        {kunstwerk?.laenge} cm x {kunstwerk?.breite} cm • {kunstwerk?.erscheinung} • {kunstwerk?.typ}
                                    </p>
                            }
                            {
                                kunstwerk?.verkauft ?
                                    <div>
                                        <p className='fs-text fw-bold pad-bottom-3'><del>{angepassterPreis()}</del></p><br />
                                        <a href="#andere-kuenstler" style={{ color: "black", textDecoration: "none" }}>
                                            <div className='button flex justify-content-center' style={{ maxWidth: "300px" }}>
                                                <p>Kunstwerk bereits verkauft</p>
                                            </div>
                                        </a>
                                    </div>
                                    :
                                    <>
                                        <p className='fs-text fw-bold pad-bottom-3'>{angepassterPreis()}</p><br />
                                        <a href="#form" style={{ color: "black", textDecoration: "none" }}>
                                            <div className='button flex justify-content-center'>
                                                Kontakt herstellen
                                            </div>
                                        </a>
                                    </>
                            }
                        </Col>
                    </Row>
                </Container>
            </Container >
            <Container fluid className='bg-primary'>
                <Row className='pad-left-2 pad-right-2 pad-top-4 pad-bottom-4 mb-0'>
                    <Col style={{ maxWidth: "35%", overflow: "hidden" }}>
                        <Image src={kunstlerImgUrl[0]} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </Col>
                    <Col style={{ maxWidth: "65%", paddingLeft: "50px" }}>
                        <h1 className='display-5 text-white pad-bottom-3'>Porträts der Künstler*in</h1>
                        {
                            kuenstler ?
                                <>
                                    <h1 className='fs-3 text-white pad-bottom-1' style={{ fontStyle: "italic" }}>{kuenstler!.name}</h1>
                                    <p className='fs-text text-white pad-bottom-1'>{kuenstler!.beschreibung}</p>
                                </>
                                :
                                <p className='fs-4'>...</p>
                        }
                    </Col>
                </Row>
            </Container>
            {
                kunstwerk.verkauft ?
                    <Container fluid>
                        <Row className="pad-left-2 pad-right-2 pad-top-4 mb-0" id="andere-kuenstler">
                            <h1 className='display-5 pad-bottom-3'>Andere Kunstwerke der Künstler*in</h1>
                            <Row >
                                {
                                    kunstwerkeKuenstler?.map(
                                        (k, i) =>
                                            <Col xs={4} className="pad-bottom-3">
                                                <NewKunstwerk kunstwerkResource={k} index={i} key={k.id}></NewKunstwerk>
                                            </Col>
                                    )
                                }
                            </Row>
                        </Row>
                    </ Container>
                    :
                    <>
                        <Container fluid>
                            <Row className='pad-left-2 pad-right-2 pad-top-4 pad-bottom-4 mb-0' id="form">
                                <h1 className='display-5'>Du hast Interesse an dem Kunstwerk?{<br />}Schreibe uns eine Nachricht</h1>
                                <Col>
                                    <Form className="" onSubmit={handleKontakt}>
                                        <Row className="pad-top-3">
                                            <Col className="px-0">
                                                <Form.Group controlId="exampleForm.ControlInput1">
                                                    <Form.Control className='fs-4' placeholder="Name" ref={refName} required style={{
                                                        border: '0',
                                                        borderBottom: '1px solid #000000',
                                                        borderRadius: '0'
                                                    }} />
                                                    {/* <Form.Control size="lg" type="text" placeholder="Name" /> */}
                                                </Form.Group>
                                            </Col>
                                            <Col style={{ paddingRight: "0px", paddingLeft: "30px" }}>
                                                <Form.Group controlId="exampleForm.ControlInput1">
                                                    <Form.Control className='fs-4' placeholder="E-Mail-Adresse" ref={refEmail} required style={{
                                                        border: '0',
                                                        borderBottom: '1px solid #000000',
                                                        borderRadius: '0'
                                                    }} />
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                        <Row className="pad-top-3">
                                            <Form.Group className="px-0" controlId="exampleForm.ControlTextarea2">
                                                <Form.Control className='fs-4' placeholder="Willst du uns noch etwas mitteilen?" ref={refNachricht} required style={{
                                                    border: '0',
                                                    borderBottom: '1px solid #000000',
                                                    borderRadius: '0'
                                                }} />
                                            </Form.Group>
                                        </Row>
                                        <Row className="pad-top-3">
                                            <Button type="submit" style={{
                                                background: "white",
                                                color: "black",
                                                border: "1px solid black",
                                                borderRadius: "0%",
                                                padding: "1.75em",
                                                maxWidth: "260px",
                                                maxHeight: "80px",
                                                display: "flex",
                                                justifyContent: "center",
                                            }}
                                                className="asd">
                                                Senden
                                            </Button>
                                        </Row>
                                    </Form>
                                </Col>
                            </Row>
                        </Container>
                        <Benachrichtigung show={showBenachrichtigung} handleClose={setShowBenachrichtigung} nachricht={benachrichtigung}></Benachrichtigung>
                    </>
            }
        </>

    )
}