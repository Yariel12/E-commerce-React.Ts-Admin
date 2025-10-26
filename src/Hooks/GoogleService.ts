import { CredentialResponse } from "@react-oauth/google";

export async function loginWithGoogle(credentialResponse: CredentialResponse) {
  if (!credentialResponse.credential) throw new Error("No credential provided");

  const token = credentialResponse.credential;

  const res = await fetch("http://localhost:5000/api/Auth/google-login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ token }),
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || "Error al loguear con Google");
  }

  return await res.json();
}
