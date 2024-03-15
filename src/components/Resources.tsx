export type AdminResource = {
    id?: string
    name: string
    email: string
    password?: string
}

export type GalerienResource = {
    galerien: GalerieResource[]
}

export type GalerieResource = {
    id?: string
    name: string
    beschreibung: string
    // bilder?: [{ data: Buffer, contentType: String }]
    bilder?: string[]
    // adresse: {
    // strasse: string
    // hausnummer: string
    // plz: string
    // stadt: string
    // land: string
    // }
    strasse: string
    hausnummer: string
    plz: string
    stadt: string
    land: string
    email: string
    telefon: string
    oeffnungszeiten?: string[] // [0] -> Tage ; [1] -> Uhrzeit
}

export type KunstwerkeResource = {
    kunstwerke: KunstwerkResource[]
}

export type KunstwerkResource = {
    id?: string
    titel: string
    kuenstlerID: string
    preis: number
    beschreibung: string
    galerieID: string
    codeQR?: string
    erscheinung: number
    ursprung: string
    verkauft: boolean
    bilder?: string[]
    // bilder?: [{ data: Buffer, contentType: String }]

    typ: string

    laenge?: number
    breite?: number
    hoehe?: number
    material?: string
    gewicht?: number

    technik?: string
}

export type KuenstlerResource = {
    id?: string
    name: string
    beschreibung: string
    bilder?: string[]
    // bilder?: [{ data: Buffer, contentType: String }]
}

export type KuenstlerinnenResource = {
    kuenstlerinnen: KuenstlerResource[];
}

// Kundenkontakt mit Galerie
export type NachrichtResource = {
    name: string // Name des Senders
    von: string // Email des Senders
    galerie: string // Name der Galerie
    an: string // Email der Galerie
    titel: string // Kunstwerk Titel
    nachricht: string  // Inhalt der Email
}

export type ValidationMessages<T> = {
    [K in keyof T]?: string;
}

export type NewsletterResource = {
    id?: string
    ueberschrift: string
    beschreibung: string
    bilder?: string[]
    publish?: boolean
    createdAt?: string
}

export type NewslettersResource = {
    newsletters: NewsletterResource[]
}
