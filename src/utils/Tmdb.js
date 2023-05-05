const API_KEY = '409fc6a6eb2868ac4a75faa8a815f0dc';
const API_BASE = 'https://api.themoviedb.org/3';

const baseFetch = async (endpoint) => {
    const req = await fetch(`${API_BASE}${endpoint}&language=pt-BR&api_key=${API_KEY}`);
    const json = await req.json();
    return json; 
}

const getlist =  {
    getHomeList: async () => {
      return [
        {
            slug: 'originals',
            title: 'Originais da Netflix',
            items: await baseFetch(`/discover/tv?with_network=213`),
        },
        {
            slug: 'trending',
            title: 'Recomendados para Você',
            items: await baseFetch('/trending/all/week?'),
        },
        {
            slug: 'toprated',
            title: 'Em Alta',
            items: await baseFetch('/movie/top_rated?'),
        },
        {
            slug: 'action',
            title: 'Ação',
            items: await baseFetch('/discover/movie?with_genre=28'),
        },
        {
            slug: 'comedy',
            title: 'Comédia',
           items: await baseFetch('/discover/movie?with_genre=35'),
        },
        {
            slug: 'horror',
            title: 'Terror',
           items: await baseFetch('/discover/movie?with_genre=27'),
        },
        {
            slug: 'romance',
            title: 'Romance',
           items: await baseFetch('/discover/movie?with_genre=10749'),
        },
        {
            slug: 'documentary',
            title: 'Documentários',
            items: await baseFetch('/discover/movie?with_genre=99'),
        },
      ]
    },
    getMovieInfo: async (movieId, type) => {
      let info = {};
      if(movieId) {
        switch(type) {
            case 'movie': 
              info = await baseFetch(`/movie/${movieId}?`)
            break;
            case 'tv': 
              info = await baseFetch(`/tv/${movieId}?`)
            break;
            default: 
            break;
        }
      }
      return info;
    }
}

export default getlist;