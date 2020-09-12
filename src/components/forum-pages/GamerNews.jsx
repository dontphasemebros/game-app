import React, { useState, useEffect } from 'react';
import {
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
          <div
            className="panel-primary inline-block"
            id="GeneralDisussion"
            style={{
              backgroundColor: '#D6DBDF', maxWidth: '700px', marginTop: '20px', minHeight: 'max-content',
            }}
          >
            <div className={`article-picture${article.id} panel-body text-left inline-block`} style={{ minHeight: 'max-content' }}>
              <div
                className="bgy"
                style={{
                  display: 'inline-block', minWidth: '100px', backgroundColor: '#D6DBDF', minHeight: '320px',
                }}
              >
                <img className="d-print-inline-block" src={article.image.square_tiny} heigh="200px" width="200px" alt="" style={{ display: 'inline-block', padding: '20px' }} />
                <div
                  className={`username${article.id} panel-body text-left inline-block`}
                  style={{
                    display: 'inline-block', position: 'absolute', padding: '20px', maxWidth: '460px',
                  }}
                >
                  <h4 style={{ fontWeight: 'bold' }}>{article.title}</h4>
                  <h5 style={{ display: 'inline-block', paddingTop: '20px', maxHeight: '200px' }}>{article.lede}</h5>
                  <a
                    style={{
                      display: 'inline-block', paddingTop: '10px', cursor: 'pointer', color: 'blue', marginBottom: '10px',
                    }}
                    href={article.site_detail_url}
                  >
                    {article.site_detail_url}
                  </a>
                </div>
                <div style={{ marginLeft: '20px' }}>
                  <h6>{`${article.authors}`}</h6>
                  <h6>{`${article.publish_date.split(' ')[0]}`}</h6>
                </div>
                <div className={`date${article.id} panel-body text-left inline-block`} style={{ display: 'inline-block' }}>
                  <span style={{ marginRight: '20px' }} />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GamerNews;
