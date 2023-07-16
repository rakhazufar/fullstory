import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google"
import GithubProvider from "next-auth/providers/github"
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@app/libs/prismadb";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import bcrypt from 'bcrypt';

export const authOptions = {
    adapter: PrismaAdapter(prisma),
    callbacks: {
        async signIn({ user, account, credentials }) {
            try {
              if (user.email && account.provider !== "credentials") {
                const existingUser = await prisma.user.findUnique({
                  where: {
                    email: user.email,
                  },
                });
                if (existingUser) {
                  return 'http://localhost:3000/login?method=user_already_registered'
                }
              }
            } catch (error) {
              console.log("error:", error.message);
            }
        
            return true;
          }
    },
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
        GithubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
        }),
        CredentialsProvider({
            name: "credentials",
            credentials: {
                email: {label: "Email", type: "email", placeholder: "Rakha"},
                password: {label: "Password", type: "password"},
                username: {label: "Username", type: "username", placeholder: "rakhazufar"}
            },
            async authorize(credentials) {

                //check if user provide an email and password
                if(!credentials.email || !credentials.password) {
                    throw new Error('Missing Fields')
                }

                //check if user exist
                const user = await prisma.user.findUnique({
                    where: {
                        email: credentials.email
                    }
                });

                if(!user || !user?.hashedPassword ) {
                    throw new Error('User Not Found')
                }

                const passwordMatch = await bcrypt.compare(credentials.password, user.hashedPassword)

                if(!passwordMatch) {
                    throw new Error('Incorrect Password')
                }

                return user
            }
        })
    ],
    secret: process.env.SECRET,
    session: {
        strategy: "jwt"
    },
    debug: process.env.NODE_ENV === "development"
}


const handler = NextAuth(authOptions)

export {handler as GET, handler as POST}
