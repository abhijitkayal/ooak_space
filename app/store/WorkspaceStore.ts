import { create } from "zustand";

export type ViewType =
  | "timeline" | "table" | "board" | "gallery"
  | "todo" | "text" | "heading" | "bullatedlist"
  | "numberlist" | "pagelink"
  | "presentation" | "video" | "whiteboard"
  | "socialmedia" // ✅ new
  | "settings";

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
  templateName?: string;
};

type WorkspaceState = {
  projects: Project[];
  databasesByProject: Record<string, Database[]>;
  activeProjectId: string | null;
  activeDatabaseId: string | null;
  activeDatabaseObject: Database | null;

  fetchProjects: () => Promise<void>;
  fetchDatabases: (projectId: string) => Promise<void>;
  setActiveProject: (projectId: string) => void;
  setActiveDatabase: (dbIdOrObject: string | Database) => void;
  clearActiveDatabase: () => void;
};

export const useWorkspaceStore = create<WorkspaceState>((set, get) => ({
  projects: [],
  databasesByProject: {},
  activeProjectId: null,
  activeDatabaseId: null,
  activeDatabaseObject: null,

  fetchProjects: async () => {
    try {
      const res = await fetch("/api/projects");
      const data = await res.json();
      set({ projects: data });
    } catch (err) { console.error("fetchProjects:", err); }
  },

  fetchDatabases: async (projectId) => {
    try {
      const res = await fetch(`/api/databases?projectId=${projectId}`);
      const data = await res.json();
      set((state) => ({
        databasesByProject: { ...state.databasesByProject, [projectId]: data },
      }));
    } catch (err) { console.error("fetchDatabases:", err); }
  },

  setActiveProject: (projectId) => {
    set({ activeProjectId: projectId, activeDatabaseId: null, activeDatabaseObject: null });
    get().fetchDatabases(projectId);
  },

  setActiveDatabase: (dbIdOrObject) => {
    if (typeof dbIdOrObject === "string") {
      const allDbs = Object.values(get().databasesByProject).flat();
      const found = allDbs.find((db) => db._id === dbIdOrObject) ?? null;
      set({ activeDatabaseId: dbIdOrObject, activeDatabaseObject: found });
    } else {
      set({ activeDatabaseId: dbIdOrObject._id, activeDatabaseObject: dbIdOrObject });
    }
  },

  clearActiveDatabase: () => set({ activeDatabaseId: null, activeDatabaseObject: null }),
}));