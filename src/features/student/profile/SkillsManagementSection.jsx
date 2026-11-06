import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Code,
  Plus,
  Trash2,
  Search,
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../../../components/ui/Card';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Modal from '../../../components/ui/Modal';
import { Badge } from '../../../components/ui/Badge';
import EmptyState from '../../../components/common/EmptyState';
import { skillSchema, SKILL_CATEGORIES, PROFICIENCY_LEVELS } from '../../../schemas/profileSchemas';
import { toast } from 'sonner';

export const SkillsManagementSection = ({
  skills = [],
  onAddSkill,
  onRemoveSkill,
  onUpdateProficiency,
}) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(skillSchema),
    defaultValues: {
      name: '',
      category: 'Programming Languages',
      proficiency: 'Intermediate',
    },
  });

  const handleOpenAdd = () => {
    reset({
      name: '',
      category: selectedCategory === 'all' ? 'Programming Languages' : selectedCategory,
      proficiency: 'Intermediate',
    });
    setIsModalOpen(true);
  };

  const onSubmit = async (formData) => {
    try {
      setIsSubmitting(true);
      await onAddSkill(formData);
      toast.success(`Skill '${formData.name}' added successfully`);
      setIsModalOpen(false);
    } catch (err) {
      toast.error(err.message || 'Failed to add skill');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRemove = async (skillId, skillName) => {
    try {
      await onRemoveSkill(skillId);
      toast.success(`Removed skill '${skillName}'`);
    } catch (err) {
      toast.error(err.message || 'Failed to remove skill');
    }
  };

  const handleProficiencyChange = async (skillId, newLevel) => {
    try {
      await onUpdateProficiency(skillId, newLevel);
      toast.success(`Proficiency updated to ${newLevel}`);
    } catch (err) {
      toast.error(err.message || 'Failed to update proficiency');
    }
  };

  const filteredSkills = skills.filter((skill) => {
    const matchesCategory =
      selectedCategory === 'all' ||
      skill.category?.toLowerCase() === selectedCategory.toLowerCase();
    const matchesSearch =
      !searchQuery || skill.name?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getProficiencyBadgeVariant = (level) => {
    switch (level) {
      case 'Expert':
        return 'success';
      case 'Advanced':
        return 'primary';
      case 'Intermediate':
        return 'warning';
      case 'Beginner':
      default:
        return 'secondary';
    }
  };

  return (
    <Card className="border-slate-200 dark:border-slate-800 shadow-xs">
      <CardHeader className="pb-3 border-b border-slate-100 dark:border-slate-800">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="h-8 w-8 rounded-lg bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center text-blue-600 dark:text-blue-400">
              <Code className="h-4 w-4" />
            </div>
            <div>
              <CardTitle className="text-base font-bold text-slate-900 dark:text-slate-100">
                Technical & Professional Skills ({skills.length})
              </CardTitle>
              <p className="text-xs text-slate-500">
                Categorized skill taxonomy evaluated for automated corporate cutoff matching.
              </p>
            </div>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={handleOpenAdd}
            leftIcon={<Plus className="h-3.5 w-3.5" />}
          >
            Add Skill
          </Button>
        </div>
      </CardHeader>

      <CardContent className="p-5 space-y-4">
        {/* Category Pills & Search Controls */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          {/* Category Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            <button
              type="button"
              onClick={() => setSelectedCategory('all')}
              className={`rounded-lg px-2.5 py-1 text-xs font-semibold whitespace-nowrap transition-colors ${
                selectedCategory === 'all'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300'
              }`}
            >
              All Categories ({skills.length})
            </button>
            {SKILL_CATEGORIES.map((cat) => {
              const count = skills.filter((s) => s.category?.toLowerCase() === cat.toLowerCase()).length;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`rounded-lg px-2.5 py-1 text-xs font-semibold whitespace-nowrap transition-colors ${
                    selectedCategory === cat
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300'
                  }`}
                >
                  {cat} {count > 0 && `(${count})`}
                </button>
              );
            })}
          </div>

          {/* Search Input */}
          <div className="relative min-w-[200px] sm:w-60">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search skills..."
              className="w-full rounded-lg border border-slate-300 bg-white pl-8 pr-3 py-1.5 text-xs text-slate-900 placeholder-slate-400 focus:border-blue-500 focus:outline-hidden dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
            />
          </div>
        </div>

        {/* Skills Badge Grid */}
        {filteredSkills.length === 0 ? (
          <EmptyState
            title="No Skills Found"
            description={
              searchQuery
                ? `No skills match "${searchQuery}". Clear your search query.`
                : 'No skills found in this category. Click "Add Skill" to categorize your competencies.'
            }
            action={
              <Button variant="outline" size="sm" onClick={handleOpenAdd}>
                Add New Skill
              </Button>
            }
          />
        ) : (
          <div className="flex flex-wrap gap-2.5">
            {filteredSkills.map((skill) => (
              <div
                key={skill.id}
                className="group inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-900 shadow-2xs hover:border-blue-300 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100 transition-colors"
              >
                <span className="font-bold">{skill.name}</span>

                {/* Proficiency Pill */}
                <div className="relative inline-flex items-center">
                  <select
                    value={skill.proficiency}
                    onChange={(e) => handleProficiencyChange(skill.id, e.target.value)}
                    className="text-[10px] font-semibold uppercase rounded-md border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-1.5 py-0.5 text-slate-600 dark:text-slate-300 cursor-pointer focus:outline-hidden"
                    title="Change proficiency level"
                  >
                    {PROFICIENCY_LEVELS.map((lvl) => (
                      <option key={lvl} value={lvl}>
                        {lvl}
                      </option>
                    ))}
                  </select>
                </div>

                <Badge
                  variant={getProficiencyBadgeVariant(skill.proficiency)}
                  className="text-[10px] px-1.5 py-0"
                >
                  {skill.proficiency}
                </Badge>

                {/* Delete Trigger */}
                <button
                  type="button"
                  onClick={() => handleRemove(skill.id, skill.name)}
                  className="rounded p-0.5 text-slate-400 hover:bg-slate-100 hover:text-rose-600 dark:hover:bg-slate-800 transition-colors"
                  title="Remove skill"
                >
                  <Trash2 className="h-3 w-3" />
                </button>
              </div>
            ))}
          </div>
        )}
      </CardContent>

      {/* Add Skill Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Add Technical or Professional Skill"
        description="Categorize your technical tools and choose your current proficiency level."
        size="sm"
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 pt-2">
          <Input
            label="Skill Name"
            placeholder="e.g. React 19, Python, Docker"
            error={errors.name?.message}
            {...register('name')}
          />

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              Skill Domain Category
            </label>
            <select
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
              {...register('category')}
            >
              {SKILL_CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              Proficiency Level
            </label>
            <select
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
              {...register('proficiency')}
            >
              {PROFICIENCY_LEVELS.map((lvl) => (
                <option key={lvl} value={lvl}>
                  {lvl}
                </option>
              ))}
            </select>
            <p className="text-[10px] text-slate-400 mt-1">
              Proficiency levels must be chosen conscientiously and are validated during technical interviews.
            </p>
          </div>

          <div className="flex justify-end gap-2 pt-3 border-t border-slate-100 dark:border-slate-800">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setIsModalOpen(false)}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button type="submit" variant="primary" size="sm" isLoading={isSubmitting}>
              Add to Profile
            </Button>
          </div>
        </form>
      </Modal>
    </Card>
  );
};

export default SkillsManagementSection;
