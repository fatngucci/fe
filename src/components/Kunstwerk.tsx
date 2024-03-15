import { Button, Col, Row } from "react-bootstrap";
import Image from "react-bootstrap/Image";
import { GalerieResource, KuenstlerResource, KunstwerkResource } from "./Resources";
import { useEffect, useState } from "react";
import { getGalerie, getImageUrl } from "../backend/api";
import { getKuenstler } from "../backend/apidavid";
import { useNavigate } from "react-router";
import LoadingIndicator from "./LoadingIndicator";

export default function Kunstwerk(props: {
    kunstwerkResource: KunstwerkResource,
    index: number
}) {
    const [kuenstler, setKuenstler] = useState<KuenstlerResource | null>();
    const [galerie, setGalerie] = useState<GalerieResource | null>();
    const [imgUrl, setImgUrl] = useState(require("../assets/imgs/loadingGif.gif"));
    const navigate = useNavigate();

    async function load() {
        try {
            const kuenstler = await getKuenstler(props.kunstwerkResource.kuenstlerID);
            setKuenstler(kuenstler);

            const galerie = await getGalerie(props.kunstwerkResource.galerieID);
            setGalerie(galerie);

            if (props.kunstwerkResource.bilder) {
                const url = await getImageUrl("kunstwerk", props.kunstwerkResource.id!, 0);
                setImgUrl(url);
            }
        } catch (err) {
            setKuenstler(null);
            setGalerie(null);
            setImgUrl(null);
        }
    }

    function angepassterPreis() {
        const preis = props.kunstwerkResource.preis;
        return preis.toLocaleString('de-DE');
    }

    useEffect(() => {
        load();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (!kuenstler || !galerie) {
        if (props.index < 1) {
            return <LoadingIndicator />
        }
    }
    return (
        // Bild nach rechts ausgerichtet
        <Row className="my-2 py-5">

            {props.index % 2 === 1 ?
                <Col className='d-flex justify-content-center'>
                    <Image className="cropped" src={imgUrl} onClick={() => navigate(`/kunstwerk/${props.kunstwerkResource.id}`)} />
                </Col>
                :
                undefined
            }
            <Col>
                <Row>
                    <h1 className="display-5 fw-bold pb-4">{props.kunstwerkResource?.titel}</h1>
                    <div className="hr"></div>
                    {
                        props.kunstwerkResource.verkauft ?
                            <i><p className="my-2 fs-4 fw-bold">(Bereits verkauft)</p></i>
                            :
                            undefined
                    }
                    <p className="my-2 fs-4">{props.kunstwerkResource?.beschreibung}</p>
                    <Col>
                        <p className="my-2 fs-4">
                            <strong>{kuenstler?.name}</strong> <br />
                            ({galerie?.name})
                        </p>
                    </Col>
                    <Col>
                        <i><div className="display-7 pt-3 text-end">€ {angepassterPreis()},00</div></i><br />
                    </Col>
                </Row>
                <Row className="mt-5">
                    <Row>
                        {props.index % 2 === 0 ?
                            <Button className='btns-1 py-2 px-4 rounded-pill' size='lg' onClick={() => navigate(`/kunstwerk/${props.kunstwerkResource.id}`)}>
                                Kunstwerk ansehen
                            </Button>
                            :
                            <Button variant="secondary" className='btns-1 py-2 px-4 rounded-pill' size='lg' onClick={() => navigate(`/kunstwerk/${props.kunstwerkResource.id}`)}>
                                Kunstwerk ansehen
                            </Button>
                        }
                    </Row>
                </Row>
            </Col>
            {props.index % 2 === 0 ?
                <Col className='d-flex justify-content-center'>
                    <Image className="cropped" src={imgUrl} onClick={() => navigate(`/kunstwerk/${props.kunstwerkResource.id}`)} />
                </Col>
                :
                undefined
            }
        </Row>
    )

}