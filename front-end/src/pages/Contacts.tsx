import MainBackground from '../components/MainBackground';

function Contacts() {
  return (
    <MainBackground>
      <main className="pt-20 px-6 h-screen">
        <section className="container mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h1 className="text-2xl font-bold text-gray-900">Contact Me</h1>
            <p className="mt-4 text-gray-800">
              You can get in touch with me through the following channels:
            </p>
            <div className="mt-4">
              <h2 className="text-xl font-semibold">Email:</h2>
              <p className="text-gray-800">vladimirrybakov123@gmail.com</p>
            </div>
            <div className="mt-4">
              <h2 className="text-xl font-semibold">LinkedIn:</h2>
              <p className="text-blue-500 hover:underline">
                <a
                  href="https://www.linkedin.com/in/vladimir-rybakov-yr2000"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  linkedin.com/in/vladimir-rybakov-yr2000
                </a>
              </p>
            </div>
            <div className="mt-4">
              <h2 className="text-xl font-semibold">GitHub:</h2>
              <p className="text-blue-500 hover:underline">
                <a
                  href="https://github.com/vovafish"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  github.com/vovafish
                </a>
              </p>
            </div>
            <div className="mt-4">
              <h2 className="text-xl font-semibold">Youtube:</h2>
              <p className="text-blue-500 hover:underline">
                <a
                  href="https://www.youtube.com/channel/UCvymxnNes4am2pyjbXgmgog"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  www.youtube.com/channel/UCvymxnNes4am2pyjbXgmgog
                </a>
              </p>
            </div>
            <div className="mt-4">
              <h2 className="text-xl font-semibold">Facebook:</h2>
              <p className="text-blue-500 hover:underline">
                <a
                  href="https://www.facebook.com/profile.php?id=100009911596288"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  www.facebook.com/profile.php?id=100009911596288
                </a>
              </p>
            </div>
            <div className="mt-4">
              <h2 className="text-xl font-semibold">VKontakte:</h2>
              <p className="text-blue-500 hover:underline">
                <a
                  href="http://vk.com/m9ymur"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  http://vk.com/m9ymur
                </a>
              </p>
            </div>
          </div>
        </section>
      </main>
    </MainBackground>
  );
}

export default Contacts;
