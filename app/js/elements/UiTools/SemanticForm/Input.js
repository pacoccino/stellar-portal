import React, { PropTypes } from 'react';
import { Input, Form } from 'semantic-ui-react';

// eslint-disable-next-line no-unused-vars
const InputFormField = ({ input, meta, ...rest }) => (
  <Form.Field>
    <Input
      {...input}
      {...rest}
    />
  </Form.Field>
);

InputFormField.propTypes = {
  input: PropTypes.object.isRequired,
  meta: PropTypes.object.isRequired,
};

export default InputFormField;
