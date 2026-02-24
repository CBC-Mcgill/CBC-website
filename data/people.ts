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
  Person('Thai Tran', 'President', "I max out my Claude Pro usage at least twice a day", 'assets/people/ThaiTran.png', '', 'https://www.linkedin.com/in/thai-tran-minh/', 'https://github.com/thaimtl/'),
  Person('Ethan Tran', 'VP Operations', "BOULDERING🧗🧗‍♀️🧗‍♂️‼️‼️‼️‼️", 'assets/people/ethan.png', '', 'https://www.linkedin.com/in/-ethantran-/', 'https://github.com/tran-ethan'),
  Person('Virgile Couture', 'VP Finance', "I am still a 6-hcp golfer on paper", 'assets/people/VirgileCouture.png', '', 'https://www.linkedin.com/in/v-couture/'),
  Person('Benjamin Ghaderi', 'Technical Director', "I like to build, and eat. I really love food.", 'assets/people/placeholder.png', 'benjamin.ghaderi@mail.mcgill.ca', 'https://linkedin.com/in/ben-ghaderi', 'https://github.com/BenGhad/'),
  Person('Benjamin Coriat', 'Director of Partnerships and Sponsorships', "My superpower is memory and contacts! I remember most people and have no social awareness. Don't hesitate to reach out!", 'assets/people/BenjiCoriat.png', '', 'https://www.linkedin.com/in/benjamin-coriat-763a9819a/'),
  Person('Lawrence Kang', 'Director of Partnerships and Sponsorships', "Tagline of what you'll do", 'assets/people/LawrenceKang.jpeg'),
];

export const associates: Person[] = [
  Person('Annie Huynh', 'Media Associate', "Tagline of what you'll do", 'assets/people/AnnieHuynh.jpeg'),
  Person('Jason Wang', 'Financial Associate', "I'm gonna name my son Claude", 'assets/people/JasonWang.png'),
  Person('Rayyan Khan', 'General Associate', "I’m building Quebec’s largest Islamic charity hackathon: muslimhacks.ca", 'assets/people/RayyanKhan.png', '', 'https://www.linkedin.com/in/rayyankhan1', 'https://github.com/rayyankhan47'),
  Person('David Tang', 'General Associate', "Tagline of what you'll do", 'assets/people/DavidTang.jpeg'),
  Person('Mubeen Mohammed', 'General Associate', "I am a U3 Computer Science student with an interest in ML and AI. I play squash and read manga in my free time", 'assets/people/MubeenMohammed.jpeg', 'mubeen.mohammed@mail.mcgill.ca', 'https://www.linkedin.com/in/mubeen12', 'https://github.com/mubeenmohammed'),
  Person('Minh Vo', 'General Associate', "Tagline of what you'll do", 'assets/people/MinhVo.jpeg'),
  Person('Joshua', 'General Associate', "Tagline of what you'll do", 'assets/people/placeholder.png'),
  Person('Julien Yang', 'General Associate', "Tagline of what you'll do", 'assets/people/JulienYang.jpeg'),
  Person('Parsa Rahimnia', 'General Associate', "Claude University Alumni with a Bachelors in prompt engineering", 'assets/people/ParsaRahimnia.jpeg', '', '', ' https://github.com/ParseDotEXE'),
  Person('Ralph Azrak', 'General Associate', "Software Engineering student at McGill with a strong interest in product development and emerging technologies. As CBC Hackathon Team Lead, I coordinate teams and ensure we deliver a high-impact and well-organized event", 'assets/people/RalphAzrak.jpg', 'ralph.azrak@mail.mcgill.ca', 'www.linkedin.com/in/ralph-azrak/', 'https://github.com/RalphAzrak'),
];
