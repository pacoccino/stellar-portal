import React, { PropTypes } from 'react';
import { Dropdown, Form } from 'semantic-ui-react';

// eslint-disable-next-line no-unused-vars
const DropdownFormField = ({ input, meta, ...rest }) => (
  <Form.Field>
    <Dropdown
      selection
      {...input}
      onChange={(e, data) => input.onChange(data.value)}
      {...rest}
    />
  </Form.Field>
);

DropdownFormField.propTypes = {
  input: PropTypes.object.isRequired,
  meta: PropTypes.object.isRequired,
};

export default DropdownFormField;
