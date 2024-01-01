// @ts-nocheck
import jwt from "jsonwebtoken";

export function signJwt(object: Object, options?: jwt.SignOptions | undefined) {
  return jwt.sign(object, process.env.PRIVATE_KEY, {
    ...(options && options),
  });
}
export const verifyJwt = (token: string) => {
  try {
    const decoded = jwt.verify(token, process.env.PRIVATE_KEY);
    return {
      valid: true,
      expired: false,
      decoded,
    };
  } catch (e: any) {
    console.error(e);
    return {
      valid: false,
      expired: e.message === "jwt expired",
      decoded: null,
    };
  }
};
