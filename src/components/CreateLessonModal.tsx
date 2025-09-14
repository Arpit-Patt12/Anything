import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, BookOpen, Clock, Target, FileText, Plus, Trash2 } from 'lucide-react';
import GlassCard from './GlassCard';

interface CreateLessonModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (lessonData: LessonFormData) => void;
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

interface FormErrors {
  title?: string;
  subject?: string;
  description?: string;
  duration?: string;
  objectives?: string;
  category?: string;
}

const CreateLessonModal: React.FC<CreateLessonModalProps> = ({ isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState<LessonFormData>({
    title: '',
    subject: '',
    description: '',
    duration: 30,
    objectives: [''],
    difficulty: 'Beginner',
    category: '',
    prerequisites: '',
    materials: ['']
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const subjects = [
    'Environmental Science',
    'Climate Change',
    'Waste Management',
    'Water Conservation',
    'Renewable Energy',
    'Biodiversity',
    'Sustainable Development',
    'Pollution Control',
    'Ecology',
    'Green Technology'
  ];

  const categories = [
    'Theory',
    'Practical',
    'Field Study',
    'Laboratory',
    'Project-based',
    'Interactive',
    'Assessment',
    'Research'
  ];

  if (!isOpen) return null;

  const validateTextOnly = (value: string, fieldName: string): string | undefined => {
    const textOnlyRegex = /^[a-zA-Z\s.,'-]+$/;
    if (value && !textOnlyRegex.test(value)) {
      return `${fieldName} can only contain letters, spaces, and basic punctuation`;
    }
    return undefined;
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Title validation
    if (!formData.title.trim()) {
      newErrors.title = 'Lesson title is required';
    } else {
      const textError = validateTextOnly(formData.title, 'Title');
      if (textError) newErrors.title = textError;
    }

    // Subject validation
    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }

    // Description validation
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    } else if (formData.description.length < 20) {
      newErrors.description = 'Description must be at least 20 characters long';
    }

    // Duration validation
    if (formData.duration < 15 || formData.duration > 180) {
      newErrors.duration = 'Duration must be between 15 and 180 minutes';
    }

    // Objectives validation
    const validObjectives = formData.objectives.filter(obj => obj.trim());
    if (validObjectives.length === 0) {
      newErrors.objectives = 'At least one learning objective is required';
    }

    // Category validation
    if (!formData.category.trim()) {
      newErrors.category = 'Category is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    // Real-time validation for text fields
    if (name === 'title') {
      const textError = validateTextOnly(value, 'Title');
      if (textError) {
        setErrors(prev => ({ ...prev, [name]: textError }));
      } else {
        setErrors(prev => ({ ...prev, [name]: undefined }));
      }
    }

    setFormData(prev => ({
      ...prev,
      [name]: name === 'duration' ? parseInt(value) || 0 : value
    }));

    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleObjectiveChange = (index: number, value: string) => {
    const newObjectives = [...formData.objectives];
    newObjectives[index] = value;
    setFormData(prev => ({ ...prev, objectives: newObjectives }));
    
    // Clear objectives error if user is typing
    if (errors.objectives) {
      setErrors(prev => ({ ...prev, objectives: undefined }));
    }
  };

  const addObjective = () => {
    setFormData(prev => ({
      ...prev,
      objectives: [...prev.objectives, '']
    }));
  };

  const removeObjective = (index: number) => {
    if (formData.objectives.length > 1) {
      const newObjectives = formData.objectives.filter((_, i) => i !== index);
      setFormData(prev => ({ ...prev, objectives: newObjectives }));
    }
  };

  const handleMaterialChange = (index: number, value: string) => {
    const newMaterials = [...formData.materials];
    newMaterials[index] = value;
    setFormData(prev => ({ ...prev, materials: newMaterials }));
  };

  const addMaterial = () => {
    setFormData(prev => ({
      ...prev,
      materials: [...prev.materials, '']
    }));
  };

  const removeMaterial = (index: number) => {
    if (formData.materials.length > 1) {
      const newMaterials = formData.materials.filter((_, i) => i !== index);
      setFormData(prev => ({ ...prev, materials: newMaterials }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Clean up data before saving
      const cleanedData = {
        ...formData,
        objectives: formData.objectives.filter(obj => obj.trim()),
        materials: formData.materials.filter(mat => mat.trim())
      };
      
      onSave(cleanedData);
      
      // Reset form
      setFormData({
        title: '',
        subject: '',
        description: '',
        duration: 30,
        objectives: [''],
        difficulty: 'Beginner',
        category: '',
        prerequisites: '',
        materials: ['']
      });
      
      onClose();
    } catch (error) {
      console.error('Error creating lesson:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setFormData({
      title: '',
      subject: '',
      description: '',
      duration: 30,
      objectives: [''],
      difficulty: 'Beginner',
      category: '',
      prerequisites: '',
      materials: ['']
    });
    setErrors({});
    onClose();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={handleClose}
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
            <div className="flex items-center space-x-3">
              <BookOpen className="h-6 w-6 text-[#F8D991]" />
              <h2 className="text-2xl font-bold text-white">Create New Lesson</h2>
            </div>
            <button
              onClick={handleClose}
              className="text-white/70 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-[#E1664C] rounded p-1"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-white/80 text-sm font-medium mb-2">
                  Lesson Title *
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 bg-white/10 border rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#E1664C] focus:border-transparent backdrop-blur-sm ${
                    errors.title ? 'border-red-500' : 'border-white/20'
                  }`}
                  placeholder="Enter lesson title"
                />
                {errors.title && (
                  <p className="mt-1 text-red-400 text-sm">{errors.title}</p>
                )}
              </div>

              <div>
                <label className="block text-white/80 text-sm font-medium mb-2">
                  Subject *
                </label>
                <select
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 bg-white/10 border rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-[#E1664C] focus:border-transparent backdrop-blur-sm ${
                    errors.subject ? 'border-red-500' : 'border-white/20'
                  }`}
                >
                  <option value="" className="bg-[#091D23] text-white">Select subject</option>
                  {subjects.map(subject => (
                    <option key={subject} value={subject} className="bg-[#091D23] text-white">
                      {subject}
                    </option>
                  ))}
                </select>
                {errors.subject && (
                  <p className="mt-1 text-red-400 text-sm">{errors.subject}</p>
                )}
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-white/80 text-sm font-medium mb-2">
                Description *
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                className={`w-full px-4 py-3 bg-white/10 border rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#E1664C] focus:border-transparent backdrop-blur-sm resize-none ${
                  errors.description ? 'border-red-500' : 'border-white/20'
                }`}
                placeholder="Describe what students will learn in this lesson..."
              />
              {errors.description && (
                <p className="mt-1 text-red-400 text-sm">{errors.description}</p>
              )}
            </div>

            {/* Duration, Difficulty, Category */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-white/80 text-sm font-medium mb-2">
                  Duration (minutes) *
                </label>
                <div className="relative">
                  <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-white/50" />
                  <input
                    type="number"
                    name="duration"
                    value={formData.duration}
                    onChange={handleChange}
                    min="15"
                    max="180"
                    className={`w-full pl-10 pr-4 py-3 bg-white/10 border rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#E1664C] focus:border-transparent backdrop-blur-sm ${
                      errors.duration ? 'border-red-500' : 'border-white/20'
                    }`}
                    placeholder="30"
                  />
                </div>
                {errors.duration && (
                  <p className="mt-1 text-red-400 text-sm">{errors.duration}</p>
                )}
              </div>

              <div>
                <label className="block text-white/80 text-sm font-medium mb-2">
                  Difficulty Level
                </label>
                <select
                  name="difficulty"
                  value={formData.difficulty}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-[#E1664C] focus:border-transparent backdrop-blur-sm"
                >
                  <option value="Beginner" className="bg-[#091D23] text-white">Beginner</option>
                  <option value="Intermediate" className="bg-[#091D23] text-white">Intermediate</option>
                  <option value="Advanced" className="bg-[#091D23] text-white">Advanced</option>
                </select>
              </div>

              <div>
                <label className="block text-white/80 text-sm font-medium mb-2">
                  Category *
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 bg-white/10 border rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-[#E1664C] focus:border-transparent backdrop-blur-sm ${
                    errors.category ? 'border-red-500' : 'border-white/20'
                  }`}
                >
                  <option value="" className="bg-[#091D23] text-white">Select category</option>
                  {categories.map(category => (
                    <option key={category} value={category} className="bg-[#091D23] text-white">
                      {category}
                    </option>
                  ))}
                </select>
                {errors.category && (
                  <p className="mt-1 text-red-400 text-sm">{errors.category}</p>
                )}
              </div>
            </div>

            {/* Learning Objectives */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="block text-white/80 text-sm font-medium">
                  Learning Objectives *
                </label>
                <button
                  type="button"
                  onClick={addObjective}
                  className="flex items-center space-x-1 text-[#E1664C] hover:text-[#E1664C]/80 transition-colors focus:outline-none focus:ring-2 focus:ring-[#E1664C] rounded px-2 py-1"
                >
                  <Plus className="h-4 w-4" />
                  <span className="text-sm">Add Objective</span>
                </button>
              </div>
              <div className="space-y-3">
                {formData.objectives.map((objective, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="relative flex-1">
                      <Target className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-white/50" />
                      <input
                        type="text"
                        value={objective}
                        onChange={(e) => handleObjectiveChange(index, e.target.value)}
                        className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#E1664C] focus:border-transparent backdrop-blur-sm"
                        placeholder={`Learning objective ${index + 1}`}
                      />
                    </div>
                    {formData.objectives.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeObjective(index)}
                        className="text-red-400 hover:text-red-300 transition-colors focus:outline-none focus:ring-2 focus:ring-red-400 rounded p-1"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
              {errors.objectives && (
                <p className="mt-1 text-red-400 text-sm">{errors.objectives}</p>
              )}
            </div>

            {/* Prerequisites */}
            <div>
              <label className="block text-white/80 text-sm font-medium mb-2">
                Prerequisites (Optional)
              </label>
              <textarea
                name="prerequisites"
                value={formData.prerequisites}
                onChange={handleChange}
                rows={2}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#E1664C] focus:border-transparent backdrop-blur-sm resize-none"
                placeholder="Any prior knowledge or completed lessons required..."
              />
            </div>

            {/* Materials */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="block text-white/80 text-sm font-medium">
                  Required Materials (Optional)
                </label>
                <button
                  type="button"
                  onClick={addMaterial}
                  className="flex items-center space-x-1 text-[#E1664C] hover:text-[#E1664C]/80 transition-colors focus:outline-none focus:ring-2 focus:ring-[#E1664C] rounded px-2 py-1"
                >
                  <Plus className="h-4 w-4" />
                  <span className="text-sm">Add Material</span>
                </button>
              </div>
              <div className="space-y-3">
                {formData.materials.map((material, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="relative flex-1">
                      <FileText className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-white/50" />
                      <input
                        type="text"
                        value={material}
                        onChange={(e) => handleMaterialChange(index, e.target.value)}
                        className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#E1664C] focus:border-transparent backdrop-blur-sm"
                        placeholder={`Material ${index + 1}`}
                      />
                    </div>
                    {formData.materials.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeMaterial(index)}
                        className="text-red-400 hover:text-red-300 transition-colors focus:outline-none focus:ring-2 focus:ring-red-400 rounded p-1"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`flex-1 py-4 rounded-xl font-bold text-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#E1664C] focus:ring-offset-2 focus:ring-offset-transparent ${
                  isSubmitting
                    ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-[#F8D991] to-[#F6B080] text-[#091D23] hover:shadow-2xl hover:shadow-[#F8D991]/25'
                }`}
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-[#091D23]"></div>
                    <span>Creating Lesson...</span>
                  </div>
                ) : (
                  'Create Lesson'
                )}
              </button>
              
              <button
                type="button"
                onClick={handleClose}
                className="flex-1 bg-white/10 border border-white/20 text-white py-4 rounded-xl font-semibold text-lg hover:bg-white/20 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#E1664C] focus:ring-offset-2 focus:ring-offset-transparent"
              >
                Cancel
              </button>
            </div>
          </form>
        </GlassCard>
      </motion.div>
    </motion.div>
  );
};

export default CreateLessonModal;