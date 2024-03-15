import { Button, Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useAdminIDContext } from "../components/AdminIDContext";
import NotAllowedPage from "./NotAllowedPage";


export default function DashboardKunstwerkePage() {

    const navigate = useNavigate();
    const {adminID} = useAdminIDContext();

    if(!adminID){
        return <NotAllowedPage />
    }

    return(
        <Container className="vh-auto">
            <Row className="justify-content-md-center">
                <Row className="p-5">
                    <Col>
                        <Button onClick={() => navigate("/kunstwerk/list")}> Edit Kunstwerke </Button>
                    </Col>
                    <Col>
                        <Button onClick={() => navigate("/kunstwerk/create")}> Create new Kunstwerke </Button>
                    </Col>
                </Row>
                <Row className="p-5">
                    <Col>
                        <Button  onClick={() =>  navigate("/dashboard")}> Back </Button>
                    </Col>
                </Row>
            </Row>
        </Container>
    )
}