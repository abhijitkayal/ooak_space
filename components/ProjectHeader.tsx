interface Project {
  emoji: string;
  name: string;
}

export default function ProjectHeader({ project }: { project: Project }) {
  return (
    <div className="flex items-center gap-4">
      <div className="text-5xl">{project.emoji}</div>
      <div>
        <h1 className="text-3xl font-extrabold">{project.name}</h1>
        <p className="text-sm text-gray-500 mt-1">
          Notion-style project workspace
        </p>
      </div>
    </div>
  );
}
