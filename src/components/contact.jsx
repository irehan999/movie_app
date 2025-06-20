import React from 'react';

// Placeholder icons (you can replace these with actual SVGs or an icon library)
const UserIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-400">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
  </svg>
);

const EmailIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-400">
    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
  </svg>
);

const SubjectIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-400">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12" />
    </svg>
);


const MessageIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-400">
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-3.86 8.25-8.625 8.25S3.75 16.556 3.75 12s3.86-8.25 8.625-8.25S21 7.444 21 12Z" />
  </svg>
);


function Contact() {
  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, you'd handle form submission here.
    // For this static page, we can just log a message or show an alert.
    alert("Thank you for your message! (This is a static form)");
  };

  return (
    <div className="wrapper py-12 px-4 sm:px-6 lg:px-8 text-white">
      <div className="max-w-3xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-gradient mb-4">
            Get in Touch
          </h1>
          <p className="text-lg text-gray-300 max-w-xl mx-auto">
            Have questions, feedback, or a movie suggestion? We'd love to hear from you!
            Fill out the form below, and we'll do our best to get back to you.
          </p>
        </header>

        <div className="bg-dark-100 p-8 sm:p-10 rounded-xl shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Field */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
                Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <UserIcon />
                </div>
                <input
                  type="text"
                  name="name"
                  id="name"
                  required
                  className="block w-full bg-dark-200 border-gray-700 rounded-lg shadow-sm py-3 pl-10 pr-3 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 sm:text-sm placeholder-gray-500"
                  placeholder="John Doe"
                />
              </div>
            </div>

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <EmailIcon />
                </div>
                <input
                  type="email"
                  name="email"
                  id="email"
                  required
                  className="block w-full bg-dark-200 border-gray-700 rounded-lg shadow-sm py-3 pl-10 pr-3 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 sm:text-sm placeholder-gray-500"
                  placeholder="you@example.com"
                />
              </div>
            </div>
            
            {/* Subject Field */}
            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-1">
                Subject
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <SubjectIcon />
                </div>
                <input
                  type="text"
                  name="subject"
                  id="subject"
                  required
                  className="block w-full bg-dark-200 border-gray-700 rounded-lg shadow-sm py-3 pl-10 pr-3 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 sm:text-sm placeholder-gray-500"
                  placeholder="Regarding Movie Suggestions"
                />
              </div>
            </div>

            {/* Message Field */}
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">
                Message
              </label>
              <div className="relative">
                 {/* Icon could be placed differently for textarea, or omitted */}
                <textarea
                  id="message"
                  name="message"
                  rows="4"
                  required
                  className="block w-full bg-dark-200 border-gray-700 rounded-lg shadow-sm py-3 px-3 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 sm:text-sm placeholder-gray-500"
                  placeholder="Your message here..."
                ></textarea>
              </div>
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-r from-purple-600 to-indigo-700 hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-dark-100 focus:ring-indigo-500 transition duration-150 ease-in-out"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>

        <div className="mt-12 text-center">
            <h3 className="text-xl font-semibold text-gray-200 mb-3">Alternatively</h3>
            <p className="text-gray-400">
                You can also reach us directly via email:
            </p>
            <a href="mailto:contact@moviefinder.example.com" className="text-gradient hover:underline text-lg font-medium">
                contact@moviefinder.example.com
            </a>
            {/* Add social media links here if you have them */}
            {/* 
            <div className="mt-6 flex justify-center space-x-6">
                <a href="#" className="text-gray-400 hover:text-white"> <YourSocialIcon /> </a>
                <a href="#" className="text-gray-400 hover:text-white"> <YourSocialIcon /> </a>
            </div>
            */}
        </div>

      </div>
    </div>
  );
}

export default Contact;