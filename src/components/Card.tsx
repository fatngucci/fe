import Card from 'react-bootstrap/Card';
import { GalerieResource, KuenstlerResource, KunstwerkResource } from './Resources';
import { Badge } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { getKuenstler } from '../backend/apidavid';
import { getGalerie, getImageUrl } from '../backend/api';
import { useNavigate } from 'react-router-dom';

export default function GetCard({ kunstwerkResource }: { kunstwerkResource: KunstwerkResource }) {
    const [kuenstler, setKuenstler] = useState<KuenstlerResource | null>();
    const [galerie, setGalerie] = useState<GalerieResource | null>();
    const [imgUrl, setImgUrl] = useState(require("../assets/imgs/loadingGif.gif"));
    const navigate = useNavigate();

    async function load() {
        try {
            const kuenstler = await getKuenstler(kunstwerkResource.kuenstlerID);
            setKuenstler(kuenstler);

            const galerie = await getGalerie(kunstwerkResource.galerieID);
            setGalerie(galerie);

            if (kunstwerkResource.bilder) {
                const url = await getImageUrl("kunstwerk", kunstwerkResource.id!, 0);
                setImgUrl(url);
            }
        } catch (err) {
            setKuenstler(null);
            setGalerie(null);
            setImgUrl(null);
        }
    }

    useEffect(() => {
        load();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Card onClick={() => navigate(`/kunstwerk/${kunstwerkResource.id}`)} style={{ height: 'auto', width: '325px' }}>
            <Card.Img src={imgUrl} />
            <Card.Body>
                <h3 className='display-7 fw-bold'>{kunstwerkResource.titel}</h3>
                <hr />
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}>
                    {/* {
                        kuenstler ?
                            kuenstler.map((k) =>
                                <>
                                    <i className='fs-5'>{k.name}</i> <br />
                                </>
                            )
                            : <i className='fs-5'>...</i>
                    } */}
                    {kuenstler ? <i className='fs-5'>{kuenstler.name}</i> : <i className='fs-5'>...</i>}
                    {kunstwerkResource.verkauft ? <Badge bg="primary">Verkauft</Badge> : null}
                </div>
                {
                    galerie ? <p>({galerie.name})</p> : <p>...</p>
                }
                <p className='fs-5'><strong>€ {kunstwerkResource.preis},00</strong></p>
            </Card.Body>
        </Card>
    );
}
