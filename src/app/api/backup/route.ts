import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { url, data, test } = body;

    if (!url) {
      return NextResponse.json(
        { error: "بەستەری وێبهوک (Webhook URL) دیاری نەکراوە." },
        { status: 400 }
      );
    }

    // Prepare payload
    const payload = test
      ? { action: "test", timestamp: new Date().toISOString() }
      : { action: "backup", data, timestamp: new Date().toISOString() };

    // Forward the request to the Google Apps Script Webhook
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Google Webhook Error:", errorText);
      return NextResponse.json(
        { error: "پەیوەندی بە گووگڵەوە سەرکەوتوو نەبوو. تکایە بەستەرەکە بپشکنەوە." },
        { status: response.status }
      );
    }

    // Google Apps Script usually returns a text or JSON response. We'll try to parse it.
    let resultData;
    try {
      const text = await response.text();
      resultData = text ? JSON.parse(text) : { status: "success" };
    } catch (e) {
      resultData = { status: "success", note: "Response was not JSON." };
    }

    return NextResponse.json({
      success: true,
      message: test ? "پەیوەندییەکە سەرکەوتوو بوو!" : "داتاکان بە سەرکەوتوویی هاوکات کران.",
      data: resultData
    });
  } catch (error) {
    console.error("Backup API Error:", error);
    return NextResponse.json(
      { error: "هەڵەیەک لە سێرڤەر ڕوویدا لە کاتی ناردنی داتاکان." },
      { status: 500 }
    );
  }
}
