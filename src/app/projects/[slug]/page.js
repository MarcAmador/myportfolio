import { notFound } from "next/navigation";
import ProjectDetail from "@/components/ProjectDetail";
import { getProject, projects } from "@/data/projects";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) return {};
  return {
    title: p.title,
    description: p.summary.es,
    openGraph: { title: p.title, description: p.summary.es },
  };
}

export default async function ProjectPage({ params }) {
  const { slug } = await params;
  if (!getProject(slug)) notFound();
  return <ProjectDetail slug={slug} variant="page" />;
}
