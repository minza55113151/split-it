import { CarProfile, Money, Notepad } from "@phosphor-icons/react";
import { ForkKnife } from "lucide-react";
import React from "react";

const _iconList = [
  {
    label: "Food",
    iconName: "Food",
    icon: (
      <div className="flex size-9 items-center justify-center">
        <ForkKnife size={32} />
      </div>
    ),
  },
  {
    label: "Transport",
    iconName: "Transport",
    icon: (
      <div className="flex size-9 items-center justify-center">
        <CarProfile size={32} />
      </div>
    ),
  },
  {
    label: "Other",
    iconName: "Other",
    icon: (
      <div className="flex size-9 items-center justify-center">
        <Notepad size={32} />
      </div>
    ),
  },
  {
    label: "Settle",
    iconName: "Settle",
    icon: (
      <div className="flex size-9 items-center justify-center">
        <Money size={32} />
      </div>
    ),
  },
];

const privateIconList = ["Settle"];

export const iconList = _iconList.filter((icon) => {
  return !privateIconList.includes(icon.iconName);
});

type ExpenseIconProps = {
  iconName: string;
};

const ExpenseIcon: React.FC<ExpenseIconProps> = ({ iconName }) => {
  let icon = _iconList.find((icon) => icon.iconName === iconName)?.icon;
  if (!icon) {
    icon = _iconList.find((icon) => icon.iconName === "Other")!.icon;
  }

  return <div className="flex items-center justify-center">{icon}</div>;
};

export default ExpenseIcon;
