import jwt, { JwtPayload } from "jsonwebtoken";

export function createJwtToken(payload: JwtPayload): string {
  if (!payload) {
    console.log("NO payload provided");
    return "";
  }
  const tokenStr = jwt.sign(payload, process.env.JWT_SECRET!);
  return tokenStr;
}
export function verifyJwtToken(token: string): JwtPayload | null {
  try {
    const decodedToken = jwt.verify(
      token,
      process.env.JWT_SECRET!
    ) as JwtPayload;
    return decodedToken;
  } catch (err) {
    console.log(err);
    return null;
  }
}
