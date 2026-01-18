// client/src/types.ts

export interface AnalysisResult {
  match_score: number;
  summary: string;
  missing_skills: string[];
  ats_check: {
    score: number;
    issues: string[];
    summary: string;
  };
  suggested_rewrites: {
    section: string;
    current: string;
    improved: string;
  }[];
  interview_prep: string[];
}