"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var request_promise_native_1 = __importDefault(require("request-promise-native"));
//const request = require('request-promise-native');
function rechercherColleguesParNom(nomRecherche, callbackOk, callbackNotOk) {
    request_promise_native_1.default('https://paul-collegues-api.herokuapp.com/collegues?nom=' + nomRecherche, { json: true }, function (err, res, body) {
        if (err) {
            callbackNotOk("you have an error");
        }
        else if (res.statusCode >= 400 && res.statusCode <= 499) {
            callbackNotOk('Erreur dans les informations de la requête');
        }
        else if (res.statusCode >= 500 && res.statusCode <= 599) {
            callbackNotOk('Erreur côté serveur');
        }
        else {
            var tabMatricules = body;
            var collegue_1 = [];
            var nbRequetesATraiter_1 = tabMatricules.length;
            tabMatricules.forEach(function (matricule) {
                rechercherColleguesParMatricule(matricule, function (collegueTrouve) {
                    nbRequetesATraiter_1--; // ?
                    collegue_1.push(collegueTrouve);
                    if (nbRequetesATraiter_1 === 0) {
                        callbackOk(collegue_1);
                    }
                });
            });
        }
        // callbackOk(collegue); // retour du résultat
    });
}
function rechercherColleguesParNom2(nomRecherche, callback, callbackErr) {
    request_promise_native_1.default("https://paul-collegues-api.herokuapp.com/collegues?nom=" + nomRecherche, {
        json: true
    }, function (err, res, body) {
        if (err) {
            callbackErr('error is there', err);
        }
        var tabMatricules = body;
        function trouverCollegues(tabMats, tabResultats) {
            if (tabMats.length === 0) {
                callback([]);
            }
            var matricule = tabMats.pop();
            rechercherColleguesParMatricule(matricule, function (collegueTrouve) {
                tabResultats.push(collegueTrouve);
                if (tabMats.length > 0) {
                    trouverCollegues(tabMats, tabResultats);
                }
                else {
                    callback(tabResultats);
                }
            });
        }
        trouverCollegues(tabMatricules, []);
    });
}
function rechercherColleguesParNom3(nomRecherche) {
    return new Promise(function (resolve, reject) {
        var tabPromise = [];
        var MatriculesPromise$ = request_promise_native_1.default('https://paul-collegues-api.herokuapp.com/collegues?nom=' + nomRecherche, { json: true });
        //tabPromise = [promise0,promise1]
        MatriculesPromise$
            .then(function (matricules) {
            matricules.forEach(function (matricule) {
                rechercherColleguesParMatricule2(matricule)
                    .then(tabPromise.push(matricule));
            });
            Promise.all(function (MatriculesPromise$) { return ; }).then(function (collegues) { return resolve(collegues); }).catch(function (err) { return reject("there is an error with the recuperation"); });
        }).catch(function (err) { return reject("error in code"); });
    });
}
function rechercherColleguesParMatricule2(matriculeRecherche) {
    return new Promise(function (resolve, reject) {
        var objetCollegue$ = request_promise_native_1.default("https://paul-collegues-api.herokuapp.com/collegues/" + matriculeRecherche, { json: true });
        if (objetCollegue$) {
            resolve(objetCollegue$);
        }
        else {
            reject("il y a un error");
        }
    });
}
function rechercherColleguesParMatricule(matriculeRecherche, callback) {
    request_promise_native_1.default("https://paul-collegues-api.herokuapp.com/collegues/" + matriculeRecherche, { json: true }, function (err, res, body) {
        var tableauColleguesTrouvesParMatricule = body;
        callback(tableauColleguesTrouvesParMatricule); // retour du résultat
    });
}
function addCollegues(myJSONObject) {
    request_promise_native_1.default({
        url: "https://paul-collegues-api.herokuapp.com/collegues",
        method: 'POST',
        json: true,
        body: myJSONObject,
    }, function (err, res, body) {
        if (err) {
            console.log('error is there', err);
        }
        console.info('POST result:\n', body);
        // callback(tableauCollegues); // retour du résultat
    });
    // request.post({ uri: 'https://paul-collegues-api.herokuapp.com/collegues', body: myJSONObject, json: true }, function (err, res, body) {
    //if (err) { console.log('error is there', err); }
    // console.info('POST result:\n', body);
    // callback(tableauCollegues); // retour du résultat
    //  });
}
exports.rechercherParNom3 = rechercherColleguesParNom3;
exports.rechercherParMatricule2 = rechercherColleguesParMatricule2;
exports.addCollegues = addCollegues;
