export interface SiteConfig {
  name: string;
  role: string;
  subRole: string;
  tagline: string;
  bio: string;
  careerObjective: string;
  college: string;
  degree: string;
  graduationYear: string;
  status: string;
  email: string;
  phone?: string;
  github: string;
  linkedin: string;
  resumeUrl: string;
  location: string;
  avatarUrl: string;
}

export const siteConfig: SiteConfig = {
  name: "Rehan Sheikh",
  role: "Full-Stack Developer",
  subRole: "Java DSA Engineer · Full-Stack Developer · Business Content Creator",
  tagline: "Think at Scale. Iterate Daily. Execute Relentlessly.",
  bio: "Full-Stack Developer, Java DSA practitioner, and Business Content Creator at YCCE (2024–2028). I build scalable web applications and create high-impact tech & business content.",
  careerObjective: "Full-Stack Developer, Java DSA Engineer & Business Content Creator turning ambitious ideas into scalable products through high-velocity execution.",
  college: "Yeshwantrao Chavan College of Engineering (YCCE)",
  degree: "B.Tech Computer Technology",
  graduationYear: "2024 - 2028",
  status: "Currently building & learning",
  email: "rehansheikh9422@gmail.com",
  phone: "+91 8468853407",
  github: "https://github.com/RehanSheikh94",
  linkedin: "https://linkedin.com/in/rehansheikh",
  resumeUrl: "/resume.pdf",
  location: "Nagpur, India",
  avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80",
};
