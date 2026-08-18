export const navigation = [
  { label: 'Home', path: '' },
  { label: 'Game', path: 'game/' },
  { label: 'Engine', path: 'engine/' },
  { label: 'Roadmap', path: 'roadmap/' },
  { label: 'Updates', path: 'updates/' },
] as const;

export const siteName = "The Stars Don't Wait";

export const projectNames = {
  public: siteName,
  repository: 'SolProject',
  engine: 'Sol Engine',
} as const;

export const sourceLinks = {
  repository: 'https://github.com/axxessdenied/SolProject',
  gameDesign:
    'https://github.com/axxessdenied/SolProject/blob/main/docs/gdd.md',
  enginePlan:
    'https://github.com/axxessdenied/SolProject/blob/main/docs/engine-plan.md',
} as const;
