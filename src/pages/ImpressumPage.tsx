import { Container } from "react-bootstrap";


export default function ImpressumPage() {
    window.scrollTo(
        {
            top: 0,
            behavior: "smooth",
        }
    )

    return (
        <>
            <div className='hr m-0 p-0' />
            <Container fluid className="vh-auto pad-bottom-4 pad-top-4">
                <div className="pad-left-2 pad-right-2">

                    <h1 className="display-4 pad-bottom-3">Impressum</h1>
                    <p className="fs-text">
                        Imaginum <br />
                        Luxemburger Str. 10, <br />
                        14057 Berlin, <br />
                        Deutschland, <br />
                    </p>
                    <br />
                    <p className="fs-text">
                        Telefon: +49 172 / 482 8226 <br />
                        Fax: +49 8765 4321 <br />
                        E-Mail-Adresse: imaginum@outlook.de <br />
                    </p>
                </div>
            </Container>
        </>
    )
}