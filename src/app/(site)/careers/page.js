import CareersHero from "../../../../components/careers/CareersHero";
import CultureManifesto from "../../../../components/careers/CultureManifesto";
import LifeAt from "../../../../components/careers/LifeAt";
import Benefits from "../../../../components/careers/Benefits";
import OpenRoles from "../../../../components/careers/OpenRoles";
import ApplyBar from "../../../../components/careers/ApplyBar";
import { getCareersData } from "../../../../lib/fetchers";

export const revalidate = 60;

export async function generateMetadata() {
  const { careers } = await getCareersData();
  return {
    title: careers?.seo?.seoTitle || "Careers — Epigroww Global",
    description:
      careers?.seo?.seoDescription ||
      "Join a culture that values big ideas over bureaucracy. Remote-first, globally delivered.",
  };
}

export default async function CareersPage() {
  const { careers, roles } = await getCareersData();
  return (
    <>
      <CareersHero data={careers?.hero} rolesCount={roles.length} />
      <CultureManifesto data={careers?.culture} />
      <LifeAt data={careers?.lifeAtEpigroww} />
      <Benefits data={careers?.benefits} />
      <OpenRoles data={careers?.openRolesSection} roles={roles} />
      <ApplyBar data={careers?.applyBar} />
    </>
  );
}
