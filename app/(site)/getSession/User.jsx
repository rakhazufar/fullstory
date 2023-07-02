'use client'

import { useSession } from "next-auth/react"

const User = () => {
  const { data: session } = useSession()

  return (
    <>{JSON.stringify(session)}</>
  )
}

export default User