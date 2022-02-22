import React from 'react'

class CoinSelect extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      coinType: props.coinType
    };
  };

  render() {
    var updateCoinType = this.props.update;
    return (
      <div>
        <select
          name="coin"
          value={this.state.coinType}
          onChange={ (e) => {
            this.setState({ coinType: e.target.value });
            updateCoinType(e.target.value);
          }}
        >
          <option value="bip39">BIP39 (Bitcoin/ETH)</option>
          <option value="xmr">Monero</option>
        </select>
      </div>
    );
  }
}

export default CoinSelect;
