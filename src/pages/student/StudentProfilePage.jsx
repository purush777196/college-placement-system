import React, { useState, useEffect, useCallback } from 'react';
import {
  User,
  GraduationCap,
  Sparkles,
  FolderGit2,
  FileText,
  Eye,
  RefreshCw,
  LayoutGrid,
} from 'lucide-react';
import Breadcrumb from '../../components/ui/Breadcrumb';
import Button from '../../components/ui/Button';
import { toast } from 'sonner';

// Feature components
import ProfileHeader from '../../features/student/profile/ProfileHeader';
import ProfileCompletionCard from '../../features/student/profile/ProfileCompletionCard';
import PersonalInfoSection from '../../features/student/profile/PersonalInfoSection';
import AcademicInfoSection from '../../features/student/profile/AcademicInfoSection';
import EducationHistorySection from '../../features/student/profile/EducationHistorySection';
import SkillsManagementSection from '../../features/student/profile/SkillsManagementSection';
import ProjectsSection from '../../features/student/profile/ProjectsSection';
import CertificationsSection from '../../features/student/profile/CertificationsSection';
import AchievementsSection from '../../features/student/profile/AchievementsSection';
import DocumentReferenceSection from '../../features/student/profile/DocumentReferenceSection';
import PublicProfilePreviewModal from '../../features/student/profile/PublicProfilePreviewModal';

import { studentsMockService } from '../../services/mock/students.mock';

const TABS = [
  { id: 'all', label: 'All Sections', icon: LayoutGrid },
  { id: 'personal', label: 'Personal & Contact', icon: User },
  { id: 'academic', label: 'Academics & Education', icon: GraduationCap },
  { id: 'skills', label: 'Skills & Competencies', icon: Sparkles },
  { id: 'projects', label: 'Projects & Certifications', icon: FolderGit2 },
  { id: 'resume', label: 'Placement Resume', icon: FileText },
];

export const StudentProfilePage = () => {
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('all');
  const [previewModalOpen, setPreviewModalOpen] = useState(false);
  const [previewData, setPreviewData] = useState(null);

  const fetchProfile = useCallback(async () => {
    try {
      setIsLoading(true);
      const data = await studentsMockService.getStudentProfile();
      setProfile(data);
    } catch (_err) {
      toast.error('Failed to load student profile');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  const handleOpenPreview = async () => {
    try {
      const publicData = await studentsMockService.getPublicProfilePreview();
      setPreviewData(publicData);
      setPreviewModalOpen(true);
    } catch (_err) {
      toast.error('Failed to generate recruiter preview');
    }
  };

  const handleUpdateVisibility = async (newVisibility) => {
    try {
      await studentsMockService.updateProfileVisibility('std_01', newVisibility);
      setProfile((prev) => ({
        ...prev,
        visibility: newVisibility,
      }));
      toast.success(`Profile visibility changed to '${newVisibility}'`);
    } catch (err) {
      toast.error(err.message || 'Failed to update visibility');
    }
  };

  // Personal Info Update
  const handleUpdatePersonalInfo = async (formData) => {
    const res = await studentsMockService.updatePersonalInformation('std_01', formData);
    setProfile(res.data);
    return res;
  };

  // Academic Info Update
  const handleUpdateAcademicInfo = async (formData) => {
    const res = await studentsMockService.updateAcademicInformation('std_01', formData);
    setProfile(res.data);
    return res;
  };

  // Education Handlers
  const handleAddEducation = async (eduData) => {
    const res = await studentsMockService.addEducation('std_01', eduData);
    setProfile((prev) => ({
      ...prev,
      education: res.allEducation,
      profileCompletion: res.completion.percentage,
      completionReport: res.completion,
    }));
  };

  const handleUpdateEducation = async (eduId, eduData) => {
    const res = await studentsMockService.updateEducation('std_01', eduId, eduData);
    setProfile((prev) => ({
      ...prev,
      education: res.allEducation,
      profileCompletion: res.completion.percentage,
      completionReport: res.completion,
    }));
  };

  const handleDeleteEducation = async (eduId) => {
    const res = await studentsMockService.deleteEducation('std_01', eduId);
    setProfile((prev) => ({
      ...prev,
      education: res.allEducation,
      profileCompletion: res.completion.percentage,
      completionReport: res.completion,
    }));
  };

  // Skills Handlers
  const handleAddSkill = async (skillData) => {
    const res = await studentsMockService.addStudentSkill('std_01', skillData);
    setProfile((prev) => ({
      ...prev,
      skills: res.allSkills,
      profileCompletion: res.completion.percentage,
      completionReport: res.completion,
    }));
  };

  const handleRemoveSkill = async (skillId) => {
    const res = await studentsMockService.removeStudentSkill('std_01', skillId);
    setProfile((prev) => ({
      ...prev,
      skills: res.allSkills,
      profileCompletion: res.completion.percentage,
      completionReport: res.completion,
    }));
  };

  const handleUpdateSkillProficiency = async (skillId, proficiency) => {
    const res = await studentsMockService.updateSkillProficiency('std_01', skillId, proficiency);
    setProfile((prev) => ({
      ...prev,
      skills: res.allSkills,
    }));
  };

  // Project Handlers
  const handleAddProject = async (projData) => {
    const res = await studentsMockService.addStudentProject('std_01', projData);
    setProfile((prev) => ({
      ...prev,
      projects: res.allProjects,
      profileCompletion: res.completion.percentage,
      completionReport: res.completion,
    }));
  };

  const handleUpdateProject = async (projId, projData) => {
    const res = await studentsMockService.updateStudentProject('std_01', projId, projData);
    setProfile((prev) => ({
      ...prev,
      projects: res.allProjects,
      profileCompletion: res.completion.percentage,
      completionReport: res.completion,
    }));
  };

  const handleDeleteProject = async (projId) => {
    const res = await studentsMockService.deleteStudentProject('std_01', projId);
    setProfile((prev) => ({
      ...prev,
      projects: res.allProjects,
      profileCompletion: res.completion.percentage,
      completionReport: res.completion,
    }));
  };

  // Certification Handlers
  const handleAddCertification = async (certData) => {
    const res = await studentsMockService.addCertification('std_01', certData);
    setProfile((prev) => ({
      ...prev,
      certifications: res.allCertifications,
      profileCompletion: res.completion.percentage,
      completionReport: res.completion,
    }));
  };

  const handleUpdateCertification = async (certId, certData) => {
    const res = await studentsMockService.updateCertification('std_01', certId, certData);
    setProfile((prev) => ({
      ...prev,
      certifications: res.allCertifications,
      profileCompletion: res.completion.percentage,
      completionReport: res.completion,
    }));
  };

  const handleDeleteCertification = async (certId) => {
    const res = await studentsMockService.deleteCertification('std_01', certId);
    setProfile((prev) => ({
      ...prev,
      certifications: res.allCertifications,
      profileCompletion: res.completion.percentage,
      completionReport: res.completion,
    }));
  };

  // Achievements Handlers
  const handleAddAchievement = async (achData) => {
    const res = await studentsMockService.addAchievement('std_01', achData);
    setProfile((prev) => ({
      ...prev,
      achievements: res.allAchievements,
    }));
  };

  const handleDeleteAchievement = async (achId) => {
    const res = await studentsMockService.deleteAchievement('std_01', achId);
    setProfile((prev) => ({
      ...prev,
      achievements: res.allAchievements,
    }));
  };

  // Document Handlers
  const handleUpdateDocument = async (docData) => {
    setProfile((prev) => ({
      ...prev,
      documents: docData,
    }));
  };

  if (isLoading || !profile) {
    return (
      <div className="min-h-[500px] flex flex-col items-center justify-center gap-3">
        <RefreshCw className="h-8 w-8 text-indigo-600 animate-spin" />
        <p className="text-sm text-slate-500 font-medium">
          Loading student placement profile and verified academic records...
        </p>
      </div>
    );
  }

  const completionReport =
    profile.completionReport || studentsMockService.calculateProfileCompletion(profile);

  return (
    <div className="space-y-6 pb-12">
      {/* Breadcrumb Navigation */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <Breadcrumb
          items={[
            { label: 'Student Portal', href: '/student/dashboard' },
            { label: 'Placement Profile & Academic Records', active: true },
          ]}
        />

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleOpenPreview}
            leftIcon={<Eye className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />}
          >
            Recruiter Preview
          </Button>
        </div>
      </div>

      {/* Profile Header */}
      <ProfileHeader
        profile={profile}
        onUpdateVisibility={handleUpdateVisibility}
        onOpenPreview={handleOpenPreview}
      />

      {/* Profile Completion Bar & Recommendations */}
      <ProfileCompletionCard
        completion={completionReport}
        onTabSelect={(tabId) => setActiveTab(tabId)}
      />

      {/* Navigation Filter Tabs */}
      <div className="border-b border-slate-200 dark:border-slate-800">
        <nav className="flex space-x-1 sm:space-x-2 overflow-x-auto pb-1" aria-label="Profile Sections">
          {TABS.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`inline-flex items-center gap-2 px-3.5 py-2.5 rounded-t-lg text-xs font-semibold whitespace-nowrap transition-colors border-b-2 ${
                  isActive
                    ? 'border-indigo-600 text-indigo-600 dark:border-indigo-400 dark:text-indigo-400 bg-indigo-50/50 dark:bg-indigo-950/30'
                    : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:border-slate-300'
                }`}
              >
                <Icon className="h-4 w-4" />
                {tab.label}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Content Renderers by Active Tab */}
      <div className="space-y-6">
        {/* Personal Details */}
        {(activeTab === 'all' || activeTab === 'personal') && (
          <PersonalInfoSection
            profile={profile}
            onUpdate={handleUpdatePersonalInfo}
          />
        )}

        {/* Academic Details & Education History */}
        {(activeTab === 'all' || activeTab === 'academic') && (
          <div className="space-y-6">
            <AcademicInfoSection
              academicData={profile}
              onUpdate={handleUpdateAcademicInfo}
            />
            <EducationHistorySection
              educationList={profile.education || []}
              onAddEducation={handleAddEducation}
              onUpdateEducation={handleUpdateEducation}
              onDeleteEducation={handleDeleteEducation}
            />
          </div>
        )}

        {/* Skills Management */}
        {(activeTab === 'all' || activeTab === 'skills') && (
          <SkillsManagementSection
            skills={profile.skills || []}
            onAddSkill={handleAddSkill}
            onRemoveSkill={handleRemoveSkill}
            onUpdateProficiency={handleUpdateSkillProficiency}
          />
        )}

        {/* Projects, Certifications & Achievements */}
        {(activeTab === 'all' || activeTab === 'projects') && (
          <div className="space-y-6">
            <ProjectsSection
              projects={profile.projects || []}
              onAddProject={handleAddProject}
              onUpdateProject={handleUpdateProject}
              onDeleteProject={handleDeleteProject}
            />
            <CertificationsSection
              certifications={profile.certifications || []}
              onAddCertification={handleAddCertification}
              onUpdateCertification={handleUpdateCertification}
              onDeleteCertification={handleDeleteCertification}
            />
            <AchievementsSection
              achievements={profile.achievements || []}
              onAddAchievement={handleAddAchievement}
              onDeleteAchievement={handleDeleteAchievement}
            />
          </div>
        )}

        {/* Verified Placement Resume Reference */}
        {(activeTab === 'all' || activeTab === 'resume') && (
          <DocumentReferenceSection
            documents={profile.documents}
            onUpdateDocument={handleUpdateDocument}
          />
        )}
      </div>

      {/* Recruiter Preview Modal */}
      <PublicProfilePreviewModal
        isOpen={previewModalOpen}
        onClose={() => setPreviewModalOpen(false)}
        previewData={previewData}
      />
    </div>
  );
};

export default StudentProfilePage;
