import React, { useState } from "react";

export default function Header({
  setAddress,
  submitAddress,
  address,
  setProxy,
  submitProxy,
  proxy,
}) {
  const handleSetAddress = (newValue: string) => {
    setAddress(newValue);
  };

  const handleSubmitAddress = () => {
    address && submitAddress(address);
  };

  const handleSetProxy = (newValue: string) => {
    setProxy(newValue);
  };

  const handleSubmitProxy = (proxy: string) => {
    submitProxy(proxy);
  };

  return (
    <div
      style={{
        height: "50px",
        width: "100vw",
        display: "flex",
      }}
    >
      <input
        type="text"
        onChange={(e) => handleSetAddress(e.target.value)}
        onKeyUp={(e) => e.code === "Enter" && handleSubmitAddress()}
        style={{
          flex: 1,
        }}
        placeholder="Enter address here"
        value={address}
      />
      <button type="submit" onPointerUp={() => handleSubmitAddress()}>
        GO
      </button>
      <input
        type="text"
        onChange={(e) => handleSetProxy(e.target.value)}
        onKeyUp={(e) => e.code === "Enter" && handleSubmitProxy(proxy)}
        style={{
          flex: 1,
        }}
        placeholder="Enter prixy setting here here"
        value={proxy}
      />
      <button type="submit" onPointerUp={() => handleSubmitProxy(proxy)}>
        Set proxy
      </button>
      <button
        type="submit"
        onPointerUp={() => {
          handleSetProxy("");
          handleSubmitProxy("");
        }}
      >
        Clear
      </button>
    </div>
  );
}
