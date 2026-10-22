function unsplash(slug: string, premium = false) {
  const host = premium ? "plus.unsplash.com" : "images.unsplash.com";
  return `https://${host}/${slug}?auto=format&fit=crop&w=2000&q=75`;
}

export const images = {
  hero: unsplash("photo-1515657241610-a6b33f0f6c5a"),
  manifesto: "/images/manifesto-portrait.jpg",
  impactGroup: "/images/impact-group.jpg",

  pillars: {
    festivalMain: "/images/festival-foule.jpg",
    festivalAccent: "/images/festival-portrait.jpg",
    experiencesMain: "/images/experiences-sport.jpg",
    experiencesAccent: "/images/experiences-atelier.jpg",
    communauteMain: "/images/communaute-groupe.jpg",
  },

  activites: {
    voyage: unsplash("photo-1644772088209-c71d5c59f719"),
    party: unsplash("photo-1506157786151-b8491531f063"),
    village: unsplash("photo-1670406071577-d795729196b4"),
    excursion: unsplash("photo-1637166514815-8b923a08f8e8"),
    battleAfro: unsplash("photo-1664356889018-4b4752481b0d"),
    masterclass: unsplash("photo-1506806732259-39c2d0268443"),
    marketplace: unsplash("photo-1772411535291-aa5884035934"),
    environnement: unsplash("photo-1772734446447-3c850b026f4f"),
  },

  programme: {
    bienvenue: unsplash("photo-1781263378197-9ea12f94b827"),
    concert: unsplash("photo-1540039155733-5bb30b53aa14"),
    culinaire: unsplash("photo-1776855828611-8fd3ee069df1"),
    battleAfro: unsplash("photo-1664356889018-4b4752481b0d"),
    nuitVoix: unsplash("photo-1511671782779-c97d3d27a1d4"),
  },

  battleAfroBanner: unsplash("photo-1664356889018-4b4752481b0d"),

  histoire: {
    paris: unsplash("photo-1609971757431-439cf7b4141b"),
    dakar: unsplash("photo-1637166514815-8b923a08f8e8"),
    culture: unsplash("photo-1530917203633-106d4a1a0967"),
    transmission: unsplash("photo-1552683578-311bbc6fd40b"),
    futur: unsplash("photo-1695131494999-7961f82afda1"),
  },

  univers: {
    sport: unsplash("photo-1744868646521-2620c945a1fe"),
    story: unsplash("photo-1595123550384-b81222e23cf9"),
    tic: unsplash("photo-1528901166007-3784c7dd3653"),
    musicDance: unsplash("photo-1523689119443-df96632084a1"),
    foodAgri: unsplash("photo-1703604787785-e9ed9639ea6c"),
    emergence: unsplash("photo-1776039325163-f45315a484f3"),
    entrepreneuriat: unsplash(
      "premium_photo-1681398556150-7fa0d1e72703",
      true
    ),
  },
};
