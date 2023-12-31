import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@libs/prismadb";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import bcrypt from "bcrypt";
import { generateSlug } from "@libs/slug";

const CustomPrismaAdapter = {
  ...PrismaAdapter(prisma),
  async createUser(profile) {
    try {
      const user = await prisma.user.create({
        data: {
          name: profile.name,
          email: profile.email,
          image: profile.image,
          slug: generateSlug(profile.name),
          emailVerified: new Date(),
        },
      });
      return user;
    } catch (error) {
      console.log("error prisma adapter", error.message);
      throw new Error("Failed to create user.");
    }
  },
  // async updateUser(user) {
  //   // implementasi logika pembaruan Anda di sini
  //   return user;
  // },
};

export const authOptions = {
  adapter: CustomPrismaAdapter,
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      const existingUser = await prisma.user.findUnique({
        where: {
          email: user.email,
        },
      });
      if (existingUser) {
        try {
          // console.log(
          //   "user nih",
          //   user,
          //   "account nih",
          //   account,
          //   "profile dong",
          //   profile,
          //   "email nich",
          //   email,
          //   "asik credentials",
          //   credentials
          // );

          const oauthAccount = await prisma.account.findFirst({
            where: {
              userId: existingUser.id,
            },
          });

          if (oauthAccount && account.provider === "credentials") {
            throw new Error("User already registered with another method.");
          }

          if (account.type === "oauth" && !oauthAccount) {
            throw new Error("User already registered with another method.");
          }
        } catch (error) {
          console.log("error:", error.message);
          return `/login?error=${encodeURIComponent(error.message)}`;
        }
      }

      return true;
    },
    async jwt({ token, user, trigger, session }) {
      if (trigger === "update") {
        return { ...token, ...session.user };
      }
      return { ...token, ...user };
    },
    async session({ token, session }) {
      session.user = token;
      return session;
    },
    async redirect({ url, baseUrl }) {
      return baseUrl;
    },
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "Rakha" },
        password: { label: "Password", type: "password" },
        username: {
          label: "Username",
          type: "username",
          placeholder: "rakhazufar",
        },
      },
      async authorize(credentials) {
        //check if user provide an email and password
        try {
          if (!credentials.email || !credentials.password) {
            throw new Error("Missing Fields");
          }

          //check if user exist
          const user = await prisma.user.findUnique({
            where: {
              email: credentials.email,
            },
          });

          if (!user) {
            throw new Error("User Not Found");
          }

          if (!user?.hashedPassword) {
            throw new Error("User Already Login with Another Method");
          }

          const passwordMatch = await bcrypt.compare(
            credentials.password,
            user.hashedPassword
          );

          if (!passwordMatch) {
            throw new Error("Incorrect Password");
          }

          if (!user.emailVerified) {
            throw new Error("Please verify your email before signing in.");
          }

          return user;
        } catch (error) {
          console.error("Authorize Error:", error.message);
          throw new Error(error.message);
        }
      },
    }),
  ],
  secret: process.env.SECRET,
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  debug: process.env.NODE_ENV === "development",
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
