import { twMerge } from 'tailwind-merge';
import { Backpack, Camera } from '@/components/Svg';
import { useAppDispatch } from '@/views/token/hooks';
import type { TokenId } from '@/utils/types';
import { toggleBagOpen, toggleCameraOpen } from '@/views/token/reducer';

type Props = {
  tokenId: TokenId;
  bagOpen: boolean;
  cameraOpen: boolean;
};

export default function Menu({ tokenId, bagOpen, cameraOpen }: Props) {
  const dispatch = useAppDispatch();
  const baseClasses = twMerge(
    'min-w-[50px] min-h-[50px]',
    'inline-block p-1 rounded-md relative border',
    'hover:text-yellow hover:border-yellow cursor-pointer'
  );
  const bagClasses = twMerge(
    baseClasses,
    bagOpen ? 'border-yellow text-yellow' : 'border-green text-green'
  );
  const cameraClasses = twMerge(
    baseClasses,
    cameraOpen ? 'border-yellow text-yellow' : 'border-green text-green'
  );

  return (
    <div className="w-full flex items-center justify-end gap-2">
      <div
        className={cameraClasses}
        onClick={() =>
          dispatch(
            toggleCameraOpen({
              tokenId,
              value: !cameraOpen,
            })
          )
        }
      >
        <div className="flex items-center absolute inset-0">
          <Camera height={30} width={30} className="mx-auto" />
        </div>
      </div>
      <div
        className={bagClasses}
        onClick={() =>
          dispatch(
            toggleBagOpen({
              tokenId,
              value: !bagOpen,
            })
          )
        }
      >
        <Backpack height={40} width={20} className="mx-auto" />
      </div>
    </div>
  );
}
