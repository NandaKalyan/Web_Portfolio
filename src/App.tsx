import { useEffect, useMemo, useState, type FormEvent } from 'react';
import {
  ArrowDownRight, ArrowUpRight, Check, ChevronRight, Code2,
  ExternalLink, Github, Linkedin, Mail, Menu, Play, Send, Sparkles, Terminal, X, Zap,
} from 'lucide-react';

type Project = {
  title: string; category: string; tags: string[]; description: string; features: string[];
  highlights: string[]; githubUrl: string; liveDemoUrl?: string; demoVideoUrl?: string; tint: string; mark: string; image: string;
};

const socials = [
  { label: 'GitHub', href: 'https://github.com/NandaKalyan', icon: Github },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/nanda-kalyan/', icon: Linkedin },
  { label: 'LeetCode', href: 'https://leetcode.com/u/Nanda_Kalyan/', icon: Code2 },
];

const projects: Project[] = [
  { title: 'BiteNest', category: 'Full Stack', tags: ['Java', 'JSP', 'MySQL'], description: 'A full-stack food delivery platform supporting customers, administrators and delivery agents across the food-ordering lifecycle.', features: ['Customer and admin workflows', 'Restaurant, cart and checkout flow', 'Delivery-agent dashboard'], highlights: ['MVC-oriented architecture', 'DAO pattern', 'JDBC/MySQL integration'], githubUrl: 'https://github.com/NandaKalyan/Food_Delivery_App', demoVideoUrl: 'https://www.linkedin.com/posts/nanda-kalyan_introducing-bitenest-a-modern-food-delivery-activity-7284600230761680896-z9sh', tint: 'amber', mark: 'BN', image: '/assets/projects/bitenest.jpg' },
  { title: 'SweetJar', category: 'Full Stack', tags: ['PHP', 'MySQL', 'JavaScript'], description: 'A full-stack online sweets ordering platform with authentication, product browsing, cart management and a dedicated admin panel.', features: ['Dynamic product catalog', 'Customer checkout', 'Admin product management'], highlights: ['PHP server-side development', 'CRUD operations', 'Password hashing'], githubUrl: 'https://github.com/NandaKalyan/SweetJar', demoVideoUrl: 'https://drive.google.com/file/d/1NJ3AS8XQ5Om1wjzllxBnZ7ARqzSZZoDu/view?usp=sharing', tint: 'rose', mark: 'SJ', image: '/assets/projects/sweetjar.jpg' },
  { title: 'TestCraft AI', category: 'AI', tags: ['React', 'TypeScript', 'GitHub API'], description: 'An AI-assisted developer testing platform that analyzes GitHub source code and generates structured test cases and test code.', features: ['Repository discovery', 'Source-code processing', 'Multi-language testing workflows'], highlights: ['GitHub API integration', 'OAuth authentication', 'Jest, pytest and JUnit workflows'], githubUrl: 'https://github.com/NandaKalyan/TestCraft-AI', liveDemoUrl: 'https://nk-testcraft-ai.netlify.app', tint: 'cyan', mark: 'TC', image: '/assets/projects/testcraft-ai.png' },
  { title: 'Thronex AI Assistant', category: 'Python', tags: ['Python', 'APIs', 'Voice'], description: 'A Python voice assistant combining speech recognition, text-to-speech, APIs and desktop automation for everyday commands.', features: ['Voice recognition', 'News and weather information', 'Application and browser launching'], highlights: ['Speech processing', 'REST API integration', 'Command routing'], githubUrl: 'https://github.com/NandaKalyan/Thronex_Ai_Assistant', tint: 'violet', mark: 'TA', image: '/assets/projects/thronex.jpg' },
  { title: 'GAT TOUR', category: 'Android', tags: ['Java', 'Android', 'SQLite'], description: 'An Android campus navigation and information application with interactive locations, department information and local authentication.', features: ['Interactive campus map', 'Department information', 'SQLite-based storage'], highlights: ['Android SDK', 'SQLiteOpenHelper', 'Multi-screen navigation'], githubUrl: 'https://github.com/NandaKalyan/GAT-TOUR', tint: 'blue', mark: 'GT', image: '/assets/projects/gat-tour.jpg' },
  { title: 'NewsFlamingo', category: 'React', tags: ['React', 'REST API', 'Bootstrap'], description: 'A responsive React news aggregation platform retrieving categorized and language-based headlines through the GNews API.', features: ['Category and language selection', 'Live article cards', 'Progress and loading states'], highlights: ['GNews API', 'React Router', 'Infinite scroll'], githubUrl: 'https://github.com/NandaKalyan/News_Application', liveDemoUrl: 'https://nk-news-flamingo.netlify.app', tint: 'orange', mark: 'NF', image: '/assets/projects/newsflamingo.jpg' },
  { title: 'LexiPro', category: 'React', tags: ['React', 'JavaScript', 'CSS'], description: 'A text productivity application for transformation, formatting, clipboard, reading-time and typing-speed analysis.', features: ['Text transformations', 'Reading-time calculation', 'Typing-speed analysis'], highlights: ['Browser Clipboard API', 'Responsive UI', 'Dark and light modes'], githubUrl: 'https://github.com/NandaKalyan/Text-Utils-Lexi-pro', liveDemoUrl: 'https://nk-text-utils.netlify.app', tint: 'lime', mark: 'LP', image: '/assets/projects/lexipro.png' },
  { title: 'Dynamic English Dictionary', category: 'JavaScript', tags: ['JavaScript', 'REST API', 'Fetch'], description: 'A JavaScript-powered dictionary retrieving definitions, pronunciation, examples and synonyms through an external API.', features: ['Definitions and parts of speech', 'Audio pronunciation', 'Synonyms and examples'], highlights: ['Fetch API', 'Dynamic DOM updates', 'Error handling'], githubUrl: 'https://github.com/NandaKalyan/English_Dictionary_Dynamic_Website', liveDemoUrl: 'https://nk-english-dictionary.netlify.app', tint: 'gold', mark: 'DE', image: '/assets/projects/dictionary.png' },
  { title: 'Weather Application', category: 'JavaScript', tags: ['JavaScript', 'OpenWeatherMap', 'API'], description: 'A responsive weather application providing real-time weather information for searched cities.', features: ['City search', 'Weather conditions and icons', 'Humidity and pressure details'], highlights: ['OpenWeatherMap API', 'Fetch API', 'Invalid-search feedback'], githubUrl: 'https://github.com/NandaKalyan/Simple_Weather_App', liveDemoUrl: 'https://nk-know-the-weather.netlify.app', tint: 'sky', mark: 'WA', image: '/assets/projects/weather.png' },
  { title: 'Flappy Bird Game', category: 'Java', tags: ['Java', 'Swing', 'OOP'], description: 'A Java Swing game implementing real-time loops, keyboard controls, gravity, collision detection and score tracking.', features: ['Keyboard controls', 'Random pipe generation', 'Restart and game-over states'], highlights: ['60 FPS game loop', 'Collision detection', 'Object-oriented programming'], githubUrl: 'https://github.com/NandaKalyan/Flappy_Bird_Game', tint: 'green', mark: 'FB', image: '/assets/projects/flappy-bird.jpg' },
  { title: 'Advanced Calculator', category: 'JavaScript', tags: ['HTML5', 'CSS3', 'JavaScript'], description: 'A responsive browser calculator supporting arithmetic operations, keyboard controls, input editing and error handling.', features: ['Keyboard input', 'Decimal calculations', 'Clear, delete and error handling'], highlights: ['Enter-to-calculate', 'Backspace and Escape controls', 'Responsive layout'], githubUrl: 'https://github.com/NandaKalyan/Simple-Calculator', liveDemoUrl: 'https://nk-simple-calci.netlify.app', tint: 'slate', mark: 'AC', image: '/assets/projects/calculator.png' },
];

const skillGroups = [
  ['Programming', 'Java', 'Python', 'JavaScript', 'SQL', 'HTML5', 'CSS3', 'PHP'],
  ['Java / Backend', 'Core Java', 'Advanced Java', 'Servlets', 'JSP', 'JDBC', 'Spring', 'Hibernate', 'MVC', 'DAO', 'REST APIs'],
  ['Frontend', 'React', 'JavaScript', 'HTML', 'CSS', 'Bootstrap', 'Tailwind CSS', 'Responsive Design'],
  ['Databases', 'MySQL', 'SQLite', 'MySQLi', 'JDBC'],
  ['Tools', 'Git', 'GitHub', 'Eclipse', 'VS Code', 'Android Studio', 'MySQL Workbench', 'Apache Tomcat'],
  ['Other Technologies', 'REST APIs', 'GitHub API', 'OAuth', 'Speech Recognition', 'Text-to-Speech', 'Android SDK', 'AI-assisted development', 'Software Testing'],
];

function App() {
  const [loading, setLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [cursor, setCursor] = useState({ x: -100, y: -100, label: '' });
  const [scrolled, setScrolled] = useState(false);
  const [formState, setFormState] = useState<{ name: string; email: string; subject: string; message: string }>({ name: '', email: '', subject: '', message: '' });
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const filters = ['All', 'Java', 'Full Stack', 'React', 'JavaScript', 'Python', 'Android', 'AI', 'API'];
  const visibleProjects = useMemo(() => activeFilter === 'All' ? projects : projects.filter((project) => project.category === activeFilter || project.tags.includes(activeFilter) || (activeFilter === 'API' && project.tags.includes('REST API'))), [activeFilter]);

  useEffect(() => {
    const timeout = window.setTimeout(() => setLoading(false), 900);
    const onScroll = () => setScrolled(window.scrollY > 30);
    const onMove = (event: MouseEvent) => setCursor((current) => ({ ...current, x: event.clientX, y: event.clientY }));
    window.addEventListener('scroll', onScroll);
    window.addEventListener('mousemove', onMove);
    return () => { window.clearTimeout(timeout); window.removeEventListener('scroll', onScroll); window.removeEventListener('mousemove', onMove); };
  }, []);

  const scrollTo = (id: string) => { setMenuOpen(false); document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }); };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (formStatus === 'sending') return;
    setFormStatus('sending');
    try {
      const apiUrl = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/send-contact-email`;
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}` },
        body: JSON.stringify(formState),
      });
      if (!response.ok) {
        const err = await response.json().catch(() => ({}));
        throw new Error(err.error || `Request failed (${response.status})`);
      }
      const data = await response.json();
      if (data.error) throw new Error(data.error);
      setFormStatus('success');
      setFormState({ name: '', email: '', subject: '', message: '' });
      window.setTimeout(() => setFormStatus('idle'), 5000);
    } catch {
      setFormStatus('error');
      window.setTimeout(() => setFormStatus('idle'), 5000);
    }
  };

  return (
    <div className="app-shell">
      {loading && <div className="loader"><div className="loader-mark">NK</div><div className="loader-line"><span /></div><p>SOFTWARE DEVELOPER</p></div>}
      <div className="ambient ambient-one" /><div className="ambient ambient-two" /><div className="grid-overlay" />
      <div className="custom-cursor" style={{ transform: `translate3d(${cursor.x}px, ${cursor.y}px, 0)` }}><span>{cursor.label}</span></div>
      <header className={`nav-wrap ${scrolled ? 'nav-scrolled' : ''}`}>
        <a className="brand" href="#home" onClick={() => scrollTo('home')}><span>NK</span><small>PORTFOLIO / 2026</small></a>
        <nav className={menuOpen ? 'mobile-open' : ''}>{['home', 'about', 'skills', 'journey', 'projects', 'contact'].map((item) => <a key={item} href={`#${item}`} onClick={() => scrollTo(item)}>{item}</a>)}</nav>
        <button className="menu-button" aria-label="Toggle navigation" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X size={22} /> : <Menu size={22} />}</button>
        <button className="nav-cta" onClick={() => scrollTo('contact')}>Let's connect <ArrowUpRight size={16} /></button>
      </header>

      <main>
        <section id="home" className="hero section-pad">
          <div className="hero-copy reveal"><div className="eyebrow"><span className="status-dot" /> AVAILABLE FOR OPPORTUNITIES</div><p className="hero-kicker">SOFTWARE DEVELOPER <span> / 01</span></p><h1>Building software.<br /><em>Solving real</em> problems.</h1><p className="hero-intro">I'm a Software Developer with a strong foundation in Java Full Stack Development, frontend engineering and practical application development.</p><div className="hero-actions"><button className="button button-primary" onClick={() => scrollTo('projects')}>View my projects <ArrowDownRight size={17} /></button><a className="button button-quiet" href="/NandaKalyan_ATS.pdf" download="Nanda-Kalyan-Resume.pdf">Download resume <ArrowUpRight size={17} /></a></div><div className="hero-socials">{socials.map(({ label, href, icon: Icon }) => <a key={label} href={href} target="_blank" rel="noreferrer"><Icon size={16} /> {label}</a>)}</div></div>
          <div className="hero-visual reveal reveal-delay"><div className="portrait-orbit orbit-one" /><div className="portrait-orbit orbit-two" /><div className="portrait-card"><div className="portrait-placeholder"><img src="/assets/images/Images/Professional_Profile.png" alt="Nanda Kalyan" /><div className="portrait-caption">PROFILE<br /><strong>01 — 01</strong></div></div><div className="portrait-label"><span>BASED IN INDIA</span><span>JAVA / REACT / SQL</span></div></div><div className="floating-note"><Sparkles size={15} /><span>Turning ideas<br />into products.</span></div></div>
        </section>

        <section className="stats section-pad"><div className="stat-grid">{[['11', 'Projects built'], ['150+', 'DSA problems solved'], ['2024', 'Graduate'], ['8.94', 'CGPA']].map(([value, label], index) => <div className="stat" key={label}><span className="stat-index">0{index + 1}</span><strong>{value}</strong><p>{label}</p></div>)}</div></section>

        <section id="about" className="section-pad about-section"><div className="section-heading"><span className="section-number">01 / ABOUT</span><h2>Curious by nature.<br /><em>Precise by craft.</em></h2></div><div className="about-grid"><div className="about-lead"><p className="large-copy">I am a Software Developer with a strong foundation in Java Full Stack Development and hands-on experience building practical applications across web, mobile, AI-assisted tools, APIs and database-driven systems.</p><p>I enjoy transforming ideas into functional software through problem solving, clean development practices and continuous learning.</p><button className="text-link" onClick={() => scrollTo('journey')}>Explore my journey <ChevronRight size={16} /></button></div><div className="strength-grid">{[['Problem solving', '01', 'Strong interest in logical thinking and DSA.'], ['Full stack development', '02', 'Experience working across frontend, backend and databases.'], ['Java development', '03', 'Strong foundation in Java and Java-based web development.'], ['API integration', '04', 'Hands-on experience consuming REST APIs and external services.']].map(([title, number, text]) => <div className="strength" key={number}><span>{number}</span><h3>{title}</h3><p>{text}</p><ArrowUpRight size={17} /></div>)}</div></div></section>

        <section id="skills" className="section-pad skills-section"><div className="section-heading split-heading"><div><span className="section-number">02 / TOOLKIT</span><h2>Tools for turning<br /><em>thought into form.</em></h2></div><p>Not a list of percentages. Just the technologies I use to think, build, test and ship useful software.</p></div><div className="skills-board">{skillGroups.map(([title, ...skills], index) => <div className="skill-group" key={title}><div className="skill-title"><span>0{index + 1}</span><h3>{title}</h3></div><div className="skill-list">{skills.map((skill) => <span key={skill}>{skill}</span>)}</div></div>)}</div></section>

        <section id="journey" className="section-pad journey-section"><div className="section-heading"><span className="section-number">03 / BACKGROUND</span><h2>The path so far.</h2></div><div className="timeline"><div className="timeline-item"><div className="timeline-meta">2024 — 2025<br /><span>TRAINING</span></div><div className="timeline-line"><span /></div><div className="timeline-content"><h3>Tap Academy</h3><p>Java Full Stack Development</p><small>Java · Advanced Java · SQL · React · Spring · Hibernate · Full Stack Development</small></div></div><div className="timeline-item"><div className="timeline-meta">2023<br /><span>INTERNSHIP</span></div><div className="timeline-line"><span /></div><div className="timeline-content"><h3>Prinston Smart Engineers</h3><p>Full Stack Development Intern</p></div></div><div className="timeline-item"><div className="timeline-meta">2020 — 2024<br /><span>EDUCATION</span></div><div className="timeline-line"><span /></div><div className="timeline-content"><h3>Global Academy of Technology</h3><p>Bachelor of Engineering · Information Science and Engineering</p><small>CGPA: 8.94</small></div></div></div><div className="dsa-panel"><div><span className="section-number">A PRACTICE IN PROGRESS</span><strong>150<span>+</span></strong><p>DSA problems solved</p></div><div className="dsa-copy"><Terminal size={21} /><p>Practiced Data Structures and Algorithms with a focus on logical problem solving and Java-based implementation.</p></div></div></section>

        <section id="projects" className="section-pad projects-section"><div className="section-heading split-heading"><div><span className="section-number">04 / SELECTED WORK</span><h2>Things I've<br /><em>built in the wild.</em></h2></div><p>A collection of applications built across full-stack development, AI-assisted tooling, mobile development, APIs, databases and frontend engineering.</p></div><div className="filter-row">{filters.map((filter) => <button key={filter} className={activeFilter === filter ? 'active' : ''} onClick={() => setActiveFilter(filter)}>{filter}</button>)}</div><div className="project-grid">{visibleProjects.map((project, index) => <article className="project-card" key={project.title} onClick={() => setSelectedProject(project)} onMouseEnter={() => setCursor((current) => ({ ...current, label: 'VIEW' }))} onMouseLeave={() => setCursor((current) => ({ ...current, label: '' }))}><div className={`project-art tint-${project.tint}`}><img src={project.image} alt={`${project.title} screenshot`} loading="lazy" /><span className="art-index">0{index + 1}</span><span className="art-overlay" /></div><div className="project-info"><div className="project-topline"><span>{project.category}</span><span>{String(index + 1).padStart(2, '0')} / 11</span></div><h3>{project.title}</h3><p>{project.description}</p><div className="tag-row">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div><div className="project-links"><a href={project.githubUrl} target="_blank" rel="noreferrer" onClick={(event) => event.stopPropagation()} onMouseEnter={() => setCursor((current) => ({ ...current, label: 'GITHUB ↗' }))} onMouseLeave={() => setCursor((current) => ({ ...current, label: 'VIEW' }))}><Github size={15} /> GitHub</a>{project.liveDemoUrl && <a href={project.liveDemoUrl} target="_blank" rel="noreferrer" onClick={(event) => event.stopPropagation()}><ExternalLink size={15} /> Live Demo</a>}{project.demoVideoUrl && <a href={project.demoVideoUrl} target="_blank" rel="noreferrer" onClick={(event) => event.stopPropagation()}><Play size={14} /> Demo Video</a>}</div></div></article>)}</div></section>

        <section id="contact" className="section-pad contact-section"><div className="contact-frame"><div><span className="section-number">05 / CONTACT</span><h2>Let's build something<br /><em>meaningful.</em></h2><p>I'm always interested in learning, building and taking on new software development challenges.</p><div className="contact-links"><a href="mailto:nandakalyan2002@gmail.com"><Mail size={18} /><span>Email me<small>nandakalyan2002@gmail.com</small></span><ArrowUpRight size={16} /></a>{socials.map(({ label, href, icon: Icon }) => <a href={href} target="_blank" rel="noreferrer" key={label}><Icon size={18} /><span>{label}<small>Open profile</small></span><ArrowUpRight size={16} /></a>)}</div></div><form onSubmit={handleSubmit}><label>Name<input value={formState.name} onChange={(e) => setFormState((s) => ({ ...s, name: e.target.value }))} placeholder="Your name" required /></label><label>Email<input type="email" value={formState.email} onChange={(e) => setFormState((s) => ({ ...s, email: e.target.value }))} placeholder="you@example.com" required /></label><label>Subject<input value={formState.subject} onChange={(e) => setFormState((s) => ({ ...s, subject: e.target.value }))} placeholder="How can we work together?" /></label><label>Message<textarea rows={4} value={formState.message} onChange={(e) => setFormState((s) => ({ ...s, message: e.target.value }))} placeholder="Tell me a little about your idea..." required /></label><button className="button button-primary" type="submit" disabled={formStatus === 'sending'}>{formStatus === 'sending' ? 'Sending...' : formStatus === 'success' ? 'Message sent!' : formStatus === 'error' ? 'Try again' : 'Send message'} {formStatus === 'success' ? <Check size={16} /> : <Send size={16} />}</button>{formStatus === 'error' && <p className="form-error">Something went wrong. Please try again or email me directly.</p>}{formStatus === 'success' && <p className="form-success">Thanks! I'll get back to you shortly.</p>}</form></div></section>
        <section className="resume-cta section-pad"><div><span className="section-number">OPEN TO WHAT'S NEXT</span><h2>Ready to build<br /><em>something great?</em></h2></div><div><p>Explore my projects, view my work and connect with me for software development opportunities.</p><div className="hero-actions"><a className="button button-primary" href="/NandaKalyan_ATS.pdf" download="Nanda-Kalyan-Resume.pdf">Download resume <ArrowUpRight size={17} /></a><button className="button button-quiet" onClick={() => scrollTo('projects')}>View projects <ArrowDownRight size={17} /></button></div></div></section>
      </main>
      <footer><div className="footer-main"><a className="brand" href="#home"><span>NK</span><small>SOFTWARE DEVELOPER</small></a><p>Software Developer · Java Developer · Front End Developer</p><div className="footer-socials">{socials.map(({ label, href, icon: Icon }) => <a key={label} href={href} target="_blank" rel="noreferrer"><Icon size={17} /> {label}</a>)}</div></div><div className="footer-bottom"><span>© 2026 Nanda Kalyan. All rights reserved.</span><span>Built with intention <Sparkles size={13} /></span></div></footer>
      {selectedProject && <div className="modal-backdrop" onClick={() => setSelectedProject(null)}><div className="project-modal" onClick={(event) => event.stopPropagation()}><button className="modal-close" onClick={() => setSelectedProject(null)} aria-label="Close project details"><X size={20} /></button><div className={`modal-art project-art tint-${selectedProject.tint}`}><img src={selectedProject.image} alt={`${selectedProject.title} screenshot`} /></div><div className="modal-copy"><div className="project-topline"><span>{selectedProject.category}</span><span>PROJECT DETAIL</span></div><h2>{selectedProject.title}</h2><p>{selectedProject.description}</p><div className="modal-columns"><div><h4>FEATURES</h4>{selectedProject.features.map((item) => <span className="check-item" key={item}><Check size={14} />{item}</span>)}</div><div><h4>TECHNICAL HIGHLIGHTS</h4>{selectedProject.highlights.map((item) => <span className="check-item" key={item}><Zap size={14} />{item}</span>)}</div></div><div className="project-links modal-links"><a href={selectedProject.githubUrl} target="_blank" rel="noreferrer"><Github size={15} /> GitHub <ArrowUpRight size={14} /></a>{selectedProject.liveDemoUrl && <a href={selectedProject.liveDemoUrl} target="_blank" rel="noreferrer"><ExternalLink size={15} /> Live Demo <ArrowUpRight size={14} /></a>}{selectedProject.demoVideoUrl && <a href={selectedProject.demoVideoUrl} target="_blank" rel="noreferrer"><Play size={14} /> Demo Video <ArrowUpRight size={14} /></a>}</div></div></div></div>}
    </div>
  );
}

export default App;
