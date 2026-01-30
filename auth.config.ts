import { Provider } from "@radix-ui/react-tooltip";
import Github from "next-auth/providers/github";
import Google from "next-auth/providers/google";



export default {
    provider: [
        Github({
            clientId: process.env.GITHUB_ID ,
            clientSecret: process.env.GITHUB_SECRET
        }),
        Google({
            clientId: process.env.GOOGLE_ID ,
            clientSecret: process.env.GOOGLE_SECRET 
        }),
    ],

}