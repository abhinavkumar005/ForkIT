import ScoreBadge from "../ui/ScoreBadge";

function RecipeDetails() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-4">Smoky Lentil Soup</h1>

      {/* LARGE SCORE BADGE WITH BREAKDOWN */}
      <ScoreBadge score={87} size="lg" showLabel={true} showBreakdown={true} />

      <div className="mt-8">{/* ... rest of recipe details */}</div>
    </div>
  );
}
