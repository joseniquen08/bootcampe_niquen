import './App.css';
import ItemCount from './components/ItemListContainer/ItemCount';
import ItemListContainer from './components/ItemListContainer/ItemListContainer';
import NavBar from './components/NavBar/NavBar';

function App() {

  const items = [
    {
      nombre: 'Cloud Management',
      duracion: '4 meses',
      cupos: 7
    },
    {
      nombre: 'Full Stack',
      duracion: '8 meses',
      cupos: 8
    },
    {
      nombre: 'Data Science',
      duracion: '6 meses',
      cupos: 5
    },
    {
      nombre: 'Game Development',
      duracion: '4 meses',
      cupos: 7
    }
  ];

  return (
    <div className="App">
      <NavBar />
      <ItemListContainer items={items} itemCount={ItemCount} />
    </div>
  );
}

export default App;
