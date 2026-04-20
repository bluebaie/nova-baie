import Image from "next/image";

type Project = {
  title: string;
  category: string;
  description: string;
  image: string;
  tags: string[];
};

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="card-premium overflow-hidden">
      <div className="relative h-64 w-full bg-nova-horizon">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover"
        />
      </div>

      <div className="p-8">
        <p className="text-xs uppercase tracking-[0.16em] text-nova-text">
          {project.category}
        </p>
        <h3 className="mt-3">{project.title}</h3>
        <p className="mt-4">{project.description}</p>

        <div className="mt-6 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-nova-horizon px-3 py-1 text-xs font-medium text-nova-navy"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}