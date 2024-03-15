import React from "react";
import KuenstlerFormularComponent from "../components/KuenstlerFormularComponent";
import { KuenstlerResource } from "../components/Resources";
import { useParams } from "react-router-dom";
import { useAdminIDContext } from "../components/AdminIDContext";
import NotAllowedPage from "./NotAllowedPage";
import { getKuenstler } from "../backend/apidavid";



export default function KuenstlerEdit(){
    const [kuenstler, setKuenstler] = React.useState<KuenstlerResource>();
    const params = useParams();
    const kuenstlerId = params.kuenstlerId;
    const {adminID} = useAdminIDContext();

    async function load(){
        try{
            if(!kuenstlerId) {
                throw new Error('No kuenstler id')
            }
            const ks = await getKuenstler(kuenstlerId);
            setKuenstler(ks);
        } catch(err) {
            setKuenstler(undefined)
        }
    }

    React.useEffect(() => {load();}, [adminID]);

    if(!adminID) {
        return <NotAllowedPage />
    }

    return(
        <KuenstlerFormularComponent kuenstler={kuenstler} />
    )
}