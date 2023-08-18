
export default async function handler(
  request,
  response,
) {
  const body = request?.body

  if(body?.SubscribeURL) {
    await fetch(body.SubscribeURL)

    return response.status(200).send("Subscription confirmed.")
  }

  return response.status(200).send("Hello World");
}
