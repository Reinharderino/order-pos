import { Payload } from "./classes/payload";
import { JPayload, ItemElement } from "./classes/jpayload";
import { AzureFunction, Context, HttpRequest } from "@azure/functions";

const httpTrigger: AzureFunction = async function (
  context: Context,
  data: HttpRequest
): Promise<void> {
  context.log("HTTP trigger function processed a request.");

  const name = data.query.data || data.body.data;
  if (name) {
    let datos = JSON.parse(name) as Payload;

    let orden = {} as JPayload;

    orden.currency = "CLP";
    orden.type = "regular";
    orden.flow = "automatic";

    orden.from.street = datos.pickup.location.street;
    orden.from.number = datos.pickup.location.number;
    orden.from.floor = datos.pickup.location.floor ?? "";
    orden.from.apartment = datos.pickup.location.apartment ?? "";
    orden.from.city = datos.pickup.location.city;
    orden.from.state = datos.pickup.location.state ?? "";
    orden.from.postalCode = datos.pickup.location.postalCode ?? "";
    orden.from.country = datos.pickup.location.country;
    orden.from.instructions = datos.notes ?? "";

    orden.from.contact.firstName = datos.pickup.contact.name ?? "DLT";
    orden.from.contact.lastName = datos.pickup.contact.lastname ?? "SPa";
    orden.from.contact.email =
      datos.pickup.contact.email ?? "shippings@dltchile.cl";
    orden.from.contact.phone = datos.pickup.contact.phone ?? "";

    orden.to.street = datos.dropoff.location.street;
    orden.to.number = datos.dropoff.location.number;
    orden.to.floor = datos.dropoff.location.floor??"";
    orden.to.apartment = datos.dropoff.location.apartment??"";
    orden.to.city = datos.dropoff.location.city ?? "";
    orden.to.state = datos.dropoff.location.state??"";
    orden.to.postalCode = datos.dropoff.location.postalCode ?? "";
    orden.to.country = datos.dropoff.location.country??"CL";
    orden.to.instructions = datos.dropoff.location.instructions?? "";
    orden.to.contact.firstName = datos.dropoff.contact.name;
    orden.to.contact.lastName = datos.dropoff.contact.lastname??"";
    orden.to.contact.email = datos.dropoff.contact.email;
    orden.to.contact.phone = datos.dropoff.contact.phone;
    orden.to.message = datos.notes??"";

    orden.internalCode = `${datos.client_sender}-${datos.order_number}`;
    orden.extra = {};
    orden.conf.assurance = false;
    orden.conf.items = [];

    if(datos.packages.length>0){
        
        datos.packages.forEach(

            (item)=>{
                
                let itemRevisado = {} as ItemElement;
                itemRevisado.item.description = item.item.description;
                itemRevisado.item.height = item.item.height ?? 0;
                itemRevisado.item.weight = item.item.weight ?? 0;
                itemRevisado.item.width = item.item.width ?? 0;
                itemRevisado.item.quantity = item.item.quantity;

                orden.conf.items.push(itemRevisado)
              
            }
        );


    }


    context.bindings.guias = {
      // status: 200, /* Defaults to 200 */
      body: orden,
    };
    context.bindings.
    context.done;
  } else {
    context.bindings.guias = {
      status: 400,
      body: "Please pass a data on the query string or in the request body ",
    };
  }
};

export default httpTrigger;
