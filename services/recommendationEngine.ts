import { UserProfile, CareerRecommendation, Stream } from '../types';

export const generateRecommendations = (profile: UserProfile): CareerRecommendation[] => {
  const recommendations: CareerRecommendation[] = [];
  const { currentStream, interests, skills, educationLevel } = profile;

  // Helper to check interest/skill presence
  const hasInterest = (tag: string) => interests.some(i => i.toLowerCase().includes(tag));
  const hasSkill = (tag: string) => skills.some(s => s.toLowerCase().includes(tag));
  const isStream = (s: Stream) => currentStream === s;

  // Groups
  const isCSLike = isStream(Stream.CSE) || isStream(Stream.AIML) || isStream(Stream.ITI_COPA);
  const isElecLike = isStream(Stream.ECE) || isStream(Stream.EEE) || isStream(Stream.ITI_ELEC);
  const isMechLike = isStream(Stream.MECH) || isStream(Stream.ITI_FITTER) || isStream(Stream.ITI_MECH);
  const isCivilLike = isStream(Stream.CIVIL);

  // --- Logic for 10th Class Subjects ---
  const isMathBackground = isStream(Stream.SSC_MATH) || isStream(Stream.MPC) || isStream(Stream.MEC) || isCSLike;
  const isScienceBackground = isStream(Stream.SSC_SCIENCE) || isStream(Stream.BIPC) || isStream(Stream.BSC);
  const isSocialBackground = isStream(Stream.SSC_SOCIAL) || isStream(Stream.HEC) || isStream(Stream.BA) || isStream(Stream.CEC);
  const isCommerceBackground = isStream(Stream.SSC_MATH) || isStream(Stream.MEC) || isStream(Stream.CEC) || isStream(Stream.BCOM);

  // --- M.Tech Specific Logic ---
  if (educationLevel === 'M.Tech') {
    recommendations.push({
      id: 'research-scientist',
      title: 'R&D Engineer / Scientist',
      description: 'Lead research initiatives and develop cutting-edge technologies.',
      matchScore: 95,
      domain: 'Tech',
      exams: ['CSIR NET', 'Gate Score', 'PhD Entrances'],
      roadmap: ['Publish Papers', 'Join R&D Labs (ISRO/DRDO/Google)', 'PhD (Optional)'],
      salaryPotential: 'Very High'
    });
    
    recommendations.push({
      id: 'professor',
      title: 'Assistant Professor',
      description: 'Academic career in top universities and engineering colleges.',
      matchScore: 85,
      domain: 'Government',
      exams: ['UGC NET', 'State SET'],
      roadmap: ['Assistant Professor', 'PhD', 'Associate Professor'],
      salaryPotential: 'High'
    });

    // If "Automatic Analysis" is selected, add broad high-level options
    if (isStream(Stream.AUTO_ANALYSIS)) {
      recommendations.push({
        id: 'tech-architect',
        title: 'Senior Solutions Architect',
        description: 'Design complex systems and lead technical teams in MNCs.',
        matchScore: 90,
        domain: 'Tech',
        exams: ['AWS Certified Solutions Architect', 'Google Cloud Architect'],
        roadmap: ['Gain Industry Exp', 'System Design Mastery', 'Leadership Roles'],
        salaryPotential: 'Very High'
      });
      
      // Return early for M.Tech Auto Analysis to avoid generic student fallbacks
      return recommendations; 
    }
  }

  // --- ITI Specific Logic ---
  if (educationLevel === 'ITI') {
    if (isElecLike) {
      recommendations.push({
        id: 'electrical-tech',
        title: 'Certified Electrician / Lineman',
        description: 'Government jobs in Railways/Electricity boards or private contracting.',
        matchScore: 95,
        domain: 'Core Engineering',
        exams: ['ALP (Railways)', 'State Electricity Board Exams'],
        roadmap: ['Apprenticeship (NAC)', 'Junior Technician', 'Senior Technician'],
        salaryPotential: 'Medium'
      });
    } else if (isMechLike) {
      recommendations.push({
        id: 'mech-tech',
        title: 'Mechanical Technician / Fitter',
        description: 'Maintenance and operations in manufacturing plants (BHEL, NTPC).',
        matchScore: 95,
        domain: 'Core Engineering',
        exams: ['DRDO CEPTAM', 'ISRO Technician'],
        roadmap: ['Apprenticeship', 'Industrial Training', 'Technician Grade'],
        salaryPotential: 'Medium'
      });
    } else if (isCSLike) {
      recommendations.push({
        id: 'comp-op',
        title: 'Computer Operator / Data Entry',
        description: 'IT support and data operations roles.',
        matchScore: 90,
        domain: 'Tech',
        exams: ['SSC CHSL', 'State Govt Exams'],
        roadmap: ['Advanced Excel/Typing', 'Polytechnic Diploma (Lateral Entry)'],
        salaryPotential: 'Medium'
      });
    }
    
    // Diploma Path for ITI
    recommendations.push({
      id: 'lateral-diploma',
      title: 'Lateral Entry Diploma (Polytechnic)',
      description: 'Upgrade your qualification to Diploma (Direct 2nd Year).',
      matchScore: 80,
      domain: 'Core Engineering',
      exams: ['ECET (Lateral)'],
      roadmap: ['Join Diploma', 'B.Tech (Lateral)', 'Engineer'],
      salaryPotential: 'High'
    });
    
    return recommendations; // Return early for ITI to keep focus
  }

  // --- General Engineering & Tech Path ---
  if (isMathBackground || isCSLike || isElecLike || hasInterest('tech')) {
    let score = 75;
    if (isStream(Stream.SSC_MATH)) score += 15;
    if (isCSLike) score += 20;
    if (hasInterest('code')) score += 10;

    const roleTitle = isStream(Stream.AIML) ? 'AI Engineer / Data Scientist' : 'Software Engineer / Architect';
    
    recommendations.push({
      id: 'software-eng',
      title: roleTitle,
      description: isStream(Stream.SSC_MATH) 
        ? 'Ideal next step: Choose MPC in Intermediate, then B.Tech.' 
        : 'Design and build intelligent software systems and applications.',
      matchScore: Math.min(score, 99),
      domain: 'Tech',
      exams: ['JEE Mains/Adv', 'GATE (CSE)', 'Coding Interviews'],
      roadmap: isStream(Stream.SSC_MATH) 
        ? ['Join Intermediate (MPC)', 'Prepare for JEE', 'B.Tech CSE/IT'] 
        : ['Strong DSA', 'System Design', 'Full Stack / ML Projects'],
      salaryPotential: 'Very High'
    });
  }

  // --- Electrical & Electronics ---
  if (isElecLike || (isStream(Stream.MPC) && hasInterest('tech'))) {
    let score = isElecLike ? 95 : 80;
    
    if (isStream(Stream.EEE) || isStream(Stream.ITI_ELEC)) {
      recommendations.push({
        id: 'electrical-eng',
        title: 'Electrical Engineer / Power Systems',
        description: 'Design electrical systems, power grids, and renewable energy solutions.',
        matchScore: score,
        domain: 'Core Engineering',
        exams: ['GATE (EE)', 'ESE (IES)', 'PSU Exams'],
        roadmap: ['B.Tech EEE', 'Projects in Power Electronics', 'GATE Preparation', 'PSU Jobs'],
        salaryPotential: 'High'
      });
    }

    if (isStream(Stream.ECE) || isStream(Stream.EEE)) {
      recommendations.push({
        id: 'vlsi-embedded',
        title: 'VLSI / Embedded Systems Engineer',
        description: 'Design microchips, processors, and embedded IoT systems.',
        matchScore: isStream(Stream.ECE) ? 98 : 90,
        domain: 'Tech',
        exams: ['GATE (EC)', 'Company Tests (Intel/Qualcomm)'],
        roadmap: ['Master Verilog/VHDL', 'Embedded C', 'M.Tech for specialized roles'],
        salaryPotential: 'High'
      });
    }
  }

  // --- Mechanical ---
  if (isMechLike || (isStream(Stream.MPC) && hasInterest('tech'))) {
    recommendations.push({
      id: 'mechanical-eng',
      title: 'Mechanical / Robotics Engineer',
      description: 'Design automated systems, EVs, and machinery.',
      matchScore: 90,
      domain: 'Core Engineering',
      exams: ['GATE (ME)', 'ISRO Centralize Recruitment'],
      roadmap: [
        'B.Tech Mechanical',
        'CAD/CFD Software Mastery',
        'Internships at ISRO/DRDO/Auto Giants',
        'R&D Roles'
      ],
      salaryPotential: 'High'
    });
  }

  // --- Chemical Engineering ---
  if (isStream(Stream.MPC) && (hasInterest('med') || hasInterest('tech'))) {
    recommendations.push({
      id: 'chemical-eng',
      title: 'Chemical Process Engineer',
      description: 'Work in Oil & Gas, Pharma, or Sustainable Energy sectors.',
      matchScore: 75,
      domain: 'Core Engineering',
      exams: ['GATE (CH)', 'PSU Recruitment'],
      roadmap: ['B.Tech Chemical', 'Process Simulation', 'Plant Design Projects'],
      salaryPotential: 'High'
    });
  }

  // --- Medical & Biology Path ---
  if (isScienceBackground || isStream(Stream.MBBS) || hasInterest('med')) {
    let score = 70;
    if (isStream(Stream.SSC_SCIENCE)) score += 20; 
    if (isStream(Stream.BIPC)) score += 25;

    recommendations.push({
      id: 'doctor-neet',
      title: 'Doctor (MBBS) / Medical',
      description: isStream(Stream.SSC_SCIENCE) 
        ? 'Ideal next step: Choose BiPC in Intermediate to pursue Medicine.' 
        : 'Clinical practice and patient care.',
      matchScore: Math.min(score, 99),
      domain: 'Medical',
      exams: ['NEET-UG'],
      roadmap: isStream(Stream.SSC_SCIENCE)
        ? ['Join Intermediate (BiPC)', 'Crack NEET-UG', 'MBBS (5.5 yrs)']
        : ['NEET-PG', 'Specialization'],
      salaryPotential: 'High'
    });
  }

  // --- Commerce & Business Path ---
  if (isCommerceBackground || isStream(Stream.BBA) || hasInterest('biz')) {
    let score = 70;
    if (isStream(Stream.SSC_MATH) || isStream(Stream.MEC) || isStream(Stream.CEC)) score += 20;
    
    recommendations.push({
      id: 'ca-finance',
      title: 'Chartered Accountant / MBA',
      description: 'Expert in finance, audit, strategy, and business management.',
      matchScore: Math.min(score + (hasSkill('Accounting') ? 10 : 0), 98),
      domain: 'Business',
      exams: ['CA Foundation', 'CAT', 'GMAT'],
      roadmap: ['Professional Certifications (CA/CFA)', 'Top Tier MBA'],
      salaryPotential: 'Very High'
    });
  }

  // --- Civil Services / Humanities ---
  if (isSocialBackground || isStream(Stream.SSC_ENGLISH) || isStream(Stream.BA) || hasInterest('law') || isCivilLike) {
    let score = 75;
    if (isStream(Stream.SSC_SOCIAL)) score += 25;
    if (isCivilLike) score = 85;
    
    recommendations.push({
      id: 'civil-services',
      title: isCivilLike ? 'Civil Engineer / Govt Services' : 'Civil Services (IAS/IPS)',
      description: isCivilLike ? 'Infrastructure projects and public works.' : 'Administrative roles serving the nation.',
      matchScore: Math.min(score, 99),
      domain: 'Government',
      exams: ['UPSC CSE', 'GATE (Civil)'],
      roadmap: isStream(Stream.SSC_SOCIAL)
        ? ['Join HEC/CEC/MEC', 'Bachelor Degree (BA/B.Sc)', 'UPSC Prep']
        : ['Degree', 'UPSC Prelims', 'Mains'],
      salaryPotential: isCivilLike ? 'High' : 'High Perks'
    });
  }

  // Default Fallback
  if (recommendations.length === 0) {
    recommendations.push({
      id: 'polytechnic',
      title: 'Polytechnic Diploma / Skill Certs',
      description: 'Technical education or specialized skill certification.',
      matchScore: 85,
      domain: 'Core Engineering',
      exams: ['POLYCET'],
      roadmap: ['Join Diploma (3 Years)', 'Lateral Entry to B.Tech'],
      salaryPotential: 'Medium'
    });
  }

  // Deduplicate by ID and Sort by score
  const uniqueRecs = Array.from(new Map(recommendations.map(item => [item.id, item])).values());
  return uniqueRecs.sort((a, b) => b.matchScore - a.matchScore).slice(0, 3);
};