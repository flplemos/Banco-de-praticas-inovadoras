/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { LayoutGrid, List, ChevronDown, Filter as FilterIcon, X, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Header, Hero, Sidebar, PracticeCard } from './components/SENACComponents';
import { PRACTICES } from './types';

export default function App() {
  const [navMenuOpen, setNavMenuOpen] = useState(false);
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);
  const [sortBy, setSortBy] = useState('recentes');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedYears, setSelectedYears] = useState<number[]>([]);
  const [selectedODS, setSelectedODS] = useState<number[]>([]);
  const [selectedCEPs, setSelectedCEPs] = useState<string[]>([]);

  const filteredPractices = PRACTICES.filter(practice => {
    const matchesSearch = 
      practice.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      practice.instructor.toLowerCase().includes(searchQuery.toLowerCase()) ||
      practice.segment.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesYear = selectedYears.length === 0 || selectedYears.includes(practice.year);
    const matchesODS = selectedODS.length === 0 || practice.ods.some(id => selectedODS.includes(id));
    const matchesCEP = selectedCEPs.length === 0 || selectedCEPs.includes(practice.unit);

    return matchesSearch && matchesYear && matchesODS && matchesCEP;
  });

  const sortedPractices = [...filteredPractices].sort((a, b) => {
    if (sortBy === 'az') return a.title.localeCompare(b.title);
    if (sortBy === 'antigas') return a.year - b.year;
    return b.year - a.year; // recentes
  });

  const handleYearChange = (year: number) => {
    setSelectedYears(prev => prev.includes(year) ? prev.filter(y => y !== year) : [...prev, year]);
  };

  const handleODSChange = (id: number) => {
    setSelectedODS(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const handleCEPChange = (cep: string) => {
    setSelectedCEPs(prev => prev.includes(cep) ? prev.filter(c => c !== cep) : [...prev, cep]);
  };

  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Header onOpenMenu={() => setNavMenuOpen(true)} />
      
      <main className="flex-grow">
        <Hero 
          searchQuery={searchQuery} 
          setSearchQuery={setSearchQuery} 
        />

        <div className="max-w-7xl mx-auto px-4 py-8 lg:py-12">
          {/* Mobile Filter Trigger - Re-positioned below Hero */}
          <div className="lg:hidden mb-8">
            <button 
              onClick={() => setFilterDrawerOpen(true)}
              className="w-full flex items-center justify-between p-4 bg-white border-2 border-senac-orange/20 rounded-2xl font-bold text-senac-blue shadow-lg shadow-senac-orange/5"
            >
              <div className="flex items-center gap-3">
                <div className="bg-senac-orange p-2 rounded-lg text-white">
                  <FilterIcon size={20} />
                </div>
                <div className="flex flex-col items-start translate-y-[-1px]">
                  <span className="text-xs text-gray-400 uppercase tracking-widest font-black leading-none mb-1">Filtrar por</span>
                  <span className="text-sm">Ano, ODS, Unidade...</span>
                </div>
              </div>
              <div className="bg-senac-blue/5 px-3 py-1 rounded-full text-xs font-black text-senac-blue whitespace-nowrap">
                {selectedYears.length + selectedODS.length + selectedCEPs.length} ativos
              </div>
            </button>
          </div>

          <div className="flex flex-col lg:flex-row gap-10">
            
            {/* Desktop Sidebar */}
            <div className="hidden lg:block">
              <Sidebar 
                selectedYears={selectedYears} onYearChange={handleYearChange}
                selectedODS={selectedODS} onODSChange={handleODSChange}
                selectedCEPs={selectedCEPs} onCEPChange={handleCEPChange}
              />
            </div>

            {/* Main Content Area */}
            <div className="flex-grow flex flex-col gap-6">
              {/* Toolbar */}
              <div className="flex items-center justify-between bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
                <div className="flex items-center gap-2">
                  <span className="text-gray-400 font-medium whitespace-nowrap">Exibindo</span>
                  <span className="bg-blue-50 text-senac-blue px-2.5 py-0.5 rounded-full font-bold text-sm whitespace-nowrap">
                    {sortedPractices.length} práticas
                  </span>
                </div>

                <div className="flex items-center gap-4">
                  <div className="hidden sm:flex items-center gap-1 bg-gray-50 p-1 rounded-lg">
                    <button className="p-1.5 rounded-md bg-white text-senac-blue shadow-sm">
                      <LayoutGrid size={18} />
                    </button>
                    <button className="p-1.5 rounded-md text-gray-400 hover:text-gray-600">
                      <List size={18} />
                    </button>
                  </div>

                  <div className="h-6 w-px bg-gray-100 hidden sm:block" />

                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-gray-400 uppercase hidden sm:block whitespace-nowrap">Ordenar:</span>
                    <div className="relative">
                      <select 
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="appearance-none bg-gray-50 border border-transparent hover:border-gray-200 py-2 pl-3 pr-10 rounded-xl text-sm font-bold text-senac-blue focus:outline-none focus:ring-2 focus:ring-senac-blue/10 cursor-pointer transition-all"
                      >
                        <option value="recentes">Mais Recentes</option>
                        <option value="antigas">Mais Antigas</option>
                        <option value="az">A-Z</option>
                      </select>
                      <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-senac-blue pointer-events-none" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {sortedPractices.map((practice) => (
                  <PracticeCard key={practice.id} practice={practice} />
                ))}
                
                {/* Empty State */}
                {sortedPractices.length === 0 && (
                  <div className="col-span-full py-20 text-center space-y-4 bg-white rounded-3xl border border-dashed border-gray-200">
                    <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto text-gray-300">
                      <Search size={40} />
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-xl font-bold text-gray-700">Nenhuma prática encontrada</h3>
                      <p className="text-gray-500">Tente ajustar seus filtros ou mudar os termos da busca.</p>
                    </div>
                    <button 
                      onClick={() => {
                        setSearchQuery('');
                        setSelectedYears([]);
                        setSelectedODS([]);
                        setSelectedCEPs([]);
                      }}
                      className="text-senac-orange font-bold hover:underline"
                    >
                      Limpar todos os filtros
                    </button>
                  </div>
                )}
              </div>

              {/* Pagination */}
              {sortedPractices.length > 0 && (
                <div className="mt-12 flex justify-center">
                  <nav className="flex items-center gap-2">
                    <button className="p-2 rounded-lg text-gray-400 hover:bg-gray-100 disabled:opacity-30" disabled>
                      <ChevronDown className="rotate-90" size={20} />
                    </button>
                    {[1, 2, 3].map((page, i) => (
                      <button 
                        key={i}
                        className={`w-10 h-10 rounded-lg font-bold text-sm transition-all ${
                          page === 1 
                            ? 'bg-senac-blue text-white shadow-lg shadow-senac-blue/20' 
                            : 'text-gray-500 hover:bg-gray-100'
                        }`}
                      >
                        {page}
                      </button>
                    ))}
                    <button className="p-2 rounded-lg text-senac-blue hover:bg-gray-100">
                      <ChevronDown className="-rotate-90" size={20} />
                    </button>
                  </nav>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-100 py-12 mt-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex flex-col items-center md:items-start gap-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-senac-blue rounded flex items-center justify-center text-white font-bold text-sm">SL</div>
                <span className="font-bold text-lg tracking-tight text-senac-blue">Senac Labs</span>
              </div>
              <p className="text-sm text-gray-400 max-w-sm text-center md:text-left">
                Transformando a educação através de metodologias ativas e práticas inovadoras.
              </p>
            </div>
            <div className="flex gap-10">
              <div className="space-y-4">
                <h4 className="font-bold text-sm text-senac-blue uppercase tracking-widest">Plataforma</h4>
                <ul className="space-y-2 text-sm text-gray-500">
                  <li><a href="#" className="hover:text-senac-orange transition-colors">Sobre</a></li>
                  <li><a href="#" className="hover:text-senac-orange transition-colors">Ajuda</a></li>
                  <li><a href="#" className="hover:text-senac-orange transition-colors">Privacidade</a></li>
                </ul>
              </div>
              <div className="space-y-4">
                <h4 className="font-bold text-sm text-senac-blue uppercase tracking-widest">Contato</h4>
                <ul className="space-y-2 text-sm text-gray-500">
                  <li>Email: labs.rn@senac.br</li>
                  <li>Tel: (84) 4005-1000</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-gray-50 text-center">
            <p className="text-xs text-gray-400 font-medium italic">
              &copy; 2024 Senac Rio Grande do Norte. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </footer>

      {/* Mobile Drawer - NAVIGATION (Hamburger Menu) */}
      <AnimatePresence>
        {navMenuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setNavMenuOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
            />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-full max-w-xs bg-white z-[101] shadow-2xl flex flex-col"
            >
              <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-[#ffb84d]">
                <div className="flex items-center gap-2">
                  <div className="bg-senac-blue p-1 rounded">
                    <X className="text-white rotate-45" size={16} />
                  </div>
                  <span className="font-black text-[#003366] uppercase tracking-tighter">Navegação</span>
                </div>
                <button 
                  onClick={() => setNavMenuOpen(false)}
                  className="p-2 text-[#003366] hover:bg-white/20 rounded-full"
                >
                  <X size={24} />
                </button>
              </div>
              <nav className="flex-grow p-8 space-y-6">
                {['Início', 'Sobre', 'Edital', 'Práticas', 'E-books', 'Contato'].map((item) => (
                  <a 
                    key={item}
                    href="#" 
                    onClick={() => setNavMenuOpen(false)}
                    className={`block font-black text-xl uppercase tracking-tighter transition-colors ${
                      item === 'Práticas' ? 'text-senac-orange' : 'text-senac-blue hover:text-senac-orange'
                    }`}
                  >
                    {item}
                  </a>
                ))}
              </nav>
              <div className="p-8 border-t border-gray-100 italic text-gray-400 text-xs">
                &copy; 2024 Senac Labs RN
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Mobile Drawer - FILTERS */}
      <AnimatePresence>
        {filterDrawerOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setFilterDrawerOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
            />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-full max-w-xs bg-white z-[101] shadow-2xl flex flex-col"
            >
              <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                <div className="flex items-center gap-2 text-senac-blue">
                  <FilterIcon className="text-senac-orange" size={20} />
                  <span className="font-black text-xs uppercase tracking-widest">Filtros Avançados</span>
                </div>
                <button 
                  onClick={() => setFilterDrawerOpen(false)}
                  className="p-2 text-gray-400 hover:text-gray-600"
                >
                  <X size={20} />
                </button>
              </div>
              <div className="flex-grow overflow-y-auto">
                <Sidebar 
                  isMobile 
                  selectedYears={selectedYears} onYearChange={handleYearChange}
                  selectedODS={selectedODS} onODSChange={handleODSChange}
                  selectedCEPs={selectedCEPs} onCEPChange={handleCEPChange}
                />
              </div>
              <div className="p-6 border-t border-gray-100 bg-gray-50 flex gap-3">
                <button 
                  onClick={() => {
                    setSelectedYears([]);
                    setSelectedODS([]);
                    setSelectedCEPs([]);
                  }}
                  className="flex-1 bg-white border border-gray-200 py-3 rounded-xl font-bold text-gray-500 text-sm"
                >
                  Limpar
                </button>
                <button 
                  onClick={() => setFilterDrawerOpen(false)}
                  className="flex-2 bg-senac-blue text-white py-3 rounded-xl font-bold shadow-lg shadow-senac-blue/20"
                >
                  Aplicar
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

    </div>
  );
}

