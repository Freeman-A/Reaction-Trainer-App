import NextAuth from "next-auth";

import { authOptions } from "pn/server/auth";

export default NextAuth(authOptions);
