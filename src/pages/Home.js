import React from 'react';

function Home() {
  return (
    <div className="home">
      <section className="featured-section">
        <div className="container">
          <h2>Featured Content</h2>
          <div className="featured-content">
            <img 
              src="/home_image/highlights.jpg" 
              alt="Attack on Titan highlights" 
              className="featured-image" 
            />
            <div className="featured-text">
              {/* Add any text or content related to the highlights here */}
            </div>
          </div>
        </div>
      </section>
      
      {/* Add other sections or content for the home page here */}
    </div>
  );
}

export default Home;