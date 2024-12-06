"use client"

import React from "react"
import { MotionConfig } from "framer-motion"

function RespectMotionPreferences({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>
}

export default RespectMotionPreferences
