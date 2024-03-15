import { useEffect, useState } from "react";
import { useAdminIDContext } from "../components/AdminIDContext";
import { KunstwerkResource } from "../components/Resources";
import { useParams } from "react-router-dom";
import { getKunstwerk } from "../backend/apidavid";
import LoadingIndicator from "../components/LoadingIndicator";
import KunstwerkForm from "../components/KunstwerkFormularComponent";


export default function KunstwerkEdit() {
    const { adminID } = useAdminIDContext();
    const [kunstwerk, setKunstwerk] = useState<KunstwerkResource | undefined>(undefined);
    const params = useParams();
    const kunstwerkId = params.kunstwerkId;

    async function load() {
        try {
            if (!kunstwerkId) {
                throw new Error("keine Id");
            } else {
                const k = await getKunstwerk(kunstwerkId);
                setKunstwerk(k);
            }
        } catch (err) {
        }
    }

    useEffect(() => { load() }, [adminID]);

    if (!kunstwerk) {
        return <LoadingIndicator />
    }

    return (
        <KunstwerkForm kunstwerk={kunstwerk} />
    )
}