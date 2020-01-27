import React from "react"
import { GITHUB_URL } from "../constants"
import { redirectUser } from "../utils/redirect-user"

// Dirty redirect
export default () => {
  redirectUser(GITHUB_URL)
  return <div />
}
