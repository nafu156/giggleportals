
import { Program } from '../models/types';

// Sample data for programs
export const programs: Program[] = [
  {
    id: "1",
    title: "Computer Science",
    university: "Stanford University",
    location: "United States, California",
    discipline: "Computer Science & IT",
    degree: "Master",
    duration: "2 years",
    tuition: "$52,000 per year",
    description: "Stanford's MS in Computer Science program offers specializations in artificial intelligence, biocomputation, computer and network security, human-computer interaction, information management and analytics, mobile and internet computing, real-world computing, software theory, systems, and theoretical computer science.",
    imageUrl: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
    deadline: "December 1, 2023",
    language: "English",
    requirements: ["Bachelor's degree in Computer Science or related field", "GRE scores", "TOEFL/IELTS for international applicants"],
    scholarships: true,
    ranking: 1
  },
  {
    id: "2",
    title: "Business Administration",
    university: "Harvard University",
    location: "United States, Massachusetts",
    discipline: "Business & Management",
    degree: "Master",
    duration: "2 years",
    tuition: "$73,440 per year",
    description: "The Harvard MBA is designed to develop leaders who make a difference in the world. Students develop the skills required to lead organizations, build businesses, and solve complex social problems.",
    imageUrl: "https://images.unsplash.com/photo-1462899006636-339e08d1844e",
    deadline: "January 5, 2024",
    language: "English",
    requirements: ["Bachelor's degree", "GMAT/GRE scores", "Work experience (avg. 4.7 years)"],
    applicationFee: "$250",
    scholarships: true,
    ranking: 2
  },
  {
    id: "3",
    title: "Medicine",
    university: "Oxford University",
    location: "United Kingdom, Oxford",
    discipline: "Medicine & Health",
    degree: "Bachelor",
    duration: "6 years",
    tuition: "£38,740 per year",
    description: "Oxford's Medicine course is a six-year program that provides well-rounded intellectual training with particular emphasis on basic science research. Students work in laboratories and learn scientific methods and analytical techniques.",
    imageUrl: "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7",
    deadline: "October 15, 2023",
    language: "English",
    requirements: ["A-levels: A*AA in Chemistry, and either Biology, Physics or Mathematics", "BMAT test required"],
    applicationFee: "£75",
    scholarships: true,
    ranking: 3
  },
  {
    id: "4",
    title: "Environmental Engineering",
    university: "ETH Zurich",
    location: "Switzerland, Zurich",
    discipline: "Engineering & Technology",
    degree: "Master",
    duration: "1.5 years",
    tuition: "CHF 1,460 per year",
    description: "ETH Zurich's Environmental Engineering program focuses on understanding, analyzing and managing the environment as a system and its interaction with humans, society, and engineering systems.",
    imageUrl: "https://images.unsplash.com/photo-1473691955023-da1c49c95c78",
    deadline: "December 15, 2023",
    language: "English",
    requirements: ["Bachelor's degree in related field", "English proficiency"],
    applicationFee: "CHF 150",
    scholarships: true,
    ranking: 5
  },
  {
    id: "5",
    title: "Psychology",
    university: "University of Amsterdam",
    location: "Netherlands, Amsterdam",
    discipline: "Social Sciences",
    degree: "Bachelor",
    duration: "3 years",
    tuition: "€8,900 per year",
    description: "The Psychology program at UvA covers the broad topics of human emotions, behavior, and mental processes. It explores how people perceive, learn, and interact with the environment and each other.",
    imageUrl: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a",
    deadline: "May 1, 2024",
    language: "English",
    requirements: ["Secondary school diploma", "English proficiency"],
    applicationFee: "€100",
    scholarships: false,
    ranking: 6
  },
  {
    id: "6",
    title: "Data Science",
    university: "MIT",
    location: "United States, Massachusetts",
    discipline: "Computer Science & IT",
    degree: "Master",
    duration: "1 year",
    tuition: "$75,000",
    description: "The MIT Master of Data Science program equips students with the tools to apply analytics to solve complex real-world problems. The curriculum integrates statistics, machine learning, data analysis, and algorithmic principles.",
    imageUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475",
    deadline: "January 15, 2024",
    language: "English",
    requirements: ["Bachelor's degree in a quantitative field", "Programming experience", "GRE scores"],
    applicationFee: "$75",
    scholarships: true,
    ranking: 1
  },
  {
    id: "7",
    title: "Digital Marketing",
    university: "ESADE Business School",
    location: "Spain, Barcelona",
    discipline: "Business & Management",
    degree: "Master",
    duration: "10 months",
    tuition: "€29,800",
    description: "ESADE's MSc in Digital Marketing provides a comprehensive understanding of current and emerging digital marketing technologies, techniques and strategies. Students develop the skills to lead digital transformation initiatives.",
    imageUrl: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6",
    deadline: "July 30, 2024",
    language: "English",
    requirements: ["Bachelor's degree", "GMAT/GRE (optional)", "Interview"],
    applicationFee: "€135",
    scholarships: true,
    ranking: 8
  },
  {
    id: "8",
    title: "Architecture",
    university: "Delft University of Technology",
    location: "Netherlands, Delft",
    discipline: "Architecture & Design",
    degree: "Master",
    duration: "2 years",
    tuition: "€18,750 per year",
    description: "The Architecture Master's program at TU Delft educates architects who have a broad understanding of their field, who are critical thinkers and who can develop innovative architectural concepts.",
    imageUrl: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
    deadline: "April 1, 2024",
    language: "English",
    requirements: ["Bachelor's degree in Architecture or related field", "Portfolio", "Letter of motivation"],
    applicationFee: "€100",
    scholarships: true,
    ranking: 4
  }
];

export const getPrograms = (): Program[] => {
  return programs;
};

export const getProgramById = (id: string): Program | undefined => {
  return programs.find(program => program.id === id);
};
