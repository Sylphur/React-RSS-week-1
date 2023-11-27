"use client"

import { Provider } from "react-redux"
import { store } from "./store"
import { ReactNodeProps } from "@/shared/interfaces"

export function ReduxProvider({ children }: ReactNodeProps) {
  return <Provider store={store}>{children}</Provider>
}