import React from 'react';
import ReactDOM from 'react-dom';
// import Button from 'react-bootstrap/lib/Button';
import { FormGroup, ControlLabel, FormControl, HelpBlock } from 'react-bootstrap';

function FieldGroup({ id, label, help, ...props }) {
  return (
    <FormGroup controlId={id}>
      <ControlLabel>{label}</ControlLabel>
      <FormControl {...props} />
      {help && <HelpBlock>{help}</HelpBlock>}
    </FormGroup>
  );
}

const element = (
  <div>
    <h1>WebArch!</h1>
    <FieldGroup
      id="formControlsFile"
      type="file"
      label="File"
      help="Example block-level help text here."
    />
  </div>
);

ReactDOM.render(
  element,
  document.getElementById('root'),
);
