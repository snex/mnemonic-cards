import React from 'react';

class Card extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reverse: props.reverse
    }
  };

  drawBack() {
    if (!this.state.reverse) {
      return '';
    }

    return (
      <use
        href="svg-cards.svg#alternate-back"
        transform="scale(0.5)"
        clipPath="url(#triangle)"
      />
    )
  }

  render() {
    return (
      <svg
        width="84"
        height="122"
        onContextMenu={ (e)=> {
          this.setState({ reverse: !this.state.reverse });
          e.preventDefault()
        }}
      >
        <clipPath id="triangle">
          <polygon points="168,0 168,244 0,244" fill="red"/>
        </clipPath>
        <use
          href={"svg-cards.svg#" + this.props.card}
          transform="scale(0.5)"
        />
        {this.drawBack()}
      </svg>
    )
  }
}

export default Card;
