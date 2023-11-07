import { useEffect, useMemo, useState } from 'react';

import toast, { Toaster } from 'react-hot-toast';

import { ContactForm } from 'components/ContactForm/ContactForm';
import { Section } from 'components/Section/Section';
import { ContactList } from 'components/ContactList/ContactList';
import { Filter } from 'components/Filter/Filter';
import { Layout } from 'components/Layout';

const localStorageKey = 'contacts';

const getInitialContacts = () => {
  const savedFilters = localStorage.getItem(localStorageKey);
  if (savedFilters !== null) {
    return JSON.parse(savedFilters);
  }
  return [];
};

export const App = () => {
  const [contacts, setContacts] = useState(getInitialContacts);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem(localStorageKey, JSON.stringify(contacts));
  }, [contacts]);

  const addNewContact = newContact => {
    if (contacts.find(contact => contact.name === newContact.name)) {
      return toast.error(
        `${newContact.name} is already added to Your contact's list`
      );
    }
    setContacts(prevState => ([ ...prevState, newContact ]));
  };

  const filteredContact = e => {
    setFilter(e.target.value);
  };

  const normalizedContacts = useMemo(() => {
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLocaleLowerCase().includes(normalizedFilter)
    );
  }, [contacts, filter]);

  const contactDelete = id => {
    setContacts(prevState => prevState.filter(contact => contact.id !== id));
  };

  return (
    <Layout>
      <Section title="Phonebook">
        <ContactForm addContact={addNewContact} />
      </Section>
      <Section title="Contacts">
        <Filter value={filter} filteredContacts={filteredContact} />
        <ContactList contacts={normalizedContacts} onDelete={contactDelete} />
      </Section>
      <Toaster />
    </Layout>
  );
};
