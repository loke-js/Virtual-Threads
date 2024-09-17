import {proxy} from 'valtio';

const state = proxy({
  intro:true,
  color:'red',
  isLogoTexture:true,
  isFullTexture:false,
  logoDecal:'./demon_slayer.png',
  fullDecal:'./demon_slayer.png',
});

export default state;