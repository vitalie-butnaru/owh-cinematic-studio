import { useState } from 'react';
import { Link } from 'react-router-dom';
import HeaderNew from '@/components/HeaderNew';
import Footer from '@/components/Footer';
import { useInfinitePosts, useCategories, useTags } from '@/hooks/wordpress';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Loader2, Search, Calendar, Clock, ArrowRight } from 'lucide-react';
import { format } from 'date-fns';
import { ro } from 'date-fns/locale';

const BlogPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  const { 
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading 
  } = useInfinitePosts({ 
    search: searchTerm || undefined,
    category: selectedCategory || undefined,
  });
  
  const { data: categories } = useCategories();
  const { data: tags } = useTags();

  const posts = data?.pages.flatMap(page => page.data) || [];

  return (
    <div className="min-h-screen bg-background">
      <HeaderNew />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-gradient-to-br from-cinema-dark via-background to-cinema-darker">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1499750310107-5fef28a66643')] bg-cover bg-center opacity-5" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center animate-fade-up">
            <h1 className="text-5xl md:text-7xl font-heading font-bold mb-6">
              <span className="gradient-text">Blog</span> OWH Studio
            </h1>
            <p className="text-xl text-muted-foreground mb-12">
              Povești, insights și behind-the-scenes din lumea producției video
            </p>

            {/* Search Bar */}
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Caută articole..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 h-14 text-lg bg-card/50 backdrop-blur"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Categories Filter */}
      {categories && categories.length > 0 && (
        <section className="py-8 border-b border-border bg-card/30">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap gap-3 justify-center">
              <Button
                variant={!selectedCategory ? 'default' : 'outline'}
                onClick={() => setSelectedCategory(null)}
                size="sm"
              >
                Toate
              </Button>
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.slug ? 'default' : 'outline'}
                  onClick={() => setSelectedCategory(category.slug)}
                  size="sm"
                >
                  {category.name}
                  {category.count && (
                    <Badge variant="secondary" className="ml-2">
                      {category.count}
                    </Badge>
                  )}
                </Button>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Posts Grid */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          {isLoading ? (
            <div className="flex justify-center items-center min-h-[400px]">
              <Loader2 className="w-12 h-12 animate-spin text-primary" />
            </div>
          ) : posts.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-xl text-muted-foreground">
                Nu au fost găsite articole
              </p>
            </div>
          ) : (
            <>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {posts.map((post, index) => (
                  <article
                    key={post.id}
                    className="group animate-fade-up hover-lift"
                    style={{ animationDelay: `${(index % 9) * 0.1}s` }}
                  >
                    <Link to={`/blog/${post.slug}`}>
                      <div className="relative overflow-hidden rounded-xl aspect-video bg-cinema-dark mb-4">
                        {post.featured_image ? (
                          <img
                            src={post.featured_image}
                            alt={post.title}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/20 to-accent/20">
                            <span className="text-6xl opacity-20">📝</span>
                          </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-cinema-dark via-cinema-dark/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>

                      <div className="space-y-3">
                        {/* Meta */}
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {format(new Date(post.published_date), 'dd MMM yyyy', { locale: ro })}
                          </span>
                          {post.read_time && (
                            <span className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              {post.read_time} min
                            </span>
                          )}
                        </div>

                        {/* Categories */}
                        {post.categories.length > 0 && (
                          <div className="flex flex-wrap gap-2">
                            {post.categories.map((cat) => (
                              <Badge key={cat.id} variant="secondary" className="text-xs">
                                {cat.name}
                              </Badge>
                            ))}
                          </div>
                        )}

                        {/* Title */}
                        <h2 className="text-2xl font-heading font-bold group-hover:text-primary transition-colors line-clamp-2">
                          {post.title}
                        </h2>

                        {/* Excerpt */}
                        <p className="text-muted-foreground line-clamp-3">
                          {post.excerpt}
                        </p>

                        {/* Read More */}
                        <div className="flex items-center gap-2 text-primary font-medium pt-2">
                          Citește mai mult
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                        </div>
                      </div>
                    </Link>
                  </article>
                ))}
              </div>

              {/* Load More */}
              {hasNextPage && (
                <div className="text-center mt-16">
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
                      'Încarcă mai multe articole'
                    )}
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* Popular Tags */}
      {tags && tags.length > 0 && (
        <section className="py-16 bg-card/30">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-heading font-bold mb-8 text-center">
              Taguri Populare
            </h2>
            <div className="flex flex-wrap gap-3 justify-center max-w-4xl mx-auto">
              {tags.map((tag) => (
                <Link key={tag.id} to={`/blog/tag/${tag.slug}`}>
                  <Badge variant="outline" className="text-base px-4 py-2 hover:bg-primary hover:text-white transition-colors">
                    #{tag.name}
                    {tag.count && ` (${tag.count})`}
                  </Badge>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
};

export default BlogPage;
