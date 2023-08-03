import MainBackground from '../components/MainBackground';

function About() {
  const frontEndDependencies = [
    'ReactTS',
    'Tailwind',
    'react-dom',
    'react-router-dom',
    'axios',
    'react-slick',
    'slick-carousel',
  ];

  const frontEndKeyAspects = [
    'Passing data between components with props',
    'Making HTTP requests with axios',
    'Creating routes and handling navigation with react-router-dom',
    'Building responsive carousels with react-slick',
  ];

  const backEndDependencies = [
    'express',
    'nodejs',
    'bcrypt',
    'jsonwebtoken',
    'mongodb',
    'nodemailer',
    'uuid',
  ];

  const backEndKeyAspects = [
    'Building RESTful APIs with Express',
    'Hashing passwords using bcrypt',
    'Implementing JWT-based authentication with jsonwebtoken',
    'Working with MongoDB for database operations',
    'Sending emails with nodemailer',
    'Generating unique identifiers with uuid',
  ];

  return (
    <MainBackground>
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="max-w-4xl mx-auto px-6 bg-white rounded-lg shadow-lg grid gap-4 grid-cols-2">
          <div className="col-span-1 flex flex-col py-8 pr-5">
            <h1 className="text-4xl font-bold mb-6 text-center text-black">
              Front-end
            </h1>
            <div className="pt-8 h-60">
              <h2 className="text-2xl font-bold mb-4">
                Technologies and Libraries
              </h2>
              <ul className="pl-6">
                {frontEndDependencies.map((dependency) => (
                  <li key={dependency}>{dependency}</li>
                ))}
              </ul>
            </div>
            <div className="h-8" /> {/* Added div with fixed height */}
            <h2 className="text-2xl font-bold mb-4">Key Aspects</h2>
            <ul className="pl-6">
              {frontEndKeyAspects.map((aspect) => (
                <li key={aspect}>{aspect}</li>
              ))}
            </ul>
          </div>
          <div className="col-span-1 flex flex-col py-8">
            <h1 className="text-4xl font-bold mb-6 text-center text-black">
              Back-end
            </h1>
            <div className="pt-8 h-60">
              <h2 className="text-2xl font-bold mb-4">
                Technologies and Libraries
              </h2>
              <ul className="pl-6">
                {backEndDependencies.map((dependency) => (
                  <li key={dependency}>{dependency}</li>
                ))}
              </ul>
            </div>
            <div className="h-8" /> {/* Added div with fixed height */}
            <h2 className="text-2xl font-bold mb-4">Key Aspects</h2>
            <ul className="pl-6">
              {backEndKeyAspects.map((aspect) => (
                <li key={aspect}>{aspect}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </MainBackground>
  );
}

export default About;
