import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProfile, isLocale, locales } from "@/lib/site";

type LocaleLayoutProps = Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  if (!isLocale(locale)) {
    return {};
  }

  const profile = getProfile(locale);

  return {
    title: profile.name,
    description: profile.tagline,
    openGraph: {
      title: profile.name,
      description: profile.tagline,
      type: "website",
    },
    twitter: {
      card: "summary",
      title: profile.name,
      description: profile.tagline,
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  return children;
}
