import NextAuth from "next-auth";

import {PrismaAdapter} from "@next-auth/prisma-adapter";
import { db } from "@/lib/db";
import authConfig from "./auth.config";


export const {auth, handlers , signIn , signOut} = NextAuth({
    callbacks:{

    },
    secret:process.env.NEXTAUTH_SECRET,
    adapter:PrismaAdapter(db),
    session:{strategy:"jwt"},
    ...authConfig
})
     
