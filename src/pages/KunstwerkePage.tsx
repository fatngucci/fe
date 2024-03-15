import { Col, Container, Dropdown, Row } from "react-bootstrap";
import Card from "../components/Card";
import { useState, useEffect } from "react";
import { getKunstwerke } from "../backend/apidavid";
import { GalerienResource, KunstwerkeResource } from "../components/Resources";
import { getGalerien } from "../backend/api";
import LoadingIndicator from "../components/LoadingIndicator";
import Kunstwerk from "../components/Kunstwerk";
import NewKunstwerk from "../components/NewKunstwerk";

export default function GetKunstwerkePage() {
    const [galerieText, setGalerieText] = useState('Galerien');
    const [kunstwerkArt, setKunstwerkArtText] = useState<string | undefined>('Kunstwerk Arten');
    const [kunstwerke, setKunstwerke] = useState<KunstwerkeResource | null>();
    const [galerien, setGalerien] = useState<GalerienResource>();
    const [filterGalerieId, setFilterGalerieId] = useState<string | undefined>();
    const [filterTyp, setFilterTyp] = useState<string | undefined>();
    const [visibleImgs, setVisibleImgs] = useState(6);
    const [button, setButton] = useState(true);

    const handelButtonClick = () => {
        setVisibleImgs(visibleImgs + 6);
        const kLength = kunstwerke?.kunstwerke.length;

        if (kLength) {
            if (visibleImgs >= kLength - 6) {
                setButton(false);
            }
        }
    }

    async function handleGalerieClick(index?: number) {
        if (index || index! >= 0) {
            const galerie = galerien!.galerien[index!];
            const kResource = await getKunstwerke(galerie.id, filterTyp);
            setKunstwerke(kResource);
            setGalerieText(galerie.name);
            setFilterGalerieId(galerie.id!);
        } else {
            const kresource = await getKunstwerke(undefined, filterTyp);
            setKunstwerke(kresource);
            setGalerieText("Alle Galerien");
            setFilterGalerieId(undefined);
        }
    }

    async function handleKunstwerkeClick(kunstwerkArt?: string) {
        if (kunstwerkArt) {
            const kresource = await getKunstwerke(filterGalerieId, kunstwerkArt);
            setKunstwerke(kresource);
            setKunstwerkArtText(kunstwerkArt);
            setFilterTyp(kunstwerkArt);
        } else {
            const kresource = await getKunstwerke(filterGalerieId, undefined);
            setKunstwerke(kresource);
            setKunstwerkArtText("Alle Kunstwerk Arten");
            setFilterTyp(undefined);
        }
    }

    async function load() {
        try {
            if (kunstwerke?.kunstwerke.length === 0) {
                setButton(false);
            }

            const kresource = await getKunstwerke();
            setKunstwerke(kresource);

            const galerienResource = await getGalerien();
            setGalerien(galerienResource);

            window.scrollTo(
                {
                    top: 0,
                    behavior: "smooth",
                }
            )

        } catch (err) {
            setKunstwerke(null);
            // handleError(err);
        }
    }

    useEffect(() => { load(); }, []);

    if (!galerien || !kunstwerke) {
        return <LoadingIndicator />
    }

    return (
        <Container fluid>
            <div className='hr m-0 p-0'> </div>
            {/* Filter */}
            <Row className="pad-left-2 pad-right-2">
                <h1 className="display-4 pad-top-4 pad-bottom-3 mb-0">Kuratierte Kunstwerke</h1>
                <Col xs={"auto"} >
                    <Dropdown>
                        <Dropdown.Toggle variant="outline-black rounded-0" id="dropdown-basic">
                            {galerieText}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item onClick={() => handleGalerieClick()}>
                                Alle Galerien
                            </Dropdown.Item>
                            <Dropdown.Divider />

                            {galerien?.galerien.map(
                                (g, galerieIndex) =>
                                    <Dropdown.Item key={galerieIndex} onClick={() => handleGalerieClick(galerieIndex++)}>
                                        {g.name}
                                    </Dropdown.Item>
                            )}
                        </Dropdown.Menu>
                    </Dropdown>
                </Col>
                <Col xs={"auto"}>
                    <Dropdown>
                        <Dropdown.Toggle variant="outline-black rounded-0" id="dropdown-basic">
                            {(kunstwerkArt === "Gemaelde") ? "Gemälde" : kunstwerkArt}
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item onClick={() => handleKunstwerkeClick()}>
                                Alle Kunstwerk Arten
                            </Dropdown.Item>
                            <Dropdown.Divider />
                            <Dropdown.Item onClick={() => handleKunstwerkeClick('Gemaelde')}>
                                Gemälde
                            </Dropdown.Item>
                            <Dropdown.Item onClick={() => handleKunstwerkeClick('Skulptur')}>
                                Skulptur
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Col>
            </Row>
            {/* Kunstwerke */}
            <Row className="pad-bottom-2 pad-left-2 pad-right-2">
                {
                    kunstwerke.kunstwerke.length <= 1
                        ? <Container className="vh-auto"><p className="display-7 pad-top-2 pad-bottom-2">Keine Kunstwerke vorhanden</p></Container>
                        :
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
        </Container >
    );
}
