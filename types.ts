export enum EducationLevel {
  TENTH = '10th',
  INTERMEDIATE = 'Intermediate',
  ITI = 'ITI',
  DIPLOMA = 'Diploma',
  DEGREE = 'Degree',
  BTECH = 'B.Tech',
  MTECH = 'M.Tech'
}

export enum Stream {
  // Automatic Analysis
  AUTO_ANALYSIS = 'Automatic Analysis',

  // Intermediate Groups
  MPC = 'MPC',
  BIPC = 'BiPC',
  CEC = 'CEC',
  MEC = 'MEC',
  HEC = 'HEC',
  
  // 10th Class Subjects
  SSC_MATH = 'Mathematics',
  SSC_SCIENCE = 'General Science',
  SSC_SOCIAL = 'Social Studies',
  SSC_ENGLISH = 'English/Languages',
  
  // ITI Trades
  ITI_ELEC = 'Electrician',
  ITI_FITTER = 'Fitter',
  ITI_COPA = 'COPA',
  ITI_MECH = 'Motor Mech',
  
  // Professional / Higher Ed
  MBBS = 'MBBS',
  
  // Engineering Branches (Simplified)
  CSE = 'CSE',
  AIML = 'AI & ML',
  ECE = 'ECE',
  EEE = 'EEE',
  MECH = 'MECH',
  CIVIL = 'CIVIL',
  
  // Degree
  BCOM = 'B.Com',
  BSC = 'B.Sc',
  BA = 'B.A',
  BBA = 'BBA'
}

export interface UserProfile {
  name: string;
  age: number;
  educationLevel: EducationLevel | '';
  currentStream: string; // Can be a Stream enum or a custom string from user input
  gpa: number;
  interests: string[];
  skills: string[];
  workStyle: number; // 1-10 (Individual -> Team)
  environment: number; // 1-10 (Office -> Field)
}

export interface CareerRecommendation {
  id: string;
  title: string;
  description: string;
  matchScore: number;
  exams: string[];
  roadmap: string[];
  salaryPotential: string; // e.g. "High", "Medium"
  domain: 'Tech' | 'Medical' | 'Business' | 'Arts' | 'Government' | 'Core Engineering';
}

export type ProcessingStage = 'SVM' | 'XGBOOST' | 'DECISION_TREE' | 'AGGREGATING' | 'COMPLETE';