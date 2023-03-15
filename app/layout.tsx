import { SessionProvider } from "../components/SessionProvider";
import SideBar from "../components/SideBar";
import { getServerSession } from "next-auth";
import { authOptions } from "../pages/api/auth/[...nextauth]";
import Login from "../components/Login";
import "../styles/globals.css";
import ClientProvider from "../components/ClientProvider";
import Script from "next/script";


export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  return (
    <html>
      <head />

      <body>
        <Script
          src="https://cdnjs.cloudflare.com/ajax/libs/flowbite/1.6.3/flowbite.min.js"
          strategy="beforeInteractive"
        />
        <SessionProvider session={session}>
          {!session ? (
            <Login />
          ) : (
            <div className="bg-[#000000e7]">
              <div >
                <SideBar />
              </div>
              <div className="sm:ml-64">
                <ClientProvider />
                <div className="bg-[#343541] flex-1">{children}</div>
              </div>
            </div>
          )}
        </SessionProvider>
        <script src="../node_modules/flowbite/dist/flowbite.min.js"></script>
      </body>
    </html>
  );
}
