import { useEffect, useState } from "react";
import { Button, Carousel, Col, Container, Row } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { GalerieResource, KunstwerkResource, KunstwerkeResource } from "../components/Resources";
import { getGalerie, getImageUrl } from "../backend/api";
import Image from 'react-bootstrap/Image'
import { getKunstwerke } from "../backend/apidavid";
import LoadingIndicator from "../components/LoadingIndicator";
import NewKunstwerk from "../components/NewKunstwerk";

export default function GaleriePage() {
    const [galerie, setGalerie] = useState<GalerieResource | null>();
    const [kunstwerke, setKunstwerke] = useState<KunstwerkeResource | null>();
    const [imgUrl, setImgUrl] = useState<string[] | null>(require("../assets/imgs/loadingGif.gif"));
    const [visibleImgs, setVisibleImgs] = useState(6);
    const [button, setButton] = useState(true);

    const navigate = useNavigate();
    const params = useParams();
    const galerieId = params.galerieId;

    const handelButtonClick = () => {
        setVisibleImgs(visibleImgs + 6);
        const kLength = kunstwerke?.kunstwerke.length;

        if (kLength) {
            if (visibleImgs >= kLength - 6) {
                setButton(false);
            }
        }
    }

    function getURL(): string {
        return `https://${galerie?.name}-360.netlify.app/`;
    }

    async function load() {
        try {
            // Galerie
            if (!galerieId) {
                throw new Error("Galerie-ID durch (useParams) nicht gefunden.")
            }
            const galerie = await getGalerie(galerieId);
            setGalerie(galerie);

            // Kunstwerk
            const kresource = await getKunstwerke(galerieId);
            setKunstwerke(kresource);

            // Images
            if (!galerie.bilder) {
                throw new Error("Galerie Bilder nicht vorhanden.");
            }
            let urls = [];
            for (let i = 0; i < galerie.bilder.length; i++) {
                const url = await getImageUrl("galerie", galerie.id!, i);
                urls[i] = url;
            }
            setImgUrl(urls);

            if (kunstwerke?.kunstwerke.length === 0) {
                setButton(false);
            }

            window.scrollTo(
                {
                    top: 0,
                    behavior: "smooth",
                }
            )

        } catch (err) {
            setGalerie(null);
            setKunstwerke(null);
            setImgUrl(null);
        }
    }

    useEffect(() => {
        load();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (!kunstwerke || !galerie) {
        return <LoadingIndicator />
    } else {
        return (
            <Container fluid >
                <div className='hr m-0 p-0' />
                <Row
                    style={{ backgroundColor: "#ffffff", paddingLeft: "50px", paddingRight: "50px" }}
                    className="pad-top-4 pad-bottom-4">
                    <Col style={{ maxWidth: "40%", overflow: "hidden" }}>
                        <Image src={imgUrl![0]} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </Col>
                    <Col style={{ maxWidth: "60%", paddingLeft: "58px" }}>
                        <h1 className="display-5 pad-bottom-3">{galerie.name}</h1>
                        <p className="fs-text pad-bottom-1">{galerie.beschreibung}</p>
                        <p className="fs-text pad-bottom-3">Starte die virtuelle Tour, um in die Atmosphäre
                            der Galerie {galerie.name} voll einzutauchen:</p>
                        <a href={getURL()} target="_blank" rel="noreferrer" style={{ textDecoration: "none", color: "black" }}>
                            <div className="button pad-top-3">
                                Zur virtuellen Tour
                            </div>
                        </a>
                    </Col>
                </Row>
                <Row className='bg-primary pad-left-2 pad-right-2 pad-top-4 pad-bottom-4 text-white'>
                    <h1 className="display-5 pad-bottom-2">Erreichbarkeit</h1>
                    <div className="box-container">
                        <div className="box-column">
                            <div className="box" style={{ background: "#6D23E7", border: "1px solid white" }}>
                                <div className='box-heading' style={{ fontSize: "30px" }}>Kontakt</div>
                                <div className="box-hr" style={{ borderTop: "1px solid white" }} />
                                <div className="box-description">
                                    {galerie?.email} <br />
                                    {galerie?.telefon}
                                </div>
                            </div>

                            <div className="box" style={{ background: "#6D23E7", border: "1px solid white" }}>
                                <div className='box-heading' style={{ fontSize: "30px" }}>Öffnungszeiten</div>
                                <div className="box-hr" style={{ borderTop: "1px solid white" }} />
                                <div className="box-description">
                                    {galerie?.oeffnungszeiten ?
                                        <>
                                            {galerie.oeffnungszeiten[0]}
                                            < br />
                                            {galerie.oeffnungszeiten[1]} Uhr
                                        </>
                                        :
                                        <p className="fs-text">Unbekannt</p>
                                    }
                                </div>
                            </div>

                            <div className="box" style={{ background: "#6D23E7", border: "1px solid white" }}>
                                <div className='box-heading' style={{ fontSize: "30px" }}>Adresse</div>
                                <div className="box-hr" style={{ borderTop: "1px solid white" }} />
                                <div className="box-description">
                                    {galerie?.strasse} {galerie?.hausnummer}, <br />
                                    {galerie?.plz} {galerie?.stadt}, <br />
                                    {galerie?.land}
                                </div>
                            </div>
                        </div>
                    </div>
                </Row>
                {kunstwerke?.kunstwerke.length !== 0 ?
                    < Row className="pad-left-2 pad-right-2">
                        <h1 className="display-5 pad-top-4">Ausgestellte Werke</h1>
                        <Row className="pad-bottom-3">
                            {
                                kunstwerke?.kunstwerke.slice(0, visibleImgs)?.map(
                                    (k, i) =>
                                        <Col xs={4} className="pad-top-3">
                                            <NewKunstwerk kunstwerkResource={k} index={i} key={k.id}></NewKunstwerk>
                                        </Col>
                                )
                            }
                        </Row>
                        {button ?
                            <Col className="d-flex justify-content-center pad-bottom-4">
                                <div className="button" onClick={handelButtonClick}>Mehr anzeigen</div>
                            </Col>
                            :
                            undefined
                        }
                    </Row>
                    :
                    undefined
                }
            </Container >
        )
    }
}