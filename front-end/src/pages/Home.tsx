/* eslint-disable react/no-unescaped-entities */
import MainBackground from '../components/MainBackground';

function Home() {
  return (
    <MainBackground>
      <div className="min-h-screen flex items-center justify-center">
        <div className="max-w-4xl mx-auto px-6 py-4 bg-white rounded-lg shadow-lg">
          <h1 className="text-4xl font-bold mb-6 text-center text-black">
            Hey there!
          </h1>
          <div className="text-base grid grid-cols-1 md:grid-cols-2 gap-8">
            <p className="transform -translate-y-2 translate-x-4 mb-6 text-gray-800">
              I'm Vladimir Ribakov, a passionate full-stack developer based in
              Leicester, UK. With a strong background in Computing and a First
              Class Honors graduate, I've immersed myself in the world of web
              development, striving to create exceptional digital experiences.
            </p>
            <p className="transform translate-y-12 -translate-x-4 mb-6 text-gray-800">
              Over the years, I've embarked on a journey of learning and growth,
              working on a wide array of projects that span the entire stack.
              From crafting robust back-end systems to designing intuitive and
              engaging front-end interfaces, I relish the opportunity to bring
              ideas to life through code.
            </p>
            <p className="transform -translate-y-2 translate-x-4 mb-6 text-gray-800">
              My dedication to my craft and keen eye for detail ensure that I
              develop cutting-edge, pixel-perfect solutions that not only meet
              the requirements but also exceed expectations. Seamlessly blending
              creativity with functionality, I take pride in delivering
              user-centric experiences that make a real impact.
            </p>
            <p className="transform translate-y-12 -translate-x-4 mb-6 text-gray-800">
              Driven by my love for technology and innovation, I stay up-to-date
              with the latest trends and best practices. Whether it's tackling
              complex challenges or collaborating in a team environment, I
              approach every project with enthusiasm, adaptability, and a focus
              on excellence.
            </p>
            <p className="transform -translate-y-2 translate-x-4 mb-6 text-gray-800">
              Thank you for visiting my website! Here, you'll get a glimpse into
              my journey as a full-stack developer and the diverse projects I've
              worked on. Feel free to explore and get in touch to discuss
              exciting opportunities or collaborations.
            </p>
          </div>
        </div>
      </div>
    </MainBackground>
  );
}

export default Home;
