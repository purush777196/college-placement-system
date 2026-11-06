import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  ShieldCheck,
  Plus,
  Edit2,
  Trash2,
  ExternalLink,
  Calendar,
  Building2,
  CheckCircle2,
  AlertCircle,
  Hash,
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../../../components/ui/Card';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Modal from '../../../components/ui/Modal';
import { Badge } from '../../../components/ui/Badge';
import EmptyState from '../../../components/common/EmptyState';
import { certificationSchema } from '../../../schemas/profileSchemas';
import { toast } from 'sonner';

export const CertificationsSection = ({
  certifications = [],
  onAddCertification,
  onUpdateCertification,
  onDeleteCertification,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCert, setEditingCert] = useState(null);
  const [deleteCertId, setDeleteCertId] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(certificationSchema),
    defaultValues: {
      name: '',
      issuingOrganization: '',
      issueDate: '',
      expirationDate: '',
      credentialId: '',
      credentialUrl: '',
    },
  });

  const handleOpenAdd = () => {
    setEditingCert(null);
    reset({
      name: '',
      issuingOrganization: '',
      issueDate: '2025-06-01',
      expirationDate: '2028-06-01',
      credentialId: '',
      credentialUrl: '',
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (cert) => {
    setEditingCert(cert);
    reset({
      name: cert.name,
      issuingOrganization: cert.issuingOrganization,
      issueDate: cert.issueDate,
      expirationDate: cert.expirationDate || '',
      credentialId: cert.credentialId || '',
      credentialUrl: cert.credentialUrl || '',
    });
    setIsModalOpen(true);
  };

  const onSubmit = async (formData) => {
    try {
      setIsSubmitting(true);
      if (editingCert) {
        await onUpdateCertification(editingCert.id, formData);
        toast.success('Certification updated');
      } else {
        await onAddCertification(formData);
        toast.success('Certification added');
      }
      setIsModalOpen(false);
    } catch (err) {
      toast.error(err.message || 'Operation failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  const confirmDelete = async () => {
    if (!deleteCertId) return;
    try {
      setIsSubmitting(true);
      await onDeleteCertification(deleteCertId);
      toast.success('Certification removed');
      setDeleteCertId(null);
    } catch (err) {
      toast.error(err.message || 'Failed to remove certification');
    } finally {
      setIsSubmitting(false);
    }
  };

  const isExpired = (expiryStr) => {
    if (!expiryStr) return false;
    return new Date(expiryStr) < new Date();
  };

  return (
    <Card className="border-slate-200 dark:border-slate-800 shadow-xs">
      <CardHeader className="pb-3 border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="h-8 w-8 rounded-lg bg-emerald-100 dark:bg-emerald-900/40 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
              <ShieldCheck className="h-4 w-4" />
            </div>
            <div>
              <CardTitle className="text-base font-bold text-slate-900 dark:text-slate-100">
                Industry Certifications & Licenses
              </CardTitle>
              <p className="text-xs text-slate-500">
                Authorized credentials from AWS, Google Cloud, Microsoft, Cisco, and accredited vendors.
              </p>
            </div>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={handleOpenAdd}
            leftIcon={<Plus className="h-3.5 w-3.5" />}
          >
            Add Certification
          </Button>
        </div>
      </CardHeader>

      <CardContent className="p-5">
        {certifications.length === 0 ? (
          <EmptyState
            title="No Certifications Added"
            description="Upload industry credentials to validate technical competencies for placement shortlisting."
            action={
              <Button variant="outline" size="sm" onClick={handleOpenAdd}>
                Add Credential
              </Button>
            }
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {certifications.map((cert) => {
              const expired = isExpired(cert.expirationDate);
              return (
                <div
                  key={cert.id}
                  className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 hover:border-emerald-300 dark:hover:border-emerald-700/50 transition-all duration-200 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100 line-clamp-1">
                          {cert.name}
                        </h4>
                        <div className="mt-1 flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-400">
                          <Building2 className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                          <span>{cert.issuingOrganization}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => handleOpenEdit(cert)}
                          className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                          title="Edit certification"
                        >
                          <Edit2 className="h-3.5 w-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => setDeleteCertId(cert.id)}
                          className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                          title="Delete certification"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>

                    <div className="mt-3 flex flex-wrap items-center gap-2 text-xs">
                      {expired ? (
                        <Badge variant="destructive" className="gap-1">
                          <AlertCircle className="h-3 w-3" />
                          Expired
                        </Badge>
                      ) : (
                        <Badge variant="success" className="gap-1">
                          <CheckCircle2 className="h-3 w-3" />
                          Active
                        </Badge>
                      )}

                      <span className="flex items-center gap-1 text-slate-500">
                        <Calendar className="h-3 w-3" />
                        Issued: {cert.issueDate}
                      </span>

                      {cert.expirationDate && (
                        <span className="text-slate-400">
                          &bull; Expires: {cert.expirationDate}
                        </span>
                      )}
                    </div>

                    {cert.credentialId && (
                      <div className="mt-2.5 flex items-center gap-1.5 text-xs text-slate-500 font-mono">
                        <Hash className="h-3 w-3 text-slate-400" />
                        <span className="truncate">ID: {cert.credentialId}</span>
                      </div>
                    )}
                  </div>

                  {cert.credentialUrl && (
                    <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800">
                      <a
                        href={cert.credentialUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-600 dark:text-emerald-400 hover:underline"
                      >
                        <ExternalLink className="h-3.5 w-3.5" />
                        Verify Credential Authenticity
                      </a>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </CardContent>

      {/* Add / Edit Certification Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingCert ? 'Edit Certification' : 'Add Certification Credential'}
        size="md"
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input
            label="Certification Name"
            placeholder="e.g. AWS Certified Solutions Architect – Associate"
            {...register('name')}
            error={errors.name?.message}
            required
          />

          <Input
            label="Issuing Organization"
            placeholder="e.g. Amazon Web Services (AWS), Google Cloud, Meta"
            {...register('issuingOrganization')}
            error={errors.issuingOrganization?.message}
            required
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Issue Date"
              type="date"
              {...register('issueDate')}
              error={errors.issueDate?.message}
              required
            />

            <Input
              label="Expiration Date"
              type="date"
              {...register('expirationDate')}
              error={errors.expirationDate?.message}
            />
          </div>

          <Input
            label="Credential ID / License Number"
            placeholder="e.g. AWS-SAA-8849204 (Optional)"
            {...register('credentialId')}
            error={errors.credentialId?.message}
          />

          <Input
            label="Verification URL"
            placeholder="https://aws.amazon.com/verification/..."
            {...register('credentialUrl')}
            error={errors.credentialUrl?.message}
          />

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
              {editingCert ? 'Save Changes' : 'Add Certification'}
            </Button>
          </div>
        </form>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={Boolean(deleteCertId)}
        onClose={() => setDeleteCertId(null)}
        title="Remove Certification"
        size="sm"
      >
        <div className="space-y-4">
          <p className="text-sm text-slate-600 dark:text-slate-300">
            Are you sure you want to remove this certification? This will update your profile completion status.
          </p>

          <div className="flex justify-end gap-3 pt-3 border-t border-slate-100 dark:border-slate-800">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setDeleteCertId(null)}
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
              Remove Credential
            </Button>
          </div>
        </div>
      </Modal>
    </Card>
  );
};

export default CertificationsSection;
