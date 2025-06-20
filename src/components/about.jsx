import React from 'react';

function About() {
  return (
    <div className="wrapper py-12 px-4 sm:px-6 lg:px-8 text-white">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-gradient mb-8 text-center">
          About MovieFinder
        </h1>
        <div className="space-y-6 bg-dark-100 p-8 rounded-lg shadow-xl">
          <p className="text-lg leading-relaxed text-gray-300">
            Welcome to MovieFinder! Our mission is to help you discover your next favorite movie with ease.
            Whether you're looking for the latest blockbusters, timeless classics, or hidden gems,
            MovieFinder provides a comprehensive and user-friendly platform.
          </p>
          <p className="text-lg leading-relaxed text-gray-300">
            We utilize the vast database of <a href="https://www.themoviedb.org/" target="_blank" rel="noopener noreferrer" className="text-gradient hover:underline">The Movie Database (TMDB)</a> to bring you
            up-to-date information, ratings, trailers, and more.
          </p>
          <p className="text-lg leading-relaxed text-gray-300">
            This project is a demonstration of modern web development techniques using React,
            Tailwind CSS, and the TMDB API. We hope you enjoy using MovieFinder as much as we
            enjoyed building it!
          </p>
          {/* You can add more sections like "Our Team", "Features", etc. */}
        </div>
      </div>
    </div>
  );
}

export default About;