import Head from "next/head";
import Stripe from "stripe";

interface HomePageProps {
  products: Array<Stripe.Product>;
}

export default function Home({ products }: HomePageProps) {
  const handleCheckout = (priceId) => async () => {
    const response = await fetch(
      "http://localhost:3000/api/checkout_sessions",
      {
        method: "POST",
        body: JSON.stringify({ priceId }),
      }
    );
    const { sessionUrl } = await response.json();
    window.location.href = sessionUrl;
  };

  return (
    <div>
      <Head>
        <title>Stripe Example</title>
        <meta name="description" content="Stripe example next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        {products.map((product) => (
          <div key={product.id}>
            <h1>{product.name}</h1>
            <p>{product.description}</p>
            <button
              type="button"
              onClick={handleCheckout(product.default_price)}
            >
              Checkout
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  const response = await fetch("http://localhost:3000/api/products");
  const data = await response.json();
  return {
    props: {
      products: data.data,
    },
  };
}
