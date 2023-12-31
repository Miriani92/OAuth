import qs from "qs";
import logger from "../utils/logger";
import axios from "axios";
import { UserDocument } from "../models/user.model";
import { UserModel } from "../models/user.model";
import { SessionModel } from "../models/session.model";
import { verifyJwt } from "../utils/jwt";
import { findUser } from "./user.services";
import { signJwt } from "../utils/jwt";

interface GoogleTokensResult {
  access_token: string;
  expires_in: Number;
  refresh_token: string;
  scope: string;
  id_token: string;
}

export async function getGoogleOAuthTokens({
  code,
}: {
  code: string;
}): Promise<GoogleTokensResult> {
  const url = "https://oauth2.googleapis.com/token";

  const values = {
    code,
    client_id: process.env.OAUTH_CLIENT_ID,
    client_secret: process.env.OAUTH_SECRET_KEY,
    redirect_uri: "http://localhost:4000/api/v1/auth/sessions/google",
    grant_type: "authorization_code",
  };

  try {
    const res = await axios.post<GoogleTokensResult>(
      url,
      qs.stringify(values),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    logger.info(res.data, "googleAuthTokenResponse");
    return res.data;
  } catch (error: any) {
    logger.error(error.response.headers, "headers");
    throw new Error(error.message);
  }
}

interface GoogleUserResult {
  id: string;
  email: string;
  verified_email: boolean;
  name: string;
  given_name: string;
  family_name: string;
  picture: string;
  locale: string;
}

export const getGoogleUser = async ({
  id_token,
  access_token,
}: {
  id_token: string;
  access_token: string;
}): Promise<GoogleUserResult> => {
  try {
    const res = await axios.get<GoogleUserResult>(
      `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${access_token}`,
      {
        headers: {
          Authorization: `Bearer ${id_token}`,
        },
      }
    );
    return res.data;
  } catch (error: any) {
    logger.error(error, "Error fetching Google user");
    throw new Error(error.message);
  }
};

export async function createUser(
  // input: Document<
  //   Omit<UserDocument, "createdAt" | "updatedAt" | "comparePassword">
  // >
  input: Omit<UserDocument, "createdAt" | "updatedAt">
) {
  try {
    const user = await UserModel.create(input);

    return user;
  } catch (e: any) {
    throw new Error(e);
  }
}
export const createSession = async (userId: any, userAgent: string) => {
  const session = await SessionModel.create({ user: userId, userAgent });
  return session.toJSON();
};

export const reIssueAccessToken = async ({
  refreshToken,
}: {
  refreshToken: string;
}) => {
  const { decoded } = verifyJwt(refreshToken);

  if (!decoded || !decoded.session) return false;

  const session = await SessionModel.findById(decoded.session);

  if (!session || !session.valid) return false;

  const user = await findUser({ _id: session.user });

  if (!user) return false;

  const accessToken = signJwt(
    { ...user, session: session._id },
    { expiresIn: process.env.EXPIRES_IN_ACCESS }
  );

  return accessToken;
};
