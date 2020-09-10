import React from 'react';
import Connor from '../assets/cschratz.jpg';
import James from '../assets/slim.jpg';
import Grant from '../assets/gmoney.png';
import Ben from '../assets/ben.jpg';

const AboutUs = () => {
  const imgStyle = {
    borderRadius: '15px',
    height: '120px',
    width: '120px',
  };

  const topDivStyle = {
    textAlign: 'center',
  };

  const childDivL = {
    float: 'left',
  };

  const childDivR = {
    float: 'right',
  };

  return (
    <div style={topDivStyle}>
      <h1>
        Our Team
      </h1>
      <br />
      <div style={childDivL}>
        <div>
          <img src={James} alt="dev" style={imgStyle} />
          <h4>
            James Thomas -
            <em>
              {' '}
              Software Engineer
            </em>
          </h4>
          <p>
            James F. Thomas is a software developer interested in
            <br />
            combing his academic along with personal experiences
            <br />
            in the health sciences,including a master&apos;s degree
            <br />
            in Kinesiology and 2nd Dan ranking as a lifelong
            <br />
            Martial Artist, toward the creation of software applications
            <br />
            that afford users&apos; the ability to work towards self-improvement
            <br />
            as well as maintain their personal health
            <br />
            & wellness to the highest standards.
          </p>
        </div>
        <br />
        <div>
          <img src={Connor} alt="dev" style={imgStyle} />
          <h4>
            Connor Schratz -
            <em>
              {' '}
              Software Engineer
            </em>
          </h4>
          <p>
            Connor Schratz is one of our lead software engineers at GameTime.
            <br />
            After years in the Neuroscience field, Connor&apos;s attention turned towards
            <br />
            software development after working with open-source software for
            <br />
            Neuroscience purposes. Since then he&apos;s been engrossed in
            <br />
            software development, being involved with a variety of projects here
            <br />
            at GameTime as well as other ventures in the software field.
          </p>
        </div>
      </div>
      <div style={childDivR}>
        <div>
          <img src={Grant} alt="dev" style={imgStyle} />
          <h4>
            Grant Duplessis -
            <em>
              {' '}
              Software Engineer
            </em>
          </h4>
          <p>
            Grant Duplessis is a long-time New Orleans resident originally from Prairieville, LA.
            <br />
            With two music degrees from LSU and significant experience teaching music
            <br />
            in public schools, Grant developed a love for problem solving, analysis,
            <br />
            and attention to detail. These skills made for a natural transition into
            <br />
            a new challenge, software development, where he does full-stack work, and
            <br />
            especially loves databases. When he’s not geeking out in a database,
            <br />
            he enjoys travel, public media, and eating New Orleans’s best food.
          </p>
        </div>
        <br />
        <div>
          <img src={Ben} alt="dev" style={imgStyle} />
          <h4>
            Ben Yoss -
            <em>
              {' '}
              Software Engineer
            </em>
          </h4>
          <p>
            Benjamin Yoss is an aspiring software engineer who
            <br />
            has been a self-taught digital artist, animator and
            <br />
            graphic designer that went from bringing his ideas
            <br />
            to life through drawing to building software applications.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
