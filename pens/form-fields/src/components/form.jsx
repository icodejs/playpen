import React, { Component, createRef } from 'react';

class PlayPenForm extends Component {
  constructor(props) {
    super(props);

    this.birthdate = createRef();
    this.username = createRef();
    this.email = createRef();

    this.state = {};
  }

  changeHandler = event => {
    const name = event.target.name;
    const value = event.target.value;

    this.setState({
      [name]: value
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.target);
    const form = event.target;

    console.log("data.get('username')", data.get('username'));
    console.log('data keys', data.keys().next());
    console.log("this.username.current.value", this.username.current.value);
    console.log("form", form);
    console.log("form.querySelector", form.querySelector('[name=username]').value);
    console.log("form.elements['username']", form.elements['username'].value);
    console.log("this.state.username", this.state.username);
    console.log("this.state", this.state);
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input name="username" type="text" ref={this.username} onChange={this.changeHandler} />
        <input name="email" type="email" ref={this.email} onChange={this.changeHandler} />
        <input name="birthdate" type="text" ref={this.birthdate} onChange={this.changeHandler} />
        <button>Send</button>
      </form>
    )
  }
}

export default PlayPenForm;
