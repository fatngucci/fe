import GalerieForm from "../components/GalerieFormularComponent";
import { useAdminIDContext } from "../components/AdminIDContext";
import { GalerieResource } from "../components/Resources";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getGalerie } from "../backend/api";
import LoadingIndicator from "../components/LoadingIndicator";

export default function GalerieEdit() {
    const { adminID } = useAdminIDContext();
    const [galerie, setGalerie] = useState<GalerieResource | undefined>(undefined);
    const params = useParams();
    const galerieId = params.galerieId;

    async function load() {
        try {
            if (!galerieId) {
                throw new Error("keine Id");
            } else {
                const g = await getGalerie(galerieId);
                setGalerie(g);
            }
        } catch (err) {
        }
    }

    useEffect(() => { load() }, [adminID]);

    if (!galerie) {
        return <LoadingIndicator />
    }

    return (
        <GalerieForm galerie={galerie} />
    )
}