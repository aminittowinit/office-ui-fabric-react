import * as React from 'react';
import { IFacepileProps, Facepile, OverflowButtonType } from 'office-ui-fabric-react/lib/Facepile';
import { Dropdown, IDropdownOption } from 'office-ui-fabric-react/lib/Dropdown';
import { Slider } from 'office-ui-fabric-react/lib/Slider';
import { facepilePersonas } from './FacepileExampleData';
import './Facepile.Examples.scss';
import { Checkbox } from 'office-ui-fabric-react/lib/components/Checkbox';
import { PersonaSize } from 'office-ui-fabric-react/lib/components/Persona';

const facepileProps: IFacepileProps = {
  personas: facepilePersonas,
  maxDisplayablePersonas: 5,
  overflowButtonType: OverflowButtonType.downArrow,
  overflowButtonProps: {
    ariaLabel: 'More users',
    onClick: (ev: React.MouseEvent<HTMLButtonElement>) => alert('overflow icon clicked')
  },
  ariaDescription: 'To move through the items use left and right arrow keys.'
};

export interface IFacepileOverflowExampleState {
  displayedPersonas: any;
  overflowButtonType: OverflowButtonType;
  showColorRing: boolean;
}

export class FacepileOverflowExample extends React.Component<{}, IFacepileOverflowExampleState> {
  constructor(props: {}) {
    super(props);

    this.state = {
      displayedPersonas: 5,
      overflowButtonType: OverflowButtonType.none,
      showColorRing: false
    };
  }

  public render(): JSX.Element {
    const { displayedPersonas, overflowButtonType, showColorRing } = this.state;
    facepileProps.maxDisplayablePersonas = displayedPersonas;
    facepileProps.overflowButtonType = overflowButtonType;
    facepileProps.showColorRing = showColorRing;
    facepileProps.personaSize = PersonaSize.size24;

    return (
      <div className={'ms-FacepileExample'}>
        <Facepile {...facepileProps} />
        <div className={'control'}>
          <Slider
            label="Number of Personas:"
            min={1}
            max={5}
            step={1}
            showValue={true}
            value={this.state.displayedPersonas}
            onChange={this._onChangePersonaNumber}
          />
          <Dropdown
            label="Overflow Button Type:"
            selectedKey={this.state.overflowButtonType}
            options={[
              { key: OverflowButtonType.none, text: OverflowButtonType[OverflowButtonType.none] },
              { key: OverflowButtonType.descriptive, text: OverflowButtonType[OverflowButtonType.descriptive] },
              { key: OverflowButtonType.downArrow, text: OverflowButtonType[OverflowButtonType.downArrow] },
              { key: OverflowButtonType.more, text: OverflowButtonType[OverflowButtonType.more] }
            ]}
            onChanged={this._onChangeType}
          />
          <Checkbox
            label="Show Rings"
            onChange={this._showColorRingCheckBoxChanged}
            checked={this.state.showColorRing}
          />
        </div>
      </div>
    );
  }

  private _showColorRingCheckBoxChanged = (ev: React.FormEvent<HTMLElement>, isChecked: boolean): void => {
    this.setState(
      (prevState: IFacepileOverflowExampleState): IFacepileOverflowExampleState => {
        prevState.showColorRing = isChecked;
        return prevState;
      }
    );
  };

  private _onChangePersonaNumber = (value: number): void => {
    this.setState(
      (prevState: IFacepileOverflowExampleState): IFacepileOverflowExampleState => {
        prevState.displayedPersonas = value;
        return prevState;
      }
    );
  };

  private _onChangeType = (value: IDropdownOption): void => {
    this.setState(
      (prevState: IFacepileOverflowExampleState): IFacepileOverflowExampleState => {
        prevState.overflowButtonType = value.key as OverflowButtonType;
        return prevState;
      }
    );
  };
}
