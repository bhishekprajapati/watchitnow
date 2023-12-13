import Section from "@/components/Section";
import MediaDisplaySkeleton from "@/app/ui/skeleton/MediaDisplaySkeleton";

export default async function loading() {
  return (
    <>
      <Section className="relative">
        <Section.Header className="sticky flex items-center justify-between">
          <Section.Title>Trending Today</Section.Title>
        </Section.Header>
        <Section.Content>
          <MediaDisplaySkeleton variant="grid" />
        </Section.Content>
      </Section>
    </>
  );
}
