// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { sanityClient } from "../../sanity";

export default async function createSesh(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { recipients, game, proposedTime, proposedDay, sentFrom } = JSON.parse(
    req.body
  );
  const date = new Date().toLocaleTimeString();
  const date1 = date.replace(/[^0-9A-Z*]/g, ".");
  const givenId = `${date1}.${proposedDay}`;

  try {
    await sanityClient.create({
      _type: "sesh",
      _id: givenId,
      game,
      proposedTime,
      proposedDay,
      sentFrom: {
        _type: "reference",
        _ref: sentFrom,
      },
    });
    await recipients.forEach((id: string) => {
      sanityClient
        .patch(givenId)
        .setIfMissing({ recipients: [] })
        .append("recipients", [{ _type: "reference", _ref: id }])
        .commit({ autoGenerateArrayKeys: true });
    });
  } catch (e) {
    console.warn(e);
    return res.status(500).json({ message: `Couldn't submit sesh`, e });
  }
  res.status(200).json({ message: "Sesh created successfully" });
}
