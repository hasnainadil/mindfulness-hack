import jwt from "jsonwebtoken";
const secret = "secret";

function getToken(userId: number): String {
    return jwt.sign({ userId: userId }, secret, { expiresIn: "12h" });
}

function verifyToken(token: string): number {
    const { userId } = jwt.verify(token, secret) as { userId: number };
    return userId;
}

export { getToken, verifyToken };