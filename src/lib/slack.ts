interface ContactFormData {
  company: string;
  name: string;
  email: string;
  phone?: string;
  message: string;
}

export async function sendSlackNotification(
  data: ContactFormData
): Promise<boolean> {
  const webhookUrl = process.env.SLACK_WEBHOOK_URL;

  if (!webhookUrl) {
    console.error("SLACK_WEBHOOK_URL is not set");
    return false;
  }

  const payload = {
    text: "新しいお問い合わせが届きました",
    blocks: [
      {
        type: "header",
        text: {
          type: "plain_text",
          text: "新しいお問い合わせ",
        },
      },
      {
        type: "section",
        fields: [
          { type: "mrkdwn", text: `*会社名:*\n${data.company}` },
          { type: "mrkdwn", text: `*氏名:*\n${data.name}` },
          { type: "mrkdwn", text: `*メール:*\n${data.email}` },
          { type: "mrkdwn", text: `*電話:*\n${data.phone || "未記入"}` },
        ],
      },
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: `*お問い合わせ内容:*\n${data.message}`,
        },
      },
    ],
  };

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    return response.ok;
  } catch (error) {
    console.error("Failed to send Slack notification:", error);
    return false;
  }
}
