import * as React from 'react';
import {
  BaseComponent,
  classNamesFunction,
  divProperties,
  getInitials,
  getNativeProps,
  getRTL
} from '../../../Utilities';
import { mergeStyles } from '../../../Styling';
import { PersonaPresence } from '../PersonaPresence/index';
import { Icon } from '../../../Icon';
import { Image, ImageFit, ImageLoadState } from '../../../Image';
import {
  IPersonaCoinProps,
  IPersonaCoinStyleProps,
  IPersonaCoinStyles,
  IPersonaPresenceProps,
  PersonaPresence as PersonaPresenceEnum,
  PersonaSize
} from '../Persona.types';
import { initialsColorPropToColorCode } from '../PersonaInitialsColor';

const getClassNames = classNamesFunction<IPersonaCoinStyleProps, IPersonaCoinStyles>();

export interface IPersonaState {
  isImageLoaded?: boolean;
  isImageError?: boolean;
}

/**
 * PersonaCoin with no default styles.
 * [Use the `getStyles` API to add your own styles.](https://github.com/OfficeDev/office-ui-fabric-react/wiki/Styling)
 */
export class PersonaCoinBase extends BaseComponent<IPersonaCoinProps, IPersonaState> {
  public static defaultProps: IPersonaCoinProps = {
    size: PersonaSize.size48,
    presence: PersonaPresenceEnum.none,
    imageAlt: ''
  };

  constructor(props: IPersonaCoinProps) {
    super(props);

    this._warnDeprecations({ primaryText: 'text' });

    this.state = {
      isImageLoaded: false,
      isImageError: false
    };
  }

  public render(): JSX.Element | null {
    const {
      className,
      coinProps,
      showUnknownPersonaCoin,
      coinSize,
      styles,
      imageUrl,
      onRenderCoin = this._onRenderCoin,
      onRenderInitials = this._onRenderInitials,
      presence,
      showInitialsUntilImageLoads,
      theme,
      showColorRing
    } = this.props;

    const size = this.props.size as PersonaSize;
    const divProps = getNativeProps(this.props, divProperties);

    const innerCircleSizeStyle = !coinSize ? { width: '100%', height: '100%' } : undefined;

    const hideImage = showUnknownPersonaCoin;
    const backgroundColor = !showUnknownPersonaCoin ? initialsColorPropToColorCode(this.props) : undefined;

    const personaPresenceProps: IPersonaPresenceProps = {
      coinSize,
      presence,
      size,
      theme
    };

    // Use getStyles from props, or fall back to getStyles from styles file.
    const classNames = getClassNames(styles, {
      theme: theme!,
      className: coinProps && coinProps.className ? coinProps.className : className,
      size,
      showUnknownPersonaCoin,
      showColorRing: showColorRing,
      backgroundColor: backgroundColor
    });

    const shouldRenderInitials = Boolean(
      !this.state.isImageLoaded &&
        onRenderCoin === this._onRenderCoin &&
        ((showInitialsUntilImageLoads && imageUrl) || !imageUrl || this.state.isImageError || hideImage)
    );

    return (
      <div {...divProps} className={classNames.coin}>
        {// Render PersonaCoin if size is not size10
        size !== PersonaSize.size10 && size !== PersonaSize.tiny ? (
          <div {...coinProps} className={classNames.imageArea} style={innerCircleSizeStyle}>
            {shouldRenderInitials && (
              <div
                className={mergeStyles(
                  classNames.initials,
                  !showUnknownPersonaCoin && { backgroundColor: initialsColorPropToColorCode(this.props) }
                )}
                style={innerCircleSizeStyle}
                aria-hidden="true"
              >
                {onRenderInitials(this.props, this._onRenderInitials)}
              </div>
            )}
            {imageUrl && !hideImage && onRenderCoin(this.props, this._onRenderCoin)}
            <PersonaPresence {...personaPresenceProps} />
          </div>
        ) : // Otherwise, render just PersonaPresence.
        this.props.presence ? (
          <PersonaPresence {...personaPresenceProps} />
        ) : (
          // Just render Contact Icon if there isn't a Presence prop.
          <Icon iconName="Contact" className={classNames.size10WithoutPresenceIcon} />
        )}
        {this.props.children}
      </div>
    );
  }

  private _onRenderCoin = (props: IPersonaCoinProps): JSX.Element | null => {
    const {
      styles,
      imageUrl,
      imageAlt,
      imageShouldFadeIn,
      imageShouldStartVisible,
      theme,
      showUnknownPersonaCoin,
      showColorRing
    } = this.props;

    const classNames = getClassNames(styles, {
      theme: theme!,
      showUnknownPersonaCoin,
      showColorRing: showColorRing
    });

    return (
      <Image
        className={classNames.image}
        imageFit={ImageFit.cover}
        src={imageUrl}
        alt={imageAlt}
        shouldFadeIn={imageShouldFadeIn}
        shouldStartVisible={imageShouldStartVisible}
        onLoadingStateChange={this._onPhotoLoadingStateChange}
      />
    );
  };

  /**
   * Deprecation helper for getting text.
   */
  private _getText(): string {
    return this.props.text || this.props.primaryText || '';
  }

  private _onRenderInitials = (props: IPersonaCoinProps): JSX.Element => {
    let { imageInitials } = props;
    const { allowPhoneInitials, showUnknownPersonaCoin } = props;

    if (showUnknownPersonaCoin) {
      return <Icon iconName="Help" />;
    }

    const isRTL = getRTL();

    imageInitials = imageInitials || getInitials(this._getText(), isRTL, allowPhoneInitials);

    return imageInitials !== '' ? <span>{imageInitials}</span> : <Icon iconName="Contact" />;
  };

  private _onPhotoLoadingStateChange = (loadState: ImageLoadState) => {
    this.setState({
      isImageLoaded: loadState === ImageLoadState.loaded,
      isImageError: loadState === ImageLoadState.error
    });

    this.props.onPhotoLoadingStateChange && this.props.onPhotoLoadingStateChange(loadState);
  };
}
