import { useState } from "react";
import { User } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface TeamMember {
  name: string;
  role: string;
  photo?: string;
  bio?: string;
  videoUrl?: string;
}

const TeamSection = () => {
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

  const team: TeamMember[] = [
    {
      name: "Virgiliu Mărgineanu",
      role: "Director General",
      photo: "https://owh.md/imagini_lucru/elem_graf_membri.png",
      bio: "Cu o experiență vastă în industria cinematografică, Virgiliu conduce echipa OWH Studio cu viziune și pasiune pentru storytelling autentic.",
    },
    {
      name: "Leontina Vatamanu",
      role: "Director artistic",
      photo: "https://owh.md/imagini_lucru/elem_graf_membri.png",
      bio: "Responsabilă de direcția artistică a proiectelor, Leontina aduce creativitate și atenție la detalii în fiecare producție.",
    },
    {
      name: "Tatiana Topor",
      role: "Director financiar",
      photo: "https://owh.md/imagini_lucru/elem_graf_membri.png",
      bio: "Asigură stabilitatea financiară și gestionează resursele studioului cu profesionalism și transparență.",
    },
    {
      name: "Radu-Dumitru Zaporojan",
      role: "Regizor & Editor",
      photo: "https://owh.md/imagini_lucru/elem_graf_membri.png",
      bio: "Regizor talentat și editor cu ochi pentru detalii, Radu transformă viziunile creative în realitate cinematografică.",
    },
    {
      name: "Oleg Popescu",
      role: "Operator Cameră",
      photo: "https://owh.md/imagini_lucru/elem_graf_membri.png",
      bio: "Operator cu experiență vastă în capturarea imaginilor cinematografice de cea mai înaltă calitate.",
    },
    {
      name: "Marin Iliuț",
      role: "Operator Cameră",
      photo: "https://owh.md/imagini_lucru/elem_graf_membri.png",
      bio: "Specialist în cinematografie, Marin aduce expertiză tehnică și creativitate în fiecare cadru.",
    },
    {
      name: "Veronica Uncu",
      role: "Coordonator Proiecte",
      photo: "https://owh.md/imagini_lucru/elem_graf_membri.png",
      bio: "Coordonează toate aspectele proiectelor, asigurându-se că fiecare producție se desfășoară eficient și la timp.",
    },
  ];

  return (
    <>
      <section id="echipa" className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 md:mb-16 animate-fade-up">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-4">
              Echipa <span className="text-cinema-orange">OWH</span>
            </h2>
            <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
              O echipă de profesioniști dedicați artei cinematografice
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
            {team.map((member, index) => (
              <div
                key={member.name}
                onClick={() => setSelectedMember(member)}
                className="group bg-card rounded-lg p-6 text-center hover-lift animate-fade-up cursor-pointer"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-cinema-orange/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-cinema-orange/20 transition-colors overflow-hidden">
                  {member.photo ? (
                    <img
                      src={member.photo}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <User className="w-10 h-10 md:w-12 md:h-12 text-cinema-orange" />
                  )}
                </div>
                <h3 className="text-base md:text-lg font-heading font-bold mb-2">{member.name}</h3>
                <p className="text-sm text-muted-foreground">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Dialog open={!!selectedMember} onOpenChange={() => setSelectedMember(null)}>
        <DialogContent className="max-w-full sm:max-w-2xl max-h-[90vh] overflow-y-auto mx-4">
          <DialogHeader>
            <DialogTitle className="text-xl sm:text-2xl font-heading font-bold pr-8">
              {selectedMember?.name}
            </DialogTitle>
          </DialogHeader>
          
          {selectedMember && (
            <div className="space-y-6">
              <div className="flex flex-col md:flex-row gap-6 items-start">
                <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-cinema-orange/10 flex items-center justify-center overflow-hidden flex-shrink-0 mx-auto md:mx-0">
                  {selectedMember.photo ? (
                    <img
                      src={selectedMember.photo}
                      alt={selectedMember.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <User className="w-12 h-12 sm:w-16 sm:h-16 text-cinema-orange" />
                  )}
                </div>
                
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-lg sm:text-xl font-heading font-bold mb-2">
                    {selectedMember.name}
                  </h3>
                  <p className="text-cinema-orange font-medium mb-4 text-sm sm:text-base">
                    {selectedMember.role}
                  </p>
                  
                  {selectedMember.bio && (
                    <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
                      {selectedMember.bio}
                    </p>
                  )}
                </div>
              </div>
              
              {selectedMember.videoUrl && (
                <div className="aspect-video rounded-lg overflow-hidden bg-muted">
                  <iframe
                    src={selectedMember.videoUrl}
                    className="w-full h-full"
                    allowFullScreen
                    title={`Video ${selectedMember.name}`}
                  />
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default TeamSection;
