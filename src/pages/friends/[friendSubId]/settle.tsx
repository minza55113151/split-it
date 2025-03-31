import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useFriendList } from "@/hooks/UseFriendList";
import { useUser } from "@/hooks/UseUser";
import CurrencySelectorButtonModal from "@/modules/add/CurrencySelectorButtonModal";
import AppLayout from "@/modules/AppLayout";
import { ArrowRight, X } from "@phosphor-icons/react";
import { AvatarImage } from "@radix-ui/react-avatar";
import { useRouter } from "next/router";
import React from "react";

const SettlePage: React.FC = () => {
  const router = useRouter();
  const { friendSubId } = router.query;

  const [settleItem, setSettleItem] = React.useState({
    amount: NaN,
    currency: "฿",
  });

  const { data: user } = useUser();
  const { data: friendList } = useFriendList();

  const friend = friendList?.find((f) => f.SubID === friendSubId);

  // TODO: Check condition that who is pay who

  return (
    <AppLayout page="Friends">
      <div className="fixed flex w-full max-w-[500px] -translate-x-4 items-center justify-between bg-white p-4">
        <div className="flex w-full justify-between">
          <X size={24} />
          <Button variant="default" disabled={settleItem.amount <= 0}>
            Save
          </Button>
        </div>
        <div className="absolute left-1/2 -translate-x-1/2 transform">
          Settle expenses
        </div>
      </div>
      <div className="h-[56px]"></div>
      <div className="flex w-full flex-col items-center justify-between gap-12 px-12 py-24">
        <div className="flex flex-col items-center gap-4">
          <div className="flex items-center gap-4">
            <Avatar className="size-16">
              <AvatarImage src={user?.ImageURL} alt={user?.Name} />
            </Avatar>
            <ArrowRight size={24} />
            <Avatar className="size-16">
              <AvatarImage src={friend?.ImageURL} alt={friend?.Name} />
            </Avatar>
          </div>
          <h1>{friend?.Name}</h1>
        </div>
        <div className="flex items-center gap-2">
          <CurrencySelectorButtonModal
            currency={settleItem.currency}
            onSelect={(currency) => setSettleItem({ ...settleItem, currency })}
          />
          <Input
            type="number"
            inputMode="decimal"
            pattern="[0-9]*[.]?[0-9]*"
            placeholder="0.00"
            value={settleItem.amount}
            onChange={(e) =>
              setSettleItem({
                ...settleItem,
                amount: parseFloat(parseFloat(e.target.value).toFixed(2)),
              })
            }
          />
        </div>
      </div>
    </AppLayout>
  );
};

export default SettlePage;
