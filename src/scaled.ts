import { Dimensions } from 'react-native';

// Sizes are written for a 1920-wide screen (Apple TV). Android TV is usually 960dp wide.
export const scaled = (size: number) => (size * Dimensions.get('window').width) / 1920;
