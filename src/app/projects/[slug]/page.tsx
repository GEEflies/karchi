import { notFound } from "next/navigation";
import { getProjectBySlug, getAllProjectSlugs } from "@/data/projects";
import ProjectHero from "@/components/projects/ProjectHero";
import ProjectContent from "@/components/projects/ProjectContent";
import { Metadata } from "next";

// Generate static params for all project slugs
export async function generateStaticParams() {
    const slugs = getAllProjectSlugs();
    return slugs.map((slug) => ({ slug }));
}

// Generate dynamic metadata for SEO
export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}): Promise<Metadata> {
    const { slug } = await params;
    const project = getProjectBySlug(slug);

    if (!project) {
        return {
            title: "Project Not Found",
        };
    }

    return {
        title: `${project.title} - Portfolio`,
        description: project.description,
        openGraph: {
            title: project.title,
            description: project.description,
            images: [project.heroImage],
        },
    };
}

export default async function ProjectPage({
    params
}: {
    params: Promise<{ slug: string }>
}) {
    const { slug } = await params;
    const project = getProjectBySlug(slug);

    if (!project) {
        notFound();
    }

    return (
        <div className="min-h-screen">
            <ProjectHero project={project} />
            <ProjectContent project={project} />
        </div>
    );
}
