import Header from "../components/header/Header";
import Sider from "../components/sidebar/Sider";
import { ChildrenProps } from "../types";

export default function PageWrapper({ children }: ChildrenProps) {
  return (
    <div>
      <Header />
      <div style={{ display: "flex" }}>
        <Sider />
        <div style={{ maxWidth: "100%" }}>{children}</div>
      </div>
    </div>
  );
}
