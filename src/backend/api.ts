// import Cookies from "js-cookie";
// import jwtDecode from "jwt-decode";
import Cookies from "js-cookie";
import { AdminResource, GalerieResource, GalerienResource, NachrichtResource, NewsletterResource, NewslettersResource } from "../components/Resources";
// import { Buffer } from 'buffer';
import jwtDecode from "jwt-decode";


const HOST = process.env.REACT_APP_API_SERVER_URL;

export async function getGalerien(): Promise<GalerienResource> {
    const url = `${HOST}/galerien`;
    const response = await fetch(url);
    return await response.json();
}

export async function getGalerie(galerieId: string): Promise<GalerieResource> {
    const url = `${HOST}/galerie/${galerieId}`;
    const response = await fetch(url);
    return await response.json();
}

export async function postGalerie(gr: GalerieResource, files?: FileList | null): Promise<boolean> {
    try {

        const formData = new FormData();
        formData.append("name", gr.name);
        formData.append("beschreibung", gr.beschreibung);
        formData.append("strasse", gr.strasse);
        formData.append("hausnummer", gr.hausnummer);
        formData.append("plz", gr.plz);
        formData.append("stadt", gr.stadt);
        formData.append("land", gr.land);
        formData.append("email", gr.email);
        formData.append("telefon", gr.telefon);
        // formData.append("oeffnungszeiten", gr.oeffnungszeiten!.toString());
        formData.append("oeffnungszeiten", gr.oeffnungszeiten![0]);
        formData.append("oeffnungszeiten", gr.oeffnungszeiten![1]);
        if (files) {
            for (let i = 0; i < files.length; i++) {
                formData.append("bilder", files[i]);
            }
        }
        const url = `${HOST}/galerie`;
        const response = await fetch(url, {
            method: 'POST',
            body: formData,
            // headers: {
            //     Accept: "application/json",
            //     "Content-Type": "application/json"
            // },
            // body: JSON.stringify({
            //     "name": gr.name,
            //     "beschreibung": gr.beschreibung,
            //     "bilder": gr.bilder,
            //     "adresse": {
            //         "strasse": gr.adresse.strasse,
            //         "hausnummer": gr.adresse.hausnummer,
            //         "plz": gr.adresse.plz,
            //         "stadt": gr.adresse.stadt,
            //         "land": gr.adresse.land,
            //     },
            //     "email": gr.email,
            //     "telefon": gr.telefon,
            // })
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

export async function putGalerie(gr: GalerieResource, files?: FileList | null): Promise<boolean> {
    try {

        const formData = new FormData();
        formData.append("name", gr.name);
        formData.append("beschreibung", gr.beschreibung);
        formData.append("strasse", gr.strasse);
        formData.append("hausnummer", gr.hausnummer);
        formData.append("plz", gr.plz);
        formData.append("stadt", gr.stadt);
        formData.append("land", gr.land);
        formData.append("email", gr.email);
        formData.append("telefon", gr.telefon);
        formData.append("oeffnungszeiten", gr.oeffnungszeiten![0]);
        formData.append("oeffnungszeiten", gr.oeffnungszeiten![1]);
        if (files) {
            for (let i = 0; i < files.length; i++) {
                formData.append("bilder", files[i]);
            }
        }

        const url = `${HOST}/galerie/${gr.id}`;
        const response = await fetch(url, {
            method: 'PUT',
            body: formData,
            // headers: {
            //     Accept: "application/json",
            //     "Content-Type": "application/json"
            // },
            // body: JSON.stringify({
            //     "id": gr.id,
            //     "name": gr.name,
            //     "beschreibung": gr.beschreibung,
            //     "bilder": gr.bilder,
            //     "adresse": {
            //         "strasse": gr.adresse.strasse,
            //         "hausnummer": gr.adresse.hausnummer,
            //         "plz": gr.adresse.plz,
            //         "stadt": gr.adresse.stadt,
            //         "land": gr.adresse.land,
            //     },
            //     "email": gr.email,
            //     "telefon": gr.telefon,
            // })
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

export async function deleteGalerie(galerieId: string): Promise<boolean> {
    try {
        const url = `${HOST}/galerie/${galerieId}`;
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

// export async function login(email: string, password: string): Promise<boolean> {
//     const url = `${HOST}/login`;
//     const reponse = await fetch(url, {
//         method: 'POST',
//         headers: {
//             Accept: "application/json",
//             "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ "email": email, "password": password }),
//     });
//     return reponse.ok;
// }

// export async function login(email: string, password: string): Promise<Boolean> {
//     const url = `${HOST}/login`
//     try {
//         let params: RequestInit = {
//             method: 'POST',
//             body: new Blob([JSON.stringify({
//                 "email": email,
//                 "password": password
//             })]),
//             headers: {
//                 Accept: "application/json",
//                 "Content-Type": "application/json"
//             }
//         }
//         const response = await fetch(url, params)
//         if (response.ok) {
//             return true;
//         } else {
//             return false;
//         }
//     } catch (err) {
//         return false;
//     }
// }

export async function login(email: string, password: string): Promise<string | undefined> {
    const url = `${HOST}/login`
    try {
        let params: RequestInit = {
            method: 'POST',
            body: new Blob([JSON.stringify({
                "email": email,
                "password": password
            })]),
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            }
        }
        const response = await fetch(url, params)
        if (response.ok) {
            const body = await response.json();
            const token = body.access_token;
            const jwt: any = jwtDecode(token);
            const adminID = jwt.sub;

            sessionStorage.setItem('token', token);

            return adminID;

            // return true;
        } else {
            return undefined;
        }
    } catch (err) {
        return undefined;
    }
}

export async function logout() {
    Cookies.remove("access_token");
    sessionStorage.removeItem("token");
}

export async function getAdmin(adminId: string): Promise<AdminResource> {
    const url = `${HOST}/admin/${adminId}`;
    const response = await fetch(url, { headers: { "Authorization": 'Bearer ' + sessionStorage.getItem('token')! } });
    return await response.json();
}

export async function postAdmin(ar: AdminResource): Promise<boolean> {
    try {
        const url = `${HOST}/admin`;
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                "Authorization": 'Bearer ' + sessionStorage.getItem('token')!,
            },
            body: JSON.stringify({
                "name": ar.name,
                "email": ar.email,
                "password": ar.password,
            })
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

export async function putAdmin(ar: AdminResource): Promise<boolean> {
    try {
        const url = `${HOST}/admin/${ar.id}`;
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                "Authorization": 'Bearer ' + sessionStorage.getItem('token')!,
            },
            body: JSON.stringify({
                "id": ar.id,
                "name": ar.name,
                "email": ar.email,
                "password": ar.password,
            })
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

export async function deleteAdmin(adminId: string): Promise<boolean> {
    try {
        const url = `${HOST}/admin/${adminId}`;
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

// export async function getImageUrl(d: { data: Buffer, contentType: String }): Promise<string> {
//     const buffer = Buffer.from(d.data);
//     const base64Image = buffer.toString('base64');
//     const contentType = d.contentType;
//     return `data:${contentType};base64,${base64Image}`;
// }

// getImageUrl() holt eine Bilddatei aus dem Backend und liefert dessen URL zurück
// Als Parameter nimmt diese Methode ein string object, z.B: "kunstwerk", die id des Objektes, und das Index der Bild 
export async function getImageUrl(object: string, id: string, index?: number): Promise<string> {
    try {
        let url;

        if (index) {
            url = `${HOST}/${object}/${id}/image/${index}`;
        } else {
            url = `${HOST}/${object}/${id}/image/0`;
        }

        // hole die Datei aus dem Backend
        const response = await fetch(url);

        // in Blob umwandeln
        const blb = await response.blob()

        // Blob in string umwandeln, was dem URL entspricht
        const src = URL.createObjectURL(blb);

        return src;

    } catch (err) {
        throw (err);
    }

}

// export function getAdminIdFromJWT() {
//     const cookie = Cookies.get("access_token");
//     if (cookie) {
//         const jwt: any = jwtDecode(cookie);
//         const adminID = jwt.sub;
//         return adminID;
//     }
//     return undefined;
// }

export function getAdminIdFromJWT() {
    const token = sessionStorage.getItem('token');
    return token ?? undefined;
}

export async function newsletterAbonnieren(email: string): Promise<boolean> {
    const url = `${HOST}/mail`;

    const response = await fetch(url, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "email": email,
        })
    })

    if (response.ok) {
        return true;
    } else {
        return false;
    }
}

export async function newsletterAboBeenden(email: string): Promise<boolean> {
    const url = `${HOST}/mail`;

    const response = await fetch(url, {
        method: "DELETE",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "email": email,
        })
    })

    if (response.ok) {
        return true;
    } else {
        return false;
    }
}

export async function getNewsletters(): Promise<NewslettersResource> {
    const url = `${HOST}/newsletters`;
    const response = await fetch(url);

    return await response.json();
}

export async function checkEmail(email: string): Promise<boolean> {
    const url = `${HOST}/mail/${email}`;

    const response = await fetch(url)

    const result: { vorhanden: boolean } = await response.json();
    return result.vorhanden!;
}

export async function galerieKontaktieren(nachrichtRes: NachrichtResource) {
    const url = `${HOST}/nachricht`;

    const response = await fetch(url, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(nachrichtRes),
    })

    if (response.ok) {
        return true;
    } else {
        return false;
    }
}

export async function getNewsletter(id: string): Promise<NewsletterResource> {
    try {
        const url = `${HOST}/newsletter/${id}`;
        const response = await fetch(url);
        return await response.json();
    } catch (err) {
        throw (err);
    }
}

export async function postNewsletter(nr: NewsletterResource, files?: FileList | null): Promise<boolean> {

    try {

        const formData = new FormData();
        formData.append("ueberschrift", nr.ueberschrift);
        formData.append("beschreibung", nr.beschreibung);
        if (files) {
            for (let i = 0; i < files.length; i++) {
                formData.append("bilder", files[i]);
            }
        }

        const url = `${HOST}/newsletter/`;
        const response = await fetch(url, {
            method: 'POST',
            body: formData,
            headers: { "Authorization": 'Bearer ' + sessionStorage.getItem('token')! }
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

export async function putNewsletter(nr: NewsletterResource, files?: FileList | null): Promise<boolean> {

    try {
        const formData = new FormData();
        formData.append("ueberschrift", nr.ueberschrift);
        formData.append("beschreibung", nr.beschreibung);
        formData.append('publish', `${nr.publish}`)
        if (files) {
            for (let i = 0; i < files.length; i++) {
                formData.append("bilder", files[i]);
            }
        }

        const url = `${HOST}/newsletter/${nr.id}`;
        const response = await fetch(url, {
            method: 'PUT',
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

export async function deleteNewsletter(newsletterId: string): Promise<boolean> {
    try {
        const url = `${HOST}/newsletter/${newsletterId}`;
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


