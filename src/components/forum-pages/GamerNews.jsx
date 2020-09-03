import React from 'react';
import {
} from 'react-bootstrap';

const forEachArticle = () => {
  const storage = [];
  for (let i = 0; i < 1; i += 1) {
    storage.push(
      <div className="panel-primary inline-block" id="GeneralDisussion" style={{ backgroundColor: '#D6DBDF', minWidth: '1100px' }}>
        <div className={`profile-picture${i} panel-body text-left inline-block`}>
          <div className="bg-secondary" style={{ display: 'inline-block', minWidth: '300px' }}>
            <img className="d-print-inline-block" src="https://techcrunch.com/wp-content/uploads/2020/05/DSC00537.jpg" height="50%" width="50%" alt="" style={{ display: 'inline-block', padding: '20px' }} />
            <div className={`username${i} panel-body text-left inline-block`} style={{ display: 'inline-block' }}>
              <h5>Goldfish</h5>
            </div>
            <div className={`date${i} panel-body text-left inline-block`} style={{ display: 'inline-block' }}>
              <span style={{ marginRight: '20px' }}>10/20/2020</span>
            </div>
          </div>
          <h4 style={{ display: 'inline-block' }}>Listeninginginging to the greatest tune</h4>
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
