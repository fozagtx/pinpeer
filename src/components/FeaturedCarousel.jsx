import React from 'react';
import '../styles/FeaturedCarousel.css';

const FeaturedCarousel = ({ creators }) => {
  // Sort creators by total donations in descending order and take the top 5
  const topCreators = creators.sort((a, b) => b.totalDonations - a.totalDonations).slice(0, 5);

  return (
    <div className="featured-carousel">
      <h2 className="carousel-title">Featured Creators</h2>
      <div className="carousel-container">
        {topCreators.map(creator => (
          <div key={creator.id} className="carousel-card">
            <img src={creator.avatar} alt={creator.name} className="carousel-avatar" />
            <h3 className="carousel-name">{creator.name}</h3>
            <p className="carousel-project">{creator.project}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedCarousel;