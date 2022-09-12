// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { sanityClient } from "../../../sanity";

export default async function getSeshInfo(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = JSON.parse(req.body);
  let query = `*[_type == "sesh" && _id == $id]`;

  try {
    const seshInfo = await sanityClient.fetch(query, { id: id });
    res.status(200).send({ seshInfo });
  } catch (e) {
    res.status(500).send({ error: "failed to fetch data" + e });
  }
}
