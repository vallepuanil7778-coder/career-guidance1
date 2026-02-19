import { Stream, EducationLevel } from './types';
import React from 'react';
import { 
  Calculator, 
  Code, 
  FlaskConical, 
  Briefcase, 
  Scale, 
  Palette, 
  Cpu, 
  Sprout, 
  BookOpen,
  Wrench,
  Building2,
  LineChart,
  Microscope,
  Globe,
  PenTool,
  Zap,
  BrainCircuit,
  Hammer,
  Wand2
} from 'lucide-react';

// 1. 10th Class Subjects
const TENTH_SUBJECTS = [
  { id: Stream.SSC_MATH, label: 'Mathematics', full: 'Strong interest in calculation & logic', icon: <Calculator className="w-4 h-4" /> },
  { id: Stream.SSC_SCIENCE, label: 'Science', full: 'Physics, Chemistry, Biology', icon: <FlaskConical className="w-4 h-4" /> },
  { id: Stream.SSC_SOCIAL, label: 'Social Studies', full: 'History, Civics, Geography', icon: <Globe className="w-4 h-4" /> },
  { id: Stream.SSC_ENGLISH, label: 'English/Arts', full: 'Literature, Languages, Creative', icon: <PenTool className="w-4 h-4" /> },
];

// 2. Intermediate Streams
const INTER_STREAMS = [
  { id: Stream.MPC, label: 'MPC', full: 'Maths, Physics, Chemistry', icon: <Calculator className="w-4 h-4" /> },
  { id: Stream.BIPC, label: 'BiPC', full: 'Biology, Physics, Chemistry', icon: <FlaskConical className="w-4 h-4" /> },
  { id: Stream.MEC, label: 'MEC', full: 'Maths, Economics, Commerce', icon: <Calculator className="w-4 h-4" /> },
  { id: Stream.CEC, label: 'CEC', full: 'Commerce, Economics, Civics', icon: <Briefcase className="w-4 h-4" /> },
  { id: Stream.HEC, label: 'HEC', full: 'History, Economics, Civics', icon: <Scale className="w-4 h-4" /> },
];

// 3. ITI Trades
const ITI_STREAMS = [
  { id: Stream.ITI_ELEC, label: 'Electrician', full: 'Electrical Wiring & Equipment', icon: <Zap className="w-4 h-4" /> },
  { id: Stream.ITI_FITTER, label: 'Fitter', full: 'Machine Fitting & Assembly', icon: <Hammer className="w-4 h-4" /> },
  { id: Stream.ITI_COPA, label: 'COPA', full: 'Computer Operator', icon: <Code className="w-4 h-4" /> },
  { id: Stream.ITI_MECH, label: 'Motor Mech', full: 'Automobile Repair', icon: <Wrench className="w-4 h-4" /> },
];

// 4. Engineering / Diploma Streams (Simplified)
const ENGINEERING_STREAMS = [
  { id: Stream.CSE, label: 'CSE', full: 'Computer Science & Engg', icon: <Code className="w-4 h-4" /> },
  { id: Stream.AIML, label: 'AI & ML', full: 'Artificial Intelligence', icon: <BrainCircuit className="w-4 h-4" /> },
  { id: Stream.ECE, label: 'ECE', full: 'Electronics & Comm.', icon: <Cpu className="w-4 h-4" /> },
  { id: Stream.EEE, label: 'EEE', full: 'Electrical & Electronics', icon: <Zap className="w-4 h-4" /> },
  { id: Stream.MECH, label: 'MECH', full: 'Mechanical Engineering', icon: <Wrench className="w-4 h-4" /> },
  { id: Stream.CIVIL, label: 'CIVIL', full: 'Civil Engineering', icon: <Building2 className="w-4 h-4" /> },
];

// 5. M.Tech Streams (Includes Auto Analysis)
const MTECH_STREAMS = [
  { id: Stream.AUTO_ANALYSIS, label: 'Automatic Analysis', full: 'Let AI analyze based on skills/interests', icon: <Wand2 className="w-4 h-4" /> },
  ...ENGINEERING_STREAMS
];

// 6. Degree / Undergraduate Streams
const DEGREE_STREAMS = [
  { id: Stream.BCOM, label: 'B.Com', full: 'Commerce', icon: <LineChart className="w-4 h-4" /> },
  { id: Stream.BBA, label: 'BBA', full: 'Business Admin', icon: <Briefcase className="w-4 h-4" /> },
  { id: Stream.BSC, label: 'B.Sc', full: 'Science', icon: <Microscope className="w-4 h-4" /> },
  { id: Stream.BA, label: 'B.A', full: 'Arts', icon: <BookOpen className="w-4 h-4" /> },
];

// Grouping by Education Level
export const STREAM_GROUPS: Record<string, typeof INTER_STREAMS> = {
  [EducationLevel.TENTH]: TENTH_SUBJECTS,
  [EducationLevel.INTERMEDIATE]: INTER_STREAMS,
  [EducationLevel.ITI]: ITI_STREAMS,
  [EducationLevel.DIPLOMA]: ENGINEERING_STREAMS,
  [EducationLevel.BTECH]: ENGINEERING_STREAMS,
  [EducationLevel.DEGREE]: DEGREE_STREAMS,
  [EducationLevel.MTECH]: MTECH_STREAMS,
};

// Flattened list for fallback searching
export const STREAMS = [
  ...TENTH_SUBJECTS,
  ...INTER_STREAMS,
  ...ITI_STREAMS,
  ...ENGINEERING_STREAMS,
  ...MTECH_STREAMS,
  ...DEGREE_STREAMS
];

export const INTEREST_TAGS = [
  { id: 'tech', label: 'Technology & AI', icon: <Cpu className="w-3 h-3" /> },
  { id: 'med', label: 'Medicine & Bio', icon: <FlaskConical className="w-3 h-3" /> },
  { id: 'biz', label: 'Business & Mgmt', icon: <Briefcase className="w-3 h-3" /> },
  { id: 'art', label: 'Arts & Design', icon: <Palette className="w-3 h-3" /> },
  { id: 'law', label: 'Law & Governance', icon: <Scale className="w-3 h-3" /> },
  { id: 'teach', label: 'Teaching', icon: <BookOpen className="w-3 h-3" /> },
  { id: 'agri', label: 'Agriculture', icon: <Sprout className="w-3 h-3" /> },
  { id: 'code', label: 'Coding', icon: <Code className="w-3 h-3" /> },
];

export const SKILL_TAGS = [
  'Mathematics', 'Logical Reasoning', 'Communication', 'Leadership',
  'Creativity', 'Data Analysis', 'Biology', 'Accounting',
  'Problem Solving', 'Public Speaking', 'Research', 'Programming', 'Design'
];