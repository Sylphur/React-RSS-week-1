import { ReactNodeProps } from "@/shared/interfaces";
import AppHeader from "./header/AppHeader";

export default function Layout({ children }: ReactNodeProps) {
  return (
    <>
      <AppHeader />
      <main>{children}</main>
    </>
  )
}