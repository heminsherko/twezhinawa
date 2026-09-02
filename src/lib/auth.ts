import { jwtVerify, SignJWT } from "jose";

interface SessionPayload {
  admin: boolean;
  expires: string;
}

export const getJwtSecretKey = () => {
  const secret = process.env.JWT_SECRET_KEY;
  if (!secret || secret.length === 0) {
    // Fallback to a hardcoded secret for zero-config deployment if env var is missing,
    // though in production it should always be provided.
    return "super_secret_fallback_key_for_twejinewe_12345!";
  }
  return secret;
};

export async function verifyAuth(token: string) {
  try {
    const verified = await jwtVerify(
      token,
      new TextEncoder().encode(getJwtSecretKey())
    );
    return verified.payload as unknown as SessionPayload;
  } catch (err) {
    throw new Error("Your token has expired or is invalid.");
  }
}

export async function signAuth(payload: SessionPayload) {
  const secret = new TextEncoder().encode(getJwtSecretKey());
  const alg = "HS256";

  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(secret);
}