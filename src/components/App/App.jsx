import { useState, useEffect } from 'react';

import {ContactsForm} from '../ContactsForm/ContactsForm';
import { Filter } from '../Filter/Filter';
import { ContactList } from '../ContactList/ContactList';

import { AppContainer, AppTitle } from './App.styled';

export const App = () => {
  const [filter, setFilter] = useState('');
  const [contacts, setContacts] = useState(() => {
    return JSON.parse(localStorage.getItem('contacts') ?? [])
  })

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts))
  }, [contacts]);

  const addNewContact = newContact => {
    if(contacts.find(contact => contact.name === newContact.name)) {
      return alert(`${newContact.name} is already in contacts`);
    } 
    setContacts(prev => [...prev, newContact])
  };

  const filterChange = e => {
    setFilter(e.target.value)
  };

  const contactDelete = contactId => {
    setContacts(prev => prev.filter(contact => contact.id !== contactId));
  };

    return (
      <AppContainer>
        <AppTitle>Phonebook</AppTitle>
        <ContactsForm addNewContact={addNewContact} />
        <AppTitle>Contacts</AppTitle>
        <Filter
          filteredValue={filter}
          filterChange={filterChange}
        />
        <ContactList
          data={contacts}
          filter={filter}
          contactDelete={contactDelete}
        />
      </AppContainer>
    );
}
