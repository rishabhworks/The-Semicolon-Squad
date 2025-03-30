const API_BASE_URL = "http://127.0.0.1:5000";

export const loginUser = async (email, password) => {
  try {
    const body = {
      email: email,
      password: password,
      route: "login"
    };

    console.log("🔍 Sending login request with body:", body); // <-- log before sending

    const response = await fetch(`${API_BASE_URL}/api/user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    });

    const data = await response.json();
    console.log("📬 Response from API:", data);

    if (response.ok) {
      return { success: true, message: data.message || "Login successful" };
    } else {
      return { success: false, message: data.message || data.error || "Login failed" };
    }
  } catch (error) {
    console.error("❌ Login API Error:", error);
    return { success: false, message: "Network error or server unreachable" };
  }
};
