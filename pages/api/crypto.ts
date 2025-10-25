import type { NextApiRequest, NextApiResponse } from "next";
//"https://unruffled-sammet-4sxi15jtc.liara.run/webhook-test/31941fd9-9fd5-4fab-a1b9-9c347e26f5c9"
const N8N_WEBHOOK_URL ="https://unruffled-sammet-4sxi15jtc.liara.run/webhook/31941fd9-9fd5-4fab-a1b9-9c347e26f5c9";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // برای اجرای صحیح فلو باید POST بفرستیم
    const response = await fetch(N8N_WEBHOOK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      // در صورت نیاز می‌تونی بعداً پارامتر خاص بفرستی، فعلاً خالی:
      body: JSON.stringify({ trigger: "crypto-dashboard" }),
    });

    if (!response.ok) {
      throw new Error(`Webhook returned ${response.status}`);
    }

    const data = await response.json();

    res.status(200).json({
      status: "success",
      source: "n8n",
      data,
    });
  } catch (error: any) {
    console.error("❌ Error fetching n8n webhook:", error.message);
    res.status(500).json({
      status: "error",
      message: "خطا در دریافت داده از n8n Webhook",
    });
  }
}
