import React, { useState } from 'react';
import {IoIosArrowBack, IoIosArrowForward} from 'react-icons/io';
import './movieRow.css';

const MovieRow = ({ title, items }) => {
  const [scrollX, setScrollX] = useState(-400);
  const handleLeftArrow = () => {
    let x = scrollX + Math.round(window.innerWidth / 2);
    if(x > 0) {
      x = 0
    }
    setScrollX(x);
  }
  const handleRightArrow = () => {
    let x = scrollX - Math.round(window.innerWidth / 2);
    let listW = items.results.length * 150;
    if((window.innerWidth - listW) > x) {
      x = (window.innerWidth - listW) - 60;
    }
    setScrollX(x);
  }
  return (
    <div className='movieRow'>
        <h2>{title}</h2>
        <div className='movieRow--left' onClick={handleLeftArrow}>
          <IoIosArrowBack style={{fontSize: 50}}/>
        </div>
        <div className='movieRow--right' onClick={handleRightArrow}>
          <IoIosArrowForward style={{fontSize: 50}}/>
        </div>
        <div className='movieRow--listarea'>
          <div className='movieRow--list' style={{
            marginLeft: scrollX,
            width: items.results.length * 150
          }}>
            {items.results.length > 0 && items.results.map((movie, index) => (
              <div className='movieRow--item' key={ index }> 
                <img src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`} alt={movie.original_title} />
              </div>
            ))}
          </div>
        </div>
    </div>
  )
}

export default MovieRow;