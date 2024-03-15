import React, { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { KuenstlerinnenResource } from "../components/Resources";
import { deleteKuenstler, getAlleKuenstler } from "../backend/apidavid";
import { getImageUrl } from "../backend/api";
import DeleteDialog from "../components/DeleteDialog";


export default function KuenstlerListPage() {

    const navigate = useNavigate();
    const [kuenstler, setKuenstler] = React.useState<KuenstlerinnenResource | null>();
    const [imgUrl, setImgUrl] = React.useState(require("../assets/imgs/loadingGif.gif"));

    const [showDelete, setShowDelete] = useState(false);

    const [toBeDeleted, setToBeDeleted] = useState<string>("");

    async function load() {
        try {
            const ksRes = await getAlleKuenstler();
            setKuenstler(ksRes);

            window.scrollTo(
                {
                    top: 0,
                    behavior: "smooth",
                }
            )

        } catch (err) {
            setKuenstler(null)
        }
    }

    useEffect(() => { load(); }, [showDelete])

    return (
        <Container>
            <Row className="p-4 justify-content-md-center">
                {kuenstler?.kuenstlerinnen.map(
                    (k, i) =>
                        <Col md={5} className="border rounded m-2 p-1">
                            <h1> {k.name}</h1>
                            <Link to={`/kuenstler/${k.id}/edit`}> Edit </Link>
                            <Button onClick={() => { setToBeDeleted(k.id!); setShowDelete(true) }}>Löschen</Button>
                        </Col>
                )}
            </Row>
            <Button className='my-2' size='lg' onClick={() => navigate("/dashboard/kuenstler")}>
                back
            </Button>

            <DeleteDialog show={showDelete} handleClose={setShowDelete} handleDelete={deleteKuenstler} objectId={toBeDeleted} backLink={"/kuenstler/list"}></DeleteDialog>
        </Container>
    )
}