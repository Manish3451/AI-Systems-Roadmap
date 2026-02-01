export type ResourceType = 'video' | 'article' | 'leetcode' | 'book' | 'doc' | 'code';
export type Difficulty = 'Easy' | 'Medium' | 'Hard';
export type ModuleStatus = 'locked' | 'available' | 'in-progress' | 'completed';

export interface Resource {
  id: string;
  title: string;
  url: string;
  type: ResourceType;
  moduleId: string;
  estimatedMinutes: number;
  isCompleted: boolean;
  isFavorite: boolean;
  difficulty?: Difficulty;
  pattern?: string;
}

export interface ChecklistItem {
  id: string;
  text: string;
  isCompleted: boolean;
  moduleId: string;
  category: string;
  resourceLinks: string[];
  isCheckpoint?: boolean;
  timeEstimate?: number;
}

export interface Module {
  id: string;
  title: string;
  description: string;
  shortTitle: string;
  status: ModuleStatus;
  isLocked: boolean;
  isCompleted: boolean;
  completionPercentage: number;
  prerequisites: string[];
  checklist: ChecklistItem[];
  resources: Resource[];
  estimatedDays: number;
  targetProblems?: number;
  color: string;
}

export interface DailyActivity {
  date: string;
  itemsCompleted: number;
}

export interface ProgressState {
  modules: Module[];
  dailyActivity: Record<string, number>;
  currentStreak: number;
  lastActiveDate: string | null;
  strictMode: boolean;
  totalTimeInvested: number;
}

// Project Types
export interface ProjectResource {
  title: string;
  url: string;
  type: 'code' | 'article' | 'video' | 'doc';
}

export interface ProjectRationale {
  why: string;      // Why this step is important, business value, motivation
  what: string;     // What needs to be delivered, concrete outcomes
  how: string;      // How to approach it, methodology, key activities
}

export interface ProjectStep {
  id: string;
  title: string;
  description: string;
  moduleRef: string;
  estimatedHours?: number;
  resources?: ProjectResource[];
  codeSnippet?: string;
  validationCriteria: string[];
  isCompleted: boolean;
  isLocked: boolean;
  phase: string;
  // Architecture-first approach fields
  deliverables?: string[];
  thinkingQuestions?: string[];
  // Why-What-How framework
  rationale?: ProjectRationale;
}

export interface ProjectPhase {
  name: string;
  duration: string;
  steps: ProjectStep[];
  focus?: string;
  // Why-What-How framework for the phase
  rationale?: ProjectRationale;
}

export interface ProjectScope {
  problem: string;
  targetUsers: string;
  successMetrics: string[];
  // Detailed Why-What-How for the entire project
  rationale?: ProjectRationale;
}

export interface Project {
  id: 'research-platform' | 'ai-gateway' | 'code-reviewer' | 'universal-multimodal-agent';
  title: string;
  tagline: string;
  difficulty: 'Advanced' | 'Expert';
  industryStandard: string;
  techStack: string[];
  prerequisites: string[];
  phases: ProjectPhase[];
  completionPercentage: number;
  status: 'locked' | 'available' | 'in-progress' | 'completed';
  // Architecture-first approach field
  scope?: ProjectScope;
}

// Multimodal Types
export interface VideoResource {
  id: string;
  title: string;
  youtubeId: string;
  duration: string;
  channel: string;
  type: 'tutorial' | 'paper-explanation' | 'implementation' | 'course';
  watched?: boolean;
  url?: string;
}

export interface ImplementationTask {
  id: string;
  title: string;
  description: string;
  codeTemplate?: string;
  validationSteps: string[];
  estimatedHours: number;
  category: 'vision' | 'audio' | 'voice' | 'integration';
}

export interface MultimodalSubModule {
  id: '4.6' | '4.7' | '4.8' | '4.9';
  title: string;
  category: 'vision' | 'audio' | 'voice' | 'agent' | 'production';
  videoResources: VideoResource[];
  implementationTasks: ImplementationTask[];
}

// Audio Metrics for Project 4
export interface AudioMetrics {
  project4WER: number; // Word Error Rate
  project4Latency: number; // ms
  project4MOS: number; // Mean Opinion Score
}

export interface ProblemTracker {
  problemId: string;
  title: string;
  difficulty: Difficulty;
  pattern: string;
  isCompleted: boolean;
  timeTaken?: number;
  moduleId: string;
}

export interface DSAPattern {
  id: string;
  name: string;
  moduleId: string;
  problems: ProblemTracker[];
  timeBudget: number;
  isCompleted: boolean;
}

export interface GraphNode {
  id: string;
  type: 'module' | 'submodule' | 'checkpoint';
  position: { x: number; y: number };
  data: Record<string, unknown>;
}

export interface GraphEdge {
  id: string;
  source: string;
  target: string;
  animated: boolean;
  style: { stroke: string; strokeWidth: number };
}
