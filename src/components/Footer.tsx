import { Col, Container, Navbar, Row } from 'react-bootstrap';
import Nav from 'react-bootstrap/Nav';
import * as Icon from "react-bootstrap-icons";
import { useNavigate } from 'react-router-dom';
import { useAdminIDContext } from './AdminIDContext';

export default function Footer() {
    const navigate = useNavigate();
    const { adminID } = useAdminIDContext();

    // if (adminID) {
    //     return (
    //         <Container fluid className="footer bg-warning text-white py-4">
    //             <Row className='px-5'>
    //                 <Col>
    //                     <Navbar className="justify-content-center 
    //                 fixed-position 
    //                 bottom-0">
    //                         <Nav>
    //                             <Col style={{ color: "black" }}>
    //                                 <div className='pb-2'>
    //                                     <strong>Kontakt</strong><br />
    //                                 </div>
    //                                 <p>
    //                                     Luxemburger Straße 10<br />
    //                                     13353 Berlin<br />
    //                                     imaginum@outlook.de
    //                                 </p>
    //                                 <Col className="d-flex">
    //                                     <Nav.Link data-testid="linkedin-btn" href="https://www.linkedin.com/"><Icon.Linkedin color='black' /></Nav.Link>
    //                                     <Nav.Link data-testid="facebook-btn" href="https://www.faceboo.com/"><Icon.Facebook color='black' /></Nav.Link>
    //                                     <Nav.Link data-testid="twitter-btn" href="https://www.twitter.com/"><Icon.Twitter color='black' /></Nav.Link>
    //                                     <Nav.Link data-testid="instagram-btn" href="https://www.instagram.com/imaginum_project/"><Icon.Instagram color='black' /></Nav.Link>
    //                                 </Col>
    //                             </Col>
    //                         </Nav>
    //                     </Navbar>
    //                 </Col>
    //                 <Col>
    //                     <Navbar className="justify-content-center 
    //                 fixed-position 
    //                 bottom-0">
    //                         <Nav>
    //                             <Col style={{ color: "black" }}>
    //                                 <div className='pb-2'>
    //                                     <strong>Quick Links</strong>
    //                                 </div>
    //                                 <Nav.Link onClick={() => navigate('/imprint')} style={{ color: 'black' }} className='p-0'>
    //                                     Impressum
    //                                 </Nav.Link>
    //                                 <Nav.Link onClick={() => navigate('/datenschutz')} style={{ color: 'black' }} className='p-0 hover-link'>
    //                                     Datenschutz
    //                                 </Nav.Link>
    //                             </Col>
    //                         </Nav>
    //                     </Navbar>
    //                 </Col>
    //                 <Col>
    //                     <Navbar className="justify-content-center 
    //                 fixed-position 
    //                 bottom-0">
    //                         <Nav>
    //                             <Col style={{ color: "black" }}>
    //                                 <Nav.Link onClick={() => navigate('/news')} style={{ color: 'black' }} className='pb-2 pt-0 px-0'>
    //                                     <strong>Newsletter</strong>
    //                                 </Nav.Link>
    //                                 <p>
    //                                     Melde dich an und erfahre<br />
    //                                     mehr über die nächsten<br />
    //                                     Austellungen.
    //                                 </p>

    //                                 {/* <Form className="pb-5 pl-5">
    //                             <Form.Group className="mb-5" controlId="exampleForm.ControlInput1">
    //                                 <Form.Control className='fs-3' placeholder="Deine E-Mail-Adresse" style={{
    //                                     border: '0',
    //                                     background: '#6D23E7',
    //                                     borderBottom: '3px solid #FFFFFF',
    //                                     borderRadius: '0'
    //                                 }} />
    //                             </Form.Group>
    //                         </Form> */}

    //                             </Col>
    //                         </Nav>
    //                     </Navbar>
    //                 </Col>
    //             </Row>
    //         </Container>
    //     )
    // }

    return (
        <Container fluid className="footer footer-bg py-5 d-flex align-items-center" style={{ height: "350px" }}>
            <Container fluid>
                <Row>
                    <Col className='d-flex justify-content-center'>
                        <Navbar className="d-flex justify-content-center">
                            <Nav>
                                <Col>
                                    <div className='pb-2 fs-5'>
                                        <strong>Kontakt</strong><br />
                                    </div>
                                    <p className='fs-5'>
                                        Luxemburger Straße 10<br />
                                        13353 Berlin<br />
                                        imaginum@outlook.de
                                    </p>
                                    <Col className="d-flex">
                                        <Nav.Link data-testid="linkedin-btn" href="https://www.linkedin.com/"><Icon.Linkedin color='black' size={"22px"} /></Nav.Link>
                                        <Nav.Link data-testid="facebook-btn" href="https://www.faceboo.com/"><Icon.Facebook color='black' size={"22px"} /></Nav.Link>
                                        <Nav.Link data-testid="twitter-btn" href="https://www.twitter.com/"><Icon.Twitter color='black' size={"22px"} /></Nav.Link>
                                        <Nav.Link data-testid="instagram-btn" href="https://www.instagram.com/imaginum_project/"><Icon.Instagram color='black' size={"22px"} /></Nav.Link>
                                    </Col>
                                </Col>
                            </Nav>
                        </Navbar>
                    </Col>
                    <Col>
                        <Navbar className="d-flex justify-content-center">
                            <Nav>
                                <Col>
                                    <div className='pb-2 fs-5'>
                                        <strong>Quick Links</strong>
                                    </div>
                                    <Nav.Link onClick={() => navigate('/imprint')} style={{ color: 'black' }} className='p-0 fs-5'>
                                        Impressum
                                    </Nav.Link>
                                    <Nav.Link onClick={() => navigate('/datenschutz')} style={{ color: 'black' }} className='p-0 hover-link fs-5'>
                                        Datenschutz
                                    </Nav.Link>
                                </Col>
                            </Nav>
                        </Navbar>
                    </Col>
                    <Col>
                        <Navbar className="d-flex justify-content-center">
                            <Nav>
                                <Col>
                                    <Nav.Link onClick={() => navigate('/news')} style={{ color: 'black' }} className='pb-2 pt-0 px-0'>
                                        <strong className='fs-5'>Newsletter</strong>
                                    </Nav.Link>
                                    <p className='fs-5'>
                                        Melde dich an und erfahre<br />
                                        mehr über die nächsten<br />
                                        Austellungen.
                                    </p>
                                    {/* <Form className="pb-5 pl-5">
                                    <Form.Group className="mb-5" controlId="exampleForm.ControlInput1">
                                        <Form.Control className='fs-3' placeholder="Deine E-Mail-Adresse" style={{
                                            border: '0',
                                            background: '#6D23E7',
                                            borderBottom: '3px solid #FFFFFF',
                                            borderRadius: '0'
                                        }} />
                                    </Form.Group>
                                </Form> */}

                                </Col>
                            </Nav>
                        </Navbar>
                    </Col>
                </Row>
            </Container>
        </Container>
    )
}