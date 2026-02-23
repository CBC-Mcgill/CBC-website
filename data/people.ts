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
  Person('Thai Tran', 'President', "I max out my Claude Pro usage at least twice a day", 'assets/people/ThaiTran.png'),
  Person('Ethan Tran', 'VP Operations', "Tagline of what you'll do", 'assets/people/ethan.png'),
  Person('Virgile Couture', 'VP Finance', "Tagline of what you'll do", 'assets/people/VirgileCouture.png'),
  Person('Benjamin Ghaderi', 'Technical Director', "Tagline of what you'll do", 'assets/people/placeholder.png', '', 'https://linkedin.com/in/ben-ghaderi', 'https://github.com/BenGhad/'),
  Person('Benjamin Coriat', 'Director of Partnerships and Sponsorships', "Tagline of what you'll do", 'assets/people/BenjaminCoriat.jpeg'),
  Person('Lawrence Kang', 'Director of Partnerships and Sponsorships', "Tagline of what you'll do", 'assets/people/LawrenceKang.jpeg'),
];

export const associates: Person[] = [
  Person('Annie Huynh', 'Media Associate', "Tagline of what you'll do", 'assets/people/AnnieHuynh.jpeg'),
  Person('Jason Wang', 'Financial Associate', "Tagline of what you'll do", 'assets/people/placeholder.png'),
  Person('Rayyan Khan', 'General Associate', "Tagline of what you'll do", 'assets/people/RayyanKhan.png'),
  Person('David Tang', 'General Associate', "Tagline of what you'll do", 'assets/people/DavidTang.jpeg'),
  Person('Mubeen Mohammed', 'General Associate', "Tagline of what you'll do", 'assets/people/MubeenMohammed.jpeg'),
  Person('Minh Vo', 'General Associate', "Tagline of what you'll do", 'assets/people/MinhVo.jpeg'),
  Person('Joshua', 'General Associate', "Tagline of what you'll do", 'assets/people/placeholder.png'),
  Person('Julien Yang', 'General Associate', "Tagline of what you'll do", 'assets/people/JulienYang.jpeg'),
  Person('Parsa Rahimnia', 'General Associate', "Tagline of what you'll do", 'assets/people/ParsaRahimnia.jpeg'),
  Person('Ralph Azrak', 'General Associate', "Tagline of what you'll do", 'assets/people/RalphAzrak.jpg'),
];
