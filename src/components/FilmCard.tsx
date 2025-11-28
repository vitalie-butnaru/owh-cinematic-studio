import { Link } from "react-router-dom";
import { Play } from "lucide-react";

interface FilmCardProps {
  id: string;
  title: string;
  year: string;
  genre: string;
  poster: string;
}

const FilmCard = ({ id, title, year, genre, poster }: FilmCardProps) => {
  return (
    <Link to={`/film/${id}`} className="group block hover-lift">
      <div className="relative aspect-[2/3] rounded-md overflow-hidden bg-card hover-zoom">
        <img
          src={poster}
          alt={title}
          className="w-full h-full object-cover"
        />
        
        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-cinema-darker via-cinema-darker/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
          <h3 className="text-xl font-heading font-bold mb-2">{title}</h3>
          <div className="flex items-center gap-3 text-sm text-foreground/80">
            <span>{year}</span>
            <span>•</span>
            <span>{genre}</span>
          </div>
          <div className="flex items-center gap-2 mt-4 text-cinema-orange font-medium">
            <Play size={16} />
            <span>Detalii</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default FilmCard;
