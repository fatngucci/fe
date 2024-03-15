import { Col, Container, Row } from "react-bootstrap";

export default function DatenschutzPage() {
    window.scrollTo(
        {
            top: 0,
            behavior: "smooth",
        }
    )

    return (
        <>
            <div className='hr m-0 p-0' />
            <Container fluid className="pad-bottom-4 pad-top-4">
                <h1 className="display-4 pad-bottom-3 pad-left-2 pad-right-2">Datenschutz</h1>
                <Row className="pad-left-2 pad-right-2">
                    <Col>
                        <p className="fs-text">
                            In dieser Datenschutzerklärung informieren wir Sie über die Verarbeitung personenbezogener Daten bei der Nutzung dieser Website.<br /><br />

                            <strong>Verantwortlicher</strong><br />
                            Verantwortlich für die Datenverarbeitung ist Name, Adresse, Telefonnummer und E-Mail-Adresse<br /><br />

                            <strong>Datenschutzbeauftragter</strong><br />
                            Die Angabe ist nur erforderlich bei Pflicht zur Bestellung eines Datenschutzbeauftragten. Diese besteht in folgenden Fällen:<br />
                            <ul>
                                <li>Im Unternehmen verarbeiten mindestens 10 Mitarbeiter regelmäßig automatisiert Daten wie z. B. mit Computern.</li>
                                <li>Im Unternehmen verarbeiten Sie unabhängig von der Mitarbeiterzahl mindestens eine Kategorie folgender personenbezogener Daten: ethnische Herkunft, Rasse, politische Meinung, religiöse Überzeugung, Gewerkschaftszugehörigkeit, Gesundheit oder Sexualleben</li>
                                <li>Mittelpunkt der Geschäftstätigkeit ist die Übermittlung personenbezogener Daten wie sie z. B. eine Auskunftei, ein Adressverlag oder ein Markt- und Meinungsforschungsinstitut ausübt.</li>
                            </ul>
                            Der Datenschutzbeauftragte ist unter der Adresse des Verantwortlichen zu erreichen. Bitte ergänzen Sie die Adresse bei der Kontaktaufnahme per Post mit dem Hinweis "Datenschutzbeauftragter". Per E-Mail erreichen Sie unseren Datenschutzbeauftragten über die folgende E-Mail-Adresse: E-Mail-Adresse des Datenschutzbeauftragten einfügen<br /><br />
                            <strong>Personenbezogene Daten</strong><br />
                            Personenbezogene Daten sind alle Informationen, die sich auf eine identifizierte oder identifizierbare natürliche Person (im Folgenden "betroffene Person") beziehen. Als identifizierbar wird eine natürliche Person angesehen, die direkt oder indirekt, insbesondere mittels Zuordnung zu einer Kennung wie einem Namen, zu einer Kennnummer, zu Standortdaten, zu einer Online-Kennung oder zu einem oder mehreren besonderen Merkmalen identifiziert werden kann, die Ausdruck der physischen, physiologischen, genetischen, psychischen, wirtschaftlichen, kulturellen oder sozialen Identität dieser natürlichen Person sind.<br />
                        </p>
                    </Col>
                    <Col>
                        <p className="fs-text">
                            <strong>Daten beim Websiteaufruf</strong><br />
                            Wenn Sie diese Website nur nutzen, um sich zu informieren und keine Daten angeben, dann verarbeiten wir nur die Daten, die zur Anzeige der Website auf dem von Ihnen verwendeten internetfähigen Gerät erforderlich sind. Das sind insbesondere:<br />
                            <ul>
                                <li>IP-Adresse</li>
                                <li>Datum und Uhrzeit der Anfrage</li>
                                <li>jeweils übertragene Datenmenge</li>
                                <li>die Website, von der die Anforderung kommt</li>
                                <li>Browsertyp und Browserversion</li>
                                <li>Betriebssystem</li>
                            </ul>

                            <strong>Einsatz von Cookies</strong><br />
                            Beim Besuch der Website können Cookies auf Ihrem Gerät gespeichert werden. Cookies sind kleine Textdateien, die von dem von Ihnen verwendeten Browser gespeichert werden. Cookies können keine Programme ausführen und auch keine Viren auf Ihr Gerät übertragen. Die Stelle, die den Cookie setzt, kann darüber jedoch bestimmte Informationen erhalten. Cookies dienen dazu, das Internetangebot benutzerfreundlicher zu machen. Mithilfe von Cookies kann beispielsweise das Gerät, mit dem diese Website aufgerufen wurde, bei einem erneuten Aufruf erkannt werden.<br />
                            Durch die Browsereinstellungen lässt sich das Setzen von Cookies einschränken oder verhindern. So kann z. B. nur die Annahme von Cookies, die von Drittanbietern stammen, blockiert werden oder aber auch die Annahme von allen Cookies. Durch das Blockieren sind jedoch möglicherweise nicht mehr alle Funktionen dieser Website nutzbar. Im weiteren Text dieser Datenschutzerklärung informieren wir Sie konkret, an welchen Stellen und zu welchen Zwecken Cookies auf den Seiten zum Einsatz kommen.<br />
                        </p>
                    </Col>
                </Row>
            </Container>
        </>
    )
}