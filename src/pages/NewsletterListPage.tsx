import React, { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { GalerienResource, KuenstlerinnenResource, NewslettersResource } from "../components/Resources";
import { getAlleKuenstler } from "../backend/apidavid";
import { deleteNewsletter, getGalerien, getImageUrl, getNewsletters } from "../backend/api";
import DeleteDialog from "../components/DeleteDialog";


export default function NewsletterListPage() {

    const navigate = useNavigate();
    const [newsletters, setNewsletters] = React.useState<NewslettersResource | null>();
    const [imgUrl, setImgUrl] = React.useState(require("../assets/imgs/loadingGif.gif"));

    const [showDelete, setShowDelete] = useState(false);

    const [toBeDeleted, setToBeDeleted] = useState<string>("");

    async function load() {
        try {
            const nRes = await getNewsletters();
            setNewsletters(nRes);

            window.scrollTo(
                {
                    top: 0,
                    behavior: "smooth",
                }
            )

        } catch (err) {
            setNewsletters(null)
        }
    }

    useEffect(() => { load(); }, [showDelete])

    return (
        <Container>
            <Row className="p-4 justify-content-md-center">
                {newsletters?.newsletters.map(
                    (n, i) =>
                        <Col index={i} md={5} className="border rounded m-2 p-1">
                            <h1> {n.ueberschrift}</h1>
                            <Link to={`/newsletter/${n.id}/edit`}> Edit </Link>
                            <Button onClick={() => { setToBeDeleted(n.id!); setShowDelete(true) }}>Löschen</Button>
                        </Col>
                )}
            </Row>
            <Button className='my-2' size='lg' onClick={() => navigate("/dashboard/newsletter")}>
                back
            </Button>
            <DeleteDialog show={showDelete} handleClose={setShowDelete} handleDelete={deleteNewsletter} objectId={toBeDeleted} backLink={"/newsletter/list"}></DeleteDialog>
        </Container>
    )
}