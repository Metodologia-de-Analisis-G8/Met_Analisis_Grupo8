import MobileWrapper from "../../components/MobileWrapper";
import { Outlet } from "react-router-dom";

export default function MobileLayout() {
  return (
    <MobileWrapper>
      <Outlet />
    </MobileWrapper>
  );
}
