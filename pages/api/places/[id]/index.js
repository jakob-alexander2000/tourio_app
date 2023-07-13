import dbConnect from "../../../../db/connect";
import Place from "../../../../db/models/Place";

export default async function handler(request, response) {
  await dbConnect();

  const { id } = request.query;

  if (request.method === "GET") {
    const place = await Place.findById(id);
    if (!place) {
      return response.status(404).json({ status: "Not found" });
    }
    response.status(200).json(place);
  }

  // if (request.method === "POST") {
  //   try {
  //     const placeData = request.body;
  //     const place = new Place(placeData);
  //     await place.save();
      
  
  //     response.status(201).json({ status: "Place created" });
  //   } catch (error) {
  //     console.log(error);
  //     response.status(400).json({ error: error.message });
  //   }
  // }

}
//
