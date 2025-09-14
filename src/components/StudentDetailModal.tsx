import React from 'react';
import { motion } from 'framer-motion';
import { X, User, School, MapPin, Calendar, Award, Target, TrendingUp, Flame } from 'lucide-react';
import GlassCard from './GlassCard';

interface Student {
  id: string;
  name: string;
  grade: string;
  ecoPoints: number;
  completedChallenges: number;
  streak: number;
  avatar: string;
  school: string;
  state: string;
  joinDate?: string;
  level?: number;
  completedLessons?: number;
  badges?: number;
}

interface StudentDetailModalProps {
  student: Student;
  isOpen: boolean;
  onClose: () => void;
}

const StudentDetailModal: React.FC<StudentDetailModalProps> = ({ student, isOpen, onClose }) => {
  if (!isOpen) return null;

  const joinDate = student.joinDate ? new Date(student.joinDate) : new Date();
  const daysSinceJoined = Math.floor((Date.now() - joinDate.getTime()) / (1000 * 60 * 60 * 24));

  const performanceData = [
    {
      label: 'Eco Points',
      value: student.ecoPoints.toLocaleString(),
      icon: Award,
      color: 'text-[#F8D991]',
      bgColor: 'bg-[#F8D991]/20'
    },
    {
      label: 'Current Level',
      value: (student.level || Math.floor(student.ecoPoints / 200) + 1).toString(),
      icon: TrendingUp,
      color: 'text-[#F6B080]',
      bgColor: 'bg-[#F6B080]/20'
    },
    {
      label: 'Challenges Completed',
      value: student.completedChallenges.toString(),
      icon: Target,
      color: 'text-[#E1664C]',
      bgColor: 'bg-[#E1664C]/20'
    },
    {
      label: 'Current Streak',
      value: `${student.streak} days`,
      icon: Flame,
      color: 'text-[#F58B60]',
      bgColor: 'bg-[#F58B60]/20'
    }
  ];

  const academicProgress = [
    {
      category: 'Climate Change',
      completed: Math.floor(Math.random() * 8) + 2,
      total: 10,
      percentage: Math.floor(Math.random() * 40) + 60
    },
    {
      category: 'Waste Management',
      completed: Math.floor(Math.random() * 6) + 3,
      total: 8,
      percentage: Math.floor(Math.random() * 30) + 70
    },
    {
      category: 'Water Conservation',
      completed: Math.floor(Math.random() * 5) + 2,
      total: 7,
      percentage: Math.floor(Math.random() * 35) + 50
    },
    {
      category: 'Renewable Energy',
      completed: Math.floor(Math.random() * 4) + 1,
      total: 6,
      percentage: Math.floor(Math.random() * 40) + 40
    }
  ];

  const recentActivity = [
    {
      action: 'Completed challenge: Plant a Native Sapling',
      date: '2 days ago',
      points: 50
    },
    {
      action: 'Finished lesson: Climate Change Fundamentals',
      date: '4 days ago',
      points: 25
    },
    {
      action: 'Earned badge: Eco Rookie',
      date: '1 week ago',
      points: 0
    },
    {
      action: 'Completed challenge: Waste Segregation Drive',
      date: '1 week ago',
      points: 75
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-4xl max-h-[90vh] overflow-y-auto"
      >
        <GlassCard className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">Student Details</h2>
            <button
              onClick={onClose}
              className="text-white/70 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-[#E1664C] rounded p-1"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Student Profile */}
          <div className="mb-8">
            <div className="flex items-center space-x-6 mb-6">
              <img
                src={student.avatar}
                alt={student.name}
                className="w-24 h-24 rounded-full border-4 border-[#F8D991]"
              />
              <div>
                <h3 className="text-2xl font-bold text-white mb-2">{student.name}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-white/70">
                  <div className="flex items-center space-x-2">
                    <User className="h-4 w-4" />
                    <span>Grade {student.grade}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <School className="h-4 w-4" />
                    <span>{student.school}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4" />
                    <span>{student.state}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4" />
                    <span>{daysSinceJoined} days active</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Performance Metrics */}
          <div className="mb-8">
            <h4 className="text-xl font-bold text-white mb-4">Performance Overview</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {performanceData.map((metric, index) => {
                const Icon = metric.icon;
                return (
                  <motion.div
                    key={metric.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`p-4 rounded-xl ${metric.bgColor} border border-white/10`}
                  >
                    <Icon className={`h-6 w-6 ${metric.color} mb-2`} />
                    <div className={`text-lg font-bold ${metric.color}`}>{metric.value}</div>
                    <div className="text-white/70 text-sm">{metric.label}</div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Academic Progress */}
          <div className="mb-8">
            <h4 className="text-xl font-bold text-white mb-4">Academic Progress</h4>
            <div className="space-y-4">
              {academicProgress.map((subject, index) => (
                <motion.div
                  key={subject.category}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  className="p-4 bg-white/5 rounded-xl border border-white/10"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h5 className="font-semibold text-white">{subject.category}</h5>
                    <span className="text-white/70 text-sm">
                      {subject.completed}/{subject.total} lessons
                    </span>
                  </div>
                  <div className="bg-white/20 rounded-full h-2 mb-1">
                    <motion.div
                      className="bg-gradient-to-r from-[#F6B080] to-[#F8D991] rounded-full h-2"
                      initial={{ width: 0 }}
                      animate={{ width: `${subject.percentage}%` }}
                      transition={{ duration: 1, delay: 0.3 + index * 0.1 }}
                    />
                  </div>
                  <div className="text-right text-[#F8D991] text-sm font-semibold">
                    {subject.percentage}% Complete
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="mb-6">
            <h4 className="text-xl font-bold text-white mb-4">Recent Activity</h4>
            <div className="space-y-3">
              {recentActivity.map((activity, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/10"
                >
                  <div>
                    <p className="text-white font-medium">{activity.action}</p>
                    <p className="text-white/70 text-sm">{activity.date}</p>
                  </div>
                  {activity.points > 0 && (
                    <div className="text-[#F8D991] font-semibold">
                      +{activity.points} pts
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button className="flex-1 bg-gradient-to-r from-[#F8D991] to-[#F6B080] text-[#091D23] py-3 rounded-lg font-semibold hover:shadow-lg transition-all focus:outline-none focus:ring-2 focus:ring-[#E1664C]">
              Send Message
            </button>
            <button className="flex-1 bg-white/10 border border-white/20 text-white py-3 rounded-lg font-semibold hover:bg-white/20 transition-all focus:outline-none focus:ring-2 focus:ring-[#E1664C]">
              View Full Report
            </button>
            <button
              onClick={onClose}
              className="flex-1 bg-white/10 border border-white/20 text-white py-3 rounded-lg font-semibold hover:bg-white/20 transition-all focus:outline-none focus:ring-2 focus:ring-[#E1664C]"
            >
              Close
            </button>
          </div>
        </GlassCard>
      </motion.div>
    </motion.div>
  );
};

export default StudentDetailModal;