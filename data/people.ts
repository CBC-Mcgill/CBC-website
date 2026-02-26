import type { Person } from '@/types';

const Person = (
  name: string,
  role: string,
  tagline: string,
  photo: string,
  email = '',
  linkedin = '',
  github = ''
): Person => ({
  name,
  role,
  tagline,
  photo,
  details: [],
  email,
  linkedin,
  github,
});

export const leadership: Person[] = [
  Person('Thai Tran', 'President', "I max out my Claude Pro usage at least twice a day.", 'assets/people/ThaiTran.png', '', 'https://www.linkedin.com/in/thai-tran-minh/', 'https://github.com/thaimtl/'),
  Person('Ethan Tran', 'VP Operations', "BOULDERING🧗🧗‍♀️🧗‍♂️‼️‼️‼️‼️", 'assets/people/ethan.png', '', 'https://www.linkedin.com/in/-ethantran-/', 'https://github.com/tran-ethan'),
  Person('Virgile Couture', 'VP Finance', "I am still a 6-hcp golfer on paper.", 'assets/people/VirgileCouture.png', '', 'https://www.linkedin.com/in/v-couture/'),
  Person('Benjamin Ghaderi', 'Technical Director', "I like to build, and eat. I really love food.", 'assets/people/BenGhad.jpg', 'benjamin.ghaderi@mail.mcgill.ca', 'https://linkedin.com/in/ben-ghaderi', 'https://github.com/BenGhad/'),
  Person('Benjamin Coriat', 'Director of Partnerships and Sponsorships', "My superpower is memory and contacts! I remember most people and have no social awareness. Don't hesitate to reach out!", 'assets/people/BenjiCoriat.png', '', 'https://www.linkedin.com/in/benjamin-coriat-763a9819a/'),
  Person('Lawrence Kang', 'Director of Partnerships and Sponsorships', "Flat whites > Cappuccinos, change my mind! if you can...", 'assets/people/LawrenceKang.jpeg', '', 'https://www.linkedin.com/in/lawrence-kang-589b63175/'),
];

export const associates: Person[] = [
  Person('Annie Huynh', 'Design Associate', "Responsible for the graphics, the aesthetics, and the gender ratio.", 'assets/people/AnnieHuynh.jpeg', '', 'https://www.linkedin.com/in/annie-huynh-60805b202/'),
  Person('Parsa Rahimnia', 'Tech Lead', "Claude University Alumni with a Bachelors in prompt engineering", 'assets/people/ParsaRahimnia.jpeg', '', '', ' https://github.com/ParseDotEXE'),
  Person('Ralph Azrak', 'Hackathon Lead', "I coordinate teams and ensure we deliver a high-impact and well-organized event", 'assets/people/RalphAzrak.jpg', 'ralph.azrak@mail.mcgill.ca', 'www.linkedin.com/in/ralph-azrak/', 'https://github.com/RalphAzrak'),
  Person('Rayyan Khan', 'Associate', "I’m building Quebec’s largest Islamic charity hackathon: muslimhacks.ca", 'assets/people/RayyanKhan.png', '', 'https://www.linkedin.com/in/rayyankhan1', 'https://github.com/rayyankhan47'),
  Person('Jason Wang', 'Technical Associate', "I'm gonna name my son Claude.", 'assets/people/JasonWang.png', '', 'https://www.linkedin.com/in/jason-wang-6a87b9311/'),
  Person('David Tang', 'Associate', "I mod my MacBook to use Linux. Long live Linux!", 'assets/people/DavidTang.jpeg', '', 'https://www.linkedin.com/in/david-tang-a96376328/'),
  Person('Mubeen Mohammed', 'Technical Associate', "CS + ML nerd who unwinds with manga and squash.", 'assets/people/MubeenMohammed.jpeg', 'mubeen.mohammed@mail.mcgill.ca', 'https://www.linkedin.com/in/mubeen12', 'https://github.com/mubeenmohammed'),
  Person('Minh Vo', 'Technical Associate', "I am building Jarvis with Thai and David", 'assets/people/MinhVo.jpeg', '', 'https://www.linkedin.com/in/minh-vo-657b09324/'),
  Person('Joshua', 'Associate', "I am building a swarm agent. ", 'assets/people/joshua.jpg', '', 'https://www.linkedin.com/in/joshuazhou1/'),
  Person('Julien Yang', 'Associate', "Julienning ...", 'assets/people/JulienYang.jpeg', '', '', 'https://github.com/forknay'),
];
