import { NextRequest, NextResponse } from "next/server"
import { User } from "@/src/models"
import { dbConnect } from "@/src/lib/mongodb"

const attempts = new Map<string, { count: number; time: number }>()

export async function POST(req: NextRequest) {
  const { email, password } = await req.json()
  const ip = req.headers.get("x-forwarded-for") || "unknown"

  const now = Date.now()
  const record = attempts.get(ip)

  if (record && record.count >= 5 && now - record.time < 30000) {
    return NextResponse.json(
      { error: "Too many attempts" },
      { status: 429 }
    )
  }

  await dbConnect()
  const user = await User.findOne({ email })

  if (!user || !user.password) {
    attempts.set(ip, { count: (record?.count || 0) + 1, time: now })
    return NextResponse.json(
      { error: "Invalid email or password" },
      { status: 401 }
    )
  }

  const isMatch = await user.comparePassword(password)

  if (!isMatch) {
    attempts.set(ip, { count: (record?.count || 0) + 1, time: now })
    return NextResponse.json(
      { error: "Invalid email or password" },
      { status: 401 }
    )
  }

  attempts.delete(ip)
  return NextResponse.json({ success: true }, { status: 200 })
}