//import { Promise } from 'es6-promise';
import jsdom from 'jsdom';
import request from 'request-promise-native';
class Sejour {
    private nom: string;
    private prix: number
    constructor(nom: string, prix: number) {
        this.nom = nom;
        this.prix = prix;
    }
    get Name(): string {
        return this.nom;
    }
    get Price(): number {
        return this.prix;
    }
    set Name(newName: string) {
        this.nom = newName;
    }
    set Price(newPrice: number) {
        this.Price = newPrice;
    }
}

class SejourService {
    private sejour: Sejour[] = new Array();
    constructor() {
        this.sejour.push(new Sejour('Paris', 20));
        this.sejour.push(new Sejour('Bordeaux', 100));
        this.sejour.push(new Sejour('Nantes', 120));
    }
    researchParNom(nameGiven: string): Promise<Sejour> {
        return new Promise((resolve, reject) => {
            setTimeout(() => {

                for (let i = 0; i < this.sejour.length; i++) {
                    if (this.sejour[i].Name == nameGiven) {

                        resolve(this.sejour[i]);
                    }

                }
                reject("the price does not exist");
            }, 2000)

        });

    }
}
let serviceSejour = new SejourService();
serviceSejour.researchParNom('Paris')
    .then(unSejour => console.log("name found", unSejour))
    .catch(err => console.log(err));