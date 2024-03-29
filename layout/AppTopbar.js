import Link from "next/link";
import Router, { useRouter } from "next/router";
import { classNames } from "primereact/utils";
import React, {
  forwardRef,
  useContext,
  useImperativeHandle,
  useRef,
} from "react";
import { LayoutContext } from "./context/layoutcontext";
import { useSession } from "next-auth/react";

const AppTopbar = forwardRef((props, ref) => {
  const { data: session, status } = useSession(); // session is null if no user is logged in
  const { layoutConfig, layoutState, onMenuToggle, showProfileSidebar } =
    useContext(LayoutContext);
  const menubuttonRef = useRef(null);
  const topbarmenuRef = useRef(null);
  const topbarmenubuttonRef = useRef(null);

  useImperativeHandle(ref, () => ({
    menubutton: menubuttonRef.current,
    topbarmenu: topbarmenuRef.current,
    topbarmenubutton: topbarmenubuttonRef.current,
  }));

  return (
    <div className="layout-topbar">
      <Link href="/" className="layout-topbar-logo">
        <img
          src={`/layout/images/logo-${
            layoutConfig.colorScheme !== "light" ? "white" : "dark"
          }.png`}
          width="47.22px"
          height={"35px"}
          widt={"true"}
          alt="logo"
        />
        <span className="font-bold">KasambahayKo</span>
      </Link>

      <button
        ref={menubuttonRef}
        type="button"
        className="p-link layout-menu-button layout-topbar-button"
        onClick={onMenuToggle}
      >
        <i className="pi pi-bars" />
      </button>

      <button
        ref={topbarmenubuttonRef}
        type="button"
        className="p-link layout-topbar-menu-button layout-topbar-button"
        onClick={showProfileSidebar}
      >
        <i className="pi pi-ellipsis-v" />
      </button>

      <div
        ref={topbarmenuRef}
        className={classNames("layout-topbar-menu", {
          "layout-topbar-menu-mobile-active": layoutState.profileSidebarVisible,
        })}
      >
        {/* <button type="button" className="p-link layout-topbar-button">
          <i className="pi pi-calendar"></i>
          <span>Calendar</span>
        </button> */}

        <div className="logged-in-as flex flex-column justify-content-center">
          <span className="text-sm">Logged in as</span>
          <span className="text-lg font-bold">{session?.user?.name}</span>
        </div>
        <button type="button" className="p-link layout-topbar-button">
          <i className="pi pi-user"></i>
          <span>Profile</span>
        </button>
        {/* <Link href="/documentation">
                    <button type="button" className="p-link layout-topbar-button">
                        <i className="pi pi-cog"></i>
                        <span>Settings</span>
                    </button>
                </Link> */}
        {/* <button type="button" className="p-link layout-topbar-button">
          <i className="pi pi-cog"></i>
          <span>Settings</span>
        </button> */}
      </div>
    </div>
  );
});

export default AppTopbar;
