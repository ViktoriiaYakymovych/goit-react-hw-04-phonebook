import { Component } from 'react';
import toast, { Toaster } from 'react-hot-toast';

import { ContactForm } from 'components/ContactForm/ContactForm';
import { Section } from 'components/Section/Section';
import { ContactList } from 'components/ContactList/ContactList';
import { Filter } from 'components/Filter/Filter';
import { Layout } from 'components/Layout';

const localStorageKey = 'contacts';
export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const savedContacts = localStorage.getItem(localStorageKey);
    if (savedContacts !== null) {
      this.setState({
        contacts: JSON.parse(savedContacts),
      })
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const {contacts: prevContacts} = prevState;
    const {contacts: nextContacts} = this.state;

    if(prevContacts !== nextContacts) {
      localStorage.setItem(localStorageKey, JSON.stringify(nextContacts))
    }
  }

  addNewContact = newContact => {
    if (this.state.contacts.find(contact => contact.name === newContact.name)) {
      return toast.error(
        `${newContact.name} is already added to Your contact's list`
      );
    } 
    this.setState(prevState => {
      return {
        contacts: [...prevState.contacts, newContact],
      };
    });
  };

  filteredContact = e => {
    this.setState({filter: e.target.value});
  }

  normalizedContact = () => {
    const {contacts, filter} = this.state;
    const normalizedFilter = filter.toLowerCase();
    
    return contacts.filter(contact => contact.name.toLocaleLowerCase().includes(normalizedFilter));
  }

  contactDelete = (id) => {
    this.setState(prevState => {
      return {
        contacts: prevState.contacts.filter(contact => contact.id !== id)
      }
    })
  }

  render() {
    const {filter} = this.state;
    return (
      <Layout>
        <Section title="Phonebook">
          <ContactForm addContact={this.addNewContact} />
        </Section>
        <Section title="Contacts">
          <Filter value={filter} filteredContacts={this.filteredContact}/>
          <ContactList contacts={this.normalizedContact()} onDelete={this.contactDelete}/>
        </Section>
        <Toaster/>
      </Layout>
    );
  }
}
