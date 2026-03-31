import resumeEn from "../assets/resume/resume_en.png";
import resumeRu from "../assets/resume/resume_ru.png";
import resumeUz from "../assets/resume/resume_uz.png";

export const resumeAssets = {
  en: {
    image: resumeEn,
    fileBaseName: "muslima-radjabova-resume-en",
  },
  ru: {
    image: resumeRu,
    fileBaseName: "muslima-radjabova-resume-ru",
  },
  uz: {
    image: resumeUz,
    fileBaseName: "muslima-radjabova-resume-uz",
  },
} as const;

export type ResumeLanguage = keyof typeof resumeAssets;
