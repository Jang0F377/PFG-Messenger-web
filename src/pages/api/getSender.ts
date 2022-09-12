// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { sanityClient } from "../../../sanity";

export default async function getSender(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { ref } = JSON.parse(req.body);
  let query = `*[_type == "user" && _id == $id]{
        email,
        image
    }`;
  try {
    const senderInfo = await sanityClient.fetch(query, { id: ref });
    res.status(200).send({ senderInfo });
  } catch (e) {
    res.status(500).send({ error: "failed to fetch data" + e });
  }
}
