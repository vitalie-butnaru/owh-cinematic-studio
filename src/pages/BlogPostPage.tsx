import { useParams, Link } from 'react-router-dom';
import HeaderNew from '@/components/HeaderNew';
import Footer from '@/components/Footer';
import { usePost, usePosts } from '@/hooks/wordpress';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Loader2, Calendar, Clock, User, ArrowLeft, Share2 } from 'lucide-react';
import { format } from 'date-fns';
import { ro } from 'date-fns/locale';

const BlogPostPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const { data: post, isLoading } = usePost(slug!);
  const { data: relatedPosts } = usePosts({ per_page: 3 });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-12 h-12 animate-spin text-primary" />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-background">
        <HeaderNew />
        <div className="container mx-auto px-4 py-24 text-center">
          <h1 className="text-4xl font-heading font-bold mb-4">
            Articolul nu a fost găsit
          </h1>
          <Link to="/blog">
            <Button>Înapoi la Blog</Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';

  return (
    <div className="min-h-screen bg-background">
      <HeaderNew />

      <article className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          {/* Back Button */}
          <Link to="/blog">
            <Button variant="ghost" className="mb-8 hover-lift">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Înapoi la Blog
            </Button>
          </Link>

          {/* Article Header */}
          <div className="max-w-4xl mx-auto mb-12">
            {/* Categories */}
            <div className="flex flex-wrap gap-2 mb-6">
              {post.categories.map((category) => (
                <Link key={category.id} to={`/blog/category/${category.slug}`}>
                  <Badge variant="secondary" className="hover:bg-primary hover:text-white transition-colors">
                    {category.name}
                  </Badge>
                </Link>
              ))}
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-6xl font-heading font-bold mb-6 animate-fade-up">
              {post.title}
            </h1>

            {/* Meta Info */}
            <div className="flex flex-wrap items-center gap-6 text-muted-foreground mb-8">
              <div className="flex items-center gap-2">
                <User className="w-5 h-5" />
                <span className="font-medium">{post.author.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                <span>{format(new Date(post.published_date), 'dd MMMM yyyy', { locale: ro })}</span>
              </div>
              {post.read_time && (
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  <span>{post.read_time} min lectură</span>
                </div>
              )}
            </div>

            {/* Share Button */}
            <Button
              variant="outline"
              onClick={() => {
                if (navigator.share) {
                  navigator.share({
                    title: post.title,
                    text: post.excerpt,
                    url: shareUrl,
                  });
                }
              }}
              className="mb-8"
            >
              <Share2 className="w-4 h-4 mr-2" />
              Distribuie
            </Button>
          </div>

          {/* Featured Image */}
          {post.featured_image && (
            <div className="max-w-5xl mx-auto mb-12 animate-fade-up">
              <div className="relative aspect-video rounded-2xl overflow-hidden shadow-card">
                <img
                  src={post.featured_image}
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          )}

          {/* Article Content */}
          <div className="max-w-3xl mx-auto">
            <div 
              className="prose prose-lg prose-invert max-w-none animate-fade-up"
              dangerouslySetInnerHTML={{ __html: post.content }}
              style={{ animationDelay: '0.2s' }}
            />

            {/* Tags */}
            {post.tags.length > 0 && (
              <div className="mt-12 pt-8 border-t border-border">
                <h3 className="text-lg font-heading font-bold mb-4">Taguri:</h3>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <Link key={tag.id} to={`/blog/tag/${tag.slug}`}>
                      <Badge variant="outline" className="hover:bg-primary hover:text-white transition-colors">
                        #{tag.name}
                      </Badge>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Author Bio */}
            {post.author.bio && (
              <div className="mt-12 p-6 rounded-xl bg-card/50 backdrop-blur border border-border">
                <div className="flex items-center gap-4 mb-4">
                  {post.author.avatar && (
                    <img
                      src={post.author.avatar}
                      alt={post.author.name}
                      className="w-16 h-16 rounded-full"
                    />
                  )}
                  <div>
                    <h3 className="font-heading font-bold text-xl">
                      {post.author.name}
                    </h3>
                    <p className="text-muted-foreground">Autor</p>
                  </div>
                </div>
                <p className="text-muted-foreground">{post.author.bio}</p>
              </div>
            )}
          </div>

          {/* Related Posts */}
          {relatedPosts && relatedPosts.length > 0 && (
            <div className="max-w-5xl mx-auto mt-20">
              <Separator className="mb-12" />
              <h2 className="text-3xl font-heading font-bold mb-8 text-center">
                Articole Similare
              </h2>
              <div className="grid md:grid-cols-3 gap-8">
                {relatedPosts.slice(0, 3).map((relatedPost) => (
                  <Link
                    key={relatedPost.id}
                    to={`/blog/${relatedPost.slug}`}
                    className="group hover-lift"
                  >
                    <div className="relative overflow-hidden rounded-lg aspect-video bg-cinema-dark mb-4">
                      {relatedPost.featured_image ? (
                        <img
                          src={relatedPost.featured_image}
                          alt={relatedPost.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/20 to-accent/20">
                          <span className="text-4xl opacity-20">📝</span>
                        </div>
                      )}
                    </div>
                    <h3 className="text-xl font-heading font-bold group-hover:text-primary transition-colors line-clamp-2">
                      {relatedPost.title}
                    </h3>
                    <p className="text-muted-foreground text-sm mt-2">
                      {format(new Date(relatedPost.published_date), 'dd MMM yyyy', { locale: ro })}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </article>

      <Footer />
    </div>
  );
};

export default BlogPostPage;
