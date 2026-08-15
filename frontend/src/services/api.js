const API_BASE_URL = "https://intervyou-backend.onrender.com";

export async function createInterview(interviewData) {
  const response = await fetch(`${API_BASE_URL}/interviews/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(interviewData),
  });

  if (!response.ok) {
    throw new Error("Failed to create interview");
  }

  return response.json();
}

export async function getInterview(interviewId) {
  const response = await fetch(
    `${API_BASE_URL}/interviews/${interviewId}`
  );

  if (!response.ok) {
    throw new Error("Failed to get interview");
  }

  return response.json();
}

export async function submitAnswer(interviewId, answer) {
  const response = await fetch(
    `${API_BASE_URL}/interviews/${interviewId}/answers`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        answer,
      }),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to submit answer");
  }

  return response.json();
}

export async function evaluateInterview(interviewId) {
  const response = await fetch(
    `${API_BASE_URL}/interviews/${interviewId}/evaluate`,
    {
      method: "POST",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to evaluate interview");
  }

  return response.json();
}