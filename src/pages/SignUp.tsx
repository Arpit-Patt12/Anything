import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Mail, Lock, Eye, EyeOff, GraduationCap, BookOpen, AlertCircle, CheckCircle } from 'lucide-react';
import GlassCard from '../components/GlassCard';

interface FormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: 'student' | 'teacher';
  grade?: string;
  school?: string;
  state?: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  grade?: string;
  school?: string;
  state?: string;
  general?: string;
}

const SignUp: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'student'
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const indianStates = [
    'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
    'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka',
    'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram',
    'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu',
    'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal'
  ];

  const grades = ['6th', '7th', '8th', '9th', '10th', '11th', '12th'];

  // Validation function for text fields (only letters, spaces, and common punctuation)
  const validateTextOnly = (value: string, fieldName: string): string | undefined => {
    const textOnlyRegex = /^[a-zA-Z\s.,'-]+$/;
    if (value && !textOnlyRegex.test(value)) {
      return `${fieldName} can only contain letters, spaces, and basic punctuation`;
    }
    return undefined;
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else {
      const textError = validateTextOnly(formData.name, 'Name');
      if (textError) newErrors.name = textError;
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        newErrors.email = 'Please enter a valid email address';
      }
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters long';
    }

    // Confirm password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    // Role-specific validations
    if (formData.role === 'student') {
      if (!formData.grade) {
        newErrors.grade = 'Grade is required for students';
      }
    }

    // School validation (text only)
    if (formData.school) {
      const textError = validateTextOnly(formData.school, 'School name');
      if (textError) newErrors.school = textError;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    // Real-time validation for text fields
    if (name === 'name' || name === 'school') {
      const textError = validateTextOnly(value, name === 'name' ? 'Name' : 'School name');
      if (textError) {
        setErrors(prev => ({ ...prev, [name]: textError }));
      } else {
        setErrors(prev => ({ ...prev, [name]: undefined }));
      }
    }

    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setErrors({});

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock successful registration
      console.log('Registration successful:', formData);
      
      // Store user data in localStorage (in real app, this would be handled by backend)
      const userData = {
        id: Date.now().toString(),
        name: formData.name,
        email: formData.email,
        role: formData.role,
        ...(formData.role === 'student' && { grade: formData.grade }),
        ...(formData.school && { school: formData.school }),
        ...(formData.state && { state: formData.state }),
        joinDate: new Date().toISOString()
      };
      
      localStorage.setItem('currentUser', JSON.stringify(userData));
      
      setIsSuccess(true);
      
      // Redirect based on role after showing success message
      setTimeout(() => {
        if (formData.role === 'student') {
          navigate('/dashboard');
        } else {
          navigate('/teacher');
        }
      }, 2000);
      
    } catch (error) {
      console.error('Registration error:', error);
      setErrors({ general: 'Registration failed. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#091D23] to-[#774C3E] flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <GlassCard className="p-8 max-w-md">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 }}
              className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4"
            >
              <CheckCircle className="h-8 w-8 text-white" />
            </motion.div>
            <h2 className="text-2xl font-bold text-white mb-2">Welcome to PrismWorlds!</h2>
            <p className="text-white/70 mb-4">
              Your account has been created successfully.
            </p>
            <p className="text-white/50 text-sm">
              Redirecting to your {formData.role} portal...
            </p>
          </GlassCard>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#091D23] to-[#774C3E] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl font-bold text-white mb-2">Join PrismWorlds</h1>
          <p className="text-white/70">Create your account to start your environmental journey</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <GlassCard className="p-8">
            {errors.general && (
              <div className="mb-6 p-4 bg-red-500/20 border border-red-500/30 rounded-lg">
                <div className="flex items-center space-x-2">
                  <AlertCircle className="h-5 w-5 text-red-400" />
                  <p className="text-red-200 text-sm">{errors.general}</p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Role Selection */}
              <div>
                <label className="block text-white/80 text-sm font-medium mb-3">
                  I am a *
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, role: 'student' }))}
                    className={`p-4 rounded-xl border-2 transition-all focus:outline-none focus:ring-2 focus:ring-[#E1664C] ${
                      formData.role === 'student'
                        ? 'border-[#E1664C] bg-[#E1664C]/20'
                        : 'border-white/20 bg-white/5 hover:bg-white/10'
                    }`}
                  >
                    <GraduationCap className="h-8 w-8 text-[#F8D991] mx-auto mb-2" />
                    <span className="text-white font-medium">Student</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, role: 'teacher' }))}
                    className={`p-4 rounded-xl border-2 transition-all focus:outline-none focus:ring-2 focus:ring-[#E1664C] ${
                      formData.role === 'teacher'
                        ? 'border-[#E1664C] bg-[#E1664C]/20'
                        : 'border-white/20 bg-white/5 hover:bg-white/10'
                    }`}
                  >
                    <BookOpen className="h-8 w-8 text-[#F6B080] mx-auto mb-2" />
                    <span className="text-white font-medium">Teacher</span>
                  </button>
                </div>
              </div>

              {/* Name */}
              <div>
                <label className="block text-white/80 text-sm font-medium mb-2">
                  Full Name *
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-white/50" />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full pl-10 pr-4 py-3 bg-white/10 border rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#E1664C] focus:border-transparent backdrop-blur-sm ${
                      errors.name ? 'border-red-500' : 'border-white/20'
                    }`}
                    placeholder="Enter your full name"
                  />
                </div>
                {errors.name && (
                  <p className="mt-1 text-red-400 text-sm">{errors.name}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block text-white/80 text-sm font-medium mb-2">
                  Email Address *
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-white/50" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full pl-10 pr-4 py-3 bg-white/10 border rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#E1664C] focus:border-transparent backdrop-blur-sm ${
                      errors.email ? 'border-red-500' : 'border-white/20'
                    }`}
                    placeholder="Enter your email"
                  />
                </div>
                {errors.email && (
                  <p className="mt-1 text-red-400 text-sm">{errors.email}</p>
                )}
              </div>

              {/* Password */}
              <div>
                <label className="block text-white/80 text-sm font-medium mb-2">
                  Password *
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-white/50" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className={`w-full pl-10 pr-12 py-3 bg-white/10 border rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#E1664C] focus:border-transparent backdrop-blur-sm ${
                      errors.password ? 'border-red-500' : 'border-white/20'
                    }`}
                    placeholder="Create a password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/50 hover:text-[#E1664C] transition-colors focus:outline-none"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
                {errors.password && (
                  <p className="mt-1 text-red-400 text-sm">{errors.password}</p>
                )}
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-white/80 text-sm font-medium mb-2">
                  Confirm Password *
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-white/50" />
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className={`w-full pl-10 pr-12 py-3 bg-white/10 border rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#E1664C] focus:border-transparent backdrop-blur-sm ${
                      errors.confirmPassword ? 'border-red-500' : 'border-white/20'
                    }`}
                    placeholder="Confirm your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/50 hover:text-[#E1664C] transition-colors focus:outline-none"
                  >
                    {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="mt-1 text-red-400 text-sm">{errors.confirmPassword}</p>
                )}
              </div>

              {/* Student-specific fields */}
              {formData.role === 'student' && (
                <div>
                  <label className="block text-white/80 text-sm font-medium mb-2">
                    Grade *
                  </label>
                  <select
                    name="grade"
                    value={formData.grade || ''}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 bg-white/10 border rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-[#E1664C] focus:border-transparent backdrop-blur-sm ${
                      errors.grade ? 'border-red-500' : 'border-white/20'
                    }`}
                  >
                    <option value="" className="bg-[#091D23] text-white">Select your grade</option>
                    {grades.map(grade => (
                      <option key={grade} value={grade} className="bg-[#091D23] text-white">
                        {grade}
                      </option>
                    ))}
                  </select>
                  {errors.grade && (
                    <p className="mt-1 text-red-400 text-sm">{errors.grade}</p>
                  )}
                </div>
              )}

              {/* Optional fields */}
              <div>
                <label className="block text-white/80 text-sm font-medium mb-2">
                  School Name (Optional)
                </label>
                <input
                  type="text"
                  name="school"
                  value={formData.school || ''}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 bg-white/10 border rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#E1664C] focus:border-transparent backdrop-blur-sm ${
                    errors.school ? 'border-red-500' : 'border-white/20'
                  }`}
                  placeholder="Enter your school name"
                />
                {errors.school && (
                  <p className="mt-1 text-red-400 text-sm">{errors.school}</p>
                )}
              </div>

              <div>
                <label className="block text-white/80 text-sm font-medium mb-2">
                  State (Optional)
                </label>
                <select
                  name="state"
                  value={formData.state || ''}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-[#E1664C] focus:border-transparent backdrop-blur-sm"
                >
                  <option value="" className="bg-[#091D23] text-white">Select your state</option>
                  {indianStates.map(state => (
                    <option key={state} value={state} className="bg-[#091D23] text-white">
                      {state}
                    </option>
                  ))}
                </select>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-4 rounded-xl font-bold text-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#E1664C] focus:ring-offset-2 focus:ring-offset-transparent ${
                  isSubmitting
                    ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-[#F8D991] to-[#F6B080] text-[#091D23] hover:shadow-2xl hover:shadow-[#F8D991]/25'
                }`}
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-[#091D23]"></div>
                    <span>Creating Account...</span>
                  </div>
                ) : (
                  `Create ${formData.role === 'student' ? 'Student' : 'Teacher'} Account`
                )}
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-white/70 text-sm">
                Already have an account?{' '}
                <Link
                  to="/"
                  className="text-[#E1664C] hover:text-[#E1664C]/80 transition-colors focus:outline-none focus:ring-2 focus:ring-[#E1664C] rounded px-1"
                >
                  Sign In
                </Link>
              </p>
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </div>
  );
};

export default SignUp;