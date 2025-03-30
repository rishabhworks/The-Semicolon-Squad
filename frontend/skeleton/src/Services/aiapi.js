const API_BASE = "http://127.0.0.1:5000";

export const sendToAI = async (config) => {
  try {
    const response = await fetch(`${API_BASE}/api/generate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(config),
    });

    if (!response.ok) {
      const err = await response.json();
      throw new Error(err.error || "Server error");
    }

    const text = await response.text(); // text because you're sending raw bash/text
    return text;

  } catch (err) {
    console.error("AI API Error:", err.message);
    return null;
  }
};
