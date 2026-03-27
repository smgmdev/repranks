import { companies } from "@/data/companies";
import { worstCompanies } from "@/data/worst-companies";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import CompanyDetail from "./CompanyDetail";

const allCompanies = [...companies, ...worstCompanies];

export function generateStaticParams() {
  return allCompanies.map((c) => ({ slug: c.slug }));
}

export default async function CompanyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const company = allCompanies.find((c) => c.slug === slug);
  if (!company) notFound();

  return (
    <main className="min-h-screen bg-white">
      <Navbar active="RANKINGS" />
      <CompanyDetail company={company} />
    </main>
  );
}
