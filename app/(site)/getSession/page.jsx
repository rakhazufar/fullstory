import { getServerSession } from "next-auth";
import { authOptions } from "@app/api/auth/[...nextauth]/route";
import User from "./User";


//retrieve data from session
const SessionShow = async () => {
    const session = await getServerSession(authOptions)
    console.log(session)
  return (
    <div>
        <h1>Session</h1>
        <h1>Server side rendered session</h1>
        <pre>{JSON.stringify(session?.user)}</pre>
        <h1>client side rendering</h1>
        <User />
    </div>
  )
}

export default SessionShow