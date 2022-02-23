import React from 'react';
import Collapsible from 'react-collapsible';

export default function Faq() {
  return (
    <Collapsible trigger="+ FAQ">
      <Collapsible trigger="+ the fuck is this?">
        <p>type in your crypto mnemonic phrase, get a uniquely ordered deck of cards that can be used to recover the mnemonic phrase</p>
      </Collapsible>
      <Collapsible trigger="+ why the fuck would i use this?">
        <p>cops find out about all the illegal shit you been doing. they raid your house. they see all your QR codes and pieces of paper with 12 or 25 words written on them. that shit's suspicious, so they take it. good job, now your life savings is gone.</p>
        <p>cops find a deck of cards. they ignore it because that's not suspicious.</p>
        <p>million other reasons to prefer a deck of cards over a mnemonic phrase that you can't remember anyway.</p>
      </Collapsible>
      <Collapsible trigger="+ momma told me to never type my mnemonic phrase into strange websites!">
        <p>good idea. that's why i made it run fully client-side. nothing ever gets sent to the server. but if you still wanna be a ninny about it you can download the source and run it yourself <a href="https://github.com/snex/mnemonic-cards" target="_new">here</a></p>
      </Collapsible>
      <Collapsible trigger="+ ok you got me, this is awesome. where do i pay?">
        <p>this shit is free but you can donate monero to me at 481eZedQWukX66WAjAK2KJ8cgnnRJhzHKQvJdX8cJrPqbgJhicrf7reEv7F5EsT5BUaQ41AkBo1XBTHH4dCEY3kc4nY6it5</p>
      </Collapsible>
      <Collapsible trigger="+ some shit aint werkin right. where do i bitch?">
        <p><a href="https://github.com/snex/mnemonic-cards" target="_new">make a github issue</a></p>
      </Collapsible>
    </Collapsible>
  )
};
