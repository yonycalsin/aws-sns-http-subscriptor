import { VercelRequest, VercelResponse } from "@vercel/node"


export default async function handler(request: VercelRequest, response: VercelResponse) {

  // This logic is to confirm the subscription when using aws-sns
  if (process.env.CONFIRM_SUBSCRIPTION_CATCHER) {
    try {
      await fetch(`${process.env.CONFIRM_SUBSCRIPTION_CATCHER}?originalUrl=${request.url}`, {
        method: request.method,
        headers: request.headers as Record<string, any>,
        body: request.body,
      })

    } catch (error) {
      console.error(error)
    }
  }

  return response.status(200).send("Subscription executed.");
}
