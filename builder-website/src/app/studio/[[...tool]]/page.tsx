import { NextStudio } from "next-sanity/studio";
import config from "../../../../sanity.config";
import { isSanityConfigured } from "@/sanity/env";

export { metadata, viewport } from "next-sanity/studio";

export default function StudioPage() {
  if (!isSanityConfigured) {
    return (
      <main className="grid min-h-screen place-items-center bg-[#f5f1e8] px-6 text-[#20211f]">
        <div className="max-w-xl border border-[#d7d0c2] bg-white p-8 sm:p-12">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-[#8a6b43]">
            Sanity Studio
          </p>
          <h1 className="font-serif text-4xl">Connect your Sanity project</h1>
          <p className="mt-5 leading-7 text-[#686a63]">
            Add the public project ID, dataset and API version from
            <code className="mx-1 bg-[#f5f1e8] px-1.5 py-0.5">.env.local.example</code>
            to a local <code className="bg-[#f5f1e8] px-1.5 py-0.5">.env.local</code>
            file, then restart the development server.
          </p>
        </div>
      </main>
    );
  }

  return <NextStudio config={config} />;
}
