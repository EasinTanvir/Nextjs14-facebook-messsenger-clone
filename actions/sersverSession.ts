import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/authOption";

export const getServerCredentials = async () => {
  return await getServerSession(authOptions);
};
