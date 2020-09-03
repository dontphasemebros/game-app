import React from 'react';
import {
} from 'react-bootstrap';

const forEachArticle = () => {
  const storage = [];
  for (let i = 0; i < 1; i += 1) {
    storage.push(
      <div className="panel-primary inline-block" id="GeneralDisussion" style={{ backgroundColor: '#D6DBDF', minWidth: '1100px' }}>
        <div className={`article-picture${i} panel-body text-left inline-block`}>
          <div className="bgy" style={{ display: 'inline-block', minWidth: '100px', backgroundColor: '#D6DBDF' }}>
            <img className="d-print-inline-block" src="https://techcrunch.com/wp-content/uploads/2020/05/DSC00537.jpg" height="50%" width="50%" alt="" style={{ display: 'inline-block', padding: '20px' }} />
            <div
              className={`username${i} panel-body text-left inline-block`}
              style={{
                display: 'inline-block', position: 'absolute', padding: '20px', maxWidth: '460px',
              }}
            >
              <h3 className="bg-secondary text-white">Top 10 best games to play while in quarentine</h3>
              <h5 style={{ display: 'inline-block', paddingTop: '20px' }}>One of my favorite sources for Covid-19 data and analysis is the Johns Hopkins Center for Health Security. Their colleagues run one of the most popular dashboards for Covid-19 tracking, and their newsletter is a good distillation of what the latest coronavirus data suggests about case, hospitalization, and death trends. Today the team shared a really good explanation of the inaccurate claim that the CDC was misrepresenting data on the deaths from Covid-19. </h5>
            </div>
            <h3 className="bg-secondary text-white">- Mister Author 10/20/2020</h3>
            <div className={`date${i} panel-body text-left inline-block`} style={{ display: 'inline-block' }}>
              <span style={{ marginRight: '20px' }} />
            </div>
          </div>
        </div>
      </div>,
    );
  }
  return storage;
};

// const getArticles = () => {
//   axios.get('/articles')
//     .then((data) => {
//       console.log(data.data);
//     })
//     .catch((err) => console.error(err));
// };

const GamerNews = () => (
  <div>
    <div style={{ padding: '20px' }}>
      <div className="card text-white bg-secondary mb-3">
        <h2 className="card-header">
          Gamer News
        </h2>
      </div>
    </div>
    <div className="Gamer-News-Body">
      {forEachArticle()}
    </div>
  </div>
);

export default GamerNews;
