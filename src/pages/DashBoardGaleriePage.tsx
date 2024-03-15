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
            setGalerienImg(undefined);
        }
    }

    useEffect(() => { load(); }, [showDelete])

    if (!galerien || !galerienImg) {
        return <LoadingIndicator />
    }

    return (
        <Container fluid className="vh-auto" >
            <div className="hr p-0 m-0" />
            <h1 className="display-5 pad-top-4 pad-bottom-2 pad-left-2 pad-right-2">Galerien Übersicht</h1>
            <Row className="pad-left-2 pad-right-2">
                {galerien?.galerien.map(
                    (g, i) =>
                        <>
                            {i === 0 ?
                                <Col className="pb-5 d-flex justify-content-center">
                                    <Card onClick={() => navigate(`/galerie/create`)}
                                        style={{ cursor: 'pointer', justifyContent: "center", display: "flex", alignItems: "center", height: '226px', width: '400px', borderRadius: '0' }}>
                                        <Card.Img variant="top" src={require('./../assets/imgs/plus2.png')} />
                                    </Card>
                                </Col>
                                :
                                undefined
                            }
                            <Col className="pb-5 d-flex justify-content-center">
                                <Card style={{ height: 'auto', width: '400px', borderRadius: '0' }}>
                                    {/* <Card.Img variant="top" src={galerienImg![i]} /> */}
                                    <Card.Body>
                                        <Card.Title><h3>{g.name}</h3></Card.Title>
                                        <Card.Text><p>{g.strasse}, {g.hausnummer}, {g.plz}, {g.stadt}</p></Card.Text>
                                        <hr />
                                        <Row className="d-flex justify-content-center pt-2 pb-2">
                                            <Col className="" style={{ textAlign: "center" }}>
                                                <div className='admin-button' style={{ background: "#FAFF00" }} onClick={() => navigate(`/galerie/${g.id}/edit`)}>
                                                    Bearbeiten
                                                </div>
                                            </Col>
                                            <Col className="" style={{ textAlign: "center" }}>
                                                <div className='admin-button' onClick={() => { setToBeDeleted(g.id!); setShowDelete(true) }}>
                                                    Löschen
                                                </div>
                                            </Col>
                                        </Row>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </>
                )}
            </Row>
            <DeleteDialog show={showDelete} handleClose={setShowDelete} handleDelete={deleteGalerie} objectId={toBeDeleted} backLink={"/dashboard/galerie"}></DeleteDialog>
        </Container>
    )
}