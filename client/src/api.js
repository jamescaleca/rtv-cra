import axios from "axios"

export async function loginUser(creds) {
  const res = await fetch("/auth/login",
    { method: "post", body: JSON.stringify(creds) }
  )
  const data = await res.json()
  console.log(data)

  if (!res.ok) {
    throw {
      message: data.message,
      statusText: res.statusText,
      status: res.status
    }
  }

  return data
}
