"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// récupération du module `readline`
var readline = require('readline');
var moduleA = require('./service.js');
// création d'un objet `rl` permettant de récupérer la saisie utilisateur
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
function start() {
    console.log('choose an option, either 1 or 99' + "\n"
        + '1. Rechercher un collègue par nom' + "\n"
        + '2. Créer un collègue' + "\n"
        + '3. Modifier lemail' + "\n"
        + '4. Modifier la photo' + "\n"
        + '99. Sortir');
    rl.question('enter an option :', function (demande) {
        if (demande == 1) {
            console.log(">> Recherche en cours du nom xxx");
            rl.question('give the nom : ', function (getNom) {
                var nomreseacrh$ = moduleA.rechercherParNom3("" + getNom, function (collegues) {
                    collegues.forEach(function (collegue) {
                        console.log(collegue.nom + " " + collegue.prenoms + " (" + collegue.dateDeNaissance + ")");
                    });
                    //    moduleA.rechercherParNom(`${getNom}`, (resp)=>{
                    //      return moduleA.rechercherParMatricule(resp, (collegues) => {
                    //        return console.log(collegues['nom'] + ' ' + collegues['prenoms'] + ' ' + collegues['dateDeNaissance']);
                    //  });
                    start();
                    //(messageErr) => {
                    //console.log('OOps :', messageErr);
                    // start(); }
                }).catch(function (err) { return console.log(err); });
            });
        }
        else if (demande == 2) {
            var Collegue_1 = /** @class */ (function () {
                function Collegue(nom, prenoms, dateDeNaissance, photoUrl, email) {
                    this.nom = nom;
                    this.prenoms = prenoms;
                    this.dateDeNaissance = dateDeNaissance;
                    this.photoUrl = photoUrl;
                    this.email = email;
                } //return this.nom+''+this.prenom;
                return Collegue;
            }());
            rl.question('enter the nom :', function (nomAsked) {
                rl.question('enter the prenom :', function (prenomAsked) {
                    rl.question('enter the date of birth :', function (dateAsked) {
                        rl.question('enter the email :', function (emailAsked) {
                            rl.question('enter the photo with http:// :', function (photoAsked) {
                                var newCollegue = new Collegue_1(nomAsked, prenomAsked, dateAsked, photoAsked, emailAsked);
                                moduleA.addCollegues(newCollegue);
                            });
                        });
                    });
                });
            });
        }
        else if (demande == 99) {
            console.log("Aurevoir :-)");
            rl.close();
        }
    });
}
exports.start = start;
