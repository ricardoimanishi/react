import React, { Component } from 'react'
import ListContacts from './ListContacts'
import CreateContact from './CreateContact'
import * as ContactsAPI from './utils/ContactsAPI'

class App extends Component {

  //Declarando os parametros
  //parametro state contendo um array com os dados dos contatos
  state = {
    screen: 'list', // list or create
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
        <div>
          {this.state.screen === 'list' && (
            <ListContacts
            onDeleteContact={this.removeContact}
            contacts={this.state.contacts}
            onNavigate={() => {
              this.setState({ screen: 'create'})
            }}
            />
          )}

          {this.state.screen === 'create' && (
              <CreateContact/>
          )}
        </div>
      )
    }
}

export default App;
