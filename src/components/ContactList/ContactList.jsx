import { nanoid } from 'nanoid';

import { ContactCard } from 'components/ContactCard/ContactCard';

import { StyledList } from './ContactList.styled';

export const ContactList = ({ contacts, onDelete}) => {
  return (
    <StyledList>
      {contacts.map(contact => (
        <li key={nanoid()}>
          <ContactCard contact={contact} onDelete={onDelete}/>
        </li>
      ))}
    </StyledList>
  );
};
