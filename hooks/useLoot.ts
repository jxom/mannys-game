import { useEffect, useState } from 'react';
import type { Provider } from '@wagmi/core';
import { useContract } from 'wagmi';
import lootAbi from '@/fixtures/contracts/LOOTabi';
import mLootAbi from '@/fixtures/contracts/MLOOTabi';
import { EthAddress } from '@/utils/types';

const MLOOT_CONTRACT = '0x1dfe7Ca09e99d10835Bf73044a23B73Fc20623DF';
const LOOT_CONTRACT = '0xFF9C1b15B16263C61d017ee9F65C50e4AE0113D7';

export default function useLoot(provider: Provider, address: EthAddress) {
  const [hasLoot, setHasLoot] = useState(false);
  const [hasMLoot, setHasMLoot] = useState(false);

  const lootContract = useContract({
    address: LOOT_CONTRACT,
    abi: lootAbi,
    signerOrProvider: provider,
  });

  const mLootContract = useContract({
    address: MLOOT_CONTRACT,
    abi: mLootAbi,
    signerOrProvider: provider,
  });

  // TODO: rewrite with useContractRead
  useEffect(() => {
    const getBalances = async () => {
      if (lootContract !== null) {
        const lootBalance = await lootContract.balanceOf(address);
        setHasLoot((lootBalance ?? 0) > 0);
      }

      if (mLootContract !== null) {
        const mLootBalance = await mLootContract.balanceOf(address);
        setHasMLoot(mLootBalance ?? 0 > 0);
      }
    };

    getBalances();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lootContract !== null, mLootContract !== null, address]);

  return { hasLoot, hasMLoot };
}
