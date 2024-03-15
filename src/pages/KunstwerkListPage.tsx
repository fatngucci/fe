import React, { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { KunstwerkeResource } from "../components/Resources";
import { deleteKunstwerk, getKunstwerke } from "../backend/apidavid";
import DeleteDialog from "../components/DeleteDialog";
// import { getGalerien, getImageUrl } from "../backend/api";


export default function GalerieListPage() {

    const navigate = useNavigate();
    const [kunstwerke, setKunstwerke] = React.useState<KunstwerkeResource | null>();
    const [imgUrl, setImgUrl] = React.useState(require("../assets/imgs/loadingGif.gif"));

    const [showDelete, setShowDelete] = useState(false);

    const [toBeDeleted, setToBeDeleted] = useState<string>("");


    async function load() {
        try {
            const kRes = await getKunstwerke();
            setKunstwerke(kRes);

            window.scrollTo(
                {
                    top: 0,
                    behavior: "smooth",
                }
            )

        } catch (err) {
            setKunstwerke(null)
        }
    }

    useEffect(() => { load(); }, [showDelete])

    return (
        <Container>
            <Row className="p-4 justify-content-md-center">
                {kunstwerke?.kunstwerke.map(
                    (k, i) =>
                        <Col index={i} md={5} className="border rounded m-2 p-1">
                            <h1> {k.titel}</h1>
                            <Link to={`/kunstwerk/${k.id}/edit`}> Edit </Link>
                            <Button onClick={() => { setToBeDeleted(k.id!); setShowDelete(true) }}>Löschen</Button>
                        </Col>
                )}
            </Row>
            <Button className='my-2' size='lg' onClick={() => navigate("/dashboard/kunstwerk")}>
                back
            </Button>

            <DeleteDialog show={showDelete} handleClose={setShowDelete} handleDelete={deleteKunstwerk} objectId={toBeDeleted} backLink={"/kunstwerk/list"}></DeleteDialog>
        </Container>
    )
}