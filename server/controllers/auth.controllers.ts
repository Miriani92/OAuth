import { Request, Response } from "express";
import { getGoogleOAuthTokens } from "../services/session.service";
import { getGoogleUser } from "../services/session.service";
import logger from "../utils/logger";
import { createUser } from "../services/session.service";
import { createSession } from "../services/session.service";
import { signJwt } from "../utils/jwt";
import {
  accessTokenCookieOptions,
  refreshTokenCookieOptions,
} from "../utils/cookie";

export const googleOauthHandler = async (req: Request, res: Response) => {
  // get the code from qs
  const code = req.query.code as string;

  try {
    console.log("code:", code);
    const { id_token, access_token } = await getGoogleOAuthTokens({ code });

    const googleUser = await getGoogleUser({ id_token, access_token });

    logger.info(googleUser, "googleAccount");
    if (!googleUser.verified_email) {
      return res.status(403).send("Google account is not verified");
    }
    const user = await createUser({
      email: googleUser.email,
      name: googleUser.given_name,
      picture: googleUser.picture,
    });

    const session = await createSession(user._id, req.get("user-agent") || "");
    logger.info("session_created", session);

    const accessToken = signJwt(
      { ...user.toJSON(), session: session._id },
      { expiresIn: process.env.EXPIRES_IN_ACCESS }
    );

    const refreshToken = signJwt(
      { ...user.toJSON(), session: session._id },
      { expiresIn: process.env.EXPIRES_IN_REFRESH }
    );

    res.cookie("accessToken", accessToken, accessTokenCookieOptions);
    res.cookie("refreshToken", refreshToken, refreshTokenCookieOptions);
    logger.info("tokens_attached");

    res.redirect(process.env.ORIGIN || "");
  } catch (error) {
    logger.error(error, "Failed to authorize Google user");
    return res.redirect(process.env.ORIGIN || "");
  }
};
