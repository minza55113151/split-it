import { CarProfile, Notepad } from "@phosphor-icons/react";
import { ForkKnife } from "lucide-react";
import React from "react";

export const iconList = [
  {
    label: "Food",
    iconName: "Food",
    icon: <ForkKnife size={36} />,
  },
  {
    label: "Transport",
    iconName: "Transport",
    icon: <CarProfile size={36} />,
  },
  {
    label: "Other",
    iconName: "Other",
    icon: <Notepad size={36} />,
  },
];

type ExpenseIconProps = {
  iconName: string;
};

const ExpenseIcon: React.FC<ExpenseIconProps> = ({ iconName }) => {
  let icon = iconList.find((icon) => icon.iconName === iconName)?.icon;
  if (!icon) {
    icon = iconList.find((icon) => icon.iconName === "Other")!.icon;
  }

  return <div className="flex items-center justify-center">{icon}</div>;
};

export default ExpenseIcon;
