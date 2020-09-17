import React, { useState, useEffect } from 'react';
import {
  Card, Col, Image,
} from 'react-bootstrap';

const { getNews } = require('../../helpers/helpers.js');

const GamerNews = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    getNews()
      .then((result) => {
        setArticles(result);
      })
      .catch((err) => console.error('ERROR GETTING ARTICLES: ', err));
  }, []);

  const convertTime = (timestamp) => {
    const timeConfig = { dateStyle: 'short', timeStyle: 'short' };
    const convertedTs = new Date(timestamp);
    const duration = new Date().getTime() - convertedTs;
    const seconds = Math.floor((duration / 1000) % 60);
    const minutes = Math.floor((duration / (1000 * 60)) % 60);
    const hours = Math.floor((duration / (1000 * 60 * 60)) % 24);
    const days = Math.floor((duration / (1000 * 60 * 60 * 24)));

    if (days === 0 && hours === 0 && minutes === 0) {
      return seconds < 10 ? 'just now' : `${seconds} seconds ago`;
    } if (days === 0 && hours === 0 && minutes !== 0) {
      return minutes === 1 ? 'a minute ago' : `${minutes} minutes ago`;
    } if (days === 0 && hours < 24) {
      return hours === 1 ? 'an hour ago' : `${hours} hours ago`;
    }
    return `${timestamp.toLocaleString(undefined, timeConfig)}`;
  };

  return (
    <div>
      <div style={{ padding: '20px' }}>
        <div className="card text-white bg-secondary mb-3">
          <h2 className="card-header">
            Gamer News
          </h2>
        </div>
      </div>
      <div className="Gamer-News-Body" style={{ textAlign: 'center' }}>
        {articles.map((article) => (
          <>
            <Card key={article.id}>
              <div className="card flex-row flex-wrap">
                <div className="card-header border-0">
                  <Image src={article.image.square_small} height="200px" width="200px" alt="" fluid />
                </div>
                <Col className="d-flex flex-column m-2">
                  <div />
                  <h4 className="mt-2 mb-2 ml-3 mr-0 font-bold text-left">
                    <a href={article.site_detail_url} target="_blank" rel="noreferrer">{article.title}</a>
                  </h4>
                  <div className="mx-2 card-footer text-left">
                    <div />
                    <p className="blockquote mb-0">{article.lede}</p>
                  </div>
                  <div className="mx-2 blockquote-footer text-right my-2" style={{ fontSize: '16px' }}>
                    <span className="text-muted">
                      {article.authors}
                      {', '}
                      {`${convertTime(article.publish_date)}`}
                    </span>
                  </div>
                </Col>
              </div>
            </Card>
            <br />
          </>
        ))}
      </div>
    </div>
  );
};

export default GamerNews;
