var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const httpTrigger = function (context, data) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t;
    return __awaiter(this, void 0, void 0, function* () {
        context.log("HTTP trigger function processed a request.");
        const name = data.query.data || data.body.data;
        if (name) {
            let datos = JSON.parse(name);
            let orden = {};
            orden.currency = "CLP";
            orden.type = "regular";
            orden.flow = "automatic";
            orden.from.street = datos.pickup.location.street;
            orden.from.number = datos.pickup.location.number;
            orden.from.floor = (_a = datos.pickup.location.floor) !== null && _a !== void 0 ? _a : "";
            orden.from.apartment = (_b = datos.pickup.location.apartment) !== null && _b !== void 0 ? _b : "";
            orden.from.city = datos.pickup.location.city;
            orden.from.state = (_c = datos.pickup.location.state) !== null && _c !== void 0 ? _c : "";
            orden.from.postalCode = (_d = datos.pickup.location.postalCode) !== null && _d !== void 0 ? _d : "";
            orden.from.country = datos.pickup.location.country;
            orden.from.instructions = (_e = datos.notes) !== null && _e !== void 0 ? _e : "";
            orden.from.contact.firstName = (_f = datos.pickup.contact.name) !== null && _f !== void 0 ? _f : "DLT";
            orden.from.contact.lastName = (_g = datos.pickup.contact.lastname) !== null && _g !== void 0 ? _g : "SPa";
            orden.from.contact.email = (_h = datos.pickup.contact.email) !== null && _h !== void 0 ? _h : "shippings@dltchile.cl";
            orden.from.contact.phone = (_j = datos.pickup.contact.phone) !== null && _j !== void 0 ? _j : "";
            orden.to.street = datos.dropoff.location.street;
            orden.to.number = datos.dropoff.location.number;
            orden.to.floor = (_k = datos.dropoff.location.floor) !== null && _k !== void 0 ? _k : "";
            orden.to.apartment = (_l = datos.dropoff.location.apartment) !== null && _l !== void 0 ? _l : "";
            orden.to.city = (_m = datos.dropoff.location.city) !== null && _m !== void 0 ? _m : "";
            orden.to.state = (_o = datos.dropoff.location.state) !== null && _o !== void 0 ? _o : "";
            orden.to.postalCode = (_p = datos.dropoff.location.postalCode) !== null && _p !== void 0 ? _p : "";
            orden.to.country = (_q = datos.dropoff.location.country) !== null && _q !== void 0 ? _q : "CL";
            orden.to.instructions = (_r = datos.dropoff.location.instructions) !== null && _r !== void 0 ? _r : "";
            orden.to.contact.firstName = datos.dropoff.contact.name;
            orden.to.contact.lastName = (_s = datos.dropoff.contact.lastname) !== null && _s !== void 0 ? _s : "";
            orden.to.contact.email = datos.dropoff.contact.email;
            orden.to.contact.phone = datos.dropoff.contact.phone;
            orden.to.message = (_t = datos.notes) !== null && _t !== void 0 ? _t : "";
            orden.internalCode = `${datos.client_sender}-${datos.order_number}`;
            orden.extra = {};
            orden.conf.assurance = false;
            orden.conf.items = [];
            if (datos.packages.length > 0) {
                datos.packages.forEach((item) => {
                    var _a, _b, _c;
                    let itemRevisado = {};
                    itemRevisado.item.description = item.item.description;
                    itemRevisado.item.height = (_a = item.item.height) !== null && _a !== void 0 ? _a : 0;
                    itemRevisado.item.weight = (_b = item.item.weight) !== null && _b !== void 0 ? _b : 0;
                    itemRevisado.item.width = (_c = item.item.width) !== null && _c !== void 0 ? _c : 0;
                    itemRevisado.item.quantity = item.item.quantity;
                    orden.conf.items.push(itemRevisado);
                });
            }
            context.bindings.guias = {
                // status: 200, /* Defaults to 200 */
                body: orden,
            };
            context.bindings.shipping = orden;
            context.done;
        }
        else {
            context.bindings.guias = {
                status: 400,
                body: "Please pass a data on the query string or in the request body ",
            };
        }
    });
};
export default httpTrigger;
