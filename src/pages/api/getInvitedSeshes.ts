// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { sanityClient } from "../../../sanity";

export default async function getInvitedSeshes(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { _id } = JSON.parse(req.body);
  const query = `*[_type == "user" && _id == "${_id}"]{
  upcomingSeshes,
  seshInvites
}`;
  try {
    const incomingInvites = await sanityClient.fetch(query, { id: _id });
    res.status(200).send({ incomingInvites });
  } catch (e) {
    res.status(500).send({ error: "failed to fetch data" + e });
  }
}
