import type { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2022-11-15",
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Stripe.Price>
) {
  try {
    const { pid } = req.query;
    const price = await stripe.prices.retrieve(pid as string);
    res.json(price);
  } catch (error) {
    res.status(500).end("Internal server error");
  }
}
