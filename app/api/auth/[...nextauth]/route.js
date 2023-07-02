import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google"
import GithubProvider from "next-auth/providers/github"
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@app/libs/prismadb";
import { PrismaAdapter } from "@next-auth/prisma-adapter";



export const authOptions = {
    adapter: PrismaAdapter(prisma),
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
                const user = {id: 1, name: "rakha", email: "rakhazufar@gmail.com"}
                return user;
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
