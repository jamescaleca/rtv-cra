import axios from "axios"


export async function loginUser(creds) {
  const res = await fetch("/auth/login",
    { method: "post", body: JSON.stringify(creds) }
  )
  console.log(res.data)
  const data = await res.json()

  if (!res.ok) {
    throw {
      message: data.message,
      statusText: res.statusText,
      status: res.status
    }
  }

  return data
}
