"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Sejour = /** @class */ (function () {
    function Sejour(nom, prix) {
        this.nom = nom;
        this.prix = prix;
    }
    Object.defineProperty(Sejour.prototype, "Name", {
        get: function () {
            return this.nom;
        },
        set: function (newName) {
            this.nom = newName;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Sejour.prototype, "Price", {
        get: function () {
            return this.prix;
        },
        set: function (newPrice) {
            this.Price = newPrice;
        },
        enumerable: true,
        configurable: true
    });
    return Sejour;
}());
var SejourService = /** @class */ (function () {
    function SejourService() {
        this.sejour = new Array();
        this.sejour.push(new Sejour('Paris', 20));
        this.sejour.push(new Sejour('Bordeaux', 100));
        this.sejour.push(new Sejour('Nantes', 120));
    }
    SejourService.prototype.researchParNom = function (nameGiven) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            setTimeout(function () {
                for (var i = 0; i < _this.sejour.length; i++) {
                    if (_this.sejour[i].Name == nameGiven) {
                        resolve(_this.sejour[i]);
                    }
                }
                reject("the price does not exist");
            }, 2000);
        });
    };
    return SejourService;
}());
var serviceSejour = new SejourService();
serviceSejour.researchParNom('Paris')
    .then(function (unSejour) { return console.log("name found", unSejour); })
    .catch(function (err) { return console.log(err); });
