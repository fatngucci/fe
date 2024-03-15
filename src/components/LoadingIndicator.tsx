import { Spinner, Container, Row } from "react-bootstrap";

export default function LoadingIndicator() {

    return (
        <Container style={{ height: "50rem" }}>
            <Row className="position-absolute bottom-50 end-50" >
                <Spinner animation="border" />
            </Row>
        </Container>
    )
}