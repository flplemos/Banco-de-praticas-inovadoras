import React from 'react';
import { Menu, Search, Filter, BookOpen, Download, ChevronRight, ChevronDown, MapPin, User, Tag, LayoutGrid, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ODS_DATA, PRACTICES, type Practice, type ODS } from '../types';

// --- Header Component ---
export const Header = ({ onOpenMenu }: { onOpenMenu: () => void }) => {
  const [logoError, setLogoError] = React.useState(false);

  return (
    <header className="bg-[#ffb84d] border-b border-orange-300 sticky top-0 z-50 shadow-md">
      <div id="header-inner" className="max-w-7xl mx-auto px-4 h-24 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <a href="/" className="flex items-center">
            {!logoError ? (
              <img 
                src="/logo_senac_labs.png" 
                alt="Senac Labs" 
                className="h-14 w-auto object-contain"
                onError={() => setLogoError(true)}
              />
            ) : (
              <div className="flex flex-col -space-y-1">
                <span className="font-black text-2xl tracking-tighter text-[#004a8d]">SENAC</span>
                <span className="font-bold text-xs tracking-[0.2em] text-[#004a8d] uppercase">LABS RN</span>
              </div>
            )}
          </a>
        </div>
      <nav className="hidden lg:flex items-center gap-10">
        <a href="#" className="font-extrabold text-sm uppercase tracking-widest text-[#003366] hover:text-white transition-colors">Início</a>
        <a href="#" className="font-extrabold text-sm uppercase tracking-widest text-[#003366] hover:text-white transition-colors">Sobre</a>
        <a href="#" className="font-extrabold text-sm uppercase tracking-widest text-[#003366] hover:text-white transition-colors">Edital</a>
        <a href="#" className="font-extrabold text-sm uppercase tracking-widest text-[#004a8d] border-b-2 border-[#004a8d] pb-1 transition-colors">Práticas</a>
        <a href="#" className="font-extrabold text-sm uppercase tracking-widest text-[#003366] hover:text-white transition-colors">E-books</a>
        <a href="#" className="font-extrabold text-sm uppercase tracking-widest text-[#003366] hover:text-white transition-colors">Contato</a>
      </nav>
      <button 
        onClick={onOpenMenu}
        className="lg:hidden p-2 text-[#003366] hover:bg-white/10 rounded-lg transition-colors"
      >
        <Menu size={32} />
      </button>
      </div>
    </header>
  );
};

// --- Hero Component ---
export const Hero = ({ searchQuery, setSearchQuery }: { searchQuery: string, setSearchQuery: (q: string) => void }) => (
  <section className="bg-[#f0f4f8] border-b border-blue-100 py-16 px-4 relative overflow-hidden">
    <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-96 h-96 bg-senac-blue/5 rounded-full blur-3xl"></div>
    <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-64 h-64 bg-senac-orange/5 rounded-full blur-3xl"></div>
    
    <div className="max-w-4xl mx-auto text-center space-y-8 relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="space-y-4"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-white rounded-full text-xs font-bold text-senac-blue border border-blue-100 shadow-sm uppercase tracking-widest">
          Transição Digital e Educacional
        </div>
        <h1 className="text-4xl md:text-5xl font-black tracking-tight text-[#003366]">
          BANCO DE PRÁTICAS <span className="text-senac-orange">INOVADORAS</span>
        </h1>
        <p className="text-gray-500 font-medium max-w-2xl mx-auto">
          Explore, inspire-se e replique as melhores metodologias educacionais desenvolvidas pelos docentes do Senac Rio Grande do Norte.
        </p>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="relative max-w-3xl mx-auto"
      >
        <div className="flex bg-white rounded-2xl shadow-xl shadow-blue-900/5 overflow-hidden p-2 border border-blue-50 focus-within:ring-4 focus-within:ring-senac-blue/5 transition-all">
          <div className="flex-1 flex items-center px-4 gap-3">
            <Search className="text-gray-400" size={24} />
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar por palavra-chave, título, instrutor ou curso..." 
              className="w-full h-14 outline-none text-gray-800 placeholder:text-gray-400 text-lg font-medium"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="p-1 hover:bg-gray-100 rounded-full text-gray-400"
              >
                <ChevronRight className="rotate-45" size={20} />
              </button>
            )}
          </div>
          <button className="bg-senac-blue hover:bg-[#003366] text-white px-10 rounded-xl font-bold text-lg transition-all shadow-lg shadow-senac-blue/20">
            Pesquisar
          </button>
        </div>
      </motion.div>
    </div>
  </section>
);

// --- Filter Component ---
const FilterSection = ({ title, children, expanded = true }: { title: string, children: React.ReactNode, expanded?: boolean }) => {
  const [isOpen, setIsOpen] = React.useState(expanded);
  return (
    <div className="border-b border-gray-100 pb-5 mb-5 last:border-0">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full font-black text-[#003366] text-xs uppercase tracking-widest mb-4 group"
      >
        <span>{title}</span>
        <ChevronDown size={14} className={`transition-transform duration-300 text-senac-orange ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="space-y-3 overflow-hidden"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const Checkbox = ({ id, label, checked = false, onChange }: { id: string, label: string, checked?: boolean, onChange?: () => void, key?: React.Key }) => (
  <label className="flex items-center gap-3 cursor-pointer group">
    <div className="relative">
      <input 
        type="checkbox" 
        className="peer sr-only" 
        checked={checked} 
        onChange={onChange}
        readOnly={!onChange}
      />
      <div className="w-5 h-5 border-2 border-gray-200 rounded-md peer-checked:bg-senac-orange peer-checked:border-senac-orange transition-all"></div>
      <CheckIcon className="absolute top-1 left-1 transform scale-0 peer-checked:scale-100 transition-transform text-white" />
    </div>
    <span className="text-sm font-semibold text-gray-500 group-hover:text-senac-blue transition-colors">{label}</span>
  </label>
);

const CheckIcon = ({ className }: { className?: string }) => (
  <svg className={className} width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

interface SidebarProps {
  isMobile?: boolean;
  selectedYears: number[];
  onYearChange: (y: number) => void;
  selectedODS: number[];
  onODSChange: (id: number) => void;
  selectedCEPs: string[];
  onCEPChange: (c: string) => void;
}

export const Sidebar = ({ 
  isMobile = false, 
  selectedYears, onYearChange,
  selectedODS, onODSChange,
  selectedCEPs, onCEPChange
}: SidebarProps) => (
  <aside className={`${isMobile ? 'p-6' : 'w-72 flex-shrink-0 sticky top-28 h-[calc(100vh-140px)] overflow-y-auto pr-4'}`}>
    <div className="flex items-center gap-2 mb-8 text-senac-blue bg-blue-50/50 p-3 rounded-xl border border-blue-100">
      <Filter className="text-senac-orange" size={20} />
      <h2 className="font-black text-xs uppercase tracking-[0.2em]">Refinar Busca</h2>
    </div>

    <FilterSection title="Ano do Edital">
      {[2025, 2024, 2023, 2022].map(year => (
        <Checkbox 
          key={year} 
          id={`year-${year}`} 
          label={year.toString()} 
          checked={selectedYears.includes(year)}
          onChange={() => onYearChange(year)}
        />
      ))}
    </FilterSection>

    <FilterSection title="Objetivos da ONU (ODS)">
      {[3, 4, 8, 12].map(id => (
        <Checkbox 
          key={id} 
          id={`ods-${id}`} 
          label={`ODS ${id} - ${ODS_DATA[id].label.split(' ')[0]}...`} 
          checked={selectedODS.includes(id)}
          onChange={() => onODSChange(id)}
        />
      ))}
      <button className="text-[10px] font-black uppercase tracking-widest text-senac-orange hover:underline pt-2">Ver todos os 17 ODS</button>
    </FilterSection>

    <FilterSection title="Unidade (CEP)">
      {['Alecrim', 'Centro', 'Zona Sul', 'Zona Norte', 'Barreira Roxa'].map(cep => (
        <Checkbox 
          key={cep} 
          id={`cep-${cep}`} 
          label={cep} 
          checked={selectedCEPs.includes(cep)}
          onChange={() => onCEPChange(cep)}
        />
      ))}
      <button className="text-[10px] font-black uppercase tracking-widest text-senac-orange hover:underline pt-2">Ver pólos do interior</button>
    </FilterSection>

    <FilterSection title="Eixo / Segmento">
      {['Gestão', 'TI', 'Saúde', 'Turismo'].map(seg => (
        <Checkbox key={seg} id={`seg-${seg}`} label={seg} />
      ))}
    </FilterSection>

    <FilterSection title="Marcas Formativas">
      {['Autonomia Digital', 'Atitude Sustentável', 'Visão Crítica'].map(brand => (
        <Checkbox key={brand} id={`brand-${brand}`} label={brand} />
      ))}
    </FilterSection>
  </aside>
);

// --- Card Component ---
export const PracticeCard = ({ practice }: { practice: Practice, key?: React.Key }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -5, boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)' }}
      className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col h-full transition-all duration-300"
    >
      <div className="flex flex-wrap gap-1.5 mb-4">
        {practice.ods.map(odsId => {
          const ods = ODS_DATA[odsId];
          return (
            <span 
              key={odsId}
              style={{ backgroundColor: ods.color }}
              className="text-[10px] font-bold text-white px-2 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-1 shadow-sm"
            >
              <Globe size={10} />
              ODS {odsId}
            </span>
          );
        })}
      </div>

      <h3 className="font-bold text-lg text-senac-blue leading-tight mb-4 flex-grow">
        {practice.title}
      </h3>

      <div className="space-y-2 mb-6">
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <MapPin size={16} className="text-senac-orange" />
          <span className="font-medium text-gray-700">CEP: {practice.unit}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <User size={16} className="text-senac-orange" />
          <span>Instrutor: <span className="font-semibold text-gray-700">{practice.instructor}</span></span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Tag size={16} className="text-senac-orange" />
          <span>Segmento: <span className="font-semibold text-gray-700">{practice.segment}</span></span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 mt-auto pt-4 border-t border-gray-50">
        <button className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg border-2 border-gray-200 text-gray-600 font-bold text-xs hover:border-senac-blue hover:text-senac-blue hover:bg-gray-50 transition-all group">
          <BookOpen size={14} className="group-hover:scale-110 transition-transform" />
          Leia Resumo
        </button>
        <button className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg bg-senac-blue text-white font-bold text-xs hover:bg-senac-blue/90 shadow-md shadow-senac-blue/20 transition-all group">
          <Download size={14} className="group-hover:translate-y-0.5 transition-transform" />
          Baixar PDF
        </button>
      </div>
    </motion.div>
  );
};
