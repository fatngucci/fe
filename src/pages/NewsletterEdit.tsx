import NewsletterForm from "../components/NewsletterFormularComponent";
import { useAdminIDContext } from "../components/AdminIDContext";
import { NewsletterResource } from "../components/Resources";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getNewsletter } from "../backend/api";
import LoadingIndicator from "../components/LoadingIndicator";

export default function NewsletterEdit() {
    const { adminID } = useAdminIDContext();
    const [newsletter, setNewsletter] = useState<NewsletterResource | undefined>(undefined);
    const params = useParams();
    const newsletterId = params.newsletterId;

    async function load() {
        try {
            if (!newsletterId) {
                throw new Error("keine Id");
            } else {
                const n = await getNewsletter(newsletterId);
                setNewsletter(n);
            }
        } catch (err) {
        }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => { load() }, [adminID]);

    if (!newsletter) {
        return <LoadingIndicator />
    }

    return (
        <NewsletterForm newsletter={newsletter} />
    )
}