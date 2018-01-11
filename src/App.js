import React, { Component } from 'react'
import ListContacts from './ListContacts'
import * as ContactsAPI from './utils/ContactsAPI'

class App extends Component {

  //Declarando os parametros
  //parametro state contendo um array com os dados dos contatos
  state = {
    contacts: []
  }

  //funciona como um ajax e busca as informações de um API
  componentDidMount() {
    ContactsAPI.getAll().then((contacts) => {
      this.setState({ contacts })
    })
  }

  //função que mostra o parametro contacts filtrando sem item clicado no botão para remover
  removeContact = (contact) => {
    this.setState((state) => ({
      contacts: state.contacts.filter((c) => c.id !== contact.id)
    }))

    //Remove contados dos dados externos
    ContactsAPI.remove(contact)
  }

  //Renderiza a UI
    render() {
      return (
        <div>
          <ListContacts
          onDeleteContact={this.removeContact}
          contacts={this.state.contacts} />
        </div>
      )
    }
}

export default App;
