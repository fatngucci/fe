import { useEffect, useState } from 'react';
import PanoramicView from '../components/PanoramicView';
import { useNavigate, useParams } from 'react-router-dom';
import { getGalerie } from '../backend/api';
import { Button } from 'react-bootstrap';

export default function GalerieTour() {

    const [galerieName, setGalerieName] = useState("");

    const params = useParams();
    const galerieId = params.galerieId;

    const navigate = useNavigate();

    async function load() {
        const g = await getGalerie(galerieId!);
        if (g) {
            console.log(g.name.toLowerCase());
            setGalerieName(g.name.toLowerCase());
        }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => { load() }, []);


    return (
        <>
            <PanoramicView galerieName={galerieName} />
            {/* <Button variant="secondary" className='btns-1 py-2 px-4 rounded-pill' size='lg' onClick={() => navigate(`/galerie/${galerieId}`)}>
                Zurück
            </Button> */}
        </>
    )
}