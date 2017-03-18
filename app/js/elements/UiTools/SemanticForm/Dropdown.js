import React from 'react';
import { Dropdown, Form } from 'semantic-ui-react';

const DropdownFormField = ({ input, meta, ...rest }) => (
  <Form.Field>
    <Dropdown
      selection
      {...input}
      onChange={(e,data) => input.onChange(data.value)}
      {...rest}
    />
  </Form.Field>
);

export default DropdownFormField;
