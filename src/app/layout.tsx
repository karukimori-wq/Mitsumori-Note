import "./globals.css";
import AppShell from "./components/AppShell";
export const metadata={title:"Mitsumori Note",description:"個人事業主向け 見積・案件・納期管理ツール"};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="ja"><body><AppShell>{children}</AppShell></body></html>}