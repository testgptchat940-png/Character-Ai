import "./globals.css";
export const metadata={title:"NOIR — Character Studio",description:"Персонажи, истории и диалоги в одном пространстве",applicationName:"NOIR"};
export const viewport={width:"device-width",initialScale:1,viewportFit:"cover",themeColor:"#111113"};
export default function RootLayout({children}){return <html lang="ru"><body>{children}</body></html>;}
