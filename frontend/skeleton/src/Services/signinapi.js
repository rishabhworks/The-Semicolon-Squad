const API_BASE_URL = "http://127.0.0.1:5000";

export const signupUser = async (email, password) => {
  try {
    const body = {
      email: email,
      password: password,
      route: "signup"
    };

    console.log("📨 Sending signup request with body:", body);

    const response = await fetch(`${API_BASE_URL}/api/user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    });

    const data = await response.json();
    console.log("📬 Response from signup API:", data);

    if (response.ok) {
      return { success: true, message: data.message || "Signup successful" };
    } else {
      return { success: false, message: data.message || data.error || "Signup failed" };
    }
  } catch (error) {
    console.error("❌ Signup API Error:", error);
    return { success: false, message: "Network error or server unreachable" };
  }
};
