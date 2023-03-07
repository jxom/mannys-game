import { useState } from 'react';
import type { Account } from '@/utils/types';
import type {
  TokenState,
  TokenStateDispatch,
  BagTooltip,
} from '@/views/token/types';
import AccessoryItems from '@/views/token/Tools/Bag/AccessoryItems';
import QuestItems from '@/views/token/Tools/Bag/QuestItems';
import Tooltip from '@/views/token/Tools/Bag/Tooltip';

type Props = {
  tokenId: number;
  account: Account;
  accessories: TokenState['accessories'];
  dispatch: TokenStateDispatch;
};

export default function Bag({
  tokenId,
  account,
  accessories,
  dispatch,
}: Props) {
  const [tooltip, setTooltip] = useState<BagTooltip>();

  return (
    <div className="absolute right-0 px-8 text-green select-none bottom-[200px] w-full max-w-[446px]">
      <div className="border p-4 border-green rounded-md relative flex flex-col gap-y-2">
        <div
          className="absolute top-0 right-0 text-yellow cursor-pointer"
          onClick={() =>
            dispatch({ type: 'SET_BAG_OPEN', tokenId, payload: false })
          }
        >
          <div className="p-4 text-2xl font-bold">x</div>
        </div>
        <div className="text-yellow text-xl">
          <b>Bag</b>
        </div>
        <AccessoryItems
          tokenId={tokenId}
          account={account}
          accessories={accessories}
          dispatch={dispatch}
          setTooltip={setTooltip}
        />
        <QuestItems
          tokenId={tokenId}
          dispatch={dispatch}
          setTooltip={setTooltip}
        />
      </div>
      <Tooltip tooltip={tooltip} />
    </div>
  );
}