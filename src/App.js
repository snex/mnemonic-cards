import './App.css';
import CardTable from './CardTable.js';
import CoinSelect from './CoinSelect.js';
import EntropyTest from './EntropyTest.js';
import Mnemonic from './Mnemonic.js';

function App() {
  return (
    <div>
      <EntropyTest/>
      <CoinSelect/>
      <Mnemonic/>
      <CardTable/>
    </div>
  );
}

export default App;
