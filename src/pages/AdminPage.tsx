import { Container, Form, Row, Button } from "react-bootstrap";

import { getAdminIdFromJWT, login } from "../backend/api";
import { useAdminIDContext } from "../components/AdminIDContext";
import React from "react";
import { useNavigate } from "react-router-dom";

export default function AdminPage() {


    const [data, setData] = React.useState({ email: "", password: "" });
    const navigate = useNavigate();

    const { adminID, setAdminID } = useAdminIDContext();

    function update(e: React.ChangeEvent<HTMLInputElement>) {
        setData({ ...data, [e.target.type]: e.target.value });
    }

    async function onLogin(email: string, password: string) {
        // const bool = await login(email, password);
        const id = await login(email, password);
        // const id = getAdminIdFromJWT();
        if (!id) {
            alert('Login nicht erfolgreich');
        } else {
            setAdminID(id);
            navigate("/dashboard")
        }
    }

    if (adminID) {
        return (
            <Container className="vh-auto">
                <h1 className="display-4 text-center"> U are already logged.</h1>
            </Container>
        )
    } else {
        return (
            <Container className="vh-auto">
                <Container className="container-mid">
                    <Row xs={2} className="py-3 justify-content-md-center">
                        <Form className="">
                            <Form.Group className="pt-5 px-5 my-2">
                                <Form.Label> E-Mail Adresse </Form.Label>
                                <Form.Control style={{border: '0', borderRadius: '0', borderBottom:'1px solid black'}} onChange={update} type='email' placeholder='Email eingeben' />
                                <Form.Control.Feedback />
                            </Form.Group>
                            <Form.Group className="pb-5 px-5 my-2">
                                <Form.Label> Passwort </Form.Label>
                                <Form.Control style={{border: '0', borderRadius: '0', borderBottom:'1px solid black'}} onChange={update} type="password" placeholder='Passwort' />
                                <Form.Control.Feedback />
                            </Form.Group>
                        </Form>
                    </Row>
                    <Row xs={4} className="justify-content-md-center">
                        <div id='admin-login-btn' className='button' onClick={() => onLogin(data.email, data.password)}> Login </div>
                    </Row>
                </Container>
            </Container>
        )
    }
}