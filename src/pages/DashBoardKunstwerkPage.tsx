import React, { useEffect, useState } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { KuenstlerinnenResource, KunstwerkResource, KunstwerkeResource } from "../components/Resources";
import { deleteGalerie, getImageUrl } from "../backend/api";
import DeleteDialog from "../components/DeleteDialog";
import LoadingIndicator from "../components/LoadingIndicator";
import { deleteKunstwerk, getAlleKuenstler, getKunstwerke } from "../backend/apidavid";


export default function GalerieListPage() {

    const navigate = useNavigate();
    const [kunstwerke, setKunstwerke] = React.useState<KunstwerkeResource | null>();
    const [kunstwerkImg, setKunstwerkImg] = useState<string[] | undefined>(require("../assets/imgs/loadingGif.gif"));
    const [showDelete, setShowDelete] = useState(false);
    const [toBeDeleted, setToBeDeleted] = useState<string>("");


    async function load() {
        try {
            const kRes = await getKunstwerke();
            setKunstwerke(kRes);

            if (kRes) {
                let imgs = [];
                for (let i = 0; i < kRes.kunstwerke.length; i++) {
                    const url = await getImageUrl("kunstwerk", kRes.kunstwerke[i].id!);
                    imgs[i] = url;
                }
                setKunstwerkImg(imgs);
            }

            window.scrollTo(
                {
                    top: 0,
                    behavior: "smooth",
                }
            )

        } catch (err) {
            setKunstwerke(null);
            setKunstwerkImg(undefined);
        }
    }

    useEffect(() => { load(); }, [showDelete])

    if (!kunstwerke || !kunstwerkImg) {
        return <LoadingIndicator />
    }

    return (
        <Container fluid className="vh-auto">
            <div className="hr p-0 m-0" />
            <h1 className="display-5 pad-top-4 pad-bottom-2 pad-left-2 pad-right-2">Kunstwerk-Übersicht</h1>

            {/* {i % 2 === 0 && i !== 0 && <div className="w-100" />} */}
            <Row className="pad-left-2 pad-right-2">
                {kunstwerke?.kunstwerke.map(
                    (k, i) =>
                        <>
                            {i === 0 ?
                                <Col className="pb-5 d-flex justify-content-center">
                                    <Card onClick={() => navigate(`/kunstwerk/create`)}
                                        style={{ cursor: 'pointer', justifyContent: "center", display: "flex", alignItems: "center", height: '194px', width: '400px', borderRadius: '0' }}>
                                        <Card.Img variant="top" src={require('./../assets/imgs/plus2.png')} />
                                    </Card>
                                </Col>
                                :
                                undefined
                            }
                            <Col className="pb-5 d-flex justify-content-center">
                                <Card style={{ height: 'auto', width: '400px', borderRadius: '0' }}>
                                    {/* <Card.Img variant="top" src={kunstwerkImg![i]} /> */}
                                    <Card.Body>
                                        <Card.Title><h3>{k.titel}</h3></Card.Title>
                                        <hr />
                                        <Row className="d-flex justify-content-center pt-2 pb-2">
                                            <Col style={{ textAlign: "center" }}>
                                                <div className='admin-button' style={{ background: '#FAFF00' }} onClick={() => navigate(`/kunstwerk/${k.id}/edit`)}>Bearbeiten</div>
                                            </Col>
                                            <Col style={{ textAlign: "center" }}>
                                                <div className='admin-button' onClick={() => { setToBeDeleted(k.id!); setShowDelete(true) }}>Löschen</div>
                                            </Col>
                                        </Row>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </>
                )}
            </Row>
            <DeleteDialog show={showDelete} handleClose={setShowDelete} handleDelete={deleteKunstwerk} objectId={toBeDeleted} backLink={"/dashboard/kunstwerk"}></DeleteDialog>
        </Container>
    )
}