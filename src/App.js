import { useEffect, useState } from 'react';
import './App.css';
import ItemCount from './components/ItemListContainer/ItemCount';
import ItemListContainer from './components/ItemListContainer/ItemListContainer';
import NavBar from './components/NavBar/NavBar';
import Loading from './components/Stateless/Loading';

function App() {

  const [items, setItems] = useState(null);

  const itemsBootcamps = [
    {
      nombre: 'Cloud Management',
      urlImage: 'https://blog.simpletechnology.io/hs-fs/hubfs/cloud-vs-cloud-scale.png?width=300&name=cloud-vs-cloud-scale.png',
      duracion: '4 meses',
      precio: 1200,
      valoracion: 4.3,
      cupos: 7
    },
    {
      nombre: 'Full Stack',
      urlImage: 'https://gbksoft.com/blog/wp-content/uploads/2019/09/Full-Stack-DeveloperArtboard-1.png',
      duracion: '8 meses',
      precio: 950,
      valoracion: 4.8,
      cupos: 8
    },
    {
      nombre: 'Data Science',
      urlImage: 'https://www.springboard.com/library/static/b2cd05116fc1151aae9af49289bb8520/5a190/10-12-how-is-data-science-used-in-finance.png',
      duracion: '6 meses',
      precio: 1150,
      valoracion: 4.5,
      cupos: 5
    },
    {
      nombre: 'Game Development',
      urlImage: 'https://gulftechcentre.com/wp-content/uploads/2019/12/iPhone-game-development.png',
      duracion: '4 meses',
      precio: 750,
      valoracion: 4.6,
      cupos: 7
    }
  ];

  const itemsCursos = [
    {
      nombre: 'Basic Java',
      urlImage: 'https://i.blogs.es/8d2420/650_1000_java/1366_2000.png',
      duracion: '12 clases',
      precio: 400,
      valoracion: 4.7,
      cupos: 12
    },
    {
      nombre: 'Basic React',
      urlImage: 'https://upload.wikimedia.org/wikipedia/commons/4/47/React.svg',
      duracion: '18 clases',
      precio: 650,
      valoracion: 4.6,
      cupos: 11
    },
    {
      nombre: 'Django Advance',
      urlImage: 'https://upload.wikimedia.org/wikipedia/commons/7/75/Django_logo.svg',
      duracion: '9 clases',
      precio: 850,
      valoracion: 3.8,
      cupos: 9
    },
    {
      nombre: 'Microservices',
      urlImage: 'https://2.bp.blogspot.com/-VVJVflS7AAI/WqmyLbA5gdI/AAAAAAABWfc/Rr7vBIxiaa0BNBJR34P5mGF3Ar4gCFBlQCLcBGAs/s1600/1_uOLtvuo9wxHXyETP_c085A.png',
      duracion: '14 clases',
      precio: 700,
      valoracion: 4.4,
      cupos: 15
    }
  ];

  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve([
        {
          tipo: 'Bootcamps',
          lista: itemsBootcamps
        },
        {
          tipo: 'Cursos',
          lista: itemsCursos
        }
      ]);
    }, 2000);
  });

  useEffect(() => {
    promise.then(result => {
      setItems(result);
    });
  }, []);

  return (
    <div className="">
      <div className="">
        <NavBar />
        {
          items === null ? (<Loading />) : (
            <ItemListContainer items={items} itemCount={ItemCount} />
          )
        }
      </div>
    </div>
  );
}

export default App;
