import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  FolderGit2,
  Plus,
  Edit2,
  Trash2,
  ExternalLink,
  Github,
  Calendar,
  Layers,
  CheckCircle2,
  Clock,
  Wrench,
  X,
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../../../components/ui/Card';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Textarea from '../../../components/ui/Textarea';
import Modal from '../../../components/ui/Modal';
import { Badge } from '../../../components/ui/Badge';
import EmptyState from '../../../components/common/EmptyState';
import { projectSchema, PROJECT_STATUSES } from '../../../schemas/profileSchemas';
import { toast } from 'sonner';

const PROJECT_TYPES = [
  'Academic Capstone',
  'Open Source',
  'Research Project',
  'Personal Project',
  'Industry Internship',
];

export const ProjectsSection = ({
  projects = [],
  onAddProject,
  onUpdateProject,
  onDeleteProject,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [deleteProjectId, setDeleteProjectId] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Tech tags state
  const [techTagInput, setTechTagInput] = useState('');
  const [tags, setTags] = useState([]);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      title: '',
      description: '',
      technologies: [],
      projectType: 'Academic Capstone',
      githubUrl: '',
      liveUrl: '',
      startDate: '',
      endDate: '',
      status: 'Completed',
    },
  });

  const handleOpenAdd = () => {
    setEditingProject(null);
    setTags(['React 19', 'Tailwind CSS']);
    reset({
      title: '',
      description: '',
      technologies: ['React 19', 'Tailwind CSS'],
      projectType: 'Academic Capstone',
      githubUrl: '',
      liveUrl: '',
      startDate: '2026-01-10',
      endDate: '2026-05-15',
      status: 'Completed',
    });
    setTechTagInput('');
    setIsModalOpen(true);
  };

  const handleOpenEdit = (project) => {
    setEditingProject(project);
    const existingTags = Array.isArray(project.technologies) ? project.technologies : [];
    setTags(existingTags);
    reset({
      title: project.title,
      description: project.description,
      technologies: existingTags,
      projectType: project.projectType || 'Personal Project',
      githubUrl: project.githubUrl || '',
      liveUrl: project.liveUrl || '',
      startDate: project.startDate || '',
      endDate: project.endDate || '',
      status: project.status || 'Completed',
    });
    setTechTagInput('');
    setIsModalOpen(true);
  };

  const handleAddTag = (e) => {
    e.preventDefault();
    const trimmed = techTagInput.trim();
    if (!trimmed) return;
    if (!tags.includes(trimmed)) {
      const nextTags = [...tags, trimmed];
      setTags(nextTags);
      setValue('technologies', nextTags, { shouldValidate: true });
    }
    setTechTagInput('');
  };

  const handleRemoveTag = (tagToRemove) => {
    const nextTags = tags.filter((t) => t !== tagToRemove);
    setTags(nextTags);
    setValue('technologies', nextTags, { shouldValidate: true });
  };

  const onSubmit = async (formData) => {
    try {
      setIsSubmitting(true);
      const payload = {
        ...formData,
        technologies: tags.length > 0 ? tags : formData.technologies,
      };

      if (editingProject) {
        await onUpdateProject(editingProject.id, payload);
        toast.success('Project updated successfully');
      } else {
        await onAddProject(payload);
        toast.success('Project added to portfolio');
      }
      setIsModalOpen(false);
    } catch (err) {
      toast.error(err.message || 'Operation failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  const confirmDelete = async () => {
    if (!deleteProjectId) return;
    try {
      setIsSubmitting(true);
      await onDeleteProject(deleteProjectId);
      toast.success('Project removed from portfolio');
      setDeleteProjectId(null);
    } catch (err) {
      toast.error(err.message || 'Failed to remove project');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Completed':
        return (
          <Badge variant="success" className="gap-1">
            <CheckCircle2 className="h-3 w-3" />
            Completed
          </Badge>
        );
      case 'In Progress':
        return (
          <Badge variant="warning" className="gap-1">
            <Clock className="h-3 w-3" />
            In Progress
          </Badge>
        );
      case 'Maintained':
        return (
          <Badge variant="info" className="gap-1">
            <Wrench className="h-3 w-3" />
            Maintained
          </Badge>
        );
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <Card className="border-slate-200 dark:border-slate-800 shadow-xs">
      <CardHeader className="pb-3 border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="h-8 w-8 rounded-lg bg-teal-100 dark:bg-teal-900/40 flex items-center justify-center text-teal-600 dark:text-teal-400">
              <FolderGit2 className="h-4 w-4" />
            </div>
            <div>
              <CardTitle className="text-base font-bold text-slate-900 dark:text-slate-100">
                Technical Projects & Capstone
              </CardTitle>
              <p className="text-xs text-slate-500">
                Showcase software engineering builds, system architectures, and live applications.
              </p>
            </div>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={handleOpenAdd}
            leftIcon={<Plus className="h-3.5 w-3.5" />}
          >
            Add Project
          </Button>
        </div>
      </CardHeader>

      <CardContent className="p-5">
        {projects.length === 0 ? (
          <EmptyState
            title="No Technical Projects Showcase"
            description="Add at least 2 capstone, research, or open-source projects to boost your ATS rating."
            action={
              <Button variant="outline" size="sm" onClick={handleOpenAdd}>
                Add Your First Project
              </Button>
            }
          />
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {projects.map((project) => (
              <div
                key={project.id}
                className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 hover:border-teal-300 dark:hover:border-teal-700/50 transition-all duration-200"
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h4 className="text-base font-semibold text-slate-900 dark:text-slate-100">
                        {project.title}
                      </h4>
                      {getStatusBadge(project.status)}
                      <Badge variant="outline" className="text-xs">
                        {project.projectType}
                      </Badge>
                    </div>

                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      <Calendar className="h-3.5 w-3.5" />
                      <span>
                        {project.startDate} &mdash; {project.endDate || 'Present'}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 self-end sm:self-auto">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        aria-label="GitHub Repository"
                        className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                      >
                        <Github className="h-4 w-4" />
                      </a>
                    )}
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        aria-label="Live Application Demo"
                        className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:text-teal-600 dark:hover:text-teal-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    )}
                    <button
                      type="button"
                      onClick={() => handleOpenEdit(project)}
                      className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                      title="Edit project"
                    >
                      <Edit2 className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setDeleteProjectId(project.id)}
                      className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                      title="Delete project"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                <p className="mt-2.5 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {project.description}
                </p>

                {project.technologies && project.technologies.length > 0 && (
                  <div className="mt-3 flex flex-wrap items-center gap-1.5">
                    <Layers className="h-3.5 w-3.5 text-slate-400 mr-0.5" />
                    {project.technologies.map((tech, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200/60 dark:border-slate-700"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </CardContent>

      {/* Add / Edit Project Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingProject ? 'Edit Project Details' : 'Add Project to Portfolio'}
        size="lg"
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input
            label="Project Title"
            placeholder="e.g. CampusConnect Placement Portal"
            {...register('title')}
            error={errors.title?.message}
            required
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                Project Type <span className="text-rose-500">*</span>
              </label>
              <select
                {...register('projectType')}
                className="w-full h-9 px-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                {PROJECT_TYPES.map((pt) => (
                  <option key={pt} value={pt}>
                    {pt}
                  </option>
                ))}
              </select>
              {errors.projectType && (
                <p className="mt-1 text-xs text-rose-500">{errors.projectType.message}</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                Development Status <span className="text-rose-500">*</span>
              </label>
              <select
                {...register('status')}
                className="w-full h-9 px-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                {PROJECT_STATUSES.map((st) => (
                  <option key={st} value={st}>
                    {st}
                  </option>
                ))}
              </select>
              {errors.status && (
                <p className="mt-1 text-xs text-rose-500">{errors.status.message}</p>
              )}
            </div>
          </div>

          <Textarea
            label="Project Description"
            placeholder="Outline the problem solved, architecture, and quantifiable impact (min 10 characters)..."
            rows={3}
            {...register('description')}
            error={errors.description?.message}
            required
          />

          {/* Technology Tags Builder */}
          <div>
            <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
              Technologies Used <span className="text-rose-500">*</span>
            </label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={techTagInput}
                onChange={(e) => setTechTagInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddTag(e);
                  }
                }}
                placeholder="Type a technology (e.g. React 19, Kafka) and press Add"
                className="flex-1 h-9 px-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <Button type="button" variant="secondary" size="sm" onClick={handleAddTag}>
                Add Tag
              </Button>
            </div>

            {tags.length > 0 ? (
              <div className="flex flex-wrap gap-1.5 p-2 bg-slate-50 dark:bg-slate-900/40 rounded-lg border border-slate-200 dark:border-slate-800">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => handleRemoveTag(tag)}
                      className="hover:text-rose-600 transition-colors"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-xs text-slate-400 italic">No tags added yet. At least one tag required.</p>
            )}
            {errors.technologies && (
              <p className="mt-1 text-xs text-rose-500">{errors.technologies.message}</p>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="GitHub Repository URL"
              placeholder="https://github.com/username/project"
              {...register('githubUrl')}
              error={errors.githubUrl?.message}
            />

            <Input
              label="Live Application Demo URL"
              placeholder="https://myproject.app"
              {...register('liveUrl')}
              error={errors.liveUrl?.message}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Start Date"
              type="date"
              {...register('startDate')}
              error={errors.startDate?.message}
              required
            />

            <Input
              label="Completion / End Date"
              type="date"
              {...register('endDate')}
              error={errors.endDate?.message}
            />
          </div>

          <div className="flex justify-end gap-3 pt-3 border-t border-slate-100 dark:border-slate-800">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setIsModalOpen(false)}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button type="submit" size="sm" loading={isSubmitting}>
              {editingProject ? 'Save Changes' : 'Create Project'}
            </Button>
          </div>
        </form>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={Boolean(deleteProjectId)}
        onClose={() => setDeleteProjectId(null)}
        title="Delete Project Record"
        size="sm"
      >
        <div className="space-y-4">
          <p className="text-sm text-slate-600 dark:text-slate-300">
            Are you sure you want to remove this project from your profile? This action will adjust your overall profile completeness score.
          </p>

          <div className="flex justify-end gap-3 pt-3 border-t border-slate-100 dark:border-slate-800">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setDeleteProjectId(null)}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={confirmDelete}
              loading={isSubmitting}
            >
              Delete Project
            </Button>
          </div>
        </div>
      </Modal>
    </Card>
  );
};

export default ProjectsSection;
