import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import ListContacts from './ListContacts'
import CreateContact from './CreateContact'
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

    //Remove contados dos dados externos;
    ContactsAPI.remove(contact)
  }

  //Renderiza a UI
    render() {
      return (
        <div className="app">
          <Route exact path="/" render={() => (
            <ListContacts
            onDeleteContact={this.removeContact}
            contacts={this.state.contacts}
            />
          )}/>

          <Route path="/create" component={CreateContact}/>

        </div>
      )
    }
}

export default App;
