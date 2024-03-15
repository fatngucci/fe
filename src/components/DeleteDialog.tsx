import { useNavigate } from "react-router-dom";
import { useAdminIDContext } from "./AdminIDContext";
import { GalerieResource, KuenstlerResource, KunstwerkResource, NewsletterResource } from "./Resources";
import { Button, Form, Modal } from "react-bootstrap";

export default function DeleteDialog(
    props: {
        show: boolean,
        handleClose: (s: boolean) => void,
        handleDelete: (id: string) => Promise<boolean>,
        // object: GalerieResource | KunstwerkResource | KuenstlerResource | NewsletterResource,
        objectId: string,
        backLink: string,
    }
) {
    const close = () => { props.handleClose(false) }; // state lifting up
    const { adminID, setAdminID } = useAdminIDContext();
    const navigate = useNavigate();

    async function onDelete() {
        try {
            // if (adminID && props.object.id) {
            if (adminID && props.objectId) {
                // await props.handleDelete(props.object.id)
                await props.handleDelete(props.objectId)
                close();
                navigate(props.backLink);
            }
        } catch (err) {
            throw (err);
        }
    }


    return (
        <Modal show={props.show} onHide={close}>
            <Form>
                <Modal.Header closeButton>
                    <Modal.Title>Löschen</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <div>Bist du dir sicher, dass du die Löschung durchführen möchtest?</div>
                </Modal.Body>

                <Modal.Footer>
                    <div className="button" style={{ padding: "0.5em", border: "1px solid rgba(0, 0, 0, 0.17)" }} onClick={onDelete}>Löschen</div>
                    <div className="button" style={{ padding: "0.5em", border: "1px solid rgba(0, 0, 0, 0.17)" }} onClick={close}>Abbrechen</div>
                </Modal.Footer>
            </Form>

        </Modal>
    )




}