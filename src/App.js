import './App.css';
import ItemListContainer from './components/ItemListContainer/ItemListContainer';
import NavBar from './components/NavBar/NavBar';

function App() {

  const items = ['Producto 1', 'Producto 2', 'Producto 3', 'Producto 4'];

  return (
    <div className="App">
      <NavBar />
      <ItemListContainer items={items} />
    </div>
  );
}

export default App;
