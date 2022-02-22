import React from 'react';

class Mnemonic extends React.Component {
  render() {
    return (
      <textarea
        cols="60"
        rows="5"
        value={this.props.mnemonic}
        onChange={ (e) => {
          console.log('changed text area to: ' + e.target.value);
        }}
      />
    );
  }
}

export default Mnemonic;
