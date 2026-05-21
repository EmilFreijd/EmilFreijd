export const defaultLang = 'en' as const;
export type Lang = 'en' | 'sv';

export const ui = {
  en: {
    // Nav
    'nav.about':   'About',
    'nav.work':    'Work',
    'nav.contact': 'Contact',
    'lang.label':  'Svenska',

    // Hero
    'hero.badge':         'Building a professional presence',
    'hero.title':         'Senior IT Program Manager',
    'hero.subtitle':      'Delivering complex technology programs in high-trust environments — bridging leadership, structured delivery, and strategic impact.',
    'hero.cta.primary':   'Connect on LinkedIn',
    'hero.cta.secondary': 'View My Work',

    // About teaser (home)
    'about.label':             'About',
    'about.heading':           'Turning complexity into delivery.',
    'about.body':              'Senior IT professional with a track record of leading cross-functional teams and managing large-scale programs across public sector and enterprise environments. I operate at the intersection of strategy and execution — where clear thinking, decisive leadership, and structured delivery matter most.',
    'about.link':              'Full background →',
    'about.stat.years':        'Years in IT',
    'about.stat.projects':     'Projects Delivered',
    'about.stat.stakeholders': 'Stakeholders Managed',
    'about.stat.countries':    'Countries Operated In',

    // Expertise
    'expertise.label':          'Expertise',
    'expertise.heading':        'What I bring to the table',
    'expertise.l.title':        'Leadership & Teams',
    'expertise.l.desc':         'Building and leading high-performing IT teams. Fostering collaboration, driving accountability, and growing people alongside delivery.',
    'expertise.l.1':            'Team building & mentoring',
    'expertise.l.2':            'Cross-functional alignment',
    'expertise.l.3':            'Stakeholder communication',
    'expertise.d.title':        'Program Delivery',
    'expertise.d.desc':         'End-to-end ownership of complex technology programs — from initiation through go-live. On time, on budget, on scope.',
    'expertise.d.1':            'Program & portfolio management',
    'expertise.d.2':            'Risk & issue management',
    'expertise.d.3':            'Agile & waterfall delivery',
    'expertise.s.title':        'Strategic Impact',
    'expertise.s.desc':         'Translating business goals into technology strategy. Quantifying outcomes, reducing costs, and enabling organisational growth.',
    'expertise.s.1':            'Digital transformation',
    'expertise.s.2':            'IT strategy & roadmapping',
    'expertise.s.3':            'Business case development',

    // Work teaser (home)
    'work.label':     'Work',
    'work.heading':   'Selected case studies',
    'work.desc':      "Deep dives into programs I've led — challenge, approach, and measurable outcome.",
    'work.read':      'Read case study →',
    'work.viewAll':   'View all work →',
    'work.empty':     'Case studies coming soon.',
    'work.empty.sub': 'Writing up 2–3 flagship programs. Check back shortly.',

    // CTA strip (home)
    'cta.heading': "Let's connect.",
    'cta.desc':    'Open to conversations about senior IT leadership, program delivery, and advisory opportunities.',
    'cta.primary': 'LinkedIn',
    'cta.ghost':   'Get in touch',

    // About page
    'about.page.label':    'About',
    'about.page.heading':  'Background & approach.',
    'about.page.intro':    'Senior IT professional operating at the intersection of technology leadership and structured delivery — with experience across public sector and enterprise environments.',
    'about.story.label':   'The full story',
    'about.story.heading': 'Who I am.',
    'about.cta':           'Get in touch →',
    'about.cv.note':       'CV available on request —',
    'about.cv.link':       'get in touch',
    'about.cv.download':   '↓ Download CV',
    'about.career.label':  'Career',
    'about.career.heading':'Work history.',
    'about.skills.label':  'Skills',
    'about.skills.heading':'Areas of expertise.',
    'about.certs.label':   'Credentials',
    'about.certs.heading': 'Certifications.',

    // Work index
    'work.index.label':   'Work',
    'work.index.heading': 'Case studies.',
    'work.index.desc':    "A selection of programs I've led — written up with the context, approach, and measurable outcomes. No vanity metrics, no vague language.",
    'work.list.empty':    'Case studies coming soon.',
    'work.list.empty.sub':"Writing up 2–3 flagship programs. Each covers the challenge, approach, and measurable outcomes.",
    'work.list.empty.cta':'Get in touch in the meantime →',

    // Case study
    'case.back':         '← All case studies',
    'case.glance':       'At a glance',
    'case.cta.heading':  'Want to work together?',
    'case.cta.desc':     "If this kind of work is relevant to what you're building, let's talk.",

    // Contact page
    'contact.label':          'Contact',
    'contact.heading':        "Let's connect.",
    'contact.desc':           'Open to conversations about IT leadership, program delivery, advisory opportunities, and interesting problems in the industry.',
    'contact.form.heading':   'Send a message',
    'contact.form.sub':       "I'll respond within a couple of days.",
    'contact.form.name':      'Name',
    'contact.form.name.ph':   'Your name',
    'contact.form.email':     'Email',
    'contact.form.email.ph':  'your@email.com',
    'contact.form.subject':   'Subject',
    'contact.form.subject.ph':"What's this about?",
    'contact.form.message':   'Message',
    'contact.form.message.ph':"Tell me what's on your mind...",
    'contact.form.submit':    'Send message',
    'contact.form.sending':   'Sending…',
    'contact.form.success':   "✓ Message sent — I'll be in touch shortly.",
    'contact.li.heading':     'LinkedIn',
    'contact.li.desc':        'Best for professional introductions and networking.',
    'contact.li.link':        'Connect on LinkedIn →',
    'contact.cal.heading':    'Book a call',
    'contact.cal.desc':       "If you'd prefer to talk, book a 30-minute intro slot directly.",
    'contact.cal.link':       'Book via Cal.com →',
    'contact.note.label':     'A note on confidentiality:',
    'contact.note.body':      'Given the industries I operate in, I treat all conversations with discretion. If your enquiry is sensitive, feel free to keep initial details brief.',

    // Footer
    'footer.about':   'About',
    'footer.work':    'Work',
    'footer.contact': 'Contact',

    // 404
    '404.label':   '404',
    '404.heading': 'Page not found.',
    '404.body':    "The page you're looking for doesn't exist or has been moved.",
    '404.home':    'Back to home',
    '404.contact': 'Get in touch',

    // Hero scroll indicator
    'hero.scroll': 'Scroll',
  },

  sv: {
    // Nav
    'nav.about':   'Om mig',
    'nav.work':    'Projekt',
    'nav.contact': 'Kontakt',
    'lang.label':  'English',

    // Hero
    'hero.badge':         'Bygger en professionell närvaro',
    'hero.title':         'Senior IT-programledare',
    'hero.subtitle':      'Levererar komplexa teknikprogram i miljöer med höga krav på förtroende — med fokus på ledarskap, strukturerad leverans och strategisk påverkan.',
    'hero.cta.primary':   'Anslut på LinkedIn',
    'hero.cta.secondary': 'Se mina projekt',

    // About teaser (home)
    'about.label':             'Om mig',
    'about.heading':           'Förvandlar komplexitet till leverans.',
    'about.body':              'Senior IT-proffs med dokumenterad erfarenhet av att leda tvärfunktionella team och hantera storskaliga program inom offentlig sektor och näringsliv. Jag verkar i skärningspunkten mellan strategi och genomförande — där tydligt tänkande, beslutsamt ledarskap och strukturerad leverans spelar störst roll.',
    'about.link':              'Full bakgrund →',
    'about.stat.years':        'År inom IT',
    'about.stat.projects':     'Levererade projekt',
    'about.stat.stakeholders': 'Hanterade intressenter',
    'about.stat.countries':    'Länder',

    // Expertise
    'expertise.label':    'Kompetens',
    'expertise.heading':  'Vad jag bidrar med',
    'expertise.l.title':  'Ledarskap & team',
    'expertise.l.desc':   'Bygger och leder högpresterande IT-team. Främjar samarbete, driver ansvarsskyldighet och utvecklar människor parallellt med leveransen.',
    'expertise.l.1':      'Teamutveckling & mentorskap',
    'expertise.l.2':      'Tvärfunktionell samordning',
    'expertise.l.3':      'Intressentkommunikation',
    'expertise.d.title':  'Programleverans',
    'expertise.d.desc':   'Helhetsansvar för komplexa teknikprogram — från initiering till driftsättning. I tid, inom budget och enligt scope.',
    'expertise.d.1':      'Program- och portföljstyrning',
    'expertise.d.2':      'Risk- och problemhantering',
    'expertise.d.3':      'Agil & traditionell leverans',
    'expertise.s.title':  'Strategisk påverkan',
    'expertise.s.desc':   'Omvandlar affärsmål till teknikstrategi. Kvantifierar resultat, reducerar kostnader och möjliggör organisatorisk tillväxt.',
    'expertise.s.1':      'Digital transformation',
    'expertise.s.2':      'IT-strategi & färdplaner',
    'expertise.s.3':      'Affärsfallsutveckling',

    // Work teaser (home)
    'work.label':     'Projekt',
    'work.heading':   'Utvalda fallstudier',
    'work.desc':      'Fördjupade genomgångar av program jag lett — utmaning, tillvägagångssätt och mätbart resultat.',
    'work.read':      'Läs fallstudie →',
    'work.viewAll':   'Se alla projekt →',
    'work.empty':     'Fallstudier kommer snart.',
    'work.empty.sub': 'Skriver ihop 2–3 flaggskeppsprojekt. Kom tillbaka snart.',

    // CTA strip (home)
    'cta.heading': 'Låt oss koppla upp.',
    'cta.desc':    'Öppen för samtal om senior IT-ledarskap, programleverans och rådgivningsuppdrag.',
    'cta.primary': 'LinkedIn',
    'cta.ghost':   'Kontakta mig',

    // About page
    'about.page.label':    'Om mig',
    'about.page.heading':  'Bakgrund & approach.',
    'about.page.intro':    'Senior IT-proffs i skärningspunkten mellan teknikledarskap och strukturerad leverans — med erfarenhet från offentlig sektor och företagsmiljöer.',
    'about.story.label':   'Den fullständiga berättelsen',
    'about.story.heading': 'Vem jag är.',
    'about.cta':           'Kontakta mig →',
    'about.cv.note':       'CV tillgängligt på förfrågan —',
    'about.cv.link':       'kontakta mig',
    'about.cv.download':   '↓ Ladda ner CV',
    'about.career.label':  'Karriär',
    'about.career.heading':'Arbetshistorik.',
    'about.skills.label':  'Färdigheter',
    'about.skills.heading':'Kompetensområden.',
    'about.certs.label':   'Meriter',
    'about.certs.heading': 'Certifieringar.',

    // Work index
    'work.index.label':    'Projekt',
    'work.index.heading':  'Fallstudier.',
    'work.index.desc':     'Ett urval av program jag lett — med kontext, tillvägagångssätt och mätbara resultat. Inga tomma ord, inga fina siffror utan sammanhang.',
    'work.list.empty':     'Fallstudier kommer snart.',
    'work.list.empty.sub': 'Skriver ihop 2–3 flaggskeppsprojekt. Varje studie täcker utmaning, tillvägagångssätt och resultat.',
    'work.list.empty.cta': 'Kontakta mig under tiden →',

    // Case study
    'case.back':        '← Alla fallstudier',
    'case.glance':      'I korthet',
    'case.cta.heading': 'Vill du samarbeta?',
    'case.cta.desc':    'Om det här arbetet är relevant för vad du bygger, låt oss prata.',

    // Contact page
    'contact.label':          'Kontakt',
    'contact.heading':        'Låt oss koppla upp.',
    'contact.desc':           'Öppen för samtal om IT-ledarskap, programleverans, rådgivningsuppdrag och intressanta problem i branschen.',
    'contact.form.heading':   'Skicka ett meddelande',
    'contact.form.sub':       'Jag svarar inom ett par dagar.',
    'contact.form.name':      'Namn',
    'contact.form.name.ph':   'Ditt namn',
    'contact.form.email':     'E-post',
    'contact.form.email.ph':  'din@epost.se',
    'contact.form.subject':   'Ämne',
    'contact.form.subject.ph':'Vad gäller det?',
    'contact.form.message':   'Meddelande',
    'contact.form.message.ph':'Berätta vad du har på hjärtat...',
    'contact.form.submit':    'Skicka meddelande',
    'contact.form.sending':   'Skickar…',
    'contact.form.success':   '✓ Meddelande skickat — jag hör av mig snart.',
    'contact.li.heading':     'LinkedIn',
    'contact.li.desc':        'Bäst för professionella presentationer och nätverkande.',
    'contact.li.link':        'Anslut på LinkedIn →',
    'contact.cal.heading':    'Boka ett samtal',
    'contact.cal.desc':       'Om du föredrar att prata, boka en 30-minuters intro direkt.',
    'contact.cal.link':       'Boka via Cal.com →',
    'contact.note.label':     'En not om konfidentialitet:',
    'contact.note.body':      'Givet de branscher jag verkar i behandlar jag alla samtal med diskretion. Om din förfrågan är känslig, känns det bra att hålla de initiala uppgifterna kortfattade.',

    // Footer
    'footer.about':   'Om mig',
    'footer.work':    'Projekt',
    'footer.contact': 'Kontakt',

    // 404
    '404.label':   '404',
    '404.heading': 'Sidan hittades inte.',
    '404.body':    'Sidan du letar efter finns inte eller har flyttats.',
    '404.home':    'Till startsidan',
    '404.contact': 'Kontakta mig',

    // Hero scroll indicator
    'hero.scroll': 'Scrolla',
  },
} as const;

export type UiKey = keyof typeof ui.en;
