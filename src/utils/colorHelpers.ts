import { COLORS } from '@/constants';

export const shuffleColors = () => {
  for (let i = COLORS.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [COLORS[i], COLORS[j]] = [COLORS[j], COLORS[i]];
  }
  return COLORS;
};
