import React from 'react';



class About extends React.Component {
  render(){
    console.log(this.props)
    return (
      <div className="App">
        <div>
          <h1>Dutch Golden Age painting</h1>
          <p>
            A distinctive feature of the period is the proliferation of distinct
            genres of paintings, with the majority of artists producing the bulk of
            their work within one of these. The full development of this
            specialization is seen from the late 1620s, and the period from then until
            the French invasion of 1672 is the core of Golden Age painting. Artists
            would spend most of their careers painting only portraits, genre scenes,
            landscapes, seascapes and ships, or still lifes, and often a particular
            sub-type within these categories. Many of these types of subject were very
            new in Western painting, and the way the Dutch painted them in this period
            was decisive for their future development.
          </p>
        </div>
      </div>
    );
  }
};

export default About;
