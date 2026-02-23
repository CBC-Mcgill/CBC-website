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
  Person('Thai Tran', 'President', "Tagline of what you'll do", 'assets/people/placeholder.png'),
  Person('Ethan Tran', 'VP Operations', "Tagline of what you'll do", 'assets/people/placeholder.png'),
  Person('Virgile Couture', 'VP Finance', "Tagline of what you'll do", 'assets/people/placeholder.png'),
  Person('Benjamin Ghaderi', 'Technical Director', "Tagline of what you'll do", 'assets/people/placeholder.png', '', 'https://linkedin.com/in/ben-ghaderi', 'https://github.com/BenGhad/'),
  Person('Benjamin', 'Director of Partnerships and Sponsorships', "Tagline of what you'll do", 'assets/people/placeholder.png'),
  Person('Lawrence', 'Director of Partnerships and Sponsorships', "Tagline of what you'll do", 'assets/people/placeholder.png'),
];

export const associates: Person[] = [
  Person('Annie', 'Media Associate', "Tagline of what you'll do", 'assets/people/placeholder.png'),
  Person('Jason', 'Financial Associate', "Tagline of what you'll do", 'assets/people/placeholder.png'),
  Person('Rayyan', 'General Associate', "Tagline of what you'll do", 'assets/people/placeholder.png'),
  Person('David', 'General Associate', "Tagline of what you'll do", 'assets/people/placeholder.png'),
  Person('Mubeen', 'General Associate', "Tagline of what you'll do", 'assets/people/placeholder.png'),
  Person('Minh', 'General Associate', "Tagline of what you'll do", 'assets/people/placeholder.png'),
  Person('Joshua', 'General Associate', "Tagline of what you'll do", 'assets/people/placeholder.png'),
  Person('Julien', 'General Associate', "Tagline of what you'll do", 'assets/people/placeholder.png'),
  Person('Parsa', 'General Associate', "Tagline of what you'll do", 'assets/people/placeholder.png'),
  Person('Ralph', 'General Associate', "Tagline of what you'll do", 'assets/people/placeholder.png'),
];
