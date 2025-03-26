import { PlusSquare, User, Users } from "@phosphor-icons/react";
import Link from "next/link";
import React from "react";

type Page = "Friends" | "Add" | "Profile";

type AppLayoutProps = {
  page: Page;
  children: React.ReactNode;
};

const pages = [
  {
    name: "Friends",
    href: "/friends",
    icon: <Users size={24} />,
    iconSelected: <Users size={24} weight="fill" />,
    label: "Friends",
  },
  {
    name: "Add",
    href: "/add",
    icon: <PlusSquare size={48} />,
    iconSelected: <PlusSquare size={48} weight="fill" />,
    label: "",
  },
  {
    name: "Profile",
    href: "/profile",
    icon: <User size={24} />,
    iconSelected: <User size={24} weight="fill" />,
    label: "Profile",
  },
];

const AppLayout: React.FC<AppLayoutProps> = ({ page, children }) => {
  return (
    <main className="mx-auto h-screen w-full max-w-[500px]">
      <div className="h-full w-full max-w-[500px] px-4">{children}</div>
      <nav className="fixed bottom-0 w-full max-w-[500px] bg-white px-2 pb-6">
        <div className="relative left-0 h-[0.5px] w-full bg-gray-400"></div>
        <div className="relative flex justify-around pt-1">
          {pages.map((p) => (
            <Link
              className="relative z-10 flex flex-col items-center justify-center"
              key={p.name}
              href={p.href}
            >
              {page == p.name ? p.iconSelected : p.icon}
              <p className="text-[10px]">{p.label}</p>
            </Link>
          ))}
        </div>
      </nav>
    </main>
  );
};

export default AppLayout;
