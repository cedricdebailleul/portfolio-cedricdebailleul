import crypto from "crypto";

import { v4 as uuidv4 } from "uuid";
import { db } from "@/lib/db";
import { getVerificationTokenByEmail } from "@/data/verification-token";
import { getPasswordResetTokenByEmail } from "@/data/password-reset-token";
import { getTwoFactorTokenByEmail } from "@/data/two-factor-token";

export const generateTwoFactorToken = async (email: string) => {
  const token = crypto.randomInt(100_000, 1_000_000).toString();
  const expires = new Date(new Date().getTime() + 5 * 60 * 1000);
  const existingToken = await getTwoFactorTokenByEmail(email);

  if (existingToken) {
    await db.twoFactorToken.delete({
      where: { id: existingToken.id },
    });
    // Crée un nouveau token après avoir supprimé l'ancien
    return await db.twoFactorToken.create({
      data: {
        email,
        token,
        expires,
      },
    });
  } else {
    // Crée un nouveau token si aucun token existant n'est trouvé
    return await db.twoFactorToken.create({
      data: {
        email,
        token,
        expires,
      },
    });
  }
};

export const generatePasswordResetToken = async (email: string) => {
  const token = uuidv4();
  const expires = new Date(new Date().getTime() + 3600 * 1000);
  const existingToken = await getPasswordResetTokenByEmail(email);

  if (existingToken) {
    await db.passwordResetToken.delete({
      where: { id: existingToken.id },
    });
    // Crée un nouveau token après avoir supprimé l'ancien
    return await db.passwordResetToken.create({
      data: {
        email,
        token,
        expires,
      },
    });
  } else {
    // Crée un nouveau token si aucun token existant n'est trouvé
    return await db.passwordResetToken.create({
      data: {
        email,
        token,
        expires,
      },
    });
  }
};

export const generateVerificationToken = async (email: string) => {
  const token = uuidv4();
  const expires = new Date(new Date().getTime() + 3600 * 1000);
  const existingToken = await getVerificationTokenByEmail(email);

  if (existingToken) {
    await db.verificationToken.delete({
      where: { id: existingToken.id },
    });
    // Crée un nouveau token après avoir supprimé l'ancien
    return await db.verificationToken.create({
      data: {
        email,
        token,
        expires,
      },
    });
  } else {
    // Crée un nouveau token si aucun token existant n'est trouvé
    return await db.verificationToken.create({
      data: {
        email,
        token,
        expires,
      },
    });
  }
};