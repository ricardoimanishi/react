import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import escapeRegExp  from 'escape-string-regexp'
import sortBy  from 'sort-by'

class ListContacts extends Component {
  //Verifica se os tipos recebidos pelo componente estão corretos conforme definição do PropTypes
  static propTypes = {
    contacts: PropTypes.array.isRequired,
    onDeleteContact: PropTypes.func.isRequired
  }

//declarando os parametros
  state = {
    query: ''
  }

//atualizando o parametro query
  updateQuery = (query) => {
    //function setState para atualizar o valor da query
    this.setState({ query: query.trim() })
  }

  //função que mostra o parametro contacts filtrando sem item clicado no botão para remover
  removeContacts = (contact) => {
    this.setState((state) => ({
      contacts: state.contacts.filter((c) => c.id !== contact.id)
    }))
  }

//função para resetar a pesquisa anulando o valor da query
  clearQuery = () => {
    //function setState para atualizar o valor da query
    this.setState({ query: '' })
  }

//Renderiza a UI
  render() {

    //Declarando variaveis para deixar o codigo mais limpo (apelido)
    const { contacts, onDeleteContact } = this.props
    const { query } = this.state

    //variavel que guarda o array de contatos
    let showingContacts

    //efetua o filtro caso a variavel query tenha conteudo
    if (query) {
      //verificar documentação
      const match = new RegExp(escapeRegExp(query), 'i')
      showingContacts = contacts.filter((contact) => match.test(contact.name))
    } else {
      showingContacts = contacts
    }

    //Ordena o array de contatos por ordem de nome
    showingContacts.sort(sortBy('name'))

    return (
      <div className='list-contacts'>
        <div className='list-contacts-top'>
          <input
            className='search-contacts'
            type='text'
            placeholder='Search contacts'
            value={this.state.query}
            onChange={(event) => this.updateQuery(event.target.value)}
          />
          <Link
            to="/create"
            className="add-contact"
          >Add Contact</Link>
        </div>

        {showingContacts.length !== contacts.length && (
          <div className='showing-contacts'>
            <span>Now showing {showingContacts.length} of {contacts.length}</span>
            <button onClick={this.clearQuery}>Show All</button>
          </div>
        )}

          <ol className='contact-list'>
              {showingContacts.map((contact) => (
                  <li key={contact.id} className='contact-list-item'>
                  <div className='contact-avatar' style= {{
                    backgroundImage: `url(${contact.avatarURL})`
                  }}/>
                  <div className='contact-details'>
                    <p>{contact.name}</p>
                    <p>{contact.email}</p>
                  </div>
                  <button onClick={() => onDeleteContact(contact)} className='contact-remove'>
                    Remove
                  </button>
                  </li>
              ))}
          </ol>

      </div>
    )
  }
}


export default ListContacts
