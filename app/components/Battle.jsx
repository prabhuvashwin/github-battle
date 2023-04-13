import * as React from 'react';
import PropTypes from 'prop-types';

const Instructions = () => {
  return (
    <section className='instructions-container'>
      <h2>Instructions</h2>
      <ol>
        <li>Enter two Github users</li>
        <li>Battle</li>
        <li>See the winner</li>
      </ol>
    </section>
  );
};

class PlayerInput extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = (event) => {
    this.setState({
      username: event.target.value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.onSubmit(this.state.username);
  };

  render() {
    return (
      <form className='player-form'>
        <label htmlFor='username' className='player-label'>
          {this.props.label}
        </label>
        <input
          type='text'
          id='username'
          className='player-input'
          placeholder='github username'
          autoComplete='off'
          value={this.state.username}
          onChange={this.handleChange}
        />
        <button
          className='btn player-btn'
          type='submit'
          disabled={!this.state.username}
          onClick={this.handleSubmit}
        >
          Submit
        </button>
      </form>
    );
  }
};

PlayerInput.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
};

export default class Battle extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      playerOne: null,
      playerTwo: null,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit = (id, player) => {
    this.setState({
      [id]: player,
    });
  };

  render() {
    const { playerOne, playerTwo } = this.state;
    const disabled = !playerOne || !playerTwo;
    return (
      <main className='stack main-stack animate-in'>
        <div className='split'>
          <h1>Players</h1>

          <a href='#' className={`btn primary ${disabled ? 'disabled' : ''}`}>Battle</a>
        </div>
        <section className='grid'>
          {
            playerOne === null
              ? <PlayerInput label='Player One' onSubmit={(player) => this.handleSubmit('playerOne', player)} />
              : null
          }
          {
            playerTwo === null
              ? <PlayerInput label='Player Two' onSubmit={(player) => this.handleSubmit('playerTwo', player)} />
              : <PlayerPreview username={playerTwo} />
          }
        </section>
        <Instructions />
      </main>
    )
  }
};
