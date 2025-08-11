import React, { useEffect, useMemo, useRef, useState } from 'react';
import { 
  Menu, 
  X, 
  Github, 
  Linkedin, 
  Mail, 
  Phone, 
  MapPin, 
  ExternalLink,
  Sun,
  Moon,
  Code,
  Palette,
  Server,
  Smartphone,
  Database,
  Globe,
  ArrowRight,
  Star,
  Zap,
  Sparkles,
  Instagram,
  Twitter
} from 'lucide-react';
import Tilt from 'react-parallax-tilt';
import Lottie from 'react-lottie-player';
import Fuse from 'fuse.js';
import ThreeBackground from './components/ThreeBackground';
import LineChart from './components/LineChart';
import LottiePlayer from './components/LottiePlayer';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement, 
  LineElement,
  Tooltip as ChartTooltip,
  Legend
} from 'chart.js';
import { DndContext, useDroppable, useDraggable, DragEndEvent } from '@dnd-kit/core';
import { Canvas } from '@react-three/fiber';
import { Stars } from '@react-three/drei';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, ChartTooltip, Legend);

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('theme');
    return saved ? saved === 'dark' : false;
  });
  const [activeSection, setActiveSection] = useState('home');
  const [progress, setProgress] = useState(0);
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const fuse = useMemo(() => new Fuse(['home','about','skills','projects','experience','contact'], { includeScore: false, threshold: 0.3 }), []);
  const typewriterRef = useRef<HTMLSpanElement>(null);
  const typewriterTexts = useRef(['Python Developer', 'Machine Learning Engineer', 'Data Analyst', 'Data Scientist']);
  const typingState = useRef({ textIndex: 0, charIndex: 0, deleting: false });
  const [lottieData, setLottieData] = useState<any | null>(null);
  const [lottieData2, setLottieData2] = useState<any | null>(null);
  const [lottieData3, setLottieData3] = useState<any | null>(null);
  const [lottieData4, setLottieData4] = useState<any | null>(null);
  const [lottieData5, setLottieData5] = useState<any | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [currentPalette, setCurrentPalette] = useState('default');
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);
  const [spotlightPosition, setSpotlightPosition] = useState({ x: 0, y: 0 });
  const [showAboutTrigger, setShowAboutTrigger] = useState(false);
  const [dragDropItems, setDragDropItems] = useState([
    { id: 'skill-1', content: '🐍 Python', category: 'skills', color: 'bg-green-500' },
    { id: 'skill-2', content: '🤖 Machine Learning', category: 'skills', color: 'bg-blue-500' },
    { id: 'skill-3', content: '📊 Data Analysis', category: 'skills', color: 'bg-purple-500' },
    { id: 'skill-4', content: '📈 Data Visualization', category: 'skills', color: 'bg-orange-500' },
    { id: 'tool-1', content: '⚡ TensorFlow', category: 'tools', color: 'bg-red-500' },
    { id: 'tool-2', content: '🧠 PyTorch', category: 'tools', color: 'bg-indigo-500' },
    { id: 'tool-3', content: '📋 Pandas', category: 'tools', color: 'bg-yellow-500' },
    { id: 'tool-4', content: '📊 Matplotlib', category: 'tools', color: 'bg-pink-500' },
    { id: 'project-1', content: '🎯 ML Model', category: 'projects', color: 'bg-teal-500' },
    { id: 'project-2', content: '📱 Web App', category: 'projects', color: 'bg-cyan-500' },
    { id: 'project-3', content: '📊 Dashboard', category: 'projects', color: 'bg-emerald-500' },
    { id: 'project-4', content: '🤖 AI Bot', category: 'projects', color: 'bg-violet-500' }
  ]);
  const [dragDropZones, setDragDropZones] = useState({
    skills: [],
    tools: [],
    projects: []
  });
  const [dragDropScore, setDragDropScore] = useState(0);
  const [dragDropMessage, setDragDropMessage] = useState('Drag items to their correct zones!');

  useEffect(() => {
    const handleScroll = () => {
      const sectionIds = ['home', 'about', 'skills', 'projects', 'experience', 'contact'];
      const scrollPosition = window.scrollY + 120;
      const docHeight = document.body.scrollHeight - window.innerHeight;
      setProgress((window.scrollY / docHeight) * 100);
      sectionIds.forEach((section) => {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
          }
        }
      });
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Reveal on scroll using IntersectionObserver
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.target.classList.toggle('in-view', e.isIntersecting)),
      { rootMargin: '0px 0px -10% 0px', threshold: 0.1 }
    );
    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Simple parallax helper (updates CSS var for elements with data-parallax)
  useEffect(() => {
    const parallax = () => {
      document.querySelectorAll<HTMLElement>('[data-parallax]').forEach((el) => {
        const ratio = Number(el.dataset.parallax) || 0.2;
        const rect = el.getBoundingClientRect();
        const offset = rect.top / window.innerHeight;
        const translate = Math.round((offset - 0.5) * ratio * 200);
        el.style.setProperty('--parallax-y', `${translate}px`);
      });
    };
    parallax();
    window.addEventListener('scroll', parallax, { passive: true });
    window.addEventListener('resize', parallax);
    return () => {
      window.removeEventListener('scroll', parallax);
      window.removeEventListener('resize', parallax);
    };
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  const toggleDarkMode = () => {
    const next = !isDarkMode;
    setIsDarkMode(next);
    localStorage.setItem('theme', next ? 'dark' : 'light');
  };

  useEffect(() => {
    let timeoutId: number | undefined;
    const type = () => {
      const { textIndex, charIndex, deleting } = typingState.current;
      const texts = typewriterTexts.current;
      const currentText = texts[textIndex];
      if (typewriterRef.current) {
        typewriterRef.current.textContent = currentText.substring(0, deleting ? charIndex - 1 : charIndex + 1);
      }
      typingState.current.charIndex = deleting ? charIndex - 1 : charIndex + 1;
      let delay = deleting ? 50 : 100;
      if (!deleting && typingState.current.charIndex === currentText.length) {
        typingState.current.deleting = true;
        delay = 1500;
      } else if (deleting && typingState.current.charIndex === 0) {
        typingState.current.deleting = false;
        typingState.current.textIndex = (textIndex + 1) % texts.length;
        delay = 500;
      }
      timeoutId = window.setTimeout(type, delay);
    };
    timeoutId = window.setTimeout(type, 600);
    return () => window.clearTimeout(timeoutId);
  }, []);

 const chartData = useMemo(() => ({
  labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
  datasets: [
    {
      label: 'Productivity',
      data: [12, 19, 13, 15, 22, 18, 24],
      borderColor: '#6366F1', // Indigo-500
      backgroundColor: 'rgba(99, 102, 241, 0.25)',
      fill: true,
      tension: 0.5,
      pointRadius: 5,
      pointHoverRadius: 7,
      pointBackgroundColor: '#4F46E5', // Indigo-600
      pointBorderColor: 'white',
      borderWidth: 3,
    },
    {
      label: 'Focus',
      data: [10, 17, 15, 14, 20, 21, 19],
      borderColor: '#EC4899', // Pink-500
      backgroundColor: 'rgba(236, 72, 153, 0.25)',
      fill: true,
      tension: 0.5,
      pointRadius: 5,
      pointHoverRadius: 7,
      pointBackgroundColor: '#DB2777', // Pink-600
      pointBorderColor: 'white',
      borderWidth: 3,
    },
  ],
}), []);


  const onSearchChange = (value: string) => {
    setQuery(value);
    if (!value) {
      setSuggestions([]);
      return;
    }
    const res = fuse.search(value).map(r => r.item);
    setSuggestions(res);
  };

    // Fetch multiple Lottie animations
  useEffect(() => {
    const controller = new AbortController();
    
    // Hero animation - Data Science
    fetch('https://assets5.lottiefiles.com/packages/lf20_xyadoh9h.json', { signal: controller.signal })
      .then(r => r.json())
      .then(setLottieData)
      .catch(() => setLottieData(null));
    
    // Skills animation - Coding
    fetch('https://assets9.lottiefiles.com/packages/lf20_2znxgjyt.json', { signal: controller.signal })
      .then(r => r.json())
      .then(setLottieData2)
      .catch(() => setLottieData2(null));
    
    // Projects animation - Analytics
    fetch('https://assets3.lottiefiles.com/packages/lf20_5tl1xxnz.json', { signal: controller.signal })
      .then(r => r.json())
      .then(setLottieData3)
      .catch(() => setLottieData3(null));
    
    // Experience animation - Timeline
    fetch('https://assets2.lottiefiles.com/packages/lf20_tll0j4bb.json', { signal: controller.signal })
      .then(r => r.json())
      .then(setLottieData4)
      .catch(() => setLottieData4(null));
    
    // Contact animation - Success
    fetch('https://assets9.lottiefiles.com/packages/lf20_2znxgjyt.json', { signal: controller.signal })
      .then(r => r.json())
      .then(setLottieData5)
      .catch(() => setLottieData5(null));
    
    return () => controller.abort();
  }, []);

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Using EmailJS or similar service would be better for production
      // For now, we'll use a simple mailto link approach
      const mailtoLink = `mailto:advaith9970@gmail.com?subject=Portfolio Contact from ${formData.name}&body=Name: ${formData.name}%0D%0AEmail: ${formData.email}%0D%0A%0D%0AMessage:%0D%0A${formData.message}`;
      window.open(mailtoLink);
      
      setSubmitStatus('success');
      setFormData({ name: '', email: '', message: '' });
      
      // Reset success message after 3 seconds
      setTimeout(() => setSubmitStatus('idle'), 3000);
    } catch (error) {
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus('idle'), 3000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Spotlight effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setSpotlightPosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Carousel handlers
  const handleCarouselDragStart = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStartX(e.clientX);
  };

  const handleCarouselDragMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const deltaX = e.clientX - dragStartX;
    if (Math.abs(deltaX) > 50) {
      if (deltaX > 0) {
        setCarouselIndex(prev => Math.max(0, prev - 1));
      } else {
        setCarouselIndex(prev => Math.min(projects.length - 1, prev + 1));
      }
      setIsDragging(false);
    }
  };

  const handleCarouselDragEnd = () => {
    setIsDragging(false);
  };

  const handleCarouselNext = () => {
    setCarouselIndex(prev => (prev + 1) % projects.length);
  };

  const handleCarouselPrev = () => {
    setCarouselIndex(prev => (prev - 1 + projects.length) % projects.length);
  };

  const handleCarouselDotClick = (index: number) => {
    setCarouselIndex(index);
  };

  // Fun Drag and Drop handlers
  const handleFunDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (over && active) {
      const itemId = active.id as string;
      const zoneId = over.id as string;
      
      // Find the item
      const item = dragDropItems.find(item => item.id === itemId);
      if (!item) return;
      
      // Check if dropped in correct zone
      const isCorrect = item.category === zoneId;
      
      if (isCorrect) {
        setDragDropScore(prev => prev + 10);
        setDragDropMessage('🎉 Correct! Great job!');
        
        // Add to zone
        setDragDropZones(prev => ({
          ...prev,
          [zoneId]: [...prev[zoneId as keyof typeof prev], item]
        }));
        
        // Remove from available items
        setDragDropItems(prev => prev.filter(item => item.id !== itemId));
        
        // Check if game is complete
        if (dragDropItems.length === 1) {
          setDragDropMessage('🏆 Perfect! You\'ve sorted everything correctly!');
        }
      } else {
        setDragDropScore(prev => Math.max(0, prev - 5));
        setDragDropMessage('❌ Try again! That\'s not the right zone.');
      }
    }
  };

  const resetDragDropGame = () => {
    setDragDropItems([
      { id: 'skill-1', content: '🐍 Python', category: 'skills', color: 'bg-green-500' },
      { id: 'skill-2', content: '🤖 Machine Learning', category: 'skills', color: 'bg-blue-500' },
      { id: 'skill-3', content: '📊 Data Analysis', category: 'skills', color: 'bg-purple-500' },
      { id: 'skill-4', content: '📈 Data Visualization', category: 'skills', color: 'bg-orange-500' },
      { id: 'tool-1', content: '⚡ TensorFlow', category: 'tools', color: 'bg-red-500' },
      { id: 'tool-2', content: '🧠 PyTorch', category: 'tools', color: 'bg-indigo-500' },
      { id: 'tool-3', content: '📋 Pandas', category: 'tools', color: 'bg-yellow-500' },
      { id: 'tool-4', content: '📊 Matplotlib', category: 'tools', color: 'bg-pink-500' },
      { id: 'project-1', content: '🎯 ML Model', category: 'projects', color: 'bg-teal-500' },
      { id: 'project-2', content: '📱 Web App', category: 'projects', color: 'bg-cyan-500' },
      { id: 'project-3', content: '📊 Dashboard', category: 'projects', color: 'bg-emerald-500' },
      { id: 'project-4', content: '🤖 AI Bot', category: 'projects', color: 'bg-violet-500' }
    ]);
    setDragDropZones({ skills: [], tools: [], projects: [] });
    setDragDropScore(0);
    setDragDropMessage('Drag items to their correct zones!');
  };

  // Palette switching
  const palettes = {
    default: { primary: '#6366f1', secondary: '#8b5cf6', accent: '#ec4899' },
    ocean: { primary: '#0891b2', secondary: '#0ea5e9', accent: '#06b6d4' },
    sunset: { primary: '#f97316', secondary: '#ef4444', accent: '#f59e0b' },
    forest: { primary: '#16a34a', secondary: '#22c55e', accent: '#84cc16' },
    royal: { primary: '#7c3aed', secondary: '#a855f7', accent: '#c084fc' }
  };

  const changePalette = (paletteName: string) => {
    setCurrentPalette(paletteName);
    document.documentElement.style.setProperty('--primary-color', palettes[paletteName as keyof typeof palettes].primary);
    document.documentElement.style.setProperty('--secondary-color', palettes[paletteName as keyof typeof palettes].secondary);
    document.documentElement.style.setProperty('--accent-color', palettes[paletteName as keyof typeof palettes].accent);
  };

  // Avatar click handler for about section
  const handleAvatarClick = () => {
    setShowAboutTrigger(true);
    setTimeout(() => {
      scrollToSection('about');
      setShowAboutTrigger(false);
    }, 500);
  };

  // Contrast helper
  const hexToRgb = (hex: string) => {
    const n = hex.replace('#','');
    const bigint = parseInt(n, 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return [r, g, b];
  };
  const relativeLuminance = (hex: string) => {
    const [r, g, b] = hexToRgb(hex).map(v => {
      const s = v / 255;
      return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
  };
  const contrastRatio = (fg: string, bg: string) => {
    const L1 = relativeLuminance(fg);
    const L2 = relativeLuminance(bg);
    const lighter = Math.max(L1, L2);
    const darker = Math.min(L1, L2);
    return ((lighter + 0.05) / (darker + 0.05)).toFixed(2);
  };

  const skills = [
  { name: 'Python', level: 95, icon: <Code className="w-6 h-6" />, color: 'from-blue-500 to-cyan-500' },
  { name: 'Machine Learning', level: 90, icon: <Code className="w-6 h-6" />, color: 'from-red-500 to-pink-500' },
  { name: 'Data Analysis', level: 88, icon: <Server className="w-6 h-6" />, color: 'from-green-500 to-emerald-500' },
  { name: 'Data Visualization', level: 92, icon: <Palette className="w-6 h-6" />, color: 'from-purple-500 to-indigo-500' },
  { name: 'Statistical Analysis', level: 85, icon: <Smartphone className="w-6 h-6" />, color: 'from-orange-500 to-yellow-500' },
  { name: 'Deep Learning', level: 87, icon: <Database className="w-6 h-6" />, color: 'from-teal-500 to-cyan-500' },
  { name: 'HTML/CSS', level: 90, icon: <Globe className="w-6 h-6" />, color: 'from-yellow-400 to-orange-500' },
  { name: 'JavaScript', level: 88, icon: <Zap className="w-6 h-6" />, color: 'from-yellow-300 to-yellow-600' },
  { name: 'React', level: 85, icon: <Code className="w-6 h-6" />, color: 'from-cyan-400 to-blue-600' },
  { name: 'SQL', level: 80, icon: <Database className="w-6 h-6" />, color: 'from-indigo-500 to-purple-600' },
  { name: 'C', level: 75, icon: <Code className="w-6 h-6" />, color: 'from-green-600 to-lime-400' },
  { name: 'Java', level: 78, icon: <Server className="w-6 h-6" />, color: 'from-red-600 to-red-800' },
];


  const [projects, setProjects] = useState([
    {
      title: 'Data Science with Python',
      description: 'Comprehensive data science project showcasing Python skills in data analysis, machine learning, and statistical modeling. Features include data preprocessing, model training, and visualization.',
      image: 'https://images.pexels.com/photos/373543/pexels-photo-373543.jpeg?auto=compress&cs=tinysrgb&w=600',
      technologies: ['Python', 'Pandas', 'NumPy', 'Scikit-learn'],
      liveUrl: 'https://github.com/Advaith5555/Data_Science_with_Python',
      githubUrl: 'https://github.com/Advaith5555/Data_Science_with_Python'
    },
    {
      title: 'Machine Learning Model',
      description: 'Advanced machine learning model development with focus on predictive analytics and pattern recognition. Includes data preprocessing, feature engineering, and model evaluation.',
      image: 'https://images.pexels.com/photos/8386434/pexels-photo-8386434.jpeg?auto=compress&cs=tinysrgb&w=600',
      technologies: ['Python', 'TensorFlow', 'Keras', 'Matplotlib'],
      liveUrl: '#',
      githubUrl: '#'
    },
    {
      title: 'Data Visualization Dashboard',
      description: 'Interactive data visualization dashboard for exploring and presenting complex datasets with intuitive charts and graphs.',
      image: 'https://images.pexels.com/photos/5905709/pexels-photo-5905709.jpeg?auto=compress&cs=tinysrgb&w=600',
      technologies: ['Python', 'Plotly', 'Dash', 'Seaborn'],
      liveUrl: '#',
      githubUrl: '#'
    }
  ]);

  const experiences = [
    {
      title: 'Data Scientist',
      company: 'Self-Employed',
      period: '2024 - Present',
      description: 'Leading data science initiatives with focus on machine learning, predictive modeling, and data-driven insights.'
    },
    {
      title: 'Data Analyst',
      company: 'Self-Employed',
      period: '2023 - 2024',
      description: 'Performed statistical analysis and created data visualizations to support business decisions.'
    },
    {
      title: 'Python Developer',
      company: 'Self-Employed',
      period: '2022 - 2023',
      description: 'Developed Python-based solutions for data processing, analysis, and visualization.'
    }
  ];

  // Simple DnD kit demo: move chips between two zones
  type Chip = { id: string; label: string };
  const [availableChips, setAvailableChips] = useState<Chip[]>([
    { id: 'python', label: 'Python' },
    { id: 'ml', label: 'Machine Learning' },
    { id: 'data', label: 'Data Analysis' },
    { id: 'viz', label: 'Data Visualization' },
  ]);
  const [favoriteChips, setFavoriteChips] = useState<Chip[]>([]);

  const Droppable = ({ id, children }: { id: string; children: React.ReactNode }) => {
    const { setNodeRef, isOver } = useDroppable({ id });
  return (
      <div
        ref={setNodeRef}
        className={`${isDarkMode ? 'glass-dark' : 'glass-premium'} rounded-2xl p-4 border min-h-[90px] transition-colors ${isOver ? 'ring-2 ring-indigo-500' : ''}`}
      >
        {children}
      </div>
    );
  };

  // Custom Drag and Drop Components
  const DraggableItem = ({ id, item }: { id: string; item: any }) => {
    const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({ id });
    
    return (
      <div
        ref={setNodeRef}
        {...attributes}
        {...listeners}
        className={`drag-item ${item.color} ${isDragging ? 'opacity-50' : ''}`}
              style={{
          transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
        }}
      >
        {item.content}
      </div>
    );
  };

  const DropZone = ({ id, title, items }: { id: string; title: string; items: any[] }) => {
    const { setNodeRef, isOver } = useDroppable({ id });
    
    return (
      <div
        ref={setNodeRef}
        className={`drop-zone ${id} ${isOver ? 'over' : ''}`}
      >
        <h3 className="drop-zone-title">{title}</h3>
        <div className="drop-zone-items">
          {items.map((item, index) => (
            <div key={`${item.id}-${index}`} className="zone-item" style={{
              '--item-color': item.color,
              '--item-color-dark': item.color.replace('500', '600')
            } as React.CSSProperties}>
              {item.content}
            </div>
          ))}
        </div>
      </div>
    );
  };

  const Draggable = ({ id, label }: Chip) => {
    const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({ id });
    const style = transform ? { transform: `translate3d(${transform.x}px, ${transform.y}px, 0)` } : undefined;
    return (
      <button
        ref={setNodeRef}
        style={style}
        {...listeners}
        {...attributes}
        className={`px-3 py-1 rounded-full text-sm mr-2 mb-2 ${isDarkMode ? 'bg-gray-700 text-gray-200' : 'bg-gray-100 text-gray-700'} border ${isDarkMode ? 'border-gray-600' : 'border-gray-300'} ${isDragging ? 'opacity-70' : ''}`}
      >
        {label}
      </button>
    );
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { over, active } = event;
    if (!over) return;
    const id = String(active.id);
    if (over.id === 'favorites') {
      const chip = availableChips.find(c => c.id === id);
      if (chip) {
        setAvailableChips(prev => prev.filter(c => c.id !== id));
        setFavoriteChips(prev => (prev.some(c => c.id === id) ? prev : [...prev, chip]));
      }
    }
    if (over.id === 'available') {
      const chip = favoriteChips.find(c => c.id === id);
      if (chip) {
        setFavoriteChips(prev => prev.filter(c => c.id !== id));
        setAvailableChips(prev => (prev.some(c => c.id === id) ? prev : [...prev, chip]));
      }
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 scrollbar-premium ${isDarkMode ? 'dark bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
      {/* Spotlight effect */}
      <div 
        className="spotlight" 
        style={{
          '--mouse-x': `${spotlightPosition.x}px`,
          '--mouse-y': `${spotlightPosition.y}px`
        } as React.CSSProperties}
      />
      
      {/* Palette switcher */}
      <div className="palette-switcher">
        {Object.entries(palettes).map(([name, colors]) => (
          <button
            key={name}
            className={`palette-option ${currentPalette === name ? 'active' : ''}`}
            style={{ background: `linear-gradient(45deg, ${colors.primary}, ${colors.secondary})` }}
            onClick={() => changePalette(name)}
            title={name.charAt(0).toUpperCase() + name.slice(1)}
          />
        ))}
      </div>

      {/* Scroll progress bar */}
      <div className="scroll-progress" style={{ width: `${progress}%` }} />

      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isDarkMode ? 'neo-nav-dark' : 'neo-nav'} border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="text-2xl font-bold text-gradient-premium text-glow">
              Advaith Dhavan
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <div className="relative">
                <input
                  aria-label="Search sections"
                  value={query}
                  onChange={(e) => onSearchChange(e.target.value)}
                  placeholder="Search…"
                  className={`${isDarkMode ? 'neo-input-dark' : 'neo-input'} px-4 py-2 w-44 text-sm`}
                />
                {suggestions.length > 0 && (
                  <div className={`${isDarkMode ? 'neo-card-dark' : 'neo-card'} absolute mt-2 w-44 rounded-xl shadow-lg overflow-hidden`}>
                    {suggestions.map(s => (
                      <button key={s} className="block w-full text-left px-3 py-2 text-sm hover:bg-indigo-50 dark:hover:bg-gray-700" onClick={() => scrollToSection(s)}>
                        {s}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              {['home', 'about', 'skills', 'projects', 'experience', 'contact'].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className={`capitalize transition-colors duration-200 hover:text-indigo-600 ${
                    activeSection === section ? 'text-indigo-600 font-semibold' : ''
                  }`}
                >
                  {section}
                </button>
              ))}
              <button
                onClick={toggleDarkMode}
                className={`p-2 rounded-full transition-colors duration-200 ${isDarkMode ? 'neo-button-dark' : 'neo-button'} hover:bg-opacity-80`}
              >
                {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
            </div>

            {/* Mobile Navigation Button */}
            <div className="md:hidden flex items-center space-x-4">
              <button
                onClick={toggleDarkMode}
                className={`p-2 rounded-full transition-colors duration-200 ${isDarkMode ? 'neo-button-dark' : 'neo-button'}`}
              >
                {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2"
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className={`md:hidden py-4 ${isDarkMode ? 'neo-card-dark' : 'neo-card'} rounded-lg mb-4`}>
              {['home', 'about', 'skills', 'projects', 'experience', 'contact'].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className={`block w-full text-left px-4 py-2 capitalize transition-colors duration-200 hover:text-indigo-600 ${
                    activeSection === section ? 'text-indigo-600 font-semibold' : ''
                  }`}
                >
                  {section}
                </button>
              ))}
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-20 relative overflow-hidden">
        {/* Advanced background effects */}
        <div className="absolute inset-0 hero-gradient -z-10" />
        <div className="noise-overlay" />
        
        {/* Floating morphing shapes */}
        <div className="absolute top-20 left-10 w-32 h-32 morphing-shape float-slow opacity-20" />
        <div className="absolute bottom-20 right-10 w-24 h-24 morphing-shape-2 float-medium opacity-30" />
        <div className="absolute top-1/2 left-1/4 w-16 h-16 morphing-shape float-fast opacity-25" />
        
        {/* Floating Lottie Animation */}
        <div className="absolute top-1/4 right-1/4 w-24 h-24 opacity-30 float-medium">
          <LottiePlayer data={lottieData} />
        </div>
        
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <div className="space-y-8 animate-fade-in">
            <div className="relative">
              <video autoPlay muted loop playsInline className="absolute -z-10 top-1/2 left-1/2 w-[120%] max-h-[80vh] -translate-x-1/2 -translate-y-1/2 object-cover opacity-20 rounded-3xl">
                <source src="https://cdn.coverr.co/videos/coverr-coding-on-a-laptop-7665/1080p.mp4" type="video/mp4" />
              </video>
              <ThreeBackground />
                            <Tilt glareEnable tiltMaxAngleX={8} tiltMaxAngleY={8} className="inline-block reveal">
                <div className="relative avatar-trigger micro-click" onClick={handleAvatarClick}>
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full blur-xl opacity-30 animate-pulse" />
                  <img
                    src="/advaith-photo.jpeg"
                    alt="Advaith Dhavan"
                    loading="lazy"
                    className="
                      relative
                      w-72 h-72                /* 18rem x 18rem */
                      rounded-full             /* Circle */
                      mx-auto
                      p-1                      /* Padding inside border */
                      bg-gradient-to-r         /* Background gradient for border effect */
                      from-purple-500 via-pink-500 to-red-500
                      shadow-2xl shadow-indigo-500/40
                      border-8 border-transparent /* Transparent border to maintain size */
                      transition-transform duration-500 ease-in-out
                      hover:scale-110
                      hover:shadow-3xl
                      object-cover
                    "
                  />



                  {showAboutTrigger && (
                    <div className="absolute inset-0 bg-white bg-opacity-20 rounded-full animate-ping" />
                  )}
                </div>
              </Tilt>
            </div>
            
            <div>
              <h1 className="text-5xl md:text-7xl font-bold mb-4">
                <span className="text-gradient-premium text-glow">
                  Advaith Dhavan
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8">
                Data Scientist & <span ref={typewriterRef} className="border-r-2 border-indigo-500 pr-1"></span>
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center reveal">
                <button
                  onClick={() => scrollToSection('projects')}
                className="btn-premium px-8 py-4 rounded-full flex items-center space-x-2 micro-click"
                >
                <span>View My Work</span>
                <ArrowRight className="w-5 h-5" />
                </button>
                <button
                  onClick={() => scrollToSection('contact')}
                className={`px-8 py-4 border-2 ${isDarkMode ? 'border-gray-600 text-gray-300 hover:bg-gray-800' : 'border-gray-300 text-gray-700 hover:bg-gray-50'} rounded-full transition-all duration-300 transform hover:scale-105 micro-click`}
                >
                  Get In Touch
                </button>
              </div>
            </div>

            <div className="flex justify-center space-x-6 pt-8">
              <a href="https://github.com/Advaith5555" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-400 hover:text-indigo-600 transition-colors duration-200 transform hover:scale-110 micro-hover">
                <Github className="w-8 h-8" />
              </a>
              <a href="https://www.linkedin.com/in/advaith-dhavan-644537273/" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-400 hover:text-indigo-600 transition-colors duration-200 transform hover:scale-110 micro-hover">
                <Linkedin className="w-8 h-8" />
              </a>
              <a href="mailto:advaith9970@gmail.com" className="text-gray-600 dark:text-gray-400 hover:text-indigo-600 transition-colors duration-200 transform hover:scale-110 micro-hover">
                <Mail className="w-8 h-8" />
              </a>
              <a href="https://www.instagram.com/advaith.27.12/" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-400 hover:text-indigo-600 transition-colors duration-200 transform hover:scale-110 micro-hover">
                <Instagram className="w-8 h-8" />
              </a>
              <a href="https://x.com/AdvaithDhavan" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-400 hover:text-indigo-600 transition-colors duration-200 transform hover:scale-110 micro-hover">
                <Twitter className="w-8 h-8" />
              </a>
            </div>

            {/* Hero Lottie Animation */}
            <div className="mt-8 flex justify-center">
              <div className="w-32 h-32">
                <LottiePlayer data={lottieData} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className={`py-20 px-4 sm:px-6 lg:px-8 relative ${isDarkMode ? 'neo-section-dark' : 'neo-section'}`}>
        {/* Floating Lottie in About Section */}
        <div className="absolute top-10 right-10 w-20 h-20 opacity-20 float-slow">
          <LottiePlayer data={lottieData2} />
        </div>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gradient-premium">About Me</h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">Passionate about data science and machine learning</p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center" data-parallax="0.25">
            <div className="space-y-6 reveal">
              <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
                I'm a passionate data scientist with expertise in Python, machine learning, and data analysis. 
                My journey in data science has led me to work on various projects involving statistical analysis, 
                predictive modeling, and data visualization.
              </p>
              <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
                I believe in leveraging data to drive meaningful insights and create impactful solutions. 
                When I'm not analyzing data, you'll find me exploring new machine learning algorithms, 
                contributing to open-source projects, or staying updated with the latest trends in AI and data science.
              </p>
              <div className="flex flex-wrap gap-4">
                <span className="px-4 py-2 bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200 rounded-full text-sm font-medium">
                  Data-Driven
                </span>
                <span className="px-4 py-2 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 rounded-full text-sm font-medium">
                  Analytical Thinker
                </span>
                <span className="px-4 py-2 bg-pink-100 dark:bg-pink-900 text-pink-800 dark:text-pink-200 rounded-full text-sm font-medium">
                  ML Enthusiast
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6 reveal">
              <div className={`p-6 rounded-2xl ${isDarkMode ? 'neo-card-dark' : 'neo-card'} transform hover:scale-105 transition-transform duration-300`}>
                <div className="text-3xl font-bold text-indigo-600 mb-2">10+</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Projects Completed</div>
              </div>
              <div className={`p-6 rounded-2xl ${isDarkMode ? 'neo-card-dark' : 'neo-card'} transform hover:scale-105 transition-transform duration-300`}>
                <div className="text-3xl font-bold text-purple-600 mb-2">2+</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Years Experience</div>
              </div>
              <div className={`p-6 rounded-2xl ${isDarkMode ? 'neo-card-dark' : 'neo-card'} transform hover:scale-105 transition-transform duration-300`}>
                <div className="text-3xl font-bold text-pink-600 mb-2">30+</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Bug Fixes</div>
              </div>
              <div className={`p-6 rounded-2xl ${isDarkMode ? 'neo-card-dark' : 'neo-card'} transform hover:scale-105 transition-transform duration-300`}>
                <div className="text-3xl font-bold text-cyan-600 mb-2">15+</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Technologies</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8 relative">
        {/* Floating Lottie in Skills Section */}
        <div className="absolute top-20 left-20 w-16 h-16 opacity-15 float-medium">
          <LottiePlayer data={lottieData3} />
        </div>
        <div className="absolute bottom-20 right-20 w-16 h-16 opacity-15 float-fast">
          <LottiePlayer data={lottieData2} />
        </div>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gradient-premium">Skills & Expertise</h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">Technologies I work with</p>
            
            {/* Skills Section Lottie */}
            <div className="flex justify-center mt-8">
              <div className="w-24 h-24">
                <LottiePlayer data={lottieData2} />
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8" data-parallax="0.15">
            {skills.map((skill, index) => (
              <div
                key={skill.name}
                className={`p-6 rounded-2xl reveal ${isDarkMode ? 'neo-card-dark' : 'neo-card'} hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-center mb-4">
                  <div className={`p-3 rounded-lg bg-gradient-to-r ${skill.color} text-white mr-4`}>
                    {skill.icon}
                  </div>
                  <h3 className="text-xl font-semibold">{skill.name}</h3>
                </div>
                <div className={`w-full ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'} rounded-full h-3 mb-2`}>
                  <div
                    className={`h-3 rounded-full bg-gradient-to-r ${skill.color} transition-all duration-1000 ease-out`}
                    style={{ width: `${skill.level}%` }}
                  ></div>
                </div>
                <div className="text-right text-sm text-gray-600 dark:text-gray-400">{skill.level}%</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className={`py-20 px-4 sm:px-6 lg:px-8 relative ${isDarkMode ? 'neo-section-dark' : 'neo-section'}`}>
        {/* Floating Lottie in Projects Section */}
        <div className="absolute top-1/4 left-20 w-40 h-40 opacity-40 float-slow">
          <LottiePlayer data={lottieData4} />
        </div>
        <div className="absolute bottom-1/4 right-10 w-20 h-20 opacity-20 float-medium">
          <LottiePlayer data={lottieData3} />
        </div>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gradient-premium">Featured Projects</h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">Some of my recent work</p>
            
            {/* Projects Section Lottie */}
            <div className="flex justify-center mt-8">
              <div className="w-24 h-24">
                <LottiePlayer data={lottieData3} />
              </div>
            </div>
          </div>

          {/* Drag & drop demo */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center space-x-2">
              <div className="w-8 h-8">
              </div>
            </div>
          </div>
          <DndContext onDragEnd={handleDragEnd}>
            <div className="grid md:grid-cols-2 gap-6 mb-10">
              <div>
                <h3 className="font-semibold mb-2">Available Tags</h3>
                <Droppable id="available">
                  <div className="flex flex-wrap">
                    {availableChips.map(c => (
                      <Draggable key={c.id} id={c.id} label={c.label} />
                    ))}
                  </div>
                </Droppable>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Favorites</h3>
                <Droppable id="favorites">
                  <div className="flex flex-wrap min-h-[40px]">
                    {favoriteChips.map(c => (
                      <Draggable key={c.id} id={c.id} label={c.label} />
                    ))}
                  </div>
                </Droppable>
              </div>
            </div>
                      </DndContext>

            {/* Fun Drag and Drop Game */}
            <section className="py-16 reveal">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                  <h2 className="text-4xl font-bold mb-4 text-gradient-premium">
                    🎮 Interactive Skills Game
                  </h2>
                  <p className="text-xl text-gray-600 dark:text-gray-400">
                    Test your knowledge! Drag and drop items to their correct categories
                  </p>
                </div>

                <div className="drag-drop-container">
                  <div className="drag-drop-header">
                    <div className="drag-drop-score">
                      🏆 Score: {dragDropScore}
                    </div>
                    <div className="drag-drop-message">
                      {dragDropMessage}
                    </div>
                  </div>

                  <DndContext onDragEnd={handleFunDragEnd}>
                    {/* Draggable Items */}
                    <div className="drag-drop-items">
                      {dragDropItems.map((item) => (
                        <DraggableItem key={item.id} id={item.id} item={item} />
                      ))}
                    </div>

                    {/* Drop Zones */}
                    <div className="drag-drop-zones">
                      <DropZone id="skills" title="🎯 Skills" items={dragDropZones.skills} />
                      <DropZone id="tools" title="⚙️ Tools" items={dragDropZones.tools} />
                      <DropZone id="projects" title="🚀 Projects" items={dragDropZones.projects} />
                    </div>
                  </DndContext>

                  <div className="text-center">
                    <button 
                      onClick={resetDragDropGame}
                      className="drag-drop-reset micro-click"
                    >
                      🔄 Reset Game
                    </button>
                  </div>
                </div>
              </div>
            </section>

          {/* Enhanced Circular Carousel */}
          <div className="carousel-container mb-16">
            {/* Navigation Arrows */}
            <button 
              className="carousel-nav prev micro-click" 
              onClick={handleCarouselPrev}
              aria-label="Previous project"
            >
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            <button 
              className="carousel-nav next micro-click" 
              onClick={handleCarouselNext}
              aria-label="Next project"
            >
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            <div 
              className="carousel-track"
              onMouseDown={handleCarouselDragStart}
              onMouseMove={handleCarouselDragMove}
              onMouseUp={handleCarouselDragEnd}
              onMouseLeave={handleCarouselDragEnd}
            >
              {projects.map((project, index) => {
                const isActive = index === carouselIndex;
                const isPrev = index === (carouselIndex - 1 + projects.length) % projects.length;
                const isNext = index === (carouselIndex + 1) % projects.length;
                const isHidden = index === (carouselIndex - 2 + projects.length) % projects.length;
                const isHiddenRight = index === (carouselIndex + 2) % projects.length;
                
                return (
                  <div
                    key={project.title}
                    className={`carousel-item ${isActive ? 'active' : ''} ${isPrev ? 'prev' : ''} ${isNext ? 'next' : ''} ${isHidden ? 'hidden' : ''} ${isHiddenRight ? 'hidden-right' : ''}`}
                  >
                    <div className="carousel-item-content">
                      <div className="carousel-item-image">
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="carousel-item-text">
                        <h3 className="carousel-item-title">{project.title}</h3>
                        <p className="carousel-item-description">
                          {project.description.substring(0, 80)}...
                        </p>
                        <div className="carousel-item-links">
                          <a 
                            href={project.liveUrl} 
                            className="carousel-item-link live"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Live Demo
                          </a>
                          <a 
                            href={project.githubUrl} 
                            className="carousel-item-link code"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            View Code
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Navigation Dots */}
            <div className="carousel-dots">
              {projects.map((_, index) => (
                <button
                  key={index}
                  className={`carousel-dot micro-click ${index === carouselIndex ? 'active' : ''}`}
                  onClick={() => handleCarouselDotClick(index)}
                  aria-label={`Go to project ${index + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Regular Grid View */}
          <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8" data-parallax="0.12">
            {projects.map((project, index) => (
              <div
                key={project.title}
                className={`group reveal ${isDarkMode ? 'neo-card-dark' : 'neo-card'} rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-4 micro-hover`}
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    loading="lazy"
                    className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-3">{project.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 text-xs bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200 rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex space-x-4">
                    <a
                      href={project.liveUrl}
                      className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200"
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Live Demo
                    </a>
                    <a
                      href={project.githubUrl}
                      className={`flex items-center px-4 py-2 ${isDarkMode ? 'bg-gray-600 hover:bg-gray-500' : 'bg-gray-200 hover:bg-gray-300'} rounded-lg transition-colors duration-200`}
                    >
                      <Github className="w-4 h-4 mr-2" />
                      Code
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-16 rounded-2xl p-6 shadow-lg ${isDarkMode ? 'neo-card-dark' : 'neo-card'}">
            <h3 className="text-2xl font-bold mb-4">Weekly Productivity</h3>
            <LineChart data={chartData} />
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20 px-4 sm:px-6 lg:px-8 relative">
        {/* Floating Lottie in Experience Section */}
        <div className="absolute top-10 left-1/4 w-16 h-16 opacity-15 float-medium">
          <LottiePlayer data={lottieData2} />
        </div>
        <div className="absolute bottom-10 right-1/4 w-16 h-16 opacity-15 float-slow">
          <LottiePlayer data={lottieData4} />
        </div>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gradient-premium">Experience</h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">My professional journey</p>
            
            {/* Experience Section Lottie */}
            <div className="flex justify-center mt-8">
              <div className="w-24 h-24">
                <LottiePlayer data={lottieData4} />
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-indigo-500 to-purple-500 rounded-full"></div>
            
            {experiences.map((experience, index) => (
              <div
                key={experience.title}
                className={`relative mb-12 ${index % 2 === 0 ? 'text-right pr-8' : 'text-left pl-8'}`}
              >
                <div className={`absolute top-6 w-4 h-4 bg-indigo-500 rounded-full border-4 ${isDarkMode ? 'border-gray-900' : 'border-white'} ${index % 2 === 0 ? '-right-2' : '-left-2'} transform -translate-y-1/2`}></div>
                
                <div className={`${isDarkMode ? 'neo-card-dark' : 'neo-card'} p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 max-w-lg ${index % 2 === 0 ? 'ml-auto' : 'mr-auto'}`}>
                  <h3 className="text-xl font-bold mb-2">{experience.title}</h3>
                  <p className="text-indigo-600 dark:text-indigo-400 font-semibold mb-2">{experience.company}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">{experience.period}</p>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{experience.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className={`py-20 px-4 sm:px-6 lg:px-8 relative ${isDarkMode ? 'neo-section-dark' : 'neo-section'}`}>
        {/* Floating Lottie in Contact Section */}
        <div className="absolute top-1/3 left-10 w-20 h-20 opacity-20 float-slow">
          <LottiePlayer data={lottieData5} />
        </div>
        <div className="absolute bottom-1/3 right-10 w-20 h-20 opacity-20 float-medium">
          <LottiePlayer data={lottieData3} />
        </div>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gradient-premium">Get In Touch</h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">Let's work together on your next project</p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-indigo-600 text-white rounded-full">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Email</h3>
                  <p className="text-gray-600 dark:text-gray-400">advaith9970@gmail.com</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="p-3 bg-purple-600 text-white rounded-full">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Phone</h3>
                  <p className="text-gray-600 dark:text-gray-400">+91 7499800427</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="p-3 bg-pink-600 text-white rounded-full">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Location</h3>
                  <p className="text-gray-600 dark:text-gray-400">Mumbai, India</p>
                </div>
              </div>
            </div>

                <form
                  className="space-y-4"
                  action="https://formspree.io/f/xjkojzle"
                  method="POST"
                >              <div>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Your Name"
                  required
                  className={`w-full px-4 py-3 ${isDarkMode ? 'neo-input-dark' : 'neo-input'} transition-all duration-200 outline-none`}
                />
              </div>
              <div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Your Email"
                  required
                  className={`w-full px-4 py-3 ${isDarkMode ? 'neo-input-dark' : 'neo-input'} transition-all duration-200 outline-none`}
                />
              </div>
              <div>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={5}
                  placeholder="Your Message"
                  required
                  className={`w-full px-4 py-3 ${isDarkMode ? 'neo-input-dark' : 'neo-input'} transition-all duration-200 outline-none resize-none`}
                ></textarea>
              </div>
              
              {/* Status Messages */}
              {submitStatus === 'success' && (
                <div className="p-4 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-xl text-center">
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-8 h-8">
                      <LottiePlayer data={lottieData5} />
                    </div>
                    <span>Message sent successfully! Check your email client.</span>
                  </div>
                </div>
              )}
              {submitStatus === 'error' && (
                <div className="p-4 bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 rounded-xl text-center">
                  ❌ Error sending message. Please try again.
                </div>
              )}
              
              <button
                type="submit"
                disabled={isSubmitting}
                className={`btn-premium w-full px-8 py-3 rounded-xl flex items-center justify-center space-x-2 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <span>Send Message</span>
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </form>
          </div>
                      <div className="mt-16 grid sm:grid-cols-2 gap-6">
              <div className={`rounded-2xl ${isDarkMode ? 'neo-card-dark' : 'neo-card'} p-6 shadow-lg`}>
              <h3 className="font-semibold mb-3">Contrast Checker</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">Indicates if primary text meets WCAG against background.</p>
              <div className="flex items-center gap-3">
                {['#ffffff','#111827','#6366f1','#ec4899'].map((bg) => (
                  <div key={bg} className="flex flex-col items-center text-xs">
                    <span className="w-10 h-10 rounded-lg border" style={{ backgroundColor: bg }} />
                    <span className="mt-1">{contrastRatio('#111111', bg)}x</span>
                  </div>
                ))}
              </div>
            </div>
                          <div className={`rounded-2xl ${isDarkMode ? 'neo-card-dark' : 'neo-card'} p-6 shadow-lg flex items-center justify-center`}>
              <LottiePlayer data={lottieData} />
              <span className="ml-4 text-sm text-gray-500 dark:text-gray-400">Lottie animation</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={`py-8 px-4 sm:px-6 lg:px-8 footer-interactive ${isDarkMode ? 'bg-gray-900 border-t border-gray-800' : 'bg-white border-t border-gray-200'}`}>
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-gray-600 dark:text-gray-400 micro-hover">
            © 2025 Advaith Dhavan. All rights reserved.
            
          </p>
          <div className="flex justify-center space-x-6 mt-4">
           <a
  href="https://github.com/Advaith5555"
  target="_blank"
  rel="noopener noreferrer"
  aria-label="GitHub Profile"
  className="text-gray-600 dark:text-gray-400 hover:text-indigo-600 transition-colors duration-200 micro-hover"
>
  <Github className="w-6 h-6" />
</a>
<a
  href="https://www.linkedin.com/in/advaith-dhavan-644537273/"
  target="_blank"
  rel="noopener noreferrer"
  aria-label="LinkedIn Profile"
  className="text-gray-600 dark:text-gray-400 hover:text-indigo-600 transition-colors duration-200 micro-hover"
>
  <Linkedin className="w-6 h-6" />
</a>
<a
  href="mailto:advaith9970@gmail.com"
  aria-label="Send Email"
  className="text-gray-600 dark:text-gray-400 hover:text-indigo-600 transition-colors duration-200 micro-hover"
>
  <Mail className="w-6 h-6" />
</a>

          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;