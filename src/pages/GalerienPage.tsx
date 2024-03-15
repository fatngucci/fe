import React, { useEffect, useState, useRef } from "react";
import { GalerienResource } from "../components/Resources";
import { Container, Row, Image, Col, Button } from "react-bootstrap";
import { getGalerien, getImageUrl } from "../backend/api";
import { Link, useNavigate } from 'react-router-dom';
import LoadingIndicator from "../components/LoadingIndicator";
import { ArrowUpRight } from "react-bootstrap-icons";

export default function GalerienPage() {
    const navigate = useNavigate();
    const [galerien, setGalerien] = React.useState<GalerienResource | null>();
    const [imgUrl, setImgUrl] = useState<string[] | undefined>(require("../assets/imgs/loadingGif.gif"));
    const galerieRefs = useRef<(HTMLElement | null)[]>([]);

    function getURL(galerie: string): string {
        return `https://${galerie}-360.netlify.app/`;
    }

    function scrollToGalerie(index: number) {
        const galerieElement = galerieRefs.current[index];
        if (galerieElement) {
            window.scrollTo({
                top: galerieElement.offsetTop,
                behavior: "smooth",
            });
        }
    }

    async function load() {
        try {
            const galerien = await getGalerien();
            setGalerien(galerien);

            if (galerien) {
                let imgs = [];
                for (let i = 0; i < galerien.galerien.length; i++) {
                    // const img = galerien.galerien[i].bilder![0];
                    const url = await getImageUrl("galerie", galerien.galerien[i].id!);
                    // imgs[i] = img;
                    imgs[i] = url;
                }
                setImgUrl(imgs);
            }

            window.scrollTo(
                {
                    top: 0,
                    behavior: "smooth",
                }
            )

        } catch (err) {
            setImgUrl(undefined);
            setGalerien(null);
        }
    }

    useEffect(() => {
        load();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (!galerien || !imgUrl) {
        return <LoadingIndicator />
    }

    return (
        <Container fluid>
            <div className='hr m-0 p-0' />
            <Row className="pad-left-2 pad-right-2 pad-top-4">
                <h1 className="display-4 pad-bottom-3 mb-0">Unsere aktuellen Ausstellungen</h1>
                <div className="box-container">
                    <div className="box-column">
                        {
                            galerien?.galerien.map(
                                (g, i) =>
                                    <div key={g.id} onClick={() => scrollToGalerie(i)} className="box" style={{ cursor: "pointer" }}>
                                        <div className="box-heading">{g.name}</div>
                                        <div className="box-hr" />
                                        <p className="box-description">{g.beschreibung}</p>
                                    </div>
                            )
                        }
                    </div>
                </div>

            </Row>
            <Row className=" d-flex justify-content-center">
                {
                    galerien?.galerien.map(
                        (g, i) => {
                            return i % 2 === 0 ?
                                /* White */
                                <Row
                                    key={g.id}
                                    id={"galerie" + i}
                                    ref={(ref: HTMLElement) => (galerieRefs.current[i] = ref)}
                                    style={{ paddingLeft: "50px", paddingRight: "50px" }}
                                    className="pad-top-4 pad-bottom-4">
                                    <Col style={{ maxWidth: "40%", overflow: "hidden" }}>
                                        <Image src={imgUrl![i]} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                    </Col>
                                    <Col style={{ maxWidth: "60%", paddingLeft: "58px" }}>
                                        <h1 className="display-5 pad-bottom-3">{g.name}</h1>
                                        <p className="fs-text pad-bottom-3">{g.beschreibung}</p>
                                        <div className='button' onClick={() => navigate(`/galerie/${g.id}`)}>
                                            Mehr Infos zur Galerie
                                        </div>
                                        {/* <a href={getURL(g.name)} target="_blank" rel="noreferrer" style={{ textDecoration: "none", color: "black" }}>
                                            <p className="fs-text" style={{ marginTop: "58px", display: "inline-block" }}>
                                                Zur virtuellen Tour <ArrowUpRight size={20} color="black" />
                                            </p>
                                        </a> */}
                                        <a href={getURL(g.name)} target="_blank" rel="noreferrer" style={{ textDecoration: "none", color: "black" }}>
                                            <p className="fs-text" style={{ marginTop: "58px", display: "inline-block" }}>
                                                Zur virtuellen Tour <ArrowUpRight size={20} color="black" />
                                            </p>
                                        </a>
                                    </Col>
                                </Row>
                                :
                                /* Purple */
                                <Row
                                    key={g.id}
                                    id={"galerie" + i}
                                    ref={(ref: HTMLElement) => (galerieRefs.current[i] = ref)}
                                    style={{ paddingLeft: "50px", paddingRight: "50px", color: "white" }}
                                    className="pad-top-4 pad-bottom-4 bg-primary">
                                    <Col style={{ maxWidth: "40%", overflow: "hidden" }}>
                                        <Image src={imgUrl![i]} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                    </Col>
                                    <Col style={{ maxWidth: "60%", paddingLeft: "58px" }}>
                                        <h1 className="display-5 pad-bottom-3">{g.name}</h1>
                                        <p className="fs-text pad-bottom-3">{g.beschreibung}</p>
                                        <div className='light-button' style={{ border: "1px solid white" }} onClick={() => navigate(`/galerie/${g.id}`)}>
                                            Mehr Infos zur Galerie
                                        </div>
                                        <a href={getURL(g.name)} target="_blank" rel="noreferrer" style={{ textDecoration: "none", color: "white" }}>
                                            <p className="fs-text" style={{ marginTop: "58px", display: "inline-block" }}>
                                                Zur virtuellen Tour <ArrowUpRight size={20} color="white" />
                                            </p>
                                        </a>
                                    </Col>
                                </Row>
                        }
                    )
                }
            </Row>
        </Container >
    )
}