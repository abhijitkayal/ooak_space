import { create } from "zustand";

export type ViewType = "timeline" | "table" | "board" | "gallery";

export type Project = {
  _id: string;
  name: string;
  emoji: string;
};

export type Database = {
  _id: string;
  projectId: string;
  name: string;
  icon: string;
  viewType: ViewType;
};

type WorkspaceState = {
  projects: Project[];
  databasesByProject: Record<string, Database[]>;
  activeProjectId: string | null;
  activeDatabaseId: string | null;

  fetchProjects: () => Promise<void>;
  fetchDatabases: (projectId: string) => Promise<void>;

  setActiveProject: (projectId: string) => void;
  setActiveDatabase: (dbId: string) => void;
};

export const useWorkspaceStore = create<WorkspaceState>((set, get) => ({
  projects: [],
  databasesByProject: {},
  activeProjectId: null,
  activeDatabaseId: null,

  fetchProjects: async () => {
    const res = await fetch("/api/projects");
    const data = await res.json();
    set({ projects: data });
  },

  fetchDatabases: async (projectId) => {
    const res = await fetch(`/api/databases?projectId=${projectId}`);
    const data = await res.json();

    set((state) => ({
      databasesByProject: {
        ...state.databasesByProject,
        [projectId]: data,
      },
    }));
  },

  setActiveProject: (projectId) => {
    set({ activeProjectId: projectId, activeDatabaseId: null });
    get().fetchDatabases(projectId);
  },

  setActiveDatabase: (dbId) => set({ activeDatabaseId: dbId }),
}));
