import { SampleAddressCard } from "@/components/lookup/SampleAddressCard";
import { DisclaimerNote } from "@/components/site/DisclaimerNote";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { SAMPLE_REPORTS } from "@/lib/demo-data";

export default function NotFound() {
  return (
    <section className="bg-canvas py-16 sm:py-20">
      <Container width="lg">
        <div className="max-w-2xl">
          <Eyebrow>404</Eyebrow>
          <h1 className="mt-2 font-serif text-[2.25rem] leading-tight tracking-tight text-ink sm:text-[2.75rem]">
            No report at that address
          </h1>
          <p className="mt-3 text-[1.0625rem] leading-relaxed text-ink-soft">
            Demo mode only carries the sample properties below. Pick one to see a complete report, or
            start over from the lookup page.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <ButtonLink href="/lookup">Go to address lookup</ButtonLink>
            <ButtonLink href="/" variant="secondary">
              Back to home
            </ButtonLink>
          </div>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {SAMPLE_REPORTS.map((report) => (
            <SampleAddressCard key={report.slug} report={report} compact />
          ))}
        </div>

        <DisclaimerNote className="mt-8" />
      </Container>
    </section>
  );
}
