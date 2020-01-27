import React from "react"
import { DISCORD_URL } from "../constants"
import { redirectUser } from "../utils/redirect-user"

// Dirty redirect
export default () => {
  redirectUser(DISCORD_URL)
  return <div />
}
