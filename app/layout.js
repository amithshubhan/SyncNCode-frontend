import { PageContext } from "@components/Context/PageContext";
import { SocketProvider } from "@components/Context/SocketProvider";
import Header from "@components/Header/Header";
import "@styles/globals.css";

export const metadata = {
  title: "SyncNCode",
  description: "Collaborate with your friends and peers over code",
};

const Rootlayout = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <div className="main">
          <SocketProvider>{children}</SocketProvider>

          {/* <Footer /> */}
        </div>
      </body>
    </html>
  );
};

export default Rootlayout;
