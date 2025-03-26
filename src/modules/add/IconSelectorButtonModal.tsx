import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { DialogTrigger } from "@radix-ui/react-dialog";
import React from "react";
import ExpenseIcon, { iconList } from "./ExpenseIcon";
import { Separator } from "@/components/ui/separator";

interface IconSelectorButtonModalProps {
  iconName: string;
  onSelect: (iconName: string) => void;
}

const IconSelectorButtonModal: React.FC<IconSelectorButtonModalProps> = ({
  iconName,
  onSelect,
}) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="h-12 w-12 items-center justify-center rounded-md border p-1 shadow-2xs shadow-gray-600">
          <ExpenseIcon iconName={iconName} />
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Select Icon</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-2">
          {iconList.map((icon, index) => (
            <DialogClose
              key={icon.iconName}
              onClick={() => onSelect(icon.iconName)}
            >
              {index !== 0 && <Separator className="mb-2" />}
              <div className="flex items-center gap-4">
                <ExpenseIcon iconName={icon.iconName} />
                <span>{icon.iconName}</span>
              </div>
            </DialogClose>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default IconSelectorButtonModal;
