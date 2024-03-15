import { Toast, ToastContainer } from 'react-bootstrap';

export default function Benachrichtigung(props: {
    show: boolean,
    handleClose: (s: boolean) => void,
    nachricht: string
}) {


    return (

        <ToastContainer className="p-3" style={{
            top: "5em",
            right: "1em",
            zIndex: 1,
            position: "fixed",
        }}>
            <Toast onClose={() => props.handleClose(false)} show={props.show} delay={5000} autohide style={{ border: "3px solid #6D23E7" }}>
                <Toast.Header style={{
                    color: "#6D23E7"
                }}>
                    <img
                        src="holder.js/20x20?text=%20"
                        className="rounded me-2"
                        alt=""
                    />
                    <strong className="me-auto">Imaginum</strong>
                    {/* <small className="text-muted">just now</small> */}
                </Toast.Header>
                <Toast.Body>{props.nachricht}</Toast.Body>
            </Toast>
        </ToastContainer>

    );
}