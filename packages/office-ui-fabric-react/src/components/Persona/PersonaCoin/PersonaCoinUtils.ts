import { IPersonaCoinProps, PersonaSize } from '../Persona.types';
import { SIZE_TO_PIXELS, RingProps } from '../PersonaConsts';

export const shouldShowRing = (props: IPersonaCoinProps | undefined): boolean => {
  if (!props || (!props.size && props.coinSize === undefined)) {
    return false;
  }

  const size = props.size as PersonaSize;

  return !!props.showColorRing && SIZE_TO_PIXELS[size] > 20;
};

export const getCoinSize = (props: IPersonaCoinProps | undefined): number => {
  if (!props || !props.size) {
    return 0;
  }

  const size = props.size as PersonaSize;

  const adjustedCoinSize = shouldShowRing(props)
    ? SIZE_TO_PIXELS[size] - 4 * getCoinRingWidth(props)
    : props.coinSize || SIZE_TO_PIXELS[size];
  return adjustedCoinSize;
};

export const getCoinRingWidth = (props: IPersonaCoinProps | undefined): number => {
  if (!props || !props.size) {
    return 0;
  }

  const size = props.size as PersonaSize;
  return SIZE_TO_PIXELS[size] > SIZE_TO_PIXELS[PersonaSize.size32]
    ? RingProps.largeCoinRingWidth
    : RingProps.smallCoinRingWidth;
};
