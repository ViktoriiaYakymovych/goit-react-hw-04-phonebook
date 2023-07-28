// import { useState } from 'react';
import PropTypes from 'prop-types';
import { Formik, Form, Field } from 'formik';
import { nanoid } from 'nanoid';

import { ContactsFormLabel, ContactsFormButton } from './ContactsForm.styled';

export const ContactsForm = ({ addNewContact }) => {
  const initialValues = {
    name: '',
    number: '',
  };

  const handleInputChange = (e, formik) => {
    const { name, value } = e.target;
    formik.setFieldValue(name, value);
  };

  const submitContact = (values, { resetForm }) => {
    const newContact = {
      id: nanoid(5),
      name: values.name,
      number: values.number,
    };
    addNewContact(newContact);
    resetForm();
  };

  return (
    <Formik initialValues={initialValues} onSubmit={submitContact}>
      {formik => (
        <Form>
          <ContactsFormLabel>
            <span>Name</span>
            <Field
              onChange={e => handleInputChange(e, formik)}
              value={formik.values.name}
              autoComplete="off"
              type="text"
              name="name"
              pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
              title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
              required
            />
          </ContactsFormLabel>
          <ContactsFormLabel>
            <span>Phone</span>
            <Field
              onChange={e => handleInputChange(e, formik)}
              value={formik.values.number}
              type="tel"
              name="number"
              pattern="\+?\d{1,4}?[ .\-\s]?\(?\d{1,3}?\)?[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,9}"
              title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
              required
            />
          </ContactsFormLabel>
          <ContactsFormButton type="submit">Add Contact</ContactsFormButton>
        </Form>
      )}
    </Formik>
  );
};

// export const ContactsForm = ({ addNewContact }) =>  {
//   const [name, setName] = useState('');
//   const [number, setNumber] = useState('');

//   const handleInputChange = e => {
//     const {name, value} = e.target;
//     if (name === 'name')
//     setName(value);
//     else if(name === 'number') 
//     setNumber(value);
//     else return;
//   };

//   const submitContact = e => {
//     e.preventDefault();

//     const newContact = {
//       id: nanoid(5),
//       name,
//       number,
//     }; 

//     addNewContact(newContact);
//     setName('');
//     setNumber('');
//   };

//   return (
//     <Formik onSubmit={submitContact}>
//       <Form>
//         <ContactsFormLabel>
//           <span>Name</span>
//           <Field
//             onChange={handleInputChange}
//             value={name}
//             autoComplete="off"
//             type="text"
//             name="name"
//             pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
//             title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
//             required
//           />
//         </ContactsFormLabel>
//         <ContactsFormLabel>
//           <span>Phone</span>
//           <Field
//             onChange={handleInputChange}
//             value={number}
//             type="tel"
//             name="number"
//             pattern="\+?\d{1,4}?[ .\-\s]?\(?\d{1,3}?\)?[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,9}"
//             title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
//             required
//           />
//         </ContactsFormLabel>
//         <ContactsFormButton type="submit">Add Contact</ContactsFormButton>
//       </Form>
//     </Formik>
//   );
// };

ContactsForm.propTypes = {
  addNewContact: PropTypes.func.isRequired,
};
