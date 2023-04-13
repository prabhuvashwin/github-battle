import * as React from 'react';
import PropTypes from 'prop-types';

const styles = {
  fontSize: '14px',
  position: 'absolute',
  left: '0',
  right: '0',
  marginTop: '20px',
  textAlign: 'center',
};

class Delayed extends React.Component {
  state = {
    show: false,
  };

  componentDidMount() {
    this.timeoutId = window.setTimeout(() => {
      this.setState({ show: true });
    }, this.props.delay);
  }

  componentWillUnmount() {
    window.clearTimeout(this.timeoutId);
  }

  render() {
    return this.state.show ? this.props.children : null;
  }
}

Delayed.propTypes = {
  children: PropTypes.node.isRequired,
  delay: PropTypes.number,
};

Delayed.defaultProps = {
  delay: 1000,
};

export default class Loading extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      content: props.text,
    };
  }

  componentDidMount() {
    const { text, speed } = this.props;

    this.intervalId = window.setInterval(() => {
      this.state.content === text + '...'
        ? this.setState({ content: text })
        : this.setState(({ content }) => ({ content: content + '.' }));
    }, speed);
  }

  componentWillUnmount() {
    window.clearInterval(this.intervalId);
  }
  
  render() {
    return (
      <Delayed delay={200}>
        <p styles={styles}>{this.state.content}</p>
      </Delayed>
    );
  }
};

Loading.propTypes = {
  text: PropTypes.string.isRequired,
  speed: PropTypes.number.isRequired,
};

Loading.defaultProps = {
  text: 'Loading',
  speed: 300,
};