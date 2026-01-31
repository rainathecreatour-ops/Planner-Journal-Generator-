import RedeemForm from "@/components/RedeemForm";

export default function HomePage() {
  return (
    <main className="space-y-6">
      <section className="rounded-2xl border border-neutral-200 p-6">
        <h1 className="text-2xl font-semibold">Enter Access Code</h1>
        <p className="mt-2 text-neutral-600">
          Paste the access code you received after purchase to unlock the generator.
        </p>
        <div className="mt-4">
          <RedeemForm />
        </div>
      </section>

      <section className="rounded-2xl border border-neutral-200 p-6">
        <h2 className="text-lg font-semibold">How you’ll use this with Gumroad</h2>
        <ol className="mt-2 list-decimal space-y-1 pl-5 text-neutral-700">
          <li>Create an access code (admin endpoint) for the buyer</li>
          <li>Paste the code into Gumroad’s post-purchase message / receipt</li>
          <li>Buyer enters code here → gets dashboard access</li>
        </ol>
      </section>
    </main>
  );
}
