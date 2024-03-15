import { Container, Form, Row, Button } from "react-bootstrap";
import { postNewsletter } from "../backend/apidavid";
import { useState } from "react";



export default function AdminPage() {

    async function handleClick(e: { preventDefault: () => void; }) {
        e.preventDefault();
        const test = await postNewsletter(isChecked);
    }

    const [isChecked, setIsChecked] = useState(false);

    const handleChange = () => {
        setIsChecked(!isChecked);
    };

    return (
        <Container className="vh-auto">
            <Row xs={2} className="py-5 justify-content-md-center">
            </Row>
            <Row xs={4} className="justify-content-md-center">
                <Button onClick={handleClick} id='admin-login-btn' variant='primary' className='py-2 px-4 rounded-pill'> Send Test Mail </Button>
                <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={handleChange}
                />
            </Row>
        </Container>
    )
}