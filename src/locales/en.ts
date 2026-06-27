export const en = {
  translation: {
    common: {
      portfolio: "Portfolio",
      language: "Language",
      languages: {
        en: "EN",
        ru: "RU",
        uz: "UZ",
      },
      theme: {
        switchToDark: "Switch to dark mode",
        switchToLight: "Switch to light mode",
      },
      actions: {
        toggleMobileMenu: "Toggle mobile menu",
        scrollToTop: "Scroll to top",
      },
    },
    nav: {
      home: "Home",
      skills: "Skills",
      about: "About",
      projects: "Projects",
      resume: "Resume",
      contact: "Contact",
    },
    hero: {
      greeting: "Hi, I'm",
      intro:
        "I build modern, responsive, and visually polished web applications using React, TypeScript, and Tailwind CSS, combined with powerful back-end solutions. My goal is to turn ideas into fast, scalable, and user-friendly digital products ready for real-world use.",
      stats: {
        projects: "Projects",
        years: "Years",
      },
      cta: {
        explore: "Explore Projects",
        github: "GitHub",
        resume: "Resume",
      },
      typewriter: [
        "Muslima Radjabova",
        "a Full-Stack Developer",
        "a UI/UX Designer",
        "a Creative Coder",
      ],
    },
    homePanel: {
      title: "Choose a section and switch the content here",
      description:
        "This area now works like a modern content panel. The header stays in place, and each icon opens its own section inside this same space.",
      openSection: "Open section",
    },
    about: {
      title: {
        lead: "Building polished interfaces with",
        accent: "clean front-end systems",
      },
      subtitle:
        "I enjoy turning visual ideas into responsive, reliable, and modern products. My workflow combines design sensitivity with practical engineering decisions.",
      profileLabel: "Personal profile",
      role: "Frontend Developer & UI/UX Designer",
      description:
        "I specialize in creating elegant, functional, and user-centered web experiences. I work confidently across layout systems, component architecture, and visual refinement.",
      highlights: [
        "Responsive landing pages",
        "Component-based React apps",
        "Design-to-code translation",
        "Strong visual hierarchy",
      ],
      availability: "Available for projects",
      tabs: {
        skills: "Skills",
        education: "Education",
      },
      education: {
        year: "2023 - Present",
        degree: "Programming Technology",
        institution: "Asia International University (AIU)",
        description:
          "Bachelor's studies focused on software development, algorithms, systems thinking, and practical engineering fundamentals.",
      },
      skillsCategories: [
        {
          name: "Frontend",
          skills: [
            { label: "React / TypeScript", level: 94 },
            { label: "Tailwind CSS", level: 92 },
            { label: "Next.js", level: 82 },
          ],
        },
        {
          name: "Design",
          skills: [
            { label: "UI/UX Design", level: 88 },
            { label: "Figma", level: 85 },
            { label: "Responsive Layouts", level: 90 },
          ],
        },
        {
          name: "Backend & Tools",
          skills: [
            { label: "Node.js / Express", level: 78 },
            { label: "Firebase", level: 80 },
            { label: "Git / GitHub", level: 90 },
          ],
        },
      ],
      stats: [
        { value: 12, label: "Projects", suffix: "+" },
        { value: 3, label: "Years Exp", suffix: "+" },
        { value: 50, label: "UI Components", suffix: "+" },
        { value: 24, label: "Achievements", suffix: "" },
      ],
      learningNote: "Continuously learning and building with modern technologies",
      toolsLabel: "Tools & Platforms",
      toolsList: "VSCode · Git · Figma · Firebase · Chrome DevTools",
      cta: {
        titleStart: "Let's create something",
        titleAccent: "extraordinary",
        titleEnd: "together",
        description:
          "Currently exploring modern front-end patterns, design systems, and building production-ready user interfaces.",
        button: "Open to opportunities",
      },
    },
    skillsCarousel: {
      eyebrow: "Core Stack",
      title: "Skills that keep my workflow moving",
      description:
        "A rotating snapshot of the tools and technologies I use most often in production work.",
      level: "Level",
      mastery: "Mastery",
      readiness: "Project readiness",
      badge: "Expertise"
    },
    projects: {
      title: {
        lead: "Featured work with",
        accent: "strong visuals and usable structure",
      },
      subtitle:
        "Frontend showcase projects and dynamic app projects are grouped below. Local showcase cards open dedicated detail pages with all screenshots.",
      withoutBackend: {
        badge: "Without backend",
        title: "Static and showcase projects",
        description: "Carefully crafted frontend interfaces — pure design, no backend dependencies.",
      },
      withBackend: {
        badge: "With backend",
        title: "Full-stack projects with live data",
        description: "Full-stack applications powered by real databases, authentication, and server logic.",
      },
      panel: {
        withLabel: "Backend Projects",
        withoutLabel: "Frontend Projects",
        withBadge: "Featured first",
        withoutBadge: "Showcase",
      },
      actions: {
        openPage: "Open page",
        sourceCode: "Source Code",
        liveDemo: "Live Demo",
        showDescription: "View details",
        hideDescription: "Hide details",
      },
      states: {
        loading: "Loading projects...",
        empty: "No backend projects found yet.",
        errors: {
          fetchFailed: "Failed to fetch projects.",
          connectFailed: "Could not connect to Firestore.",
        },
      },
      localItems: {
        "floral-elegance": {
          title: "Floral Elegance",
          shortDescription: "An elegant flower shop landing page with premium visual direction.",
          description:
            "A refined flower shop concept built around strong product presentation, rich visuals, and a polished responsive layout.",
          stats: "14 screenshots",
          category: "Frontend UI",
          features: [
            "Responsive landing sections",
            "Brand-driven hero layout",
            "Product showcase blocks",
            "UI based on Figma",
          ],
          note:
            "This project used a mock backend powered by JSON Server for local data management. Because it depends on a local development setup, it was not deployed as a live hosted application.",
        },
        "culinary-master": {
          title: "Culinary Master",
          shortDescription: "A meal and recipe interface designed for clear hierarchy and conversion.",
          description:
            "A warm and bold food interface focused on recipe discovery, section hierarchy, and clear call-to-action placement.",
          stats: "7 screenshots",
          category: "Food UI",
          features: [
            "Recipe-first layout",
            "Category navigation",
            "Warm branded palette",
            "Responsive marketing sections",
          ],
          note:
            "This project used a mock backend powered by JSON Server for local data management. Because it depends on a local development setup, it was not deployed as a live hosted application.",
        },
        "frozen-delights": {
          title: "Frozen Delights",
          shortDescription: "A playful dessert brand interface with soft gradients and product imagery.",
          description:
            "A bright and playful website concept for an ice cream brand, using soft color transitions, strong product framing, and high-impact visuals.",
          stats: "11 screenshots",
          category: "Brand UI",
          features: [
            "Soft pastel art direction",
            "Product storytelling",
            "Animated presentation blocks",
            "Responsive showcase design",
          ],
          note:
            "This project used a mock backend powered by JSON Server for local data management. Because it depends on a local development setup, it was not deployed as a live hosted application.",
        },
      },
      details: {
        backToHome: "Back to home",
        screenshot: "Screenshot",
        thumbnail: "Thumbnail",
        keyFeatures: "Key features",
        note: "Note",
      },
    },
    contact: {
      title: "Let’s build something elegant together",
      role: "Frontend Developer",
      description:
        "Frontend Developer & UI/UX Designer focused on creating thoughtful and functional digital experiences.",
      primaryCta: "Start a conversation",
      secondaryCta: "View GitHub",
      navigationTitle: "Jump through the portfolio",
      socialTitle: "Find me on these platforms",
      socialHandles: {
        linkedin: "Professional profile",
        telegram: "Quick chat",
        gmail: "Direct email",
      },
      emailNote: "Best for project requests, collabs, and direct communication.",
      locationNote: "Based in Bukhara and open to remote opportunities.",
      builtWith: "Built with",
      builtWithStack: "React / TypeScript / Tailwind CSS",
      quickLinks: "Quick Links",
      getInTouch: "Get In Touch",
      workTogether: "Let's Work Together",
      workTogetherText: "Have a project in mind? Let's discuss it.",
      email: "Email",
      location: "Location",
      locationValue: "Bukhara, Uzbekistan",
      form: {
        title: "Send an email",
        description: "Fill out the form and your message will be delivered straight to my inbox.",
        fields: {
          name: "Your name",
          email: "Your email",
          subject: "Subject",
          message: "Message",
        },
        placeholders: {
          name: "Enter your name",
          email: "you@example.com",
          subject: "Project or collaboration topic",
          message: "Write the details here...",
        },
        verification: {
          badge: "Google Verify",
          title: "Verify your email with Google",
          description: "To send a message, sign in with your Google account and confirm your real email address.",
          statusLabel: "Verified email",
          verifiedHint: "Reply messages will be sent back to this address.",
          actionButton: "Verify with Google",
          loadingButton: "Checking Google...",
          changeButton: "Use another Google account",
          toasts: {
            missingEmail: "Google email was not found. Please try again.",
            success: "Google email verified: {{email}}",
            verifyError: "Could not verify with Google. Please try again.",
            disconnectError: "Could not disconnect the Google account.",
            required: "Please verify with your Google email first.",
          },
        },
        submit: "Send message",
        sending: "Sending...",
        toasts: {
          required: "Please fill out all fields.",
          invalidEmail: "The email address format is invalid.",
          emailNotRegistered: "Only registered email addresses can send a message.",
          success: "Your message has been sent successfully.",
          configError: "EmailJS settings are missing. Fill in the .env file.",
          error: "Failed to send the message. Please try again later.",
        },
      },
      footer: "© 2025 Muslima Radjabova. Made with",
      footerAnd: "and",
      scrollTop: "Scroll to top",
    },
    resume: {
      eyebrow: "Resume",
      title: "Professional Resume",
      description:
        "Choose the version you need, preview it on the page, and download it in Word, PDF, or image format.",
      previewLabel: "Preview panel",
      cardDescription:
        "This section keeps the resume inside the one-page flow while still giving fast downloads in multiple formats.",
      backToHome: "Back to home",
      downloadWord: "Download Word",
      downloadPdf: "Download PDF",
      downloadImage: "Download image",
      downloadPreparing: "Preparing...",
      languages: {
        en: "English Resume",
        ru: "Russian Resume",
        uz: "Uzbek Resume",
      },
    },
    notFound: {
      orbitLabel: "Lost in navigation",
      badge: "Page Not Found",
      title: "This page doesn't exist",
      description:
        "The link you followed may be broken, or the page may have been removed.",
      back: "Go Back",
      home: "Home",
      projects: "Projects",
    },
    auth: {
      login: {
        title: "Welcome back",
        subtitle: "Sign in with your admin account to open the portfolio dashboard.",
        email: "Email Address",
        password: "Password",
        passwordPlaceholder: "Password",
        emailPlaceholder: "your@email.com",
        submit: "Sign In",
        loading: "Signing in...",
        noAccount: "Don't have an account?",
        createOne: "Create one",
        toasts: {
          roleNotFound: "User role was not found.",
          userNotFound: "Account not found. Please sign up first.",
          wrongCredentials: "Incorrect email or password. Please try again.",
          invalidEmail: "The email address format is invalid.",
          tooManyRequests: "Too many attempts. Please try again later.",
          failed: "Sign-in failed. Please try again.",
          unknown: "An unknown error occurred.",
        },
      },
      register: {
        title: "Create account",
        subtitle: "Register to access the portfolio project panel",
        fullName: "Full Name",
        email: "Email Address",
        password: "Password",
        confirmPassword: "Confirm Password",
        submit: "Create account",
        loading: "Creating...",
        hasAccount: "Already have an account?",
        signIn: "Sign in",
        validation: {
          nameRequired: "Name is required",
          emailRequired: "Email is required",
          passwordRequired: "Password is required",
          confirmRequired: "Confirm password is required",
          passwordsMismatch: "Passwords do not match.",
        },
        toasts: {
          success: "Registration successful!",
          emailInUse: "This email is already registered.",
          invalidEmail: "Invalid email address.",
          weakPassword: "Password must be at least 6 characters.",
          failed: "Registration failed. Please try again.",
          unknown: "An unknown error occurred. Please try again.",
        },
      },
    },
  },
} as const;
