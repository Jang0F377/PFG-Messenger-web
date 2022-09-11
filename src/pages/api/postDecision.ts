// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { sanityClient } from "../../../sanity";

export default async function postDecision(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { decision, _id, seshId } = JSON.parse(req.body);
  if (decision === "Confirm") {
    try {
      await sanityClient
        .patch(seshId)
        .setIfMissing({ usersConfirmed: [] })
        .append("usersConfirmed", [{ _type: "reference", _ref: _id }])
        .commit({ autoGenerateArrayKeys: true });
    } catch (e) {
      return res.status(500).json({ message: `Couldn't submit decision`, e });
    }
    res.status(200).json({ message: "Decision sent successfully" });
  } else if (decision === "Decline") {
    try {
      await sanityClient
        .patch(seshId)
        .setIfMissing({ usersDeclined: [] })
        .append("usersDeclined", [{ _type: "reference", _ref: _id }])
        .commit({ autoGenerateArrayKeys: true });
    } catch (e) {
      return res.status(500).json({ message: `Couldn't submit decision`, e });
    }
    res.status(200).json({ message: "Decision sent successfully" });
  }
}
