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
import { Separator } from "@/components/ui/separator";

const currencyList = [
  {
    currency: "THB",
    label: "THB",
    iconName: "฿",
  },
  {
    currency: "USD",
    label: "USD",
    iconName: "$",
  },
];

interface CurrencySelectorButtonModalProps {
  currency: string;
  onSelect: (currency: string) => void;
}

const CurrencySelectorButtonModal: React.FC<
  CurrencySelectorButtonModalProps
> = ({ currency, onSelect }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="h-12 w-12 items-center justify-center rounded-md border p-1 shadow-2xs shadow-gray-600">
          <span className="text-center text-3xl font-bold">{currency}</span>
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Select Currency</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        {currencyList.map((currency, index) => (
          <DialogClose
            className="flex w-full flex-col gap-2"
            key={currency.iconName}
            onClick={() => onSelect(currency.iconName)}
          >
            {index !== 0 && <Separator />}
            <div className="flex w-full gap-1 p-1">
              <span>{currency.label}</span>
              <span>({currency.iconName})</span>
            </div>
          </DialogClose>
        ))}
      </DialogContent>
    </Dialog>
  );
};

export default CurrencySelectorButtonModal;
