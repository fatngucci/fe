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
        return preis.toLocaleString('de-DE') + ",00 €";
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
        // Image Card
        <Row style={{ display: "flex", justifyContent: "center" }}>
            <Row>
                <Image className="cropped" src={imgUrl} style={{ cursor: "pointer" }} onClick={() => navigate(`/kunstwerk/${props.kunstwerkResource.id}`)} />
            </Row>
            <Row className="pt-4">
                <Col >
                    <div className="fs-5"><strong>{props.kunstwerkResource?.titel}</strong></div>
                    <div className="fs-5" style={{ fontStyle: "italic" }}>{kuenstler?.name}</div>
                    <div className="fs-5">{angepassterPreis()}</div>
                </Col>
                <Col className="text-end">
                    <Button variant="outline-black rounded-0 px-4" onClick={() => navigate(`/galerie/${galerie?.id}`)}>
                        {galerie?.name}
                    </Button>
                </Col>
            </Row>
        </Row>
    )

}