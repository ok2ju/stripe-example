import Head from "next/head";
import Stripe from "stripe";
import { API_BASE_URL } from "../constants";

interface HomePageProps {
  products: Array<Stripe.Product>;
}

export default function Home({ products }: HomePageProps) {
  const handleCheckout =
    (priceId: string | Stripe.Price | null | undefined) => async () => {
      if (priceId) {
        const response = await fetch(`${API_BASE_URL}/checkout_sessions`, {
          method: "POST",
          body: JSON.stringify({ priceId }),
        });
        const { sessionUrl } = await response.json();
        window.location.href = sessionUrl;
      }
    };

  return (
    <div>
      <Head>
        <title>Stripe Example</title>
        <meta name="description" content="Stripe example next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex px-6 py-9">
        {products.map((product) => (
          <div
            key={product.id}
            className="w-48 shadow-md p-2 mx-2 bg-white rounded flex flex-col"
          >
            <div className="w-full pt-[140px] bg-slate-200"></div>
            <div className="flex-1">
              <h1 className="text-lg font-semibold mt-2 text-slate-700">
                {product.name}
              </h1>
              <p className="text-sm mb-2 text-slate-400">
                {product.description}
              </p>
            </div>
            <div>
              <button
                type="button"
                className="w-full px-4 py-2 font-semibold text-sm bg-sky-500 text-white rounded-none shadow-sm"
                onClick={handleCheckout(product.default_price)}
              >
                Checkout
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  const response = await fetch(`${API_BASE_URL}/products`);
  const data = await response.json();
  return {
    props: {
      products: data.data,
    },
  };
}
