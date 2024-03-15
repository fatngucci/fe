import { useEffect, useState } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap'
import Image from 'react-bootstrap/Image'
import { useNavigate } from 'react-router-dom'
import { getKuenstler, getKunstwerk, getKunstwerkForHomepage, getKunstwerke } from '../backend/apidavid';
import { KuenstlerResource, KunstwerkResource, KunstwerkeResource } from '../components/Resources';
import { getImageUrl } from '../backend/api';
import NewKunstwerk from '../components/NewKunstwerk';
import HomePageKunstwerk from '../components/HomePageKunstwerke';

export default function NewHomePage() {
    const navigate = useNavigate();

    const [randomK, setRandomK] = useState<KuenstlerResource & { kunstwerkID: string } | undefined>();
    const [randomKImg, setKImg] = useState<string>("");
    const [randomW, setRandomW] = useState<KunstwerkeResource | undefined>();

    window.scrollTo(
        {
            top: 0,
            behavior: "smooth",
        }
    )

    async function load() {
        const k = await getKuenstler();
        setRandomK(k);

        const kImg = await getImageUrl("kuenstler", k.id!);
        setKImg(kImg);

        const w = await getKunstwerkForHomepage();
        setRandomW(w);
    }

    useEffect(() => { load(); }, [])

    return (
        <Container fluid className='p-0'>
            <Container fluid className='px-5'>
                <div className='hr m-0 p-0'> </div>
                <Row>
                    <Col xs={7}>
                        <h1 className='display-4 pad-top-4' style={{ paddingBottom: "3em" }}>
                            Tauche ein in die Welt der Galerien.
                            Entdecke Berliner Ausstellungen visuell.
                        </h1>
                    </Col>
                    <Col xs={2}>
                    </Col>
                </Row>
                <div className='hr'></div>
            </Container>
            <Container fluid className='px-5'>
                <Row>
                    <h1 className='pad-top-3 pad-bottom-1 fs-3 fw-bold'> Unser Angebot </h1>
                </Row>
                <Row>
                    <Col className='pe-4'>
                        <Image src={require('./../assets/imgs/card_3.jpg')} className='crop' />
                        <Row>
                            <Col xs={7}>
                                <p className='pad-top-1 fs-5 fw-bold'>
                                    Ausgestellte Kunstwerke
                                </p>
                                <p>
                                    Entdecke unsere beeindruckende auswahl an einzigartigen Kunstwerken!
                                    Verliebst du dich in ein Kunstwerk, stelle einfach und direkt den Kontakt zu
                                    den Künstler*innen her.
                                </p>
                            </Col>
                        </Row>
                        <Row className='pad-top-1 pad-bottom-4'>
                            <Col xs={4}>
                                <div className='button text-center' onClick={() => navigate('/kunstwerke')}> Zu den Kunstwerken </div>
                            </Col>
                        </Row>
                    </Col>
                    <Col className='ps-4'>
                        <Image src={require('./../assets/imgs/galerie_startseite.jpg')} className='crop' />
                        <Row>
                            <Col xs={7}>
                                <p className='pad-top-1 fs-5 fw-bold'> Virtuelle Touren </p>
                                <p>
                                    Über die virtuellen Touren kannst du quasi live an der Ausstellung teilnehmen.
                                    Bewege dich entspannt von zu Hause durch die Räume und genieße die Kunst.
                                </p>
                            </Col>
                        </Row>
                        <Row className='pad-top-1 pad-bottom-4'>
                            <Col xs={4}>
                                <div className='button text-center' onClick={() => navigate('/galerien')}> Zu den Galerien </div>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
            <Container fluid className='bg-primary px-5'>
                <Container fluid className='px-0'>
                    <Row className='pad-top-4 pad-bottom-4'>
                        <Col className='d-flex' xs={4} style={{ maxWidth: "40%", overflow: "hidden" }}>
                            <Image src={randomKImg} className='pad-right-2' style={{ objectFit: "cover", height: "100%", width: "100%" }} />
                        </Col>
                        <Col className='text-white p-1' style={{ maxWidth: "60%" }}>
                            <h1 className='display-5'> Entdecke unsere Newcomer </h1>
                            <br />
                            <p className='fs-4'>
                                {randomK?.name}
                                <br />
                                <br />
                                {randomK?.beschreibung}
                            </p>
                            <br />
                            <div className='light-button text-center' onClick={() => navigate(`kunstwerk/${randomK?.kunstwerkID}`)}>
                                Zum Werk
                            </div>
                        </Col>
                    </Row>
                </Container>
            </Container>
            <Container fluid className='px-5'>
                <Container fluid className='px-0'>
                    <Row className='pad-top-4 pad-bottom-2'>
                        <h1> Zu den Kunstwerken </h1>
                        {randomW?.kunstwerke.map(
                            (k, i) =>
                                <Col xs={4} className="pad-top-2">
                                    <HomePageKunstwerk kunstwerkResource={k} index={i} key={k.id}></HomePageKunstwerk>
                                </Col>
                        )}
                    </Row>
                </Container>
            </Container>
        </Container>
    )
}