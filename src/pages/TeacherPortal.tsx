import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, BookOpen, BarChart3, Plus, Search, Filter, Edit, Trash2, Eye } from 'lucide-react';
import GlassCard from '../components/GlassCard';
import StudentDetailModal from '../components/StudentDetailModal';
import CreateLessonModal from '../components/CreateLessonModal';

interface Student {
  id: string;
  name: string;
  grade: string;
  ecoPoints: number;
  completedChallenges: number;
  streak: number;
  avatar: string;
}

interface Lesson {
  id: string;
  title: string;
  category: string;
  duration: number;
  studentsCompleted: number;
  totalStudents: number;
  status: 'draft' | 'published';
}

interface LessonFormData {
  title: string;
  subject: string;
  description: string;
  duration: number;
  objectives: string[];
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  category: string;
  prerequisites: string;
  materials: string[];
}

const TeacherPortal: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'students' | 'lessons' | 'analytics'>('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [showStudentModal, setShowStudentModal] = useState(false);
  const [showCreateLessonModal, setShowCreateLessonModal] = useState(false);

  // Mock data
  const students: Student[] = [
    {
      id: '1',
      name: 'Arjun Sharma',
      grade: '9th',
      ecoPoints: 1250,
      completedChallenges: 8,
      streak: 12,
      avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
    },
    {
      id: '2',
      name: 'Priya Patel',
      grade: '10th',
      ecoPoints: 1380,
      completedChallenges: 12,
      streak: 15,
      avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
    },
    {
      id: '3',
      name: 'Rahul Kumar',
      grade: '9th',
      ecoPoints: 980,
      completedChallenges: 6,
      streak: 8,
      avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
    },
    {
      id: '4',
      name: 'Sneha Reddy',
      grade: '10th',
      ecoPoints: 1150,
      completedChallenges: 9,
      streak: 10,
      avatar: 'https://images.pexels.com/photos/1239288/pexels-photo-1239288.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      school: 'Earth Sciences School',
      state: 'Telangana',
      joinDate: '2024-01-10T00:00:00Z'
    },
    {
      id: '5',
      name: 'Vikram Singh',
      grade: '9th',
      ecoPoints: 890,
      completedChallenges: 5,
      streak: 6,
      avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      school: 'Green Future Academy',
      state: 'Rajasthan',
      joinDate: '2024-01-15T00:00:00Z'
    }
  ];

  const lessons: Lesson[] = [
    {
      id: '1',
      title: 'Climate Change Fundamentals',
      category: 'Climate',
      duration: 45,
      studentsCompleted: 28,
      totalStudents: 35,
      status: 'published'
    },
    {
      id: '2',
      title: 'Waste Management Strategies',
      category: 'Waste',
      duration: 40,
      studentsCompleted: 22,
      totalStudents: 35,
      status: 'published'
    },
    {
      id: '3',
      title: 'Renewable Energy Sources',
      category: 'Energy',
      duration: 50,
      studentsCompleted: 0,
      totalStudents: 35,
      status: 'draft'
    }
  ];

  const tabs = [
    { id: 'overview', name: 'Overview', icon: BarChart3 },
    { id: 'students', name: 'Students', icon: Users },
    { id: 'lessons', name: 'Lessons', icon: BookOpen },
    { id: 'analytics', name: 'Analytics', icon: BarChart3 }
  ];

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleViewStudentDetails = (student: Student) => {
    // Add missing properties for the modal
    const studentWithDetails = {
      ...student,
      school: student.school || 'Green Valley School',
      state: student.state || 'Maharashtra',
      joinDate: student.joinDate || '2024-01-01T00:00:00Z'
    };
    setSelectedStudent(studentWithDetails);
    setShowStudentModal(true);
  };

  const handleCreateLesson = (lessonData: LessonFormData) => {
    console.log('Creating lesson:', lessonData);
    // Here you would typically send the data to your backend
    // For now, we'll just log it and close the modal
  };

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <GlassCard className="p-6 text-center">
          <Users className="h-8 w-8 text-[#F8D991] mx-auto mb-2" />
          <div className="text-2xl font-bold text-white">{students.length}</div>
          <div className="text-white/70 text-sm">Total Students</div>
        </GlassCard>
        
        <GlassCard className="p-6 text-center">
          <BookOpen className="h-8 w-8 text-[#F6B080] mx-auto mb-2" />
          <div className="text-2xl font-bold text-white">{lessons.length}</div>
          <div className="text-white/70 text-sm">Active Lessons</div>
        </GlassCard>
        
        <GlassCard className="p-6 text-center">
          <div className="text-2xl font-bold text-white">
            {Math.round((lessons.reduce((sum, lesson) => sum + lesson.studentsCompleted, 0) / (lessons.length * students.length)) * 100)}%
          </div>
          <div className="text-white/70 text-sm">Completion Rate</div>
        </GlassCard>
        
        <GlassCard className="p-6 text-center">
          <div className="text-2xl font-bold text-white">
            {Math.round(students.reduce((sum, student) => sum + student.ecoPoints, 0) / students.length)}
          </div>
          <div className="text-white/70 text-sm">Avg. Eco Points</div>
        </GlassCard>
      </div>

      {/* Recent Activity */}
      <GlassCard className="p-6">
        <h3 className="text-xl font-bold text-white mb-4">Recent Student Activity</h3>
        <div className="space-y-3">
          {students.slice(0, 5).map((student, index) => (
            <motion.div
              key={student.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center space-x-4 p-3 bg-white/5 rounded-lg"
            >
              <img
                src={student.avatar}
                alt={student.name}
                className="w-10 h-10 rounded-full"
              />
              <div className="flex-1">
                <p className="font-semibold text-white">{student.name}</p>
                <p className="text-white/70 text-sm">
                  Completed challenge • {student.streak} day streak
                </p>
              </div>
              <div className="text-[#F8D991] font-semibold">
                +{Math.floor(Math.random() * 50) + 25} pts
              </div>
            </motion.div>
          ))}
        </div>
      </GlassCard>
    </div>
  );

  const renderStudents = () => (
    <div className="space-y-6">
      {/* Search */}
      <GlassCard className="p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-white/50" />
          <input
            type="text"
            placeholder="Search students..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#E1664C] focus:border-transparent backdrop-blur-sm"
          />
        </div>
      </GlassCard>

      {/* Students Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredStudents.map((student, index) => (
          <motion.div
            key={student.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <GlassCard className="p-6">
              <div className="flex items-center space-x-4 mb-4">
                <img
                  src={student.avatar}
                  alt={student.name}
                  className="w-16 h-16 rounded-full border-2 border-[#F8D991]"
                />
                <div>
                  <h3 className="text-lg font-bold text-white">{student.name}</h3>
                  <p className="text-white/70">Grade {student.grade}</p>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-white/70">Eco Points</span>
                  <span className="text-[#F8D991] font-semibold">{student.ecoPoints}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/70">Challenges</span>
                  <span className="text-white">{student.completedChallenges}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/70">Streak</span>
                  <span className="text-[#E1664C]">{student.streak} days</span>
                </div>
              </div>
              
              <button 
                onClick={() => handleViewStudentDetails(student)}
                className="w-full mt-4 bg-[#E1664C] text-white py-2 rounded-lg hover:bg-[#E1664C]/80 transition-colors focus:outline-none focus:ring-2 focus:ring-[#E1664C]"
              >
                View Details
              </button>
            </GlassCard>
          </motion.div>
        ))}
      </div>
    </div>
  );

  const renderLessons = () => (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Lesson Management</h2>
        <button 
          onClick={() => setShowCreateLessonModal(true)}
          className="flex items-center space-x-2 bg-gradient-to-r from-[#F8D991] to-[#F6B080] text-[#091D23] px-4 py-2 rounded-lg font-semibold hover:shadow-lg transition-all focus:outline-none focus:ring-2 focus:ring-[#E1664C]"
        >
          <Plus className="h-4 w-4" />
          <span>Create Lesson</span>
        </button>
      </div>

      {/* Lessons List */}
      <div className="space-y-4">
        {lessons.map((lesson, index) => (
          <motion.div
            key={lesson.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <GlassCard className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-lg font-bold text-white">{lesson.title}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      lesson.status === 'published' 
                        ? 'bg-[#F6B080]/20 text-[#F6B080]' 
                        : 'bg-gray-500/20 text-gray-400'
                    }`}>
                      {lesson.status}
                    </span>
                  </div>
                  
                  <div className="flex items-center space-x-6 text-sm text-white/70">
                    <span>{lesson.category}</span>
                    <span>{lesson.duration} min</span>
                    <span>{lesson.studentsCompleted}/{lesson.totalStudents} completed</span>
                  </div>
                  
                  {/* Progress Bar */}
                  <div className="mt-3 bg-white/20 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-[#F6B080] to-[#F8D991] rounded-full h-2"
                      style={{ width: `${(lesson.studentsCompleted / lesson.totalStudents) * 100}%` }}
                    />
                  </div>
                </div>
                
                <div className="flex items-center space-x-2 ml-6">
                  <button className="p-2 text-white/70 hover:text-[#E1664C] transition-colors focus:outline-none focus:ring-2 focus:ring-[#E1664C] rounded">
                    <Eye className="h-4 w-4" />
                  </button>
                  <button className="p-2 text-white/70 hover:text-[#E1664C] transition-colors focus:outline-none focus:ring-2 focus:ring-[#E1664C] rounded">
                    <Edit className="h-4 w-4" />
                  </button>
                  <button className="p-2 text-white/70 hover:text-red-400 transition-colors focus:outline-none focus:ring-2 focus:ring-red-400 rounded">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </div>
    </div>
  );

  const renderAnalytics = () => (
    <div className="space-y-6">
      <GlassCard className="p-6">
        <h3 className="text-xl font-bold text-white mb-4">Class Performance Analytics</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="text-white/80 mb-2">Top Performers</h4>
            <div className="space-y-2">
              {students
                .sort((a, b) => b.ecoPoints - a.ecoPoints)
                .slice(0, 3)
                .map((student, index) => (
                  <div key={student.id} className="flex items-center space-x-3 p-2 bg-white/5 rounded-lg">
                    <span className="text-[#F8D991] font-bold">#{index + 1}</span>
                    <img src={student.avatar} alt={student.name} className="w-8 h-8 rounded-full" />
                    <span className="text-white flex-1">{student.name}</span>
                    <span className="text-[#F8D991]">{student.ecoPoints} pts</span>
                  </div>
                ))}
            </div>
          </div>
          
          <div>
            <h4 className="text-white/80 mb-2">Lesson Completion Rates</h4>
            <div className="space-y-2">
              {lessons.map((lesson) => (
                <div key={lesson.id} className="p-2 bg-white/5 rounded-lg">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-white">{lesson.title}</span>
                    <span className="text-white/70">
                      {Math.round((lesson.studentsCompleted / lesson.totalStudents) * 100)}%
                    </span>
                  </div>
                  <div className="bg-white/20 rounded-full h-1">
                    <div 
                      className="bg-[#F6B080] rounded-full h-1"
                      style={{ width: `${(lesson.studentsCompleted / lesson.totalStudents) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </GlassCard>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h1 className="text-4xl font-bold text-white mb-4">👩‍🏫 Teacher Portal</h1>
        <p className="text-white/70 text-lg max-w-2xl mx-auto">
          Manage your classes, track student progress, and create engaging environmental lessons.
        </p>
      </motion.div>

      {/* Navigation Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <GlassCard className="p-2">
          <div className="flex space-x-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all focus:outline-none focus:ring-2 focus:ring-[#E1664C] ${
                    activeTab === tab.id
                      ? 'bg-[#E1664C] text-white'
                      : 'text-white/70 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{tab.name}</span>
                </button>
              );
            })}
          </div>
        </GlassCard>
      </motion.div>

      {/* Tab Content */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        {activeTab === 'overview' && renderOverview()}
        {activeTab === 'students' && renderStudents()}
        {activeTab === 'lessons' && renderLessons()}
        {activeTab === 'analytics' && renderAnalytics()}
      </motion.div>

      {/* Student Detail Modal */}
      {selectedStudent && (
        <StudentDetailModal
          student={selectedStudent}
          isOpen={showStudentModal}
          onClose={() => {
            setShowStudentModal(false);
            setSelectedStudent(null);
          }}
        />
      )}

      {/* Create Lesson Modal */}
      <CreateLessonModal
        isOpen={showCreateLessonModal}
        onClose={() => setShowCreateLessonModal(false)}
        onSave={handleCreateLesson}
      />
    </div>
  );
};

export default TeacherPortal;