import CareersHero from "../../../../components/careers/CareersHero";
import CultureManifesto from "../../../../components/careers/CultureManifesto";
import LifeAt from "../../../../components/careers/LifeAt";
import Benefits from "../../../../components/careers/Benefits";
import OpenRoles from "../../../../components/careers/OpenRoles";
import ApplyBar from "../../../../components/careers/ApplyBar";

export const metadata = {
  title: "Careers — Epigroww Global",
  description: "Join a culture that values big ideas over bureaucracy. Remote-first, globally delivered, empire-built — not ladder-climbed.",
};

export default function CareersPage() {
  return (
    <>
      <CareersHero />
      <CultureManifesto />
      <LifeAt />
      <Benefits />
      <OpenRoles />
      <ApplyBar />
    </>
  );
}
