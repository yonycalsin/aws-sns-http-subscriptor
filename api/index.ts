import { VercelRequest, VercelResponse } from "@vercel/node"


export default async function handler(request: VercelRequest, response: VercelResponse) {

  // This logic is to confirm the subscription when using aws-sns
  if (process.env.CONFIRM_SUBSCRIPTION_CATCHER) {

    const confirmSubscriptionCatcherEndpoint = new URL(process.env.CONFIRM_SUBSCRIPTION_CATCHER)

    confirmSubscriptionCatcherEndpoint.searchParams.set("_originalUrl", request.url as string)

    const confirmSubscriptionCatcherOptions: RequestInit = {
      method: request.method,
      body: request.body,
      headers: request.headers as Record<string, any>
    }

    try {
      await fetch(confirmSubscriptionCatcherEndpoint, confirmSubscriptionCatcherOptions)

    } catch (error) {
      console.error(error)

      return response.status(400).json({
        message: `The confirmation was not successfully: ${error}`,
      })
    }
  }

  return response.status(200).send("Subscription executed.");
}
