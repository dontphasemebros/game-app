import React, { useState, useEffect } from 'react';
import {
} from 'react-bootstrap';

const { getArticles } = require('../../helpers/helpers.js');

const GamerNews = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    getArticles()
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
        {articles.map((art) => (
          <div className="panel-primary inline-block" id="GeneralDisussion" style={{ backgroundColor: '#D6DBDF', maxWidth: '700px' }}>
            <div className={`article-picture${art.id} panel-body text-left inline-block`}>
              <div className="bgy" style={{ display: 'inline-block', minWidth: '100px', backgroundColor: '#D6DBDF' }}>
                <img className="d-print-inline-block" src={art.image.square_small} height="50%" width="50%" alt="" style={{ display: 'inline-block', padding: '20px' }} />
                <div
                  className={`username${art.id} panel-body text-left inline-block`}
                  style={{
                    display: 'inline-block', position: 'absolute', padding: '20px', maxWidth: '460px',
                  }}
                >
                  <h3 className="bg-secondary text-white">{art.title}</h3>
                  <h5 style={{ display: 'inline-block', paddingTop: '20px', maxHeight: '200px' }}>{art.lede}</h5>
                </div>
                <div style={{ marginLeft: '20px' }}>
                  <h6>{`${art.authors}`}</h6>
                  <h6>{`${art.publish_date.split(' ')[0]}`}</h6>
                </div>
                <div className={`date${art.id} panel-body text-left inline-block`} style={{ display: 'inline-block' }}>
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
