export const characters = [
  { id: 'cinnamoroll', name: 'Cinnamoroll', className: 'cinnamoroll', image: '/images/cinnamoroll.svg' },
  { id: 'hello-kitty', name: 'Hello Kitty', className: 'hello-kitty', image: '/images/hello-kitty.svg' },
  { id: 'my-melody', name: 'My Melody', className: 'my-melody', image: '/images/my-melody.svg' },
  { id: 'kuromi', name: 'Kuromi', className: 'kuromi', image: '/images/kuromi.svg' },
  { id: 'pompompurin', name: 'Pompompurin', className: 'pompompurin', image: '/images/pompompurin.svg' },
  { id: 'pochacco', name: 'Pochacco', className: 'pochacco', image: '/images/pochacco.svg' },
  { id: 'keroppi', name: 'Keroppi', className: 'keroppi', image: '/images/keroppi.svg' },
  { id: 'badtz-maru', name: 'Badtz-Maru', className: 'badtz-maru', image: '/images/badtz-maru.svg' }
];

export const DEFAULT_CHARACTER = characters[0];

export function getCharacter(id) {
  return characters.find((character) => character.id === id) || DEFAULT_CHARACTER;
}
