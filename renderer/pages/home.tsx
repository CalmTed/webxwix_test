import React from "react";
import Header from "./components/header";

export default function HomePage() {
  const [address, setAddress] = React.useState(
    "https://whatismyipaddress.com/",
  );
  const [proxy, setProxy] = React.useState("SOCKS5://47.91.88.100:1080");

  const handleAddressChange = (newAddress: string) => {
    if (newAddress !== address) {
      setAddress(newAddress);
    }
  };

  const handleAddressSubmit = (address: string) => {
    if (!address) return;
    const moreDefinedAddress =
      address.startsWith("https://") && !address.startsWith("http://")
        ? address
        : `https://${address}`;
    window.ipc.send("setAddress", moreDefinedAddress);
  };

  const handleProxyChange = (newAddress: string) => {
    if (newAddress !== address) {
      setProxy(newAddress);
    }
  };

  const handleProxySubmit = (proxy: string) => {
    if (!address) return;
    window.ipc.send("setProxy", proxy);
  };

  return (
    <div
      style={{
        width: "100%",
        height: "50px",
        display: "flex",
        flexWrap: "wrap",
        margin: 0,
        background: "#000",
      }}
    >
      <style jsx global>{`
        body {
          margin: 0;
        }
      `}</style>
      <Header
        setAddress={handleAddressChange}
        submitAddress={handleAddressSubmit}
        address={address}
        setProxy={handleProxyChange}
        submitProxy={handleProxySubmit}
        proxy={proxy}
      />
    </div>
  );
}
