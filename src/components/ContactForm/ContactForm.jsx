import { Formik } from 'formik';
import { nanoid } from 'nanoid';
import * as Yup from 'yup';

import {
  StyledForm,
  Lable,
  StyledField,
  StyledError,
  Button,
} from './ContactForm.styled';

const schema = Yup.object().shape({
  name: Yup.string().required('Name is required field').trim(),
  number: Yup.number()
    .typeError('Must be a number')
    .required('Number is a required field'),
});

export const ContactForm = ({ addContact }) => {
  return (
    <Formik
      initialValues={{ name: '', number: '' }}
      validationSchema={schema}
      onSubmit={(values, actions) => {
        addContact({ ...values, id: nanoid() });
        actions.resetForm();
      }}
    >
      <StyledForm>
        <Lable>
          Name
          <StyledField name="name" type="text" placeholder="Name..." />
          <StyledError component="div" name="name" />
        </Lable>
        <Lable>
          Number
          <StyledField name="number" type="tel" placeholder="Number..." />
          <StyledError component="div" name="number" />
        </Lable>
        <Button type="submit">Add new Contact</Button>
      </StyledForm>
    </Formik>
  );
};
