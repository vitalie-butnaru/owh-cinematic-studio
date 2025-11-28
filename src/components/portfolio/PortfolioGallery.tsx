import { useState, useMemo } from 'react';
import { useInfiniteProductions } from '@/hooks/wordpress';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Loader2, Search, Filter, SlidersHorizontal, Play } from 'lucide-react';
import { PRODUCTION_CATEGORIES } from '@/config/wordpress';
import type { WordPressProduction } from '@/types/wordpress';
import { Link } from 'react-router-dom';

interface PortfolioGalleryProps {
  showFilters?: boolean;
  showSearch?: boolean;
  limit?: number;
}

function PortfolioGallery({ 
  showFilters = true, 
  showSearch = true,
  limit 
}: PortfolioGalleryProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedYear, setSelectedYear] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'date' | 'title' | 'year'>('year');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = useInfiniteProductions({
    search: searchTerm || undefined,
    category: selectedCategory !== 'all' ? selectedCategory : undefined,
    orderby: sortBy,
    order: sortOrder,
  });

  const allProductions = data?.pages.flatMap((page) => page.data) || [];
  
  // Filter and sort productions
  const filteredProductions = useMemo(() => {
    let filtered = [...allProductions];

    // Year filter
    if (selectedYear !== 'all') {
      filtered = filtered.filter(p => p.year === parseInt(selectedYear));
    }

    // Apply limit if specified
    if (limit) {
      filtered = filtered.slice(0, limit);
    }

    return filtered;
  }, [allProductions, selectedYear, limit]);

  // Get unique years for filter
  const availableYears = useMemo(() => {
    const years = new Set(allProductions.map(p => p.year).filter(Boolean));
    return Array.from(years).sort((a, b) => b - a);
  }, [allProductions]);

  return (
    <div className="space-y-8">
      {/* Filters and Search */}
      {(showFilters || showSearch) && (
        <div className="space-y-4">
          {showSearch && (
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Caută producții..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 h-12 bg-card/50"
              />
            </div>
          )}

          {showFilters && (
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Category Filter */}
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="bg-card/50">
                  <SelectValue placeholder="Toate categoriile" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Toate categoriile</SelectItem>
                  {Object.entries(PRODUCTION_CATEGORIES).map(([key, { label }]) => (
                    <SelectItem key={key} value={key}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Year Filter */}
              <Select value={selectedYear} onValueChange={setSelectedYear}>
                <SelectTrigger className="bg-card/50">
                  <SelectValue placeholder="Toți anii" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Toți anii</SelectItem>
                  {availableYears.map((year) => (
                    <SelectItem key={year} value={year.toString()}>
                      {year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Sort By */}
              <Select value={sortBy} onValueChange={(value: any) => setSortBy(value)}>
                <SelectTrigger className="bg-card/50">
                  <SlidersHorizontal className="w-4 h-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="year">An</SelectItem>
                  <SelectItem value="title">Titlu</SelectItem>
                  <SelectItem value="date">Dată adăugare</SelectItem>
                </SelectContent>
              </Select>

              {/* Sort Order */}
              <Button
                variant="outline"
                onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                className="bg-card/50"
              >
                <Filter className="w-4 h-4 mr-2" />
                {sortOrder === 'asc' ? 'Crescător' : 'Descrescător'}
              </Button>
            </div>
          )}
        </div>
      )}

      {/* Results Count */}
      <div className="flex items-center justify-between">
        <p className="text-muted-foreground">
          {filteredProductions.length} {filteredProductions.length === 1 ? 'producție' : 'producții'}
        </p>
      </div>

      {/* Gallery Grid */}
      {isLoading ? (
        <div className="flex justify-center items-center min-h-[400px]">
          <Loader2 className="w-12 h-12 animate-spin text-primary" />
        </div>
      ) : filteredProductions.length === 0 ? (
        <div className="text-center py-20 bg-card/30 rounded-xl">
          <p className="text-xl text-muted-foreground">
            Nu au fost găsite producții
          </p>
        </div>
      ) : (
        <>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProductions.map((production, index) => (
              <PortfolioCard 
                key={production.id} 
                production={production}
                index={index}
              />
            ))}
          </div>

          {/* Load More */}
          {!limit && hasNextPage && (
            <div className="text-center mt-8">
              <Button
                size="lg"
                onClick={() => fetchNextPage()}
                disabled={isFetchingNextPage}
                className="shadow-glow"
              >
                {isFetchingNextPage ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Se încarcă...
                  </>
                ) : (
                  'Încarcă mai multe'
                )}
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

interface PortfolioCardProps {
  production: WordPressProduction;
  index: number;
}

function PortfolioCard({ production, index }: PortfolioCardProps) {
  const categoryLabel = PRODUCTION_CATEGORIES[production.category as keyof typeof PRODUCTION_CATEGORIES]?.label || production.category;

  return (
    <Link
      to={`/productie/${production.slug}`}
      className="group animate-fade-up hover-lift"
      style={{ animationDelay: `${(index % 12) * 0.05}s` }}
    >
      <div className="relative aspect-video rounded-xl overflow-hidden bg-cinema-dark shadow-card">
        <img
          src={production.gif_preview_url}
          alt={production.title}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-cinema-dark via-cinema-dark/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
            {/* Play Icon */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <div className="w-16 h-16 rounded-full bg-primary/90 flex items-center justify-center">
                <Play className="w-8 h-8 text-white ml-1" fill="currentColor" />
              </div>
            </div>
          </div>
        </div>

        {/* Badge */}
        <div className="absolute top-3 left-3 z-10">
          <Badge className="bg-primary/90 backdrop-blur text-white">
            {categoryLabel}
          </Badge>
        </div>

        {production.year && (
          <div className="absolute top-3 right-3 z-10">
            <Badge variant="secondary" className="bg-secondary/90 backdrop-blur">
              {production.year}
            </Badge>
          </div>
        )}
      </div>

      <div className="mt-3 space-y-2">
        <h3 className="font-heading font-bold text-lg group-hover:text-primary transition-colors line-clamp-2">
          {production.title}
        </h3>
        {production.client && (
          <p className="text-sm text-muted-foreground">
            Client: {production.client}
          </p>
        )}
      </div>
    </Link>
  );
}

export { PortfolioGallery };
export default PortfolioGallery;
