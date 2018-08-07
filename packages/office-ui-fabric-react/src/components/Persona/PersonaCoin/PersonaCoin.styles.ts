import { IPersonaCoinStyleProps, IPersonaCoinStyles, PersonaSize, IPersonaCoinProps } from '../Persona.types';
import { HighContrastSelector, FontSizes, FontWeights, getGlobalClassNames } from '../../../Styling';
import { personaSize, sizeBoolean, SIZE_TO_PIXELS, RingProps } from '../PersonaConsts';
import { IStyle } from '../../../../node_modules/@uifabric/styling';
import { getCoinSize, getCoinRingWidth, shouldShowRing } from './PersonaCoinUtils';
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

export const getStyles = (props: IPersonaCoinStyleProps): IPersonaCoinStyles => {
  const { className, theme } = props;
  const { palette } = theme;
  const size = sizeBoolean(props.size as PersonaSize);
  const classNames = getGlobalClassNames(GlobalClassNames, theme);

  // this is size of the coin inside the ring if we are to show the ring or the ring as specified in pixle size.
  const coinSize = getCoinSize(props) + 'px';

  // Static colors used when displaying 'unknown persona' coin
  const unknownPersonaBackgroundColor = palette.neutralLight;
  const unknownPersonaFontColor = palette.redDark;

  const getRingStyle = (): IStyle => {
    if (!shouldShowRing(props)) {
      return {
        width: getCoinSize(props),
        height: getCoinSize(props)
      };
    }

    return {
      borderWidth: getCoinRingWidth(props) + 'px',
      borderStyle: 'solid',
      padding: getCoinRingWidth(props) + 'px',
      borderRadius: '50%',
      width: getCoinSize(props),
      height: getCoinSize(props),
      borderColor: props.backgroundColor
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
        borderRadius: '50%',
        perspective: '1px'
      },

      size.isSize10 && {
        overflow: 'visible',
        background: 'transparent',
        height: 0,
        width: 0
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

      (size.isSize32 || size.isSize40) && {
        fontSize: FontSizes.medium
      },

      size.isSize72 && {
        fontSize: FontSizes.xxLarge
      },

      size.isSize100 && {
        fontSize: FontSizes.superLarge
      },

      SIZE_TO_PIXELS[props.size as PersonaSize] > 10 && {
        lineHeight: coinSize
      }
    ]
  };
};
