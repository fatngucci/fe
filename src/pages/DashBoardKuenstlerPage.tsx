import React, { useEffect, useState } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { KuenstlerinnenResource } from "../components/Resources";
import { getImageUrl } from "../backend/api";
import DeleteDialog from "../components/DeleteDialog";
import LoadingIndicator from "../components/LoadingIndicator";
import { deleteKuenstler, getAlleKuenstler } from "../backend/apidavid";


export default function GalerieListPage() {

    const navigate = useNavigate();
    const [kuenstlerinnen, setKuenstlerinnen] = React.useState<KuenstlerinnenResource | null>();
    const [kuenstlerinnenImg, setKuenstlerinnenImg] = useState<string[] | undefined>(require("../assets/imgs/loadingGif.gif"));
    const [showDelete, setShowDelete] = useState(false);
    const [toBeDeleted, setToBeDeleted] = useState<string>("");


    async function load() {
        try {
            const kRes = await getAlleKuenstler();
            setKuenstlerinnen(kRes);

            if (kRes) {
                let imgs = [];
                for (let i = 0; i < kRes.kuenstlerinnen.length; i++) {
                    const url = await getImageUrl("kuenstler", kRes.kuenstlerinnen[i].id!);
                    imgs[i] = url;
                }
                setKuenstlerinnenImg(imgs);
            }

            window.scrollTo(
                {
                    top: 0,
                    behavior: "smooth",
                }
            )

        } catch (err) {
            setKuenstlerinnen(null);
            setKuenstlerinnenImg(undefined);
        }
    }

    useEffect(() => { load(); }, [showDelete])

    if (!kuenstlerinnen || !kuenstlerinnenImg) {
        return <LoadingIndicator />
    }

    return (
        <Container fluid className="vh-auto">
            <div className="hr p-0 m-0" />
            <h1 className="display-5 pad-top-4 pad-bottom-2 pad-left-2 pad-right-2">Künstler-Übersicht</h1>

            {/* {i % 2 === 0 && i !== 0 && <div className="w-100" />} */}
            <Row className="pad-left-2 pad-right-2">
                {kuenstlerinnen?.kuenstlerinnen.map(
                    (k, i) =>
                        <>
                            {i === 0 ?
                                <Col className="pb-5 d-flex justify-content-center">
                                    <Card onClick={() => navigate(`/kuenstler/create`)}
                                        style={{ cursor: 'pointer', justifyContent: "center", display: "flex", alignItems: "center", height: '194px', width: '400px', borderRadius: '0' }}>
                                        <Card.Img variant="top" src={require('./../assets/imgs/plus2.png')} />
                                    </Card>
                                </Col>
                                :
                                undefined
                            }
                            <Col className="pb-5 d-flex justify-content-center">
                                <Card style={{ height: 'auto', width: '400px', borderRadius: '0' }}>
                                    {/* <Card.Img variant="top" src={kuenstlerinnenImg![i]} /> */}
                                    <Card.Body>
                                        <Card.Title><h3>{k.name}</h3></Card.Title>
                                        {/* <Card.Text><p>{g.strasse}, {g.hausnummer}, {g.plz}, {g.stadt}</p></Card.Text> */}
                                        <hr />
                                        <Row className="d-flex justify-content-center pt-2 pb-2">
                                            <Col style={{ textAlign: "center" }}>
                                                <div className='admin-button' style={{ background: '#FAFF00' }} onClick={() => navigate(`/kuenstler/${k.id}/edit`)}>Bearbeiten</div>
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
            <DeleteDialog show={showDelete} handleClose={setShowDelete} handleDelete={deleteKuenstler} objectId={toBeDeleted} backLink={"/dashboard/kuenstler"}></DeleteDialog>
        </Container>
    )
}