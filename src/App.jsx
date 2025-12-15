import React, { useState, useMemo} from 'react';
import { 
  CheckSquare, 
  BookOpen, 
  Layout, 
  Calendar, 
  Trello, 
  ChevronRight, 
  X, 
  MoreHorizontal, 
  Clock, 
  BarChart2, 
  Filter,
  Search,
  CheckCircle2,
  Circle,
  FileText,
  Tag
} from 'lucide-react';

// --- DATA STRUCTURE ---
// Populating Phase 1 fully based on user prompt.
// Populating Phase 2 & 3 with representative structures to show the "60 Day" scale.

const generateInitialData = () => {
  const phase1 = [
    {
      day: 1,
      title: "Software Testing Fundamentals",
      phase: "Foundation",
      istqb: true,
      status: "Done",
      time: 2,
      confidence: 5,
      learn: [
        "What is testing & why it is necessary",
        "Errors vs Defects vs Failures",
        "Testing objectives"
      ],
      checklist: [
        { id: "d1-1", text: "Read ISTQB syllabus section (Fundamentals)", done: true },
        { id: "d1-2", text: "Make short notes (definitions)", done: true },
        { id: "d1-3", text: "Solve 20 MCQs", done: false }
      ],
      notes: "Testing shows presence of defects, not absence."
    },
    {
      day: 2,
      title: "Testing Principles (ISTQB)",
      phase: "Foundation",
      istqb: true,
      status: "In Progress",
      time: 1.5,
      confidence: 4,
      learn: [
        "All 7 principles with examples",
        "Exhaustive testing is impossible",
        "Early testing saves time/money"
      ],
      checklist: [
        { id: "d2-1", text: "Memorize 7 principles", done: true },
        { id: "d2-2", text: "Relate each to real project example", done: false },
        { id: "d2-3", text: "Solve MCQs", done: false }
      ]
    },
    {
      day: 3,
      title: "SDLC & STLC",
      phase: "Foundation",
      istqb: true,
      status: "Not Started",
      time: 0,
      confidence: 0,
      learn: ["Waterfall, V-Model, Agile", "STLC phases and entry/exit criteria"],
      checklist: [
        { id: "d3-1", text: "Draw SDLC + STLC diagram", done: false },
        { id: "d3-2", text: "Define entry/exit criteria", done: false },
        { id: "d3-3", text: "MCQ practice", done: false }
      ]
    },
    {
      day: 4,
      title: "Test Levels & Test Types",
      phase: "Foundation",
      istqb: true,
      status: "Not Started",
      learn: ["Unit, Integration, System, Acceptance", "Functional vs Non-functional"],
      checklist: [
        { id: "d4-1", text: "Map test levels to real project", done: false },
        { id: "d4-2", text: "Solve MCQs", done: false }
      ]
    },
    {
      day: 5,
      title: "Test Design Techniques",
      phase: "Foundation",
      istqb: true,
      status: "Not Started",
      learn: ["Equivalence Partitioning", "Boundary Value Analysis", "Decision Table"],
      checklist: [
        { id: "d5-1", text: "Design 5 test cases manually", done: false },
        { id: "d5-2", text: "Solve MCQs", done: false }
      ]
    },
    {
      day: 6,
      title: "Static Testing",
      phase: "Foundation",
      istqb: true,
      status: "Not Started",
      learn: ["Reviews, walkthroughs, inspections"],
      checklist: [
        { id: "d6-1", text: "Compare static vs dynamic testing", done: false },
        { id: "d6-2", text: "Solve MCQs", done: false }
      ]
    },
    {
      day: 7,
      title: "Python Environment Setup",
      phase: "Automation",
      istqb: false,
      status: "Not Started",
      learn: ["Python installation", "Virtual Environments (venv)", "VS Code Setup"],
      checklist: [
        { id: "d7-1", text: "Install Python", done: false },
        { id: "d7-2", text: "Setup venv", done: false },
        { id: "d7-3", text: "Install pytest", done: false }
      ]
    },
    {
      day: 8,
      title: "Python Basics for Automation",
      phase: "Automation",
      istqb: false,
      status: "Not Started",
      learn: ["Data types", "Functions", "Control flow"],
      checklist: [
        { id: "d8-1", text: "Write utility functions", done: false },
        { id: "d8-2", text: "Practice small scripts", done: false }
      ]
    },
    {
      day: 9,
      title: "Python OOP (Automation)",
      phase: "Automation",
      istqb: false,
      status: "Not Started",
      learn: ["Classes & objects", "The BasePage concept"],
      checklist: [
        { id: "d9-1", text: "Create BasePage class", done: false }
      ]
    },
    {
      day: 10,
      title: "Advanced Python",
      phase: "Automation",
      istqb: false,
      status: "Not Started",
      learn: ["Decorators", "Context managers"],
      checklist: [
        { id: "d10-1", text: "Write retry decorator", done: false }
      ]
    },
    {
      day: 11,
      title: "pytest Fundamentals",
      phase: "Automation",
      istqb: false,
      status: "Not Started",
      learn: ["Test discovery", "Assertions"],
      checklist: [
        { id: "d11-1", text: "Write first pytest test", done: false }
      ]
    },
    {
      day: 12,
      title: "pytest Fixtures",
      phase: "Automation",
      istqb: false,
      status: "Not Started",
      learn: ["Fixture scopes", "conftest.py"],
      checklist: [
        { id: "d12-1", text: "Create browser fixture", done: false }
      ]
    },
    {
      day: 13,
      title: "Test Planning & Risk",
      phase: "Foundation",
      istqb: true,
      status: "Not Started",
      learn: ["Test plan components", "Risk-based testing approach"],
      checklist: [
        { id: "d13-1", text: "Draft sample test plan", done: false },
        { id: "d13-2", text: "Solve MCQs", done: false }
      ]
    },
    {
      day: 14,
      title: "Test Monitoring & Defect Lifecycle",
      phase: "Foundation",
      istqb: true,
      status: "Not Started",
      learn: ["Metrics", "Defect states", "Exit criteria"],
      checklist: [
        { id: "d14-1", text: "Draw defect lifecycle", done: false },
        { id: "d14-2", text: "Solve MCQs", done: false }
      ]
    },
    {
      day: 15,
      title: "Playwright Introduction",
      phase: "Automation",
      istqb: false,
      status: "Not Started",
      learn: ["Playwright architecture", "Codegen tool"],
      checklist: [
        { id: "d15-1", text: "Run codegen", done: false },
        { id: "d15-2", text: "Execute generated test", done: false }
      ]
    },
    {
      day: 16,
      title: "Locators & Selectors",
      phase: "Automation",
      istqb: false,
      status: "Not Started",
      learn: ["CSS Selectors", "data-testid", "XPath vs CSS"],
      checklist: [
        { id: "d16-1", text: "Replace XPath with stable locators", done: false }
      ]
    },
    {
      day: 17,
      title: "Actions & Waits",
      phase: "Automation",
      istqb: false,
      status: "Not Started",
      learn: ["Click, fill, press", "Auto-waiting mechanisms"],
      checklist: [
        { id: "d17-1", text: "Remove all hard sleeps/waits", done: false }
      ]
    },
    {
      day: 18,
      title: "Test Case Design → Automation",
      phase: "Automation",
      istqb: true,
      status: "Not Started",
      learn: ["Mapping manual steps to code", "Atomic tests"],
      checklist: [
        { id: "d18-1", text: "Convert 3 manual cases to automation", done: false }
      ]
    },
    {
      day: 19,
      title: "Defect Reporting",
      phase: "Foundation",
      istqb: true,
      status: "Not Started",
      learn: ["Severity vs Priority", "Writing clear steps to reproduce"],
      checklist: [
        { id: "d19-1", text: "Write 3 good bug reports", done: false }
      ]
    },
    {
      day: 20,
      title: "ISTQB MOCK TEST 1",
      phase: "Foundation",
      istqb: true,
      status: "Not Started",
      learn: ["Full syllabus review"],
      checklist: [
        { id: "d20-1", text: "Take Full mock test", done: false },
        { id: "d20-2", text: "Analyze wrong answers", done: false }
      ]
    }
  ];

  // Generating Phase 2 & 3 samples for UI completeness
  const phase2 = Array.from({ length: 20 }, (_, i) => ({
    day: 21 + i,
    title: i % 2 === 0 ? "Advanced Framework Pattern" : "Agile Testing (ISTQB)",
    phase: i % 2 === 0 ? "Automation" : "Foundation",
    istqb: i % 2 !== 0,
    status: "Not Started",
    learn: ["Advanced Topic Placeholder"],
    checklist: [{ id: `d${21+i}-1`, text: "Complete daily task", done: false }]
  }));

  const phase3 = Array.from({ length: 20 }, (_, i) => ({
    day: 41 + i,
    title: i === 19 ? "Final Exam & Project Submission" : "End-to-End Project & CI/CD",
    phase: "Project",
    istqb: i > 15,
    status: "Not Started",
    learn: ["Project work"],
    checklist: [{ id: `d${41+i}-1`, text: "Code implementation", done: false }]
  }));

  return [...phase1, ...phase2, ...phase3];
};

// --- COMPONENTS ---

const StatusBadge = ({ status }) => {
  const colors = {
    "Done": "bg-blue-100 text-blue-700",
    "In Progress": "bg-yellow-100 text-yellow-700",
    "Not Started": "bg-gray-100 text-gray-500"
  };
  return (
    <span className={`px-2 py-0.5 rounded text-xs font-medium ${colors[status] || colors["Not Started"]}`}>
      {status}
    </span>
  );
};

const PhaseBadge = ({ phase }) => {
  const colors = {
    "Foundation": "bg-purple-100 text-purple-700",
    "Automation": "bg-green-100 text-green-700",
    "Project": "bg-pink-100 text-pink-700"
  };
  return (
    <span className={`px-2 py-0.5 rounded text-xs font-medium ${colors[phase]}`}>
      {phase}
    </span>
  );
};

export default function NotionRoadmapOS() {
  const [data, setData] = useState(generateInitialData());
  const [view, setView] = useState("table"); // table, board
  
  // CHANGED: Use selectedDayId (primitive) to track selection.
  // This allows us to derive 'selectedDay' from the latest 'data' state, 
  // ensuring the modal is always in sync with the main database.
  const [selectedDayId, setSelectedDayId] = useState(null); 
  
  const [filter, setFilter] = useState("All"); // All, ISTQB, Automation
  const [search, setSearch] = useState("");

  // Derived selectedDay object based on ID and current Data
  const selectedDay = useMemo(() => 
    data.find(d => d.day === selectedDayId) || null, 
  [data, selectedDayId]);

  // Statistics
  const completed = data.filter(d => d.status === "Done").length;
  const progress = Math.round((completed / data.length) * 100);
  const istqbCount = data.filter(d => d.istqb).length;
  const istqbDone = data.filter(d => d.istqb && d.status === "Done").length;

  // Filter Logic
  const filteredData = useMemo(() => {
    return data.filter(item => {
      const matchesSearch = item.title.toLowerCase().includes(search.toLowerCase());
      const matchesFilter = 
        filter === "All" ? true :
        filter === "ISTQB" ? item.istqb :
        filter === "Automation" ? item.phase === "Automation" || item.phase === "Project" :
        true;
      return matchesSearch && matchesFilter;
    });
  }, [data, filter, search]);

  const updateStatus = (day, newStatus) => {
    setData(prev => prev.map(d => d.day === day ? { ...d, status: newStatus } : d));
  };

  const updateChecklist = (day, itemId) => {
    setData(prev => prev.map(d => {
      if (d.day === day) {
        const newChecklist = d.checklist.map(i => i.id === itemId ? { ...i, done: !i.done } : i);
        // Auto-update status logic
        const allDone = newChecklist.every(i => i.done);
        const someDone = newChecklist.some(i => i.done);
        let newStatus = d.status;
        if (allDone) newStatus = "Done";
        else if (someDone) newStatus = "In Progress";
        
        return { ...d, checklist: newChecklist, status: newStatus };
      }
      return d;
    }));
  };

  const updateNotes = (day, newNotes) => {
    setData(prev => prev.map(d => d.day === day ? { ...d, notes: newNotes } : d));
  };

  // --- SUB-VIEWS ---

  const TableView = () => (
    <div className="w-full overflow-x-auto">
      <table className="w-full text-left border-collapse text-sm">
        <thead>
          <tr className="border-b border-gray-200 text-gray-500">
            <th className="py-2 pl-4 font-normal w-12">Day</th>
            <th className="py-2 font-normal">Topic</th>
            <th className="py-2 font-normal w-32">Phase</th>
            <th className="py-2 font-normal w-24">ISTQB</th>
            <th className="py-2 font-normal w-32">Status</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map(item => (
            <tr 
              key={item.day} 
              // CHANGED: Set ID instead of object
              onClick={() => setSelectedDayId(item.day)}
              className="border-b border-gray-100 hover:bg-gray-50 cursor-pointer group"
            >
              <td className="py-2 pl-4 text-gray-500 font-mono text-xs">{item.day}</td>
              <td className="py-2 font-medium text-gray-800 flex items-center gap-2">
                <FileText size={14} className="text-gray-400 group-hover:text-gray-600" />
                {item.title}
              </td>
              <td className="py-2">
                <PhaseBadge phase={item.phase} />
              </td>
              <td className="py-2">
                {item.istqb && <span className="text-xs bg-indigo-50 text-indigo-600 px-1.5 py-0.5 rounded border border-indigo-100">ISTQB</span>}
              </td>
              <td className="py-2">
                <StatusBadge status={item.status} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const BoardView = () => {
    const columns = ["Not Started", "In Progress", "Done"];
    
    return (
      <div className="flex gap-4 overflow-x-auto pb-4 h-full">
        {columns.map(col => (
          <div key={col} className="flex-none w-72 bg-gray-50/50 rounded-sm px-2 py-3">
            <div className="flex items-center justify-between mb-3 px-1">
              <span className="text-sm font-medium text-gray-600">
                {col} <span className="text-gray-400 ml-1 text-xs">{filteredData.filter(i => i.status === col).length}</span>
              </span>
              <MoreHorizontal size={14} className="text-gray-400" />
            </div>
            <div className="space-y-2">
              {filteredData.filter(i => i.status === col).map(item => (
                <div 
                  key={item.day}
                  // CHANGED: Set ID instead of object
                  onClick={() => setSelectedDayId(item.day)}
                  className="bg-white p-3 rounded shadow-sm border border-gray-200 hover:shadow cursor-pointer"
                >
                  <div className="flex items-start justify-between mb-2">
                    <span className="text-sm font-medium text-gray-800 leading-tight">{item.title}</span>
                  </div>
                  <div className="flex flex-wrap gap-1 mb-2">
                    <PhaseBadge phase={item.phase} />
                    {item.istqb && <span className="text-[10px] bg-indigo-50 text-indigo-600 px-1 py-0.5 rounded">ISTQB</span>}
                  </div>
                  <div className="text-xs text-gray-400 font-mono">Day {item.day}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  };

  // --- MAIN LAYOUT ---

  return (
    <div className="min-h-screen bg-[#F7F7F5] text-[#37352F] font-sans selection:bg-blue-100">
      
      {/* SIDE PANEL / MODAL (NOTION PAGE VIEW) */}
      {selectedDay && (
        // CHANGED: Reset ID to null on close
        <div className="fixed inset-0 z-50 flex justify-end bg-black/20 backdrop-blur-sm" onClick={() => setSelectedDayId(null)}>
          <div 
            className="w-full max-w-2xl bg-white h-full shadow-2xl overflow-y-auto transform transition-transform animate-in slide-in-from-right duration-200"
            onClick={e => e.stopPropagation()}
          >
            {/* Page Header */}
            <div className="h-32 bg-gradient-to-r from-blue-50 to-indigo-50 w-full relative">
              <button 
                // CHANGED: Reset ID to null on close
                onClick={() => setSelectedDayId(null)}
                className="absolute top-4 right-4 p-1 hover:bg-gray-200 rounded text-gray-500"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="px-12 -mt-8 mb-12 relative">
              <div className="text-5xl mb-4">
                 {selectedDay.istqb ? "🎓" : selectedDay.phase === "Automation" ? "🐍" : "🚀"}
              </div>
              <h1 className="text-3xl font-bold mb-6 text-gray-900">{selectedDay.title}</h1>
              
              {/* Properties Table */}
              <div className="space-y-2 mb-8 text-sm">
                <div className="flex items-center py-1">
                  <div className="w-32 text-gray-500 flex items-center gap-2"><Calendar size={14}/> Day</div>
                  <div className="px-2 py-0.5 bg-gray-100 rounded text-gray-700 font-mono">Day {selectedDay.day}</div>
                </div>
                <div className="flex items-center py-1">
                  <div className="w-32 text-gray-500 flex items-center gap-2"><Tag size={14}/> Phase</div>
                  <PhaseBadge phase={selectedDay.phase} />
                </div>
                <div className="flex items-center py-1">
                  <div className="w-32 text-gray-500 flex items-center gap-2"><Trello size={14}/> Status</div>
                  <select 
                    value={selectedDay.status}
                    // This now properly updates because selectedDay is derived from the main data state
                    onChange={(e) => updateStatus(selectedDay.day, e.target.value)}
                    className="bg-transparent hover:bg-gray-100 rounded px-1 -ml-1 cursor-pointer focus:outline-none focus:ring-1 focus:ring-blue-300"
                  >
                    <option value="Not Started">Not Started</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Done">Done</option>
                  </select>
                </div>
                <div className="flex items-center py-1">
                  <div className="w-32 text-gray-500 flex items-center gap-2"><Clock size={14}/> Time Spent</div>
                   <span className="text-gray-700">{selectedDay.time || 0} hrs</span>
                </div>
              </div>

              <div className="h-px bg-gray-200 my-6"></div>

              {/* Content Blocks */}
              <div className="space-y-8">
                
                {/* Learning Block */}
                <section>
                  <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                    <BookOpen size={18} className="text-gray-400"/> Learning Objectives
                  </h3>
                  <div className="p-4 bg-gray-50 rounded-md border border-gray-200">
                    <ul className="space-y-2 list-disc pl-5 text-gray-700">
                      {selectedDay.learn.map((l, idx) => (
                        <li key={idx}>{l}</li>
                      ))}
                    </ul>
                  </div>
                </section>

                {/* Checklist Block */}
                <section>
                  <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                    <CheckSquare size={18} className="text-gray-400"/> Daily Checklist
                  </h3>
                  <div className="space-y-1">
                    {selectedDay.checklist.map((item) => (
                      <div 
                        key={item.id} 
                        className={`flex items-start gap-3 p-2 rounded hover:bg-gray-50 cursor-pointer group transition-colors ${item.done ? 'opacity-60' : ''}`}
                        onClick={() => updateChecklist(selectedDay.day, item.id)}
                      >
                        <button className={`mt-0.5 ${item.done ? 'text-blue-500' : 'text-gray-300 group-hover:text-gray-400'}`}>
                          {item.done ? <CheckCircle2 size={20} /> : <Circle size={20} />}
                        </button>
                        <span className={`${item.done ? 'line-through decoration-gray-300 text-gray-400' : 'text-gray-800'}`}>
                          {item.text}
                        </span>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Notes Block */}
                <section>
                  <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                    <FileText size={18} className="text-gray-400"/> Notes & Doubts
                  </h3>
                  <textarea
                    className="w-full min-h-[150px] p-3 border border-gray-200 rounded text-sm text-gray-700 focus:outline-none focus:border-blue-300 focus:ring-2 focus:ring-blue-100 transition-all resize-none font-mono"
                    placeholder="Type your learnings, code snippets, or definitions here..."
                    value={selectedDay.notes || ""}
                    onChange={(e) => updateNotes(selectedDay.day, e.target.value)}
                  />
                </section>

              </div>
            </div>
          </div>
        </div>
      )}

      {/* DASHBOARD HEADER */}
      <div className="max-w-6xl mx-auto pt-12 pb-6 px-6">
        <div className="flex items-center gap-4 mb-8">
          <div className="text-5xl">🧪</div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Playwright + Python Automation</h1>
            <p className="text-gray-500 mt-1">60-Day PRO Roadmap • ISTQB Aligned</p>
          </div>
        </div>

        {/* Progress Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white p-4 rounded border border-gray-200 shadow-sm">
            <div className="text-xs text-gray-500 uppercase tracking-wide font-semibold mb-2">Total Progress</div>
            <div className="flex items-end justify-between mb-2">
              <span className="text-2xl font-bold text-gray-800">{progress}%</span>
              <span className="text-xs text-gray-400">{completed} / {data.length} Days</span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-1.5">
              <div className="bg-blue-500 h-1.5 rounded-full transition-all duration-500" style={{ width: `${progress}%` }}></div>
            </div>
          </div>

          <div className="bg-white p-4 rounded border border-gray-200 shadow-sm">
            <div className="text-xs text-gray-500 uppercase tracking-wide font-semibold mb-2">ISTQB Coverage</div>
            <div className="flex items-end justify-between mb-2">
              <span className="text-2xl font-bold text-indigo-600">{Math.round((istqbDone / istqbCount) * 100) || 0}%</span>
              <span className="text-xs text-gray-400">{istqbDone} / {istqbCount} Modules</span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-1.5">
              <div className="bg-indigo-500 h-1.5 rounded-full transition-all duration-500" style={{ width: `${(istqbDone / istqbCount) * 100}%` }}></div>
            </div>
          </div>

          <div className="bg-white p-4 rounded border border-gray-200 shadow-sm flex items-center justify-center border-dashed">
            <div className="text-center">
              <div className="text-xs text-gray-400 mb-1">Current Streak</div>
              <div className="text-xl font-bold text-gray-700">0 Days</div>
            </div>
          </div>
        </div>

        {/* CONTROLS BAR */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 border-b border-gray-200 pb-4">
          <div className="flex items-center gap-1 bg-gray-100 p-1 rounded">
            <button 
              onClick={() => setView("table")}
              className={`flex items-center gap-2 px-3 py-1.5 text-sm rounded transition-all ${view === "table" ? 'bg-white shadow text-gray-800 font-medium' : 'text-gray-500 hover:text-gray-700'}`}
            >
              <Layout size={16} /> Table
            </button>
            <button 
              onClick={() => setView("board")}
              className={`flex items-center gap-2 px-3 py-1.5 text-sm rounded transition-all ${view === "board" ? 'bg-white shadow text-gray-800 font-medium' : 'text-gray-500 hover:text-gray-700'}`}
            >
              <Trello size={16} /> Board
            </button>
          </div>

          <div className="flex items-center gap-3">
             {/* Search */}
             <div className="relative">
              <Search size={14} className="absolute left-2.5 top-2.5 text-gray-400"/>
              <input 
                type="text" 
                placeholder="Search topics..." 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-8 pr-3 py-1.5 text-sm border border-gray-200 rounded focus:outline-none focus:border-blue-400 w-48"
              />
            </div>

            <div className="h-6 w-px bg-gray-300 mx-1"></div>

            {/* Filter */}
            <div className="flex items-center gap-2">
               <span className="text-xs text-gray-500 uppercase font-bold mr-1">Filter:</span>
               {["All", "ISTQB", "Automation"].map(f => (
                 <button
                   key={f}
                   onClick={() => setFilter(f)}
                   className={`text-sm px-2 py-1 rounded ${filter === f ? 'bg-gray-800 text-white' : 'text-gray-500 hover:bg-gray-100'}`}
                 >
                   {f}
                 </button>
               ))}
            </div>
          </div>
        </div>

        {/* VIEW AREA */}
        <div className="bg-white rounded border border-gray-200 min-h-[600px] shadow-sm">
          {view === "table" ? <TableView /> : <div className="p-4 h-full bg-gray-50/30"><BoardView /></div>}
        </div>
      </div>

    </div>
  );
}