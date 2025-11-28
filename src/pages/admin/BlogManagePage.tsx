import { useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { usePosts } from "@/hooks/wordpress";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText, Search, Calendar, Eye, Edit, Trash2, ExternalLink } from "lucide-react";
import { format } from "date-fns";
import { ro } from "date-fns/locale";
import { useToast } from "@/hooks/use-toast";

const BlogManagePage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { data: posts, isLoading } = usePosts({ per_page: 50 });
  const { toast } = useToast();

  const filteredPosts = posts?.filter((post) =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.excerpt?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleEdit = (slug: string) => {
    // Open WordPress admin in new tab
    window.open(`https://cms.owh.md/wp-admin/post.php?post=${slug}&action=edit`, "_blank");
    toast({
      title: "Editor WordPress",
      description: "Editează articolul în WordPress CMS",
    });
  };

  const handleView = (slug: string) => {
    window.open(`/blog/${slug}`, "_blank");
  };

  return (
    <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-4xl font-heading font-bold mb-2">
              Gestionare <span className="gradient-text">Blog</span>
            </h1>
            <p className="text-muted-foreground">
              Administrează articolele de blog din WordPress CMS
            </p>
          </div>
          <Button
            size="lg"
            onClick={() => window.open("https://cms.owh.md/wp-admin/post-new.php", "_blank")}
            className="shadow-glow"
          >
            <FileText className="w-5 h-5 mr-2" />
            Articol Nou în WordPress
          </Button>
        </div>

        {/* Search and Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="md:col-span-3">
            <CardContent className="p-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  placeholder="Caută articole..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-3xl font-bold gradient-text mb-1">
                {posts?.length || 0}
              </div>
              <div className="text-sm text-muted-foreground">Total Articole</div>
            </CardContent>
          </Card>
        </div>

        {/* Posts Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Card key={i}>
                <Skeleton className="h-48 rounded-t-xl" />
                <CardContent className="p-6">
                  <Skeleton className="h-6 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-full mb-4" />
                  <Skeleton className="h-8 w-full" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : filteredPosts && filteredPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post) => (
              <Card key={post.id} className="hover-lift overflow-hidden group">
                <div className="aspect-video overflow-hidden bg-muted">
                  {post.featured_image ? (
                    <img
                      src={post.featured_image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <FileText className="w-16 h-16 text-muted-foreground/20" />
                    </div>
                  )}
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    {post.categories?.map((category) => (
                      <Badge key={category.id} variant="secondary">
                        {category.name}
                      </Badge>
                    ))}
                  </div>
                  <h3 className="text-xl font-heading font-bold mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground mb-4">
                    <Calendar className="w-4 h-4" />
                    {format(new Date(post.published_date), "d MMM yyyy", { locale: ro })}
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1"
                      onClick={() => handleView(post.slug)}
                    >
                      <Eye className="w-4 h-4 mr-1" />
                      Vezi
                    </Button>
                    <Button
                      variant="default"
                      size="sm"
                      className="flex-1"
                      onClick={() => handleEdit(post.slug)}
                    >
                      <Edit className="w-4 h-4 mr-1" />
                      Editează
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="p-12 text-center">
              <FileText className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">
                {searchQuery ? "Niciun articol găsit" : "Niciun articol disponibil"}
              </h3>
              <p className="text-muted-foreground mb-6">
                {searchQuery
                  ? "Încearcă să cauți altceva"
                  : "Creează primul articol de blog în WordPress"}
              </p>
              {!searchQuery && (
                <Button
                  onClick={() =>
                    window.open("https://cms.owh.md/wp-admin/post-new.php", "_blank")
                  }
                >
                  <FileText className="w-4 h-4 mr-2" />
                  Creează Articol
                </Button>
              )}
            </CardContent>
          </Card>
        )}

        {/* WordPress Integration Info */}
        <Card className="border-primary/20 bg-primary/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ExternalLink className="w-5 h-5" />
              Integrare WordPress CMS
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <p className="text-muted-foreground">
              Acest panel administrează articolele din WordPress CMS ({" "}
              <a
                href="https://cms.owh.md/wp-admin"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                cms.owh.md
              </a>
              ).
            </p>
            <ul className="list-disc list-inside space-y-1 text-muted-foreground">
              <li>Articolele se creează și editează în WordPress</li>
              <li>Modificările apar automat pe site după salvare</li>
              <li>Imaginile featured se sincronizează automat</li>
              <li>Categoriile și tag-urile sunt disponibile instant</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    );
  };

export default BlogManagePage;
