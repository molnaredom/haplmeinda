// Stripe Checkout Session létrehozása
// Ez a serverless function kezeli a Stripe fizetési munkamenetet

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

exports.handler = async (event, context) => {
  // CORS headers
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
  };

  // Handle preflight request
  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 200, headers, body: "" };
  }

  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: "Method not allowed" }),
    };
  }

  try {
    const { items, customerEmail } = JSON.parse(event.body);

    if (!items || items.length === 0) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: "Kosár üres" }),
      };
    }

    // Stripe line items létrehozása
    const lineItems = items.map((item) => ({
      price_data: {
        currency: "huf",
        product_data: {
          name: item.title,
          description: `${item.technique} - ${item.category}`,
          images: [`https://haplmelinda.netlify.app/fenykepek/${item.id}.jpg`], // Frissítsd a domain-t!
        },
        unit_amount: item.price * 100, // Stripe fillérben számol, de HUF esetén ez a teljes összeg
      },
      quantity: 1,
    }));

    // Checkout session létrehozása
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `${
        event.headers.origin || "https://haplmelinda.netlify.app"
      }/success.html?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${
        event.headers.origin || "https://haplmelinda.netlify.app"
      }/#gallery`,
      customer_email: customerEmail || undefined,
      billing_address_collection: "required",
      shipping_address_collection: {
        allowed_countries: ["HU"],
      },
      locale: "hu",
      metadata: {
        order_items: JSON.stringify(
          items.map((i) => ({ id: i.id, title: i.title }))
        ),
      },
    });

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ sessionId: session.id, url: session.url }),
    };
  } catch (error) {
    console.error("Stripe error:", error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
