import { IShimmerCircleStyleProps, IShimmerCircleStyles } from './ShimmerCircle.types';
import { getGlobalClassNames, HighContrastSelector, IRawStyle } from '../../../Styling';

const GlobalClassNames = {
  root: 'ms-ShimmerCircle-root',
  svg: 'ms-ShimmerCircle-svg'
};

export function getStyles(props: IShimmerCircleStyleProps): IShimmerCircleStyles {
  const { height, borderStyle, theme } = props;

  const { palette } = theme;
  const classNames = getGlobalClassNames(GlobalClassNames, theme);

  const styles: IRawStyle = !!borderStyle ? borderStyle : {};

  return {
    root: [
      classNames.root,
      styles,
      {
        width: `${height}px`,
        height: `${height}px`,
        minWidth: `${height}px`, // Fix for IE11 flex items
        boxSizing: 'content-box',
        borderTopStyle: 'solid',
        borderBottomStyle: 'solid',
        borderColor: palette.white,
        selectors: {
          [HighContrastSelector]: {
            borderColor: 'Window'
          }
        }
      }
    ],
    svg: [
      classNames.svg,
      {
        display: 'block',
        fill: palette.white,
        selectors: {
          [HighContrastSelector]: {
            fill: 'Window'
          }
        }
      }
    ]
  };
}
