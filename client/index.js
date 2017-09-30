import React from 'react';
import ReactDOM from 'react-dom';
import Button from 'react-bootstrap/lib/Button';
import { FormGroup, InputGroup, FormControl } from 'react-bootstrap';

const element = (
  <div>
    <FormGroup>
      <InputGroup>
        <InputGroup.Button>
          <Button>Before</Button>
        </InputGroup.Button>
        <FormControl type="text" />
      </InputGroup>
    </FormGroup>
    <h1>Hello, world!</h1>
    <Button>Default</Button>
  </div>
);

ReactDOM.render(
  element,
  document.getElementById('root'),
);
