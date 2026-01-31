import GeneratorForm from "@/components/GeneratorForm";
import ProjectList from "@/components/ProjectList";

export default function DashboardPage() {
  return (
    <main className="space-y-6">
      <section className="rounded-2xl border border-neutral-200 p-6">
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <p className="mt-2 text-neutral-600">
          Create projects and generate prompts + blueprints (saved to your database).
        </p>
      </section>

      <section className="rounded-2xl border border-neutral-200 p-6">
        <h2 className="text-lg font-semibold">New Project</h2>
        <div className="mt-4">
          <GeneratorForm />
        </div>
      </section>

      <section className="rounded-2xl border border-neutral-200 p-6">
        <h2 className="text-lg font-semibold">Your Projects</h2>
        <div className="mt-4">
          <ProjectList />
        </div>
      </section>
    </main>
  );
}
