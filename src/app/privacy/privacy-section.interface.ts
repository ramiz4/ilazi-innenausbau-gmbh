import { PrivacySubsection } from './privacy-subsection-interface';

export interface PrivacySection {
  title: string;
  subtitle?: string;
  content: string[];
  subsections?: PrivacySubsection[];
}
