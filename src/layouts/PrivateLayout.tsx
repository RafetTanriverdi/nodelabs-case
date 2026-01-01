import type { PropsWithChildren } from "react";
import clockImage from "@rt/assets/images/clock.png";

function PrivateLayout({ children }: PropsWithChildren) {
    return (
        <div style={{ display: "flex", justifyContent: "space-between", minHeight: "100vh" }}>
            <div style={{ flex: 1 }}>
                {children}
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
                <img
                    src={clockImage}
                    alt="Private Page Image"
                    style={{ display: "block", height: "100%", maxHeight: "100vh", width: "auto" }}
                />
            </div>
        </div>
    )
}

export default PrivateLayout;
