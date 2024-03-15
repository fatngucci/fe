import React, { useEffect, useState } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { GalerienResource } from "../components/Resources";
import { deleteGalerie, getGalerien, getImageUrl } from "../backend/api";
import DeleteDialog from "../components/DeleteDialog";
import LoadingIndicator from "../components/LoadingIndicator";


export default function GalerieListPage() {

    const navigate = useNavigate();
    const [galerien, setGalerien] = React.useState<GalerienResource | null>();

    const [galerienImg, setGalerienImg] = useState<string[] | undefined>(require("../assets/imgs/loadingGif.gif"));

    const [showDelete, setShowDelete] = useState(false);

    const [toBeDeleted, setToBeDeleted] = useState<string>("");


    async function load() {
        try {
            const gRes = await getGalerien();
            setGalerien(gRes);

            if (gRes) {
                let imgs = [];
                for (let i = 0; i < gRes.galerien.length; i++) {
                    const url = await getImageUrl("galerie", gRes.galerien[i].id!);
                    imgs[i] = url;
                }
                setGalerienImg(imgs);
            }

            window.scrollTo(
                {
                    top: 0,
                    behavior: "smooth",
                }
            )

        } catch (err) {
            setGalerien(null)
        }
    }

    useEffect(() => { load(); }, [showDelete])

    if (!galerien || !galerienImg) {
        return <LoadingIndicator />
    }

    return (
        <Container>
            <h1 className="display-6 fw-bold pt-5">Galerien-Übersicht</h1>
            <Row className="pt-5 pb-5 justify-content-md-center">
                {galerien?.galerien.map(
                    (g, i) =>
                        <Col>
                            <Card style={{ height: 'auto', width: '325px' }}>
                                <Card.Img variant="top" src={galerienImg![i]} />
                                <Card.Body>
                                    <Card.Title><h3>{g.name}</h3></Card.Title>
                                    <hr />
                                    <Row className="d-flex justify-content-center pt-3 pb-3">
                                        <Col style={{ textAlign: "center" }}>
                                            {/* <Link to={`/galerie/${g.id}/edit`}> Edit </Link> */}
                                            <Button onClick={() => navigate(`/galerie/${g.id}/edit`)}>Bearbeiten</Button>
                                        </Col>
                                        <Col style={{ textAlign: "center" }}>
                                            <Button onClick={() => { setToBeDeleted(g.id!); setShowDelete(true) }}>Löschen</Button>
                                        </Col>
                                    </Row>
                                </Card.Body>
                            </Card>
                        </Col>
                )}
            </Row>
            {/* <Button className='my-2' size='lg' onClick={() => navigate("/dashboard/galerie")}>
                back
            </Button> */}

            <DeleteDialog show={showDelete} handleClose={setShowDelete} handleDelete={deleteGalerie} objectId={toBeDeleted} backLink={"/galerie/list"}></DeleteDialog>
        </Container>
    )
}