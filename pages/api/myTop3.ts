// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { sanityClient } from "../../sanity";

export default async function myTop3(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { game1, game2, game3, _id } = JSON.parse(req.body);

  try {
    await sanityClient
      .patch(_id)
      .set({ gamesPlayed: [game1, game2, game3] })
      .commit()
      .catch((err) => console.warn(err));
    res.status(200).json({ message: "Top3 submitted Successfully" });
  } catch (e) {
    alert(e);
    return res.status(500).json({ message: `Couldn't submit Top3`, e });
  }
}
