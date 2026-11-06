export const AUTH_FEATURE_NAME = 'auth';
export const AUTH_FEATURE_VERSION = '2.0.0';

export {
  loginSchema,
  registerSchema,
  studentRegisterSchema,
  recruiterRegisterSchema,
  tpoRegisterSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
} from '../../schemas/authSchemas';

export { default as PasswordInput } from './components/PasswordInput';
export { default as PasswordStrengthMeter, evaluatePasswordStrength } from './components/PasswordStrengthMeter';
export { default as PasswordRequirements } from './components/PasswordRequirements';
