import { useEffect, useState } from 'react';
import Tmdb from '../utils/Tmdb';
import MovieRow from '../components/movieRow'; 
import FeaturedMovie from '../components/featuredMovie';
import Header from '../components/header';
import '../App.css';

function MovieList() {
  const [movieList, setMovieList] = useState([]);
  const [featuredData, setFeaturedData] = useState(null);
  const [blackHeader, setBlackHeader] = useState(false);
  useEffect(() => {
    const loadAll = async () => {
     const list = await Tmdb.getHomeList();
     console.log(list);
     setMovieList(list);

     const originals = list.filter((movie) => movie.slug === 'originals');
     const randomChosen = Math.floor(Math.random() * (originals[0].items.results.length - 1));
     const chosen = originals[0].items.results[randomChosen];
     const chosenInfo = await Tmdb.getMovieInfo(chosen.id, 'tv');
     setFeaturedData(chosenInfo);
    }
    loadAll();

  },[]);
  useEffect(() => {
    const scrollListener = () => {
      if(window.scrollY > 10) {
        setBlackHeader(true);
      } else {
        setBlackHeader(false);
      }
    }

    window.addEventListener('scroll', scrollListener);
    return () => {
      window.removeEventListener('scroll', scrollListener);
    };
  }, [])

  return (
    <div className='page'>
      <Header black={blackHeader}/>

      {featuredData &&
        <FeaturedMovie item={featuredData} />
      }
      <section className='lists'>
        {
          movieList.map((movie, index) => (
            <MovieRow key={ index } title={ movie.title } items={ movie.items } />
          ))
        }

      </section>

      <footer>
        Feito com <span role='img' aria-label='coração'>❤️</span> pela Gabriela <br />
        Direitos de imagem pela Netflix <br />
        Dados pegos do site Themoviedb.org
      </footer>
      {movieList.length <= 0 && 
      <div className='loading'>
        <img src="https://media.filmelier.com/noticias/br/2020/03/Netflix_LoadTime.gif" alt="Carregando..." />
      </div>
     }
    </div>
  );
}

export default MovieList;