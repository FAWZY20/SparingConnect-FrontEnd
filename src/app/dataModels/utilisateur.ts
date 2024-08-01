import { Profil } from "./profil";

export class Utilisateur {
    id: string = "";
    nom: string = "";
    prenom: string = "";
    mail: string = "";
    password: string = "";
    age: number = 0;
    ville: string = "";
    description: string = "";
    profileImageUrl?: string;
    profile?: Profil;
}