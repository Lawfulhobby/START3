import { atom } from 'jotai';
import { ethers, Provider} from 'ethers';

// Atoms
export const providerAtom = atom<Provider | null>(null);