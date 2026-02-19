import React, { useState } from 'react';
import { EducationLevel, Stream, UserProfile, CareerRecommendation } from './types';
import { STREAMS, STREAM_GROUPS, INTEREST_TAGS, SKILL_TAGS } from './constants';
import { generateRecommendations } from './services/recommendationEngine';
import { AnalysisSimulation } from './components/AnalysisSimulation';
import { 
  ChevronRight, 
  ChevronLeft, 
  GraduationCap, 
  User, 
  Sparkles, 
  Map,
  CheckCircle,
  TrendingUp,
  Download
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

export default function App() {
  const [step, setStep] = useState(1);
  const [profile, setProfile] = useState<UserProfile>({
    name: '',
    age: 16,
    educationLevel: '',
    currentStream: '',
    gpa: 75,
    interests: [],
    skills: [],
    workStyle: 5,
    environment: 5
  });
  const [results, setResults] = useState<CareerRecommendation[]>([]);

  const handleNext = () => {
    if (step === 3) {
      // Before showing results, run "simulation"
      setStep(4);
    } else {
      setStep(step + 1);
    }
  };

  const handleBack = () => setStep(step - 1);

  const toggleInterest = (id: string) => {
    setProfile(prev => ({
      ...prev,
      interests: prev.interests.includes(id) 
        ? prev.interests.filter(i => i !== id) 
        : [...prev.interests, id]
    }));
  };

  const toggleSkill = (skill: string) => {
    setProfile(prev => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter(s => s !== skill)
        : [...prev.skills, skill]
    }));
  };

  const runAnalysis = () => {
    const recs = generateRecommendations(profile);
    setResults(recs);
    setStep(5); // Show results
  };

  // Get relevant streams based on education level, defaulting to generic list if none selected
  const availableStreams = profile.educationLevel 
    ? STREAM_GROUPS[profile.educationLevel] || STREAMS 
    : STREAMS;

  // Dynamic Label logic
  const getStreamLabel = () => {
    switch (profile.educationLevel) {
      case EducationLevel.TENTH: return "Favorite / Strongest Subject";
      case EducationLevel.INTERMEDIATE: return "Current Group / Stream";
      case EducationLevel.ITI: return "Trade";
      case EducationLevel.DIPLOMA:
      case EducationLevel.BTECH: 
      case EducationLevel.MTECH: return "Engineering Branch";
      default: return "Specialization / Major";
    }
  };

  return (
    <div className="min-h-screen font-sans text-slate-200 selection:bg-accent selection:text-black">
      {/* Background Grid */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: 'linear-gradient(#1a2234 1px, transparent 1px), linear-gradient(90deg, #1a2234 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-mono tracking-wider mb-4">
            <Sparkles className="w-3 h-3" />
            ML-POWERED CAREER GUIDANCE
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-accent/50 to-white mb-4">
            Career Guidance
          </h1>
          <p className="text-slate-400 max-w-lg mx-auto">
            Discover your ideal career path using advanced algorithms analyzing your academic profile, interests, and skills.
          </p>
        </header>

        {/* Progress Bar */}
        {step < 5 && (
          <div className="flex justify-between items-center mb-12 relative max-w-2xl mx-auto">
            <div className="absolute top-1/2 left-0 w-full h-0.5 bg-surface2 -z-10" />
            {[1, 2, 3, 4].map((s) => (
              <div 
                key={s} 
                className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-all duration-300
                  ${step >= s 
                    ? 'bg-surface border-accent text-accent shadow-[0_0_15px_rgba(0,212,170,0.3)]' 
                    : 'bg-surface border-slate-700 text-slate-600'}`}
              >
                {step > s ? <CheckCircle className="w-5 h-5" /> : s}
              </div>
            ))}
          </div>
        )}

        {/* Content Screens */}
        <div className="min-h-[400px]">
          
          {/* STEP 1: Personal Profile */}
          {step === 1 && (
            <div className="bg-surface border border-slate-800 rounded-2xl p-8 shadow-2xl animate-fade-up">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <User className="text-accent" /> Personal Profile
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-wider text-slate-500 font-bold">Full Name</label>
                  <input 
                    type="text" 
                    value={profile.name}
                    onChange={(e) => setProfile({...profile, name: e.target.value})}
                    placeholder="Enter your name"
                    className="w-full bg-surface2 border border-slate-700 rounded-lg px-4 py-3 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-wider text-slate-500 font-bold">Age</label>
                  <input 
                    type="number" 
                    value={profile.age}
                    onChange={(e) => setProfile({...profile, age: parseInt(e.target.value) || 0})}
                    className="w-full bg-surface2 border border-slate-700 rounded-lg px-4 py-3 focus:border-accent focus:outline-none"
                  />
                </div>
              </div>
              
              <div className="mt-6 space-y-2">
                <label className="text-xs uppercase tracking-wider text-slate-500 font-bold">Current Education Level</label>
                <select 
                  value={profile.educationLevel}
                  onChange={(e) => {
                     setProfile({...profile, educationLevel: e.target.value as EducationLevel, currentStream: ''}); // Reset stream on level change
                  }}
                  className="w-full bg-surface2 border border-slate-700 rounded-lg px-4 py-3 focus:border-accent focus:outline-none appearance-none"
                >
                  <option value="">Select Level...</option>
                  {Object.values(EducationLevel).map(l => <option key={l} value={l}>{l}</option>)}
                </select>
              </div>

              <div className="mt-8 flex justify-end">
                <button onClick={handleNext} disabled={!profile.name || !profile.educationLevel} className="bg-accent hover:bg-emerald-400 text-black font-bold py-3 px-8 rounded-lg flex items-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed">
                  Next Step <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: Academics */}
          {step === 2 && (
            <div className="bg-surface border border-slate-800 rounded-2xl p-8 shadow-2xl animate-fade-up">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <GraduationCap className="text-accent" /> Academic Background
              </h2>
              
              <div className="space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <label className="text-xs uppercase tracking-wider text-slate-500 font-bold block">
                      {getStreamLabel()}
                    </label>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-surface2 text-accent border border-slate-700">
                      For {profile.educationLevel}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {availableStreams.map(stream => (
                      <button
                        key={stream.id}
                        onClick={() => setProfile({...profile, currentStream: stream.id})}
                        className={`p-4 rounded-xl border text-left transition-all group hover:border-accent/50
                          ${profile.currentStream === stream.id 
                            ? 'bg-accent/10 border-accent text-accent' 
                            : 'bg-surface2 border-slate-700 text-slate-400'}`}
                      >
                        <div className="flex items-center gap-2 mb-1 font-bold">
                          {stream.icon} {stream.label}
                        </div>
                        <div className="text-[10px] opacity-70 leading-tight">{stream.full}</div>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-xs uppercase tracking-wider text-slate-500 font-bold mb-3 block">Performance (GPA/Marks)</label>
                  <div className="flex items-center gap-4">
                    <input 
                      type="range" 
                      min="40" 
                      max="100" 
                      value={profile.gpa} 
                      onChange={(e) => setProfile({...profile, gpa: parseInt(e.target.value)})}
                      className="w-full h-2 bg-surface2 rounded-lg appearance-none cursor-pointer accent-accent"
                    />
                    <span className="font-mono text-xl text-accent font-bold w-16 text-right">{profile.gpa}%</span>
                  </div>
                </div>

                <div>
                  <label className="text-xs uppercase tracking-wider text-slate-500 font-bold mb-3 block">Key Skills</label>
                  <div className="flex flex-wrap gap-2">
                    {SKILL_TAGS.map(skill => (
                      <button
                        key={skill}
                        onClick={() => toggleSkill(skill)}
                        className={`px-3 py-1.5 rounded-full text-xs font-bold border transition-all
                          ${profile.skills.includes(skill)
                            ? 'bg-accent text-black border-accent'
                            : 'bg-transparent text-slate-500 border-slate-700 hover:border-slate-500'}`}
                      >
                        {skill}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-8 flex justify-between">
                <button onClick={handleBack} className="text-slate-400 hover:text-white flex items-center gap-2">
                  <ChevronLeft className="w-4 h-4" /> Back
                </button>
                <button onClick={handleNext} disabled={!profile.currentStream} className="bg-accent hover:bg-emerald-400 text-black font-bold py-3 px-8 rounded-lg flex items-center gap-2 transition-all disabled:opacity-50">
                  Next Step <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Interests */}
          {step === 3 && (
            <div className="bg-surface border border-slate-800 rounded-2xl p-8 shadow-2xl animate-fade-up">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <TrendingUp className="text-accent" /> Interests & Preferences
              </h2>

              <div className="mb-8">
                <label className="text-xs uppercase tracking-wider text-slate-500 font-bold mb-4 block">What excites you?</label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {INTEREST_TAGS.map(tag => (
                    <button
                      key={tag.id}
                      onClick={() => toggleInterest(tag.id)}
                      className={`p-4 rounded-xl border flex flex-col items-center justify-center gap-2 transition-all
                        ${profile.interests.includes(tag.id)
                          ? 'bg-accent/10 border-accent text-accent'
                          : 'bg-surface2 border-slate-700 text-slate-400 hover:bg-surface2/80'}`}
                    >
                      {tag.icon}
                      <span className="text-xs font-bold">{tag.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <div className="flex justify-between mb-2">
                    <label className="text-xs uppercase font-bold text-slate-500">Work Style</label>
                    <span className="text-xs font-mono text-accent">
                      {profile.workStyle < 4 ? 'Individual' : profile.workStyle > 7 ? 'Team Player' : 'Balanced'}
                    </span>
                  </div>
                  <input 
                    type="range" min="1" max="10" 
                    value={profile.workStyle} 
                    onChange={(e) => setProfile({...profile, workStyle: parseInt(e.target.value)})}
                    className="w-full h-2 bg-surface2 rounded-lg appearance-none cursor-pointer accent-accent"
                  />
                  <div className="flex justify-between text-[10px] text-slate-600 mt-1">
                    <span>Solo</span>
                    <span>Team</span>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <label className="text-xs uppercase font-bold text-slate-500">Environment</label>
                    <span className="text-xs font-mono text-accent">
                      {profile.environment < 4 ? 'Office/Desk' : profile.environment > 7 ? 'Field Work' : 'Hybrid'}
                    </span>
                  </div>
                  <input 
                    type="range" min="1" max="10" 
                    value={profile.environment} 
                    onChange={(e) => setProfile({...profile, environment: parseInt(e.target.value)})}
                    className="w-full h-2 bg-surface2 rounded-lg appearance-none cursor-pointer accent-accent"
                  />
                  <div className="flex justify-between text-[10px] text-slate-600 mt-1">
                    <span>Indoors</span>
                    <span>Outdoors</span>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex justify-between">
                <button onClick={handleBack} className="text-slate-400 hover:text-white flex items-center gap-2">
                  <ChevronLeft className="w-4 h-4" /> Back
                </button>
                <button onClick={handleNext} disabled={profile.interests.length === 0} className="bg-accent hover:bg-emerald-400 text-black font-bold py-3 px-8 rounded-lg flex items-center gap-2 transition-all disabled:opacity-50">
                  Analyze Profile <Sparkles className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: Processing */}
          {step === 4 && (
            <AnalysisSimulation onComplete={runAnalysis} />
          )}

          {/* STEP 5: Results */}
          {step === 5 && results.length > 0 && (
            <div className="animate-fade-up space-y-6">
              {/* Summary Card */}
              <div className="bg-surface border border-slate-800 rounded-2xl p-8 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-32 bg-accent/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                
                <h2 className="text-3xl font-bold text-white mb-2">Result: <span className="text-accent">{results[0].title}</span></h2>
                <p className="text-slate-400 max-w-2xl mb-6">
                  Based on your profile ({profile.currentStream} background with interests in {profile.interests[0] ? INTEREST_TAGS.find(i => i.id === profile.interests[0])?.label : 'various fields'}), 
                  our ML model indicates a {results[0].matchScore}% match for this career path.
                </p>

                <div className="h-64 w-full">
                   <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={results} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                        <XAxis type="number" domain={[0, 100]} hide />
                        <YAxis type="category" dataKey="title" width={150} tick={{fill: '#94a3b8', fontSize: 12}} />
                        <Tooltip 
                          contentStyle={{ backgroundColor: '#111827', borderColor: '#334155' }}
                          itemStyle={{ color: '#00d4aa' }}
                          cursor={{fill: 'rgba(255,255,255,0.05)'}}
                        />
                        <Bar dataKey="matchScore" barSize={20} radius={[0, 4, 4, 0]}>
                          {results.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={index === 0 ? '#00d4aa' : '#334155'} />
                          ))}
                        </Bar>
                      </BarChart>
                   </ResponsiveContainer>
                </div>
              </div>

              {/* Roadmap Card */}
              <div className="bg-surface border border-slate-800 rounded-2xl p-8 shadow-2xl">
                <div className="flex justify-between items-center mb-8">
                  <h3 className="text-xl font-bold text-white flex items-center gap-2">
                    <Map className="text-accent2" /> Career Roadmap
                  </h3>
                  <button onClick={() => alert("Roadmap PDF downloading...")} className="text-xs flex items-center gap-2 text-slate-400 hover:text-white border border-slate-700 px-3 py-1 rounded-full">
                    <Download className="w-3 h-3" /> PDF
                  </button>
                </div>

                <div className="relative pl-8 border-l-2 border-slate-800 space-y-8">
                  {results[0].roadmap.map((milestone, idx) => (
                    <div key={idx} className="relative">
                      <div className="absolute -left-[39px] top-0 w-5 h-5 rounded-full bg-surface border-2 border-accent2 flex items-center justify-center">
                        <div className="w-2 h-2 bg-accent2 rounded-full"></div>
                      </div>
                      <h4 className="text-white font-bold mb-1">Phase {idx + 1}</h4>
                      <p className="text-slate-400 text-sm">{milestone}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-8 pt-8 border-t border-slate-800">
                  <h4 className="text-sm font-bold text-white mb-3">Recommended Entrance Exams:</h4>
                  <div className="flex flex-wrap gap-2">
                    {results[0].exams.map(exam => (
                      <span key={exam} className="px-3 py-1 bg-slate-800 text-accent text-xs font-mono rounded">
                        {exam}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex justify-center pb-12">
                <button onClick={() => setStep(1)} className="text-slate-500 hover:text-white transition-colors">
                  Start New Analysis
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}