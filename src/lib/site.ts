import profileEn from "../../content/profile.en.json";
import profileUk from "../../content/profile.uk.json";

export const locales = ["en", "uk"] as const;

export type Locale = (typeof locales)[number];

export type ProfileLinkSet = {
  email?: string;
  github?: string;
  linkedin?: string;
  cv?: string;
};

export type ProjectLinkSet = {
  github?: string;
  demo?: string;
  writeup?: string;
};

export type Project = {
  title?: string;
  description?: string;
  tags?: string[];
  links?: ProjectLinkSet;
  highlights?: string[];
};

export type ExperienceItem = {
  role?: string;
  org?: string;
  dates?: string;
  bullets?: string[];
  tags?: string[];
};

export type CapabilityItem = {
  title?: string;
  description?: string;
  skills?: string[];
};

export type ProfileData = {
  name?: string;
  tagline?: string;
  about?: string;
  focus?: string[];
  capabilities?: CapabilityItem[];
  location?: string;
  availability?: string;
  availabilityNote?: string;
  links?: ProfileLinkSet;
  projects?: Project[];
  experience?: ExperienceItem[];
};

export type SiteMessages = {
  nav: {
    home: string;
    capabilities: string;
    projects: string;
    experience: string;
    contact: string;
  };
  hero: {
    scroll: string;
  };
  sections: {
    capabilities: string;
    projects: string;
    experience: string;
    contact: string;
    availabilityHeading: string;
    location: string;
    availability: string;
  };
  links: {
    github: string;
    demo: string;
    writeup: string;
    linkedin: string;
  };
  languageSwitcher: {
    label: string;
    english: string;
    ukrainian: string;
    switchToEnglish: string;
    switchToUkrainian: string;
  };
};

const profiles: Record<Locale, ProfileData> = {
  en: profileEn,
  uk: profileUk,
};

const messages: Record<Locale, SiteMessages> = {
  en: {
    nav: {
      home: "Home",
      capabilities: "Capabilities",
      projects: "Projects",
      experience: "Experience",
      contact: "Contact",
    },
    hero: {
      scroll: "Scroll",
    },
    sections: {
      capabilities: "Capabilities",
      projects: "Projects",
      experience: "Experience",
      contact: "Contact.",
      availabilityHeading: "Availability",
      location: "Location",
      availability: "Availability",
    },
    links: {
      github: "GitHub",
      demo: "Demo",
      writeup: "Writeup",
      linkedin: "LinkedIn",
    },
    languageSwitcher: {
      label: "Switch language",
      english: "EN",
      ukrainian: "УКР",
      switchToEnglish: "Switch site to English",
      switchToUkrainian: "Switch site to Ukrainian",
    },
  },
  uk: {
    nav: {
      home: "Головна",
      capabilities: "Можливості",
      projects: "Проєкти",
      experience: "Досвід",
      contact: "Контакти",
    },
    hero: {
      scroll: "Гортай",
    },
    sections: {
      capabilities: "Можливості",
      projects: "Проєкти",
      experience: "Досвід",
      contact: "Контакти.",
      availabilityHeading: "Доступність",
      location: "Локація",
      availability: "Доступність",
    },
    links: {
      github: "GitHub",
      demo: "Демо",
      writeup: "Опис",
      linkedin: "LinkedIn",
    },
    languageSwitcher: {
      label: "Змінити мову",
      english: "EN",
      ukrainian: "УКР",
      switchToEnglish: "Перемкнути сайт на англійську",
      switchToUkrainian: "Перемкнути сайт на українську",
    },
  },
};

export const sectionIds = [
  "home",
  "capabilities",
  "projects",
  "experience",
  "contact",
] as const;

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export function getProfile(locale: Locale): ProfileData {
  return profiles[locale];
}

export function getMessages(locale: Locale): SiteMessages {
  return messages[locale];
}

export function replaceLocaleInPathname(pathname: string, locale: Locale) {
  const segments = pathname.split("/").filter(Boolean);

  if (segments.length > 0 && isLocale(segments[0])) {
    segments[0] = locale;
    return `/${segments.join("/")}`;
  }

  return `/${locale}${pathname === "/" ? "" : pathname}`;
}
