import { Container, Row, Col, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useAdminIDContext } from "../components/AdminIDContext";
import Image from 'react-bootstrap/Image'
import NotAllowedPage from "./NotAllowedPage";


export default function DashboardPage() {

    const navigate = useNavigate();

    const { adminID } = useAdminIDContext();

    if (!adminID) {
        return <NotAllowedPage />
    }

    return (
        <Container fluid>
            <Container fluid className="p-1">
                <div className="hr m-0 p-0"></div>
                <Row className="pad-top-4 pad-bottom-4">
                    <Col>
                        <Card onClick={() => navigate("/dashboard/galerie")} style={{ cursor: 'pointer', borderRadius: '0' }}>
                            <Card.Img variant="top" className='dash-pic' style={{ borderRadius: '0' }} src={require('./../assets/imgs/galerie_2.jpeg')} />
                            <Card.Body>
                                <Card.Title><h2 className="text-center">Galerie Bearbeiten</h2></Card.Title>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col>
                        <Card onClick={() => navigate("/dashboard/kuenstler")} style={{ cursor: 'pointer', borderRadius: '0' }}>
                            <Card.Img variant="top" className='dash-pic' style={{ borderRadius: '0' }} src={require('./../assets/imgs/künstler.jpg')} />
                            <Card.Body>
                                <Card.Title><h2 className="text-center">Künstler Bearbeiten</h2></Card.Title>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col>
                        <Card onClick={() => navigate("/dashboard/kunstwerk")} style={{ cursor: 'pointer', borderRadius: '0' }}>
                            <Card.Img variant="top" className='dash-pic' style={{ borderRadius: '0' }} src={require('./../assets/imgs/card_3.jpg')} />
                            <Card.Body>
                                <Card.Title><h2 className="text-center">Kunstwerke Bearbeiten</h2></Card.Title>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col>
                        <Card onClick={() => navigate("/dashboard/newsletter")} style={{ cursor: 'pointer', borderRadius: '0' }}>
                            <Card.Img variant="top" className='dash-pic' style={{ borderRadius: '0' }} src={require('./../assets/imgs/galerie.jpg')} />
                            <Card.Body>
                                <Card.Title><h2 className="text-center">News Bearbeiten</h2></Card.Title>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </Container>
    )
}