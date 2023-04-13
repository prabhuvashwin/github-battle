import * as React from 'react';
import PropTypes from 'prop-types';
import { close } from './Icon';
import Results from './Results';

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
  state = {
    username: '',
  };

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

const PlayerPreview = ({ username, label, onReset }) => {
  return (
    <article className='card'>
      <h3 className='player-label'>{label}</h3>
      <div className='split'>
        <div className='row gap-md'>
          <img
            className='avatar-small'
            src={`https://github.com/${username}.png?size=64`}
            alt={`Avatar for ${username}`}
          />
          <a href={`https://github.com/${username}`} className='link'>
            {username}
          </a>
        </div>
        <button className='btn secondary icon' onClick={onReset}>
          {close}
        </button>
      </div>
    </article>
  );
};

PlayerPreview.propTypes = {
  username: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onReset: PropTypes.func.isRequired,
};

export default class Battle extends React.Component {
  state = {
    playerOne: null,
    playerTwo: null,
    battle: false,
  };

  handleSubmit = (id, player) => {
    this.setState({ [id]: player });
  };

  handleReset = (id) => {
    this.setState({ [id]: null });
  };

  render() {
    const { playerOne, playerTwo, battle } = this.state;
    const disabled = !playerOne || !playerTwo;

    if (battle) {
      return <Results playerOne={playerOne} playerTwo={playerTwo} />;
    }

    return (
      <main className='stack main-stack animate-in'>
        <div className='split'>
          <h1>Players</h1>

          <button onClick={() => (this.setState({ battle: true }))} className={`btn primary ${disabled ? 'disabled' : ''}`}>
            Battle
          </button>
        </div>
        <section className='grid'>
          {
            playerOne === null
              ? <PlayerInput label='Player One' onSubmit={(player) => this.handleSubmit('playerOne', player)} />
              : <PlayerPreview username={playerOne} label='Player One' onReset={() => this.handleReset('playerOne')} />
          }
          {
            playerTwo === null
              ? <PlayerInput label='Player Two' onSubmit={(player) => this.handleSubmit('playerTwo', player)} />
              : <PlayerPreview username={playerTwo} label='Player Two' onReset={() => this.handleReset('playerTwo')} />
          }
        </section>
        <Instructions />
      </main>
    )
  }
};
