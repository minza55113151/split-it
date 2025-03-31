import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CaretLeft, Equals } from "@phosphor-icons/react";
import React, { useState } from "react";

type ExpenseCalculatorProps = {
  setValue: (value: number) => void;
  onBackClick: () => void;
};

const ExpenseCalculator: React.FC<ExpenseCalculatorProps> = ({
  setValue,
  onBackClick,
}) => {
  const [expenseData, setExpenseData] = useState({
    start: NaN,
    opposite: NaN,
    discount: NaN,
    withoutDiscount: NaN,
  });
  const total =
    (expenseData.opposite / expenseData.start) *
      (expenseData.start - expenseData.discount) +
    expenseData.withoutDiscount / 2;
  const isValid =
    !isNaN(expenseData.start) &&
    !isNaN(expenseData.opposite) &&
    !isNaN(expenseData.discount) &&
    !isNaN(expenseData.withoutDiscount) &&
    expenseData.start > 0 &&
    expenseData.opposite > 0 &&
    expenseData.discount >= 0 &&
    expenseData.withoutDiscount >= 0;

  return (
    <>
      <Button onClick={onBackClick}>
        <CaretLeft size={36} />
      </Button>
      <div className="flex w-full flex-col items-center justify-between gap-4 px-6 py-12">
        <div className="flex w-full flex-col gap-2">
          <div className="flex">
            <h3 className="flex w-full items-end justify-end px-4">Start</h3>
            <Input
              className="w-full"
              type="number"
              inputMode="decimal"
              pattern="[0-9]*[.]?[0-9]*"
              placeholder="0.00"
              value={expenseData.start}
              onChange={(e) =>
                setExpenseData({
                  ...expenseData,
                  start: parseFloat(parseFloat(e.target.value).toFixed(2)),
                })
              }
            />
          </div>
          <div className="flex">
            <h3 className="flex w-full items-end justify-end px-4">
              Friend expense
            </h3>
            <Input
              className="w-full"
              type="number"
              inputMode="decimal"
              pattern="[0-9]*[.]?[0-9]*"
              placeholder="0.00"
              value={expenseData.opposite}
              onChange={(e) =>
                setExpenseData({
                  ...expenseData,
                  opposite: parseFloat(parseFloat(e.target.value).toFixed(2)),
                })
              }
            />
          </div>
          <div className="flex">
            <h3 className="flex w-full items-end justify-end px-4">Discount</h3>
            <Input
              className="w-full"
              type="number"
              inputMode="decimal"
              pattern="[0-9]*[.]?[0-9]*"
              placeholder="0.00"
              value={expenseData.discount}
              onChange={(e) =>
                setExpenseData({
                  ...expenseData,
                  discount: parseFloat(parseFloat(e.target.value).toFixed(2)),
                })
              }
            />
          </div>
          <div className="flex">
            <h3 className="flex w-full items-end justify-end px-4">
              Without discount
            </h3>
            <Input
              className="w-full"
              type="number"
              inputMode="decimal"
              pattern="[0-9]*[.]?[0-9]*"
              placeholder="0.00"
              value={expenseData.withoutDiscount}
              onChange={(e) =>
                setExpenseData({
                  ...expenseData,
                  withoutDiscount: parseFloat(
                    parseFloat(e.target.value).toFixed(2),
                  ),
                })
              }
            />
          </div>
          <div className="flex">
            <div className="flex w-full items-end justify-end px-4">
              <Button>
                <Equals size={24} />
              </Button>
            </div>
            <Input
              className="w-full"
              type="number"
              inputMode="decimal"
              placeholder="0.00"
              value={total}
              readOnly
            />
          </div>
          <Button
            className="mt-4"
            onClick={() => {
              setValue(total);
              onBackClick();
            }}
            disabled={!isValid}
          >
            Apply
          </Button>
        </div>
      </div>
    </>
  );
};

export default ExpenseCalculator;
