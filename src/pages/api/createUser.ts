// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { sanityClient } from "../../../sanity";

export default async function createUser(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { email, image } = JSON.parse(req.body);

  try {
    await sanityClient.create({
      _type: "user",
      email,
      image,
      firstTime: false,
      supporter: false,
      vip: false,
    });
  } catch (err) {
    console.warn(err);
    return res.status(500).json({ message: `Couldn't submit user`, err });
  }
  res.status(200).json({ message: "User submitted successfully" });
}
