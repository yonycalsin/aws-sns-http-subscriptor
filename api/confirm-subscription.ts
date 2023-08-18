const handler = async (req, res) => {
  const { Token, SubscribeURL } = req.query;

  // Construct the confirmation URL
  const confirmationURL = `${SubscribeURL}&Token=${encodeURIComponent(Token)}`;

  // Perform an HTTP GET request to confirm the subscription
  try {
    const fetchResponse = await fetch(confirmationURL);
    const responseBody = await fetchResponse.text();

    if (fetchResponse.ok) {
      // Respond with an HTTP 200 OK status code
      res.status(200).send('Subscription confirmed.');
    } else {
      res.status(400).send('Confirmation failed.');
    }
  } catch (error) {
    res.status(500).send('Error confirming subscription.');
  }
};

export default handler
