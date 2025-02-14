import React from 'react';
import { useNews } from '../hook/useNews';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import "../style/News.css";

function News() {

  const { data, isLoading } = useNews();

  return (
    <div className="news">
      <div className="news_wrap">
        {
          isLoading ? 
            [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(val => (
              <div className="item" key={val}></div>
            )) :
            data?.results.map(item => (
              <div className="item" key={item.article_id}>
                <figure>
                  <img 
                    src={`${item.image_url ? item.image_url : './img/image-not-found.png'}`} 
                    alt={item.article_id} 
                  />
                </figure>
                <div className="news_info">
                  <div className="text">
                    <h2>{item.title}</h2>
                    <div className="write_info">
                      <p className="date">{item.pubDate}</p>
                      <p className="creator">{item.creator}</p>
                    </div>
                  </div>
                  <a href={item.link} target='_blank'>
                    <p>VIEW MORE</p>
                    <FontAwesomeIcon icon={faArrowRight} />
                  </a>
                </div>
              </div>
            ))
        }
      </div>
    </div>
  )
}

export default News;