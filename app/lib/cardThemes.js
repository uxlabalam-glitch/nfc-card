export const CARD_THEMES = [
  // PREMIUM LIGHT
  { id: "rose-pearl", name: "Rose Pearl", mode: "light", bg: "#FFF1F4", card: "#F8DCE5", text: "#713C54", accent: "#BC738E" },
  { id: "blush-gold", name: "Blush Gold", mode: "light", bg: "#FFF5F3", card: "#F8E0DD", text: "#7D4448", accent: "#BD7F75" },
  { id: "lilac-pearl", name: "Lilac Pearl", mode: "light", bg: "#F7F1FF", card: "#EAE0F9", text: "#53356F", accent: "#AA8BCE" },
  { id: "lavender-silk", name: "Lavender Silk", mode: "light", bg: "#F3EFFF", card: "#DDD5F7", text: "#4F427D", accent: "#A99AEB" },
  { id: "ivory-gold", name: "Ivory Gold", mode: "light", bg: "#FFFBF1", card: "#F2E4C6", text: "#5F4A2D", accent: "#B69550" },
  { id: "champagne", name: "Champagne", mode: "light", bg: "#FFF8F0", card: "#EDDCC9", text: "#75583D", accent: "#B89469" },
  { id: "aqua-pearl", name: "Aqua Pearl", mode: "light", bg: "#EFFDFC", card: "#D9F2EE", text: "#235D60", accent: "#77B6B3" },
  { id: "mint-jade", name: "Mint Jade", mode: "light", bg: "#F1FCF5", card: "#D7ECDD", text: "#285A42", accent: "#7AA88D" },
  { id: "sky-diamond", name: "Sky Diamond", mode: "light", bg: "#F1F7FF", card: "#DEECFA", text: "#315278", accent: "#91B5D8" },
  { id: "butter-gold", name: "Butter Gold", mode: "light", bg: "#FFF9E1", card: "#F5E8B3", text: "#655326", accent: "#C6A24E" },
  { id: "peach-silk", name: "Peach Silk", mode: "light", bg: "#FFF3EC", card: "#F9DFC9", text: "#7C4D3C", accent: "#DC9B7F" },
  { id: "silver-pearl", name: "Silver Pearl", mode: "light", bg: "#F9FAFD", card: "#E4E8F0", text: "#404A61", accent: "#99A4BC" },

  // PREMIUM DARK
  { id: "obsidian-gold", name: "Obsidian Gold", mode: "dark", bg: "#08090C", card: "#15171C", text: "#F8EFD9", accent: "#CAA965" },
  { id: "velvet-onyx", name: "Velvet Onyx", mode: "dark", bg: "#0D1019", card: "#202636", text: "#F2E6D4", accent: "#BCC6DB" },
  { id: "royal-ruby", name: "Royal Ruby", mode: "dark", bg: "#1F0610", card: "#54152B", text: "#FFE8DC", accent: "#CE9970" },
  { id: "royal-sapphire", name: "Royal Sapphire", mode: "dark", bg: "#07132D", card: "#102852", text: "#EAF4FF", accent: "#90BAFA" },
  { id: "royal-emerald", name: "Royal Emerald", mode: "dark", bg: "#041C16", card: "#0E4335", text: "#E8F7E8", accent: "#BDA16E" },
  { id: "amethyst", name: "Amethyst", mode: "dark", bg: "#1D1030", card: "#3D275D", text: "#F4E6FF", accent: "#C3A1E5" },
  { id: "royal-turquoise", name: "Royal Turquoise", mode: "dark", bg: "#06262B", card: "#0C5056", text: "#E0FAF6", accent: "#AFCFC6" },
  { id: "royal-plum", name: "Royal Plum", mode: "dark", bg: "#220C27", card: "#552554", text: "#F9E5F6", accent: "#DBACD4" },
  { id: "bronze-noir", name: "Bronze Noir", mode: "dark", bg: "#19130F", card: "#3F2F22", text: "#FAEAD0", accent: "#C89B68" },
  { id: "midnight-blue", name: "Midnight Blue", mode: "dark", bg: "#0B0F20", card: "#202C50", text: "#EFF2FF", accent: "#8FA8E5" },
  { id: "burgundy-gold", name: "Burgundy Gold", mode: "dark", bg: "#250B13", card: "#4E1B28", text: "#FBEADB", accent: "#D1AC72" },
  { id: "forest-jade", name: "Forest Jade", mode: "dark", bg: "#081E1D", card: "#15473E", text: "#EDFAF5", accent: "#A9CEB7" },
];

export function getCardTheme(id) {
  return CARD_THEMES.find((theme) => theme.id === id) || null;
}
