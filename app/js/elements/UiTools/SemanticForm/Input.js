import React from 'react';
import { Input, Form } from 'semantic-ui-react';

const InputFormField = ({ input, meta, ...rest }) => (
  <Form.Field>
    <Input
      {...input}
      {...rest}
    />
  </Form.Field>
);

export default InputFormField;
