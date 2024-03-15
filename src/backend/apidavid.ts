// import Cookies from "js-cookie";
// import jwtDecode from "jwt-decode";
import { KuenstlerResource, KuenstlerinnenResource, KunstwerkResource, KunstwerkeResource } from "../components/Resources";
import { logout } from "./api";

const HOST = process.env.REACT_APP_API_SERVER_URL;

export async function getKunstwerk(kunstwerkId: string): Promise<KunstwerkResource> {


    const url = `${HOST}/kunstwerk/${kunstwerkId}`;

    const response = await fetch(url);
    return await response.json();
}

export async function getKunstwerkForHomepage(): Promise<KunstwerkeResource> {

    let url = `${HOST}/kunstwerke/random`;

    const response = await fetch(url);
    return await response.json();
}

export async function getKunstwerke(galerieId?: string, typ?: string): Promise<KunstwerkeResource> {
    let url;
    if (galerieId && typ) {
        url = `${HOST}/kunstwerke/${galerieId}/typ/${typ}`;
    }
    else if (galerieId) {
        url = `${HOST}/kunstwerke/${galerieId}`;
    }
    else if (typ) {
        url = `${HOST}/kunstwerke/typ/${typ}`;
    }
    else {
        url = `${HOST}/kunstwerke/`;
    }
    const response = await fetch(url);
    return await response.json();
}

/// maybe big errror with kunstwerk 
export async function postKunstwerk(kunstwerk: KunstwerkResource, files?: FileList | null) {
    try {

        const formData = new FormData();
        formData.append("titel", kunstwerk.titel);
        formData.append("beschreibung", kunstwerk.beschreibung);
        formData.append("kuenstlerID", kunstwerk.kuenstlerID);
        formData.append("preis", '' + kunstwerk.preis);
        formData.append("galerieID", kunstwerk.galerieID);
        if (kunstwerk.codeQR) {
            formData.append("codeQR", kunstwerk.codeQR);
        }
        formData.append("erscheinung", '' + kunstwerk.erscheinung);
        formData.append("ursprung", kunstwerk.ursprung);
        formData.append("verkauft", '' + kunstwerk.verkauft);
        formData.append("typ", kunstwerk.typ);

        formData.append("laenge", '' + kunstwerk.laenge);
        formData.append("breite", '' + kunstwerk.breite);
        if (kunstwerk.typ === "Gemaelde") {
            formData.append("technik", '' + kunstwerk.technik);
        }
        else if (kunstwerk.typ === "Skulptur") {
            formData.append("hoehe", '' + kunstwerk.hoehe);
            formData.append("material", '' + kunstwerk.material);
            formData.append("gewicht", '' + kunstwerk.gewicht);
        }
        if (files) {
            for (let i = 0; i < files.length; i++) {
                formData.append("bilder", files[i]);
            }
        }


        const url = `${HOST}/kunstwerk/`;
        const response = await fetch(url, {
            method: 'POST',
            // headers: {
            //     Accept: "application/json",
            //     "Content-Type": "application/json"
            // },
            // body: JSON.stringify(kunstwerk),
            body: formData,
            headers: { "Authorization": 'Bearer ' + sessionStorage.getItem('token')! },
        })
        if (response.ok) {
            return true;
        } else if (response.status === 401) {
            logout();
        }
        return false;
    } catch (error) {
        return false;
    }
}

export async function putKunstwerk(kunstwerk: KunstwerkResource, files?: FileList | null) {
    try {
        const formData = new FormData();
        formData.append("titel", kunstwerk.titel);
        formData.append("beschreibung", kunstwerk.beschreibung);
        formData.append("kuenstlerID", kunstwerk.kuenstlerID);
        formData.append("preis", '' + kunstwerk.preis);
        formData.append("galerieID", kunstwerk.galerieID);
        if (kunstwerk.codeQR) {
            formData.append("codeQR", kunstwerk.codeQR);
        }
        formData.append("erscheinung", '' + kunstwerk.erscheinung);
        formData.append("ursprung", kunstwerk.ursprung);
        formData.append("verkauft", '' + kunstwerk.verkauft);
        formData.append("typ", kunstwerk.typ);

        formData.append("laenge", '' + kunstwerk.laenge);
        formData.append("breite", '' + kunstwerk.breite);
        if (kunstwerk.typ === "Gemaelde") {
            formData.append("technik", '' + kunstwerk.technik);
        }
        else if (kunstwerk.typ === "Skulptur") {
            formData.append("hoehe", '' + kunstwerk.hoehe);
            formData.append("material", '' + kunstwerk.material);
            formData.append("gewicht", '' + kunstwerk.gewicht);
        }
        if (files) {
            for (let i = 0; i < files.length; i++) {
                formData.append("bilder", files[i]);
            }
        }


        const url = `${HOST}/kunstwerk/${kunstwerk.id}`;
        const response = await fetch(url, {
            method: 'PUT',
            // headers: {
            //     Accept: "application/json",
            //     "Content-Type": "application/json"
            // },
            // body: JSON.stringify(kunstwerk),
            body: formData,
            headers: { "Authorization": 'Bearer ' + sessionStorage.getItem('token')! },
        });
        if (response.ok) {
            return true;
        } else if (response.status === 401) {
            logout();
        }
        return false;
    } catch (err) {
        return false;
    }
}

export async function deleteKunstwerk(kunstwerkId: string): Promise<boolean> {
    try {
        const url = `${HOST}/kunstwerk/${kunstwerkId}`;
        const response = await fetch(url, {
            method: 'DELETE',
            headers: { "Authorization": 'Bearer ' + sessionStorage.getItem('token')! },
        });
        if (response.ok) {
            return true;
        } else if (response.status === 401) {
            logout();
        }
        return false;
    } catch (err) {
        return false;
    }
}

//Kuenstler  

export async function getKuenstler(kuenstlerId?: string) {

    let url = `${HOST}/kuenstlers/random`;
    if (kuenstlerId) {
        url = `${HOST}/kuenstler/${kuenstlerId}`;
    }
    const response = await fetch(url);
    return await response.json();
}



export async function postKuenstler(kuenstler: KuenstlerResource, files?: FileList | null) {
    try {
        const formData = new FormData();
        formData.append("name", kuenstler.name);
        formData.append("beschreibung", kuenstler.beschreibung);
        if (files) {
            for (let i = 0; i < files.length; i++) {
                formData.append("bilder", files[i]);
            }
        }

        const url = `${HOST}/kuenstler/`;
        const response = await fetch(url, {
            method: 'POST',
            body: formData,
            headers: { "Authorization": 'Bearer ' + sessionStorage.getItem('token')! },
            // headers: {
            //     Accept: "application/json",
            //     "Content-Type": "application/json"
            // },
            // body: JSON.stringify(kuenstler),
        })
        if (response.ok) {
            return true;
        } else if (response.status === 401) {
            logout();
        }
        return false;
    } catch (error) {
        return false;
    }
}

export async function putKuenstler(kuenstler: KuenstlerResource, files?: FileList | null) {
    try {
        const formData = new FormData();
        formData.append("name", kuenstler.name);
        formData.append("beschreibung", kuenstler.beschreibung);
        if (files) {
            for (let i = 0; i < files.length; i++) {
                formData.append("bilder", files[i]);
            }
        }

        const url = `${HOST}/kuenstler/${kuenstler.id}`;
        const response = await fetch(url, {
            method: 'PUT',
            body: formData,
            headers: { "Authorization": 'Bearer ' + sessionStorage.getItem('token')! },
            // headers: {
            //     Accept: "application/json",
            //     "Content-Type": "application/json"
            // },
            // body: JSON.stringify(kuenstler),
        });
        if (response.ok) {
            return true;
        } else if (response.status === 401) {
            logout();
        }
        return false;
    } catch (err) {
        return false;
    }
}

export async function deleteKuenstler(kuenstlerId: string): Promise<boolean> {
    try {
        const url = `${HOST}/kuenstler/${kuenstlerId}`;
        const response = await fetch(url, {
            method: 'DELETE',
            headers: { "Authorization": 'Bearer ' + sessionStorage.getItem('token')! },
        });
        if (response.ok) {
            return true;
        } else if (response.status === 401) {
            logout();
        }
        return false;
    } catch (err) {
        return false;
    }
}


export async function postNewsletter(isChecked: boolean): Promise<boolean> {

    const testRes = {
        ueberschrift: 'Neue Ausstellung in Berlin',
        beschreibung: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.',
        publish: isChecked
    }
    try {
        const url = `${HOST}/newsletter/`;
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                "Authorization": 'Bearer ' + sessionStorage.getItem('token')!,
            },
            body: JSON.stringify(testRes),
        })
        if (response.ok) {
            return true;
        } else if (response.status === 401) {
            logout();
        }
        return false;
    } catch (error) {
        return false;
    }
}

export async function getAlleKuenstler(): Promise<KuenstlerinnenResource> {
    const url = `${HOST}/kuenstlers`;
    const response = await fetch(url);
    return await response.json();
}

export async function newsletterAboBeenden2(mailId: string): Promise<boolean> {
    const url = `${HOST}/mail/${mailId}`;

    const response = await fetch(url, {
        method: "DELETE",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "id": mailId,
        })
    })

    if (response.ok) {
        return true;
    } else {
        return false;
    }
}