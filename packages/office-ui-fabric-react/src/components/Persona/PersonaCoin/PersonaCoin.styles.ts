import { IPersonaCoinStyleProps, IPersonaCoinStyles, PersonaSize, IPersonaCoinProps } from '../Persona.types';
import { HighContrastSelector, FontSizes, FontWeights, getGlobalClassNames } from '../../../Styling';
import { personaSize, sizeBoolean, sizeNumber } from '../PersonaConsts';
import { IStyle } from '../../../../node_modules/@uifabric/styling';

const GlobalClassNames = {
  coin: 'ms-Persona-coin',
  imageArea: 'ms-Persona-imageArea',
  image: 'ms-Persona-image',
  initials: 'ms-Persona-initials',
  size10: 'ms-Persona--size10',
  size16: 'ms-Persona--size16',
  size24: 'ms-Persona--size24',
  size28: 'ms-Persona--size28',
  size32: 'ms-Persona--size32',
  size40: 'ms-Persona--size40',
  size48: 'ms-Persona--size48',
  size72: 'ms-Persona--size72',
  size100: 'ms-Persona--size100'
};

const smallCoinRingWidth = 1;

const largeCoinRingWidth = 2;

const ringPadding = 2;

export const getStyles = (props: IPersonaCoinStyleProps): IPersonaCoinStyles => {
  const { className, theme } = props;

  const { palette } = theme;

  const size = sizeBoolean(props.size as PersonaSize);
  const shouldShowRing = props.showColorRing && !size.isSize10 && !size.isSize16;

  const classNames = getGlobalClassNames(GlobalClassNames, theme);

  const getCoinSize = (pSize: PersonaSize | undefined): number => {
    if (!pSize) {
      return 0;
    }

    const adjustedCoinSize = shouldShowRing
      ? sizeNumber(pSize) - (2 * getCoinRingWidth() + 2 * ringPadding)
      : sizeNumber(pSize);
    return adjustedCoinSize;
  };

  const getCoinRingWidth = (): number => {
    return size.isSize72 || size.isSize100 ? largeCoinRingWidth : smallCoinRingWidth;
  };

  // Static colors used when displaying 'unknown persona' coin
  const unknownPersonaBackgroundColor = palette.neutralLight;
  const unknownPersonaFontColor = palette.redDark;

  const getRingStyle = (): IStyle => {
    if (!shouldShowRing) {
      return {};
    }

    return {
      borderWidth: getCoinRingWidth() === 2 ? 'medium' : 'thin',
      borderStyle: 'solid',
      padding: ringPadding + 'px',
      borderRadius: '50%'
    };
  };

  return {
    coin: [
      classNames.coin,
      theme.fonts.medium,
      size.isSize10 && classNames.size10,
      size.isSize16 && classNames.size16,
      size.isSize24 && classNames.size24,
      size.isSize28 && classNames.size28,
      size.isSize32 && classNames.size32,
      size.isSize40 && classNames.size40,
      size.isSize48 && classNames.size48,
      size.isSize72 && classNames.size72,
      size.isSize100 && classNames.size100,
      getRingStyle(),
      className
    ],
    size10WithoutPresenceIcon: {
      fontSize: '10px',
      position: 'absolute',
      top: '5px',
      right: 'auto',
      left: 0
    },

    imageArea: [
      classNames.imageArea,
      {
        position: 'relative',
        textAlign: 'center',
        flex: '0 0 auto',
        height: personaSize.size48,
        width: personaSize.size48
      },

      size.isSize10 && {
        overflow: 'visible',
        background: 'transparent',
        height: 0,
        width: 0
      },

      (size.isSize10 ||
        size.isSize24 ||
        size.isSize28 ||
        size.isSize32 ||
        size.isSize40 ||
        size.isSize48 ||
        size.isSize72 ||
        size.isSize100) && {
        height: getCoinSize(props.size) + 'px',
        width: getCoinSize(props.size) + 'px'
      }
    ],

    image: [
      classNames.image,
      {
        marginRight: '10px',
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        border: 0,
        borderRadius: '50%'
        // perspective: '1px'
      },

      size.isSize10 && {
        overflow: 'visible',
        background: 'transparent',
        height: 0,
        width: 0
      },
      (size.isSize16 ||
        size.isSize24 ||
        size.isSize28 ||
        size.isSize32 ||
        size.isSize40 ||
        size.isSize72 ||
        size.isSize100) && {
        height: getCoinSize(props.size) + 'px',
        width: getCoinSize(props.size) + 'px'
      }
    ],

    initials: [
      classNames.initials,
      {
        borderRadius: '50%',
        color: props.showUnknownPersonaCoin ? unknownPersonaFontColor : palette.white,
        fontSize: FontSizes.large,
        fontWeight: FontWeights.regular,
        lineHeight: '46px',
        height: personaSize.size48,

        selectors: {
          [HighContrastSelector]: {
            border: '1px solid WindowText',
            MsHighContrastAdjust: 'none',
            color: 'WindowText',
            boxSizing: 'border-box',
            backgroundColor: 'Window !important'
          }
        }
      },

      props.showUnknownPersonaCoin && {
        backgroundColor: unknownPersonaBackgroundColor
      },

      (size.isSize16 || size.isSize24 || size.isSize28) && {
        fontSize: FontSizes.xSmall
      },

      (size.isSize16 ||
        size.isSize24 ||
        size.isSize28 ||
        size.isSize32 ||
        size.isSize40 ||
        size.isSize48 ||
        size.isSize72 ||
        size.isSize100) && {
        height: getCoinSize(props.size) + 'px'
      },

      size.isSize16 && {
        lineHeight: getCoinSize(props.size) + 'px'
      },

      size.isSize24 && {
        lineHeight: getCoinSize(props.size) + 'px'
      },

      size.isSize28 && {
        lineHeight: getCoinSize(props.size) + 'px'
      },

      (size.isSize32 || size.isSize40) && {
        fontSize: FontSizes.medium
      },

      size.isSize32 && {
        lineHeight: getCoinSize(props.size) + 'px'
      },

      size.isSize40 && {
        lineHeight: getCoinSize(props.size) + 'px'
      },

      size.isSize48 && {
        lineHeight: getCoinSize(props.size) + 'px'
      },

      size.isSize72 && {
        fontSize: FontSizes.xxLarge,
        lineHeight: getCoinSize(props.size) + 'px'
      },

      size.isSize100 && {
        fontSize: FontSizes.superLarge,
        lineHeight: getCoinSize(props.size) + 'px'
      }
    ]
  };
};
