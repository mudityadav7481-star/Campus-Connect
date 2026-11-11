import React, { useState, useEffect } from 'react';
import { useEvents } from '../context/EventContext';
import { useDebounce } from '../hooks/useDebounce';
import EventGrid from '../components/events/EventGrid';
import SearchBar from '../components/events/SearchBar';
import CategoryPills from '../components/events/CategoryPills';
import DateFilter from '../components/events/DateFilter';
import Select from '../components/common/Select';
import { SlidersHorizontal, X } from 'lucide-react';

const SORT_OPTIONS = [
  { value: 'date-asc', label: 'Earliest Date First' },
  { value: 'date-desc', label: 'Latest Date First' },
  { value: 'title-asc', label: 'Alphabetical (A-Z)' },
  { value: 'capacity-desc', label: 'Highest Capacity' },
];

export default function EventsPage() {
  const {
    filteredEvents,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    selectedDateFilter,
    setSelectedDateFilter,
    sortBy,
    setSortBy,
  } = useEvents();

  const [searchInput, setSearchInput] = useState(searchQuery);
  const debouncedSearch = useDebounce(searchInput, 200);

  useEffect(() => {
    setSearchQuery(debouncedSearch);
  }, [debouncedSearch, setSearchQuery]);

  const handleResetFilters = () => {
    setSearchInput('');
    setSearchQuery('');
    setSelectedCategory('All');
    setSelectedDateFilter('All');
    setSortBy('date-asc');
  };

  const hasActiveFilters =
    searchQuery.trim() !== '' ||
    selectedCategory !== 'All' ||
    selectedDateFilter !== 'All';

  return (
    <div className="space-y-8 pb-16">
      
      {/* Header Section */}
      <div className="space-y-2">
        <h1 className="text-3xl font-black text-white tracking-tight sm:text-4xl">
          Discover Campus Events
        </h1>
        <p className="text-sm sm:text-base text-slate-400 max-w-2xl">
          Search and filter through university activities, technical hackathons, cultural festivals, and career workshops.
        </p>
      </div>

      {/* Control Bar: Search & Sort */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
        <div className="flex-1">
          <SearchBar
            value={searchInput}
            onChange={setSearchInput}
            onClear={() => {
              setSearchInput('');
              setSearchQuery('');
            }}
          />
        </div>

        <div className="w-full sm:w-56 shrink-0">
          <Select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            options={SORT_OPTIONS}
            className="w-full"
          />
        </div>
      </div>

      {/* Categories Bar */}
      <div className="space-y-3">
        <CategoryPills
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />

        {/* Secondary Filters Bar: Date & Reset */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
          <DateFilter
            selectedDate={selectedDateFilter}
            onSelectDate={setSelectedDateFilter}
          />

          <div className="flex items-center gap-3 text-xs text-slate-400 font-medium">
            <span>
              Showing <strong className="text-white font-bold">{filteredEvents.length}</strong>{' '}
              {filteredEvents.length === 1 ? 'event' : 'events'}
            </span>

            {hasActiveFilters && (
              <button
                type="button"
                onClick={handleResetFilters}
                className="inline-flex items-center gap-1 text-rose-400 hover:text-rose-300 font-bold bg-rose-950/60 border border-rose-800/60 px-2.5 py-1 rounded-lg transition-colors cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
                <span>Reset Filters</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Events Grid */}
      <EventGrid
        events={filteredEvents}
        onResetFilters={handleResetFilters}
      />

    </div>
  );
}
