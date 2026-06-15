const artists: {
  name: string;
  genre?: string;
}[] = [
  { name: "Artist Name", genre: "Genre" },
  { name: "Artist Name", genre: "Genre" },
  { name: "Artist Name", genre: "Genre" },
];

export function AboutSection() {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4 max-w-3xl space-y-16">

        {/* About text */}
        <div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">About</h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Add your description here.
          </p>
        </div>

        {/* Artist roster */}
        <div>
          <h3 className="text-2xl font-bold mb-6">Artists</h3>
          <div className="divide-y divide-border">
            {artists.map((artist, i) => (
              <div
                key={i}
                className="py-4 flex items-center justify-between gap-4"
                data-testid={`artist-${i}`}
              >
                <span className="font-medium text-lg">{artist.name}</span>
                {artist.genre && (
                  <span className="text-sm text-muted-foreground">{artist.genre}</span>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
