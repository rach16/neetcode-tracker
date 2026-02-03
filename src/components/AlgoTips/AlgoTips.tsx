import React, { useState, useMemo } from 'react';
import { Pattern, Category, CATEGORY_INFO } from '../../types';
import { algoTips, getAllPatterns } from '../../data/algoTips';
import { TipCard } from './TipCard';
import { PatternCheatSheet } from './PatternCheatSheet';

export const AlgoTips: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPattern, setSelectedPattern] = useState<Pattern | 'all'>('all');
  const [selectedCategory, setSelectedCategory] = useState<Category | 'all'>('all');
  const [groupByCategory, setGroupByCategory] = useState(true);

  const patterns = useMemo(() => getAllPatterns(), []);

  const filteredTips = useMemo(() => {
    return algoTips.filter((tip) => {
      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesSearch =
          tip.problemName.toLowerCase().includes(query) ||
          tip.oneLiner.toLowerCase().includes(query) ||
          tip.pattern.toLowerCase().includes(query) ||
          (tip.memoryHook?.toLowerCase().includes(query) ?? false);
        if (!matchesSearch) return false;
      }

      // Pattern filter
      if (selectedPattern !== 'all' && tip.pattern !== selectedPattern) {
        return false;
      }

      // Category filter
      if (selectedCategory !== 'all' && tip.category !== selectedCategory) {
        return false;
      }

      return true;
    });
  }, [searchQuery, selectedPattern, selectedCategory]);

  // Group tips by category following NeetCode roadmap order
  const groupedTips = useMemo(() => {
    if (!groupByCategory || selectedCategory !== 'all') {
      return null;
    }

    const groups: { category: Category; name: string; tips: typeof filteredTips }[] = [];

    CATEGORY_INFO.forEach((catInfo) => {
      const categoryTips = filteredTips.filter((tip) => tip.category === catInfo.id);
      if (categoryTips.length > 0) {
        groups.push({
          category: catInfo.id,
          name: catInfo.name,
          tips: categoryTips,
        });
      }
    });

    return groups;
  }, [filteredTips, groupByCategory, selectedCategory]);

  const handlePatternClick = (pattern: Pattern) => {
    setSelectedPattern(pattern);
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedPattern('all');
    setSelectedCategory('all');
  };

  const hasFilters = searchQuery || selectedPattern !== 'all' || selectedCategory !== 'all';

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-4 pb-0">
        <h1 className="text-2xl font-bold text-[var(--color-text-primary)]">Algo Tips</h1>
        <p className="text-sm text-[var(--color-text-secondary)] mt-1">
          Quick insights for 150 problems - NeetCode Roadmap Order
        </p>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 pb-24 md:pb-4">
        {/* Pattern Cheat Sheet */}
        <PatternCheatSheet onPatternClick={handlePatternClick} />

        {/* Search */}
        <div className="relative">
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--color-text-secondary)]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            type="text"
            placeholder="Search problems, patterns, or tips..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-[var(--color-bg-secondary)] border border-[var(--color-bg-tertiary)] rounded-xl text-[var(--color-text-primary)] placeholder-[var(--color-text-secondary)] focus:outline-none focus:border-[var(--color-accent)]"
          />
        </div>

        {/* Filters */}
        <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
          {/* Group by Category Toggle */}
          <button
            onClick={() => setGroupByCategory(!groupByCategory)}
            className={`px-3 py-2 rounded-lg text-sm font-medium flex-shrink-0 transition-colors ${
              groupByCategory
                ? 'bg-[var(--color-accent)] text-white'
                : 'bg-[var(--color-bg-secondary)] border border-[var(--color-bg-tertiary)] text-[var(--color-text-primary)]'
            }`}
          >
            📚 Roadmap
          </button>

          {/* Pattern Filter */}
          <select
            value={selectedPattern}
            onChange={(e) => setSelectedPattern(e.target.value as Pattern | 'all')}
            className="px-3 py-2 bg-[var(--color-bg-secondary)] border border-[var(--color-bg-tertiary)] rounded-lg text-sm text-[var(--color-text-primary)] focus:outline-none focus:border-[var(--color-accent)] flex-shrink-0"
          >
            <option value="all">All Patterns</option>
            {patterns.map((pattern) => (
              <option key={pattern} value={pattern}>
                {pattern}
              </option>
            ))}
          </select>

          {/* Category Filter */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value as Category | 'all')}
            className="px-3 py-2 bg-[var(--color-bg-secondary)] border border-[var(--color-bg-tertiary)] rounded-lg text-sm text-[var(--color-text-primary)] focus:outline-none focus:border-[var(--color-accent)] flex-shrink-0"
          >
            <option value="all">All Categories</option>
            {CATEGORY_INFO.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>

          {/* Clear Filters */}
          {hasFilters && (
            <button
              onClick={clearFilters}
              className="px-3 py-2 bg-[var(--color-accent)]/20 text-[var(--color-accent)] rounded-lg text-sm font-medium flex-shrink-0"
            >
              Clear
            </button>
          )}
        </div>

        {/* Results count */}
        <p className="text-sm text-[var(--color-text-secondary)]">
          {filteredTips.length} tip{filteredTips.length !== 1 ? 's' : ''} found
        </p>

        {/* Tips List - Grouped by Category */}
        {groupedTips ? (
          <div className="space-y-6">
            {groupedTips.map(({ category, name, tips }, index) => (
              <div key={category}>
                {/* Category Header */}
                <div className="flex items-center gap-3 mb-3 sticky top-0 bg-[var(--color-bg-primary)] py-2 z-10">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[var(--color-accent)]/20 text-[var(--color-accent)] text-sm font-bold">
                    {index + 1}
                  </span>
                  <div>
                    <h2 className="font-bold text-[var(--color-text-primary)]">{name}</h2>
                    <p className="text-xs text-[var(--color-text-secondary)]">
                      {tips.length} problem{tips.length !== 1 ? 's' : ''}
                    </p>
                  </div>
                </div>

                {/* Category Tips */}
                <div className="space-y-3 pl-2 border-l-2 border-[var(--color-bg-tertiary)] ml-4">
                  {tips.map((tip) => (
                    <TipCard key={tip.problemId} tip={tip} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Flat List */
          <div className="space-y-3">
            {filteredTips.map((tip) => (
              <TipCard key={tip.problemId} tip={tip} />
            ))}
          </div>
        )}

        {/* Empty state */}
        {filteredTips.length === 0 && (
          <div className="text-center py-12">
            <p className="text-4xl mb-4">🔍</p>
            <p className="text-[var(--color-text-secondary)]">No tips found matching your filters</p>
            <button
              onClick={clearFilters}
              className="mt-4 px-4 py-2 bg-[var(--color-accent)] text-white rounded-lg text-sm font-medium"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
