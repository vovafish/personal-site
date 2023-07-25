const projects = [
  {
    link: 'ping-pong-game',
    name: 'Ping Pong Game',
    image: 'https://example.com/image-url',
    description:
      "The university project is a single-player Retro Ping-Pong game with a score, against AI. It utilizes HTML Canvas and JavaScript's OOP to create reusable classes for paddles, allowing them to inherit shared properties while having unique ones for each paddle. The game includes collision mechanics to reflect the ball upon impact with the paddles and a function to randomize the ball's directions. Additionally, there's a scoring system to display the number of goals for the player and CPU.",
    stack: ['HTML5', 'CSS', 'JavaScript'],
    resource: 'https://github.com/vovafish/ping-pong-game',
  },
  {
    link: 'online-repair-shop',
    name: 'Online Repair Shop',
    image: 'https://example.com/image-url',
    description:
      'This is a project that I created during the "Web beginner" course that I took in 2019. It has a well-looking design, a smooth scroller that is done using JS, and a form that users can use to send feedback, created with PHP. Also, I used build tool Gulp to optimize my JS code.',
    stack: ['HTML5', 'CSS3', 'JavaScript', 'PHP', 'Gulp', 'SCSS/SASS'],
    resource: 'https://github.com/vovafish/online-repair-shop',
    view: 'https://vovafish.github.io/online-repair-shop',
  },
  {
    link: 'book-store-system',
    name: 'Book Store System',
    image: 'https://example.com/image-url',
    description:
      'Book Store System is a university project, a web-based application that simulates an online book store. It provides front-end browsing of available books with data fetched from a local database. Authorized users can access the back-end for book management using CRUD operations. Developed with HTML5, CSS3, C#, ASP.NET, and LESS. Open-source on GitHub.',
    stack: ['HTML5', 'CSS3', 'C#', 'ASP.NET', 'LESS'],
    resource: 'https://github.com/vovafish/book-store-system',
  },
  {
    link: 'web-based-system-for-college',
    name: 'Web-based System For College',
    image: 'https://example.com/image-url',
    description:
      'Web-based System For College is a university project built using the MVC pattern. The fully functional website provides general information about the college, including courses and modules. It allows user registration and login with email and password to apply for courses. Backend validation ensures data integrity. Staff members can log in to view their assigned modules. Developed with HTML5, CSS3, JavaScript, and C#. Open-source on GitHub.',
    stack: ['HTML5', 'CSS3', 'JavaScript', 'C#'],
    resource: 'https://github.com/vovafish/React_Team',
  },
  {
    link: 'game-store',
    name: 'Control App For Managing Game Store',
    image: 'https://example.com/image-url',
    description:
      'Control App For Managing Game Store is a university project for a small shop with second-hand games. Built using C# with a focus on object-oriented programming (OOP), the application employs reusable methods and classes. It allows manipulation of data, including adding, updating, and deleting game records. Developed with C#. Open-source on GitHub.',
    stack: ['C#'],
    resource: 'https://github.com/vovafish/game-store',
  },
  {
    link: 'dmu-empire',
    name: 'DMU Empire; Cars Store',
    image: 'https://example.com/image-url',
    description:
      'Uni project for selling cars. The system allows users to buy cars and car-related equipment. Users can create accounts with a unique email and strong password. Account info is shared with other systems. The main page displays company info, car filters, and best sellers. Users can search for specific cars and view car details. Purchase requires login. Car returns handled through a form. Option to buy car-related items. About page shows company socials and info. Users can mark favorite cars. Order confirmation sent via email.',
    stack: ['ReactJS', 'SASS/SCSS', 'MongoDB', 'NodeJS', 'MERN', 'Express'],
    resource: 'https://github.com/vovafish/dmu-empire',
  },
  {
    link: 'music-player',
    name: 'Music Player',
    image: '',
    description:
      'The university project "Music Player" is a web application that allows users to manage and play their music collection. Users can insert new songs by pressing the "Add" button and providing details such as the song name and artist. The application stores all the inserted songs as a library collection, which users can then manage by deleting or filtering them. The project implements all the basic CRUD operations to enable smooth management of the music library',
    stack: ['C#', 'ASP.NET', 'CSS'],
    resource: 'https://github.com/vovafish/music-player',
  },
  {
    link: 'personal-site-v1',
    name: 'Version 1 of My Personal Site',
    image: '',
    description:
      'Version 1 of My Personal Site" was an early version of my personal website. It served as an interactive platform to describe my experiences, showcase my skills, and provide information about me. The website incorporated animation libraries to enhance its visual appeal and create a dynamic user experience. It aimed to present my portfolio, achievements, and a brief summary of my professional background. Additionally, the site featured a section with contact information, allowing visitors to get in touch with me easily',
    stack: ['JavaScript', 'HTML', 'Stylus'],
    resource: 'https://github.com/vovafish/vribakov',
  },
];

export default projects;
