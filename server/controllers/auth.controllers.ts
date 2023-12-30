import { Request, Response } from "express";
import { getGoogleOAuthTokens } from "../services/session.service";
import { getGoogleUser } from "../services/session.service";
import logger from "../utils/logger";

export const googleOauthHandler = async (req: Request, res: Response) => {
  // get the code from qs
  const code = req.query.code as string;

  try {
    //get the id and access token with the code
    console.log("code:", code);
    const { id_token, access_token } = await getGoogleOAuthTokens({ code });

    console.log("access:", access_token, "id_token:", id_token);

    const googleUser = await getGoogleUser({ id_token, access_token });

    logger.info(googleUser, "googleAccount");
    if (!googleUser.verified_email) {
      return res.status(403).send("Google account is not verified");
    }
    // // upsert the user
    // const user = await findAndUpdateUser(
    //   {
    //     email: googleUser.email,
    //   },
    //   {
    //     email: googleUser.email,
    //     name: googleUser.name,
    //     picture: googleUser.picture,
    //   },
    //   {
    //     upsert: true,
    //     new: true,
    //   }
    // );
    // // create a session
    // const session = await createSession(user._id, req.get("user-agent") || "");
    // // create an access token
    // const accessToken = signJwt(
    //   { ...user.toJSON(), session: session._id },
    //   { expiresIn: config.get("accessTokenTtl") } // 15 minutes
    // );
    // // create a refresh token
    // const refreshToken = signJwt(
    //   { ...user.toJSON(), session: session._id },
    //   { expiresIn: config.get("refreshTokenTtl") } // 1 year
    // );
    // // set cookies
    // res.cookie("accessToken", accessToken, accessTokenCookieOptions);
    // res.cookie("refreshToken", refreshToken, refreshTokenCookieOptions);

    // res.redirect("http://localhost:3000");
  } catch (error) {
    logger.error(error, "Failed to authorize Google user");
    return res.redirect(`http://localhost:3000"`);
  }
};
