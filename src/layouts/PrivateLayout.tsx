import type { PropsWithChildren } from "react";
import clockImage from "@rt/assets/images/clock.png";

function PrivateLayout({ children }: PropsWithChildren) {
  return (
    <div style={{ display: "flex", height: "100vh", width: "100%" }}>
      <div
        style={{
          width: "60%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflowY: "hidden",
        }}
      >
        {children}
      </div>
      <div
        style={{
          width: "40%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          overflow: "hidden",
        }}
      >
        <img
          src={clockImage}
          alt="Private Page Image"
          style={{
            height: "100%",
            width: "100%",
            maxWidth: "100%",
            objectFit: "cover",
          }}
        />
      </div>
    </div>
  );
}

export default PrivateLayout;
