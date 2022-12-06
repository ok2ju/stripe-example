import type { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2022-11-15",
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Stripe.ApiList<Stripe.Product>>
) {
  try {
    const products = await stripe.products.list({
      limit: 10,
    });
    res.json(products);
  } catch (error) {
    res.status(500).end("Internal server error");
  }
}
