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
  onSelect: (iconName: string) => void;
}

const IconSelectorButtonModal: React.FC<IconSelectorButtonModalProps> = ({
  onSelect,
}) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button>Open</button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Select Icon</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        {iconList.map((icon, index) => (
          <DialogClose
            className="flex gap-2"
            key={icon.iconName}
            onClick={() => onSelect(icon.iconName)}
          >
            {index !== 0 && <Separator />}
            <ExpenseIcon iconName={icon.iconName} />
            <span>{icon.iconName}</span>
          </DialogClose>
        ))}
      </DialogContent>
    </Dialog>
  );
};

export default IconSelectorButtonModal;
