import * as React from 'react';
import { IPersonaSharedProps, Persona, PersonaSize, PersonaPresence } from 'office-ui-fabric-react/lib/Persona';
import { Checkbox } from 'office-ui-fabric-react/lib/Checkbox';
import { Label } from 'office-ui-fabric-react/lib/Label';
import { TestImages } from '../../../common/TestImages';

import * as exampleStylesImport from '../../../common/_exampleStyles.scss';
const exampleStyles: any = exampleStylesImport;

const examplePersona: IPersonaSharedProps = {
  imageInitials: 'AL',
  text: 'Annie Lindqvist',
  secondaryText: 'Software Engineer',
  tertiaryText: 'In a meeting',
  optionalText: 'Available at 4:00pm',
  showColorRing: true,
  hidePersonaDetails: true
};

const examplePersonaWithImage: IPersonaSharedProps = {
  imageUrl: TestImages.personaFemale,
  ...examplePersona
};

export class PersonaRingExample extends React.Component<
  {},
  {
    renderColorRing?: boolean;
  }
> {
  constructor(props: {}) {
    super(props);
    this.state = {
      renderColorRing: true
    };
  }

  public render(): JSX.Element {
    const { renderColorRing } = this.state;

    return (
      <div className="ms-PersonaExample">
        <Label className={exampleStyles.exampleLabel}>Size 24 Persona</Label>

        <Persona {...examplePersona} size={PersonaSize.size24} showColorRing={renderColorRing} />
        <Persona {...examplePersonaWithImage} size={PersonaSize.size24} showColorRing={renderColorRing} />

        <Label className={exampleStyles.exampleLabel}>Size 28 Persona</Label>
        <Persona {...examplePersona} size={PersonaSize.size28} showColorRing={renderColorRing} />
        <Persona {...examplePersonaWithImage} size={PersonaSize.size28} showColorRing={renderColorRing} />

        <Label className={exampleStyles.exampleLabel}>Size 32 Persona</Label>
        <Persona {...examplePersona} size={PersonaSize.size32} showColorRing={renderColorRing} />
        <Persona {...examplePersonaWithImage} size={PersonaSize.size32} showColorRing={renderColorRing} />

        <Label className={exampleStyles.exampleLabel}>Size 40 Persona</Label>
        <Persona {...examplePersona} size={PersonaSize.size40} showColorRing={renderColorRing} />
        <Persona {...examplePersona} size={PersonaSize.size40} showColorRing={renderColorRing} />
        <Persona
          {...examplePersona}
          size={PersonaSize.size40}
          showColorRing={renderColorRing}
          presence={PersonaPresence.blocked}
        />

        <Label className={exampleStyles.exampleLabel}>Size 48 Persona (default) </Label>
        <Persona {...examplePersona} showColorRing={renderColorRing} size={PersonaSize.size48} />
        <Persona
          {...examplePersonaWithImage}
          presence={PersonaPresence.busy}
          showColorRing={renderColorRing}
          size={PersonaSize.size48}
        />
        <Persona
          {...examplePersona}
          presence={PersonaPresence.busy}
          showColorRing={renderColorRing}
          size={PersonaSize.size48}
        />

        <Label className={exampleStyles.exampleLabel}>Size 72 Persona</Label>
        <Persona
          {...examplePersona}
          size={PersonaSize.size72}
          presence={PersonaPresence.dnd}
          showColorRing={renderColorRing}
        />

        <Label className={exampleStyles.exampleLabel}>Size 100 Persona</Label>
        <Persona
          {...examplePersonaWithImage}
          size={PersonaSize.size100}
          presence={PersonaPresence.blocked}
          showColorRing={renderColorRing}
        />
      </div>
    );
  }
}
