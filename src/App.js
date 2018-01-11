import React, { Component } from 'react';
import ListContacts from './ListContacts'

class App extends Component {

  //Declarando os parametros
  //parametro state contendo um array com os dados dos contatos
  state = {
    contacts: [
    {
      "id" : "ryan",
      "name" : "Ryan Florence",
      "email" : "ryan@reacttraining.com",
      "avatarURL" : "http://localhost:5001/ryan.jpg"
    },
    {
      "id" : "michael",
      "name" : "michael Jackson",
      "email" : "michaeljackson@reacttraining.com",
      "avatarURL" : "http://localhost:5001/michael.jpg"
    },
    {
      "id" : "tyler",
      "name" : "Tyler McGinnis",
      "email" : "tyler@reacttraining.com",
      "avatarURL" : "http://localhost:5001/tyler.jpg"
    },
    {
      "id" : "Andre",
      "name" : "André ação",
      "email" : "tyler@reacttraining.com",
      "avatarURL" : "http://localhost:5001/tyler.jpg"
    }
  ]
}

//função que mostra o parametro contacts filtrando sem item clicado no botão para remover
removeContact = (contact) => {
  this.setState((state) => ({
    contacts: state.contacts.filter((c) => c.id !== contact.id)
  }))
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
