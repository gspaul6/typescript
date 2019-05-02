import { promises } from "fs";
import jsdom from 'jsdom';
import request, { RequestPromise, RequestPromiseAPI } from 'request-promise-native';
import { Http2SecureServer, Http2ServerRequest, ServerHttp2Stream } from "http2";
import { HttpArchiveRequest } from "request";
import { Resolver } from "dns";
//const request = require('request-promise-native');


function rechercherColleguesParNom(nomRecherche:string, callbackOk:any, callbackNotOk:any) {


    request('https://paul-collegues-api.herokuapp.com/collegues?nom=' + nomRecherche, { json: true }, (err: Error, res: any, body: any) => {

        
        if (err) {
            callbackNotOk("you have an error");
        } else if (res.statusCode >= 400 && res.statusCode <= 499) {

            callbackNotOk('Erreur dans les informations de la requête');

        } else if (res.statusCode >= 500 && res.statusCode <= 599) {

            callbackNotOk('Erreur côté serveur');

        } else {
            let tabMatricules = body;
            let collegue:any[] = [];
            let nbRequetesATraiter = tabMatricules.length;
            tabMatricules.forEach((matricule:any) => {
                rechercherColleguesParMatricule(matricule, (collegueTrouve:any) => {
                    nbRequetesATraiter--; // ?

                    collegue.push(collegueTrouve);



                    if (nbRequetesATraiter === 0) {

                        callbackOk(collegue);

                    }
                })

            });
        }




       // callbackOk(collegue); // retour du résultat
    });

}
function rechercherColleguesParNom2(nomRecherche:string, callback:any, callbackErr:any) {
    request(`https://paul-collegues-api.herokuapp.com/collegues?nom=${nomRecherche}`, {
        json: true
    }, (err:Error, res:any, body:any) => {
        if (err) { callbackErr('error is there', err); }
        let tabMatricules:any = body;
        function trouverCollegues(tabMats:any, tabResultats:any) {
            if (tabMats.length === 0) {
                callback([]);
            }
            let matricule = tabMats.pop();

            rechercherColleguesParMatricule(matricule, (collegueTrouve:any) => {
                tabResultats.push(collegueTrouve);
                if (tabMats.length > 0) {
                    trouverCollegues(tabMats, tabResultats);
                } else {
                    callback(tabResultats);
                }
            });

        }
        trouverCollegues(tabMatricules, []);
    });
}

function rechercherColleguesParNom3(nomRecherche:string):Promise<Object>{
    return new Promise((resolve, reject) => {
        let tabPromise:any[] = [];
        const MatriculesPromise$:any = request('https://paul-collegues-api.herokuapp.com/collegues?nom=' + nomRecherche, { json: true });
        //tabPromise = [promise0,promise1]
        MatriculesPromise$
            .then((matricules:any) => {
                matricules.forEach((matricule:string) => { rechercherColleguesParMatricule2(matricule) 
                .then(tabPromise.push(matricule))
            });

        Promise.all((MatriculesPromise$)).then((collegues:Object) => resolve(collegues)).catch((err:Error) => reject("there is an error with the recuperation"));
    }).catch((err:Error) => reject("error in code"));
});
}


function rechercherColleguesParMatricule2(matriculeRecherche:any) :any{
    return new Promise((resolve, reject) => {
        const objetCollegue$ = request(`https://paul-collegues-api.herokuapp.com/collegues/${matriculeRecherche}`, { json: true });
        if (objetCollegue$) {
            resolve(objetCollegue$);
        }
        else {
            reject("il y a un error");
        }


    });
}

function rechercherColleguesParMatricule(matriculeRecherche:string, callback:any) {

    request(`https://paul-collegues-api.herokuapp.com/collegues/${matriculeRecherche}`, { json: true }, (err:Error, res:any, body:any) => {


        let tableauColleguesTrouvesParMatricule = body;

        callback(tableauColleguesTrouvesParMatricule); // retour du résultat
    });

}
function addCollegues(myJSONObject:Object) {

    request({

        url: `https://paul-collegues-api.herokuapp.com/collegues`,

        method: 'POST',

        json: true,

        body: myJSONObject,

    }, function (err, res, body) {

        if (err) { console.log('error is there', err); }
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
