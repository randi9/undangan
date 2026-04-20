export interface QuoteTemplate {
  id: string;
  category: 'Islami' | 'Nasrani' | 'Umum';
  title: string;
  content: string;
}

export const QUOTE_TEMPLATES: QuoteTemplate[] = [
  // Islami
  {
    id: 'ar-rum-21',
    category: 'Islami',
    title: 'QS. Ar-Rum: 21',
    content: '"Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan untukmu isteri-isteri dari jenismu sendiri, supaya kamu cenderung dan merasa tenteram kepadanya, dan dijadikan-Nya diantaramu rasa kasih dan sayang. Sesungguhnya pada yang demikian itu benar-benar terdapat tanda-tanda bagi kaum yang berfikir."'
  },
  {
    id: 'az-zariyat-49',
    category: 'Islami',
    title: 'QS. Az-Zariyat: 49',
    content: '"Dan segala sesuatu Kami ciptakan berpasang-pasangan supaya kamu mengingat kebesaran Allah."'
  },
  {
    id: 'an-nur-32',
    category: 'Islami',
    title: 'QS. An-Nur: 32',
    content: '"Dan kawinkanlah orang-orang yang sendirian di antara kamu, dan orang-orang yang layak (berkawin) dari hamba-hamba sahayamu yang lelaki dan hamba-hamba sahayamu yang perempuan. Jika mereka miskin Allah akan memampukan mereka dengan kurnia-Nya."'
  },
  {
    id: 'hadis-tirmidzi',
    category: 'Islami',
    title: 'HR. At-Tirmidzi',
    content: '"Bila seorang hamba telah menikah, maka ia telah menyempurnakan separuh agamanya. Maka takutlah kepada Allah untuk separuh yang tersisa."'
  },

  // Nasrani
  {
    id: '1-kor-13',
    category: 'Nasrani',
    title: '1 Korintus 13:4-7',
    content: '"Kasih itu sabar; kasih itu murah hati; ia tidak cemburu. Ia tidak memegahkan diri dan tidak sombong. Ia tidak melakukan yang tidak sopan dan tidak mencari keuntungan diri sendiri. Ia tidak pemarah dan tidak menyimpan kesalahan orang lain."'
  },
  {
    id: 'mat-19-6',
    category: 'Nasrani',
    title: 'Matius 19:6',
    content: '"Demikianlah mereka bukan lagi dua, melainkan satu. Karena itu, apa yang telah dipersatukan Allah, tidak boleh diceraikan manusia."'
  },
  {
    id: 'amsal-3-3',
    category: 'Nasrani',
    title: 'Amsal 3:3',
    content: '"Janganlah kiranya kasih dan setia meninggalkan engkau! Kalungkanlah itu pada lehermu, tuliskanlah itu pada loh hatimu."'
  },

  // Umum
  {
    id: 'khalil-gibran',
    category: 'Umum',
    title: 'Khalil Gibran',
    content: '"Cinta tidak memberikan apa-apa selain dirinya dan tidak mengambil apa pun selain dari dirinya. Cinta tidak memiliki, juga tidak ingin dimiliki; karena cinta sudah cukup bagi cinta."'
  },
  {
    id: 'romantic-1',
    category: 'Umum',
    title: 'Kutipan Romantis',
    content: '"Pertemuan kita adalah takdir, menjadi temanmu adalah pilihan, tetapi jatuh cinta padamu di luar kendaliku. Kami mengundang Bapak/Ibu/Saudara/i untuk hadir dan merayakan tautan cinta kami."'
  },
  {
    id: 'terry-pratchett',
    category: 'Umum',
    title: 'Terry Pratchett',
    content: '"Dua orang yang saling mencintai, bersiaplah menghadapi dunia bersama-sama. Tidak ada yang lebih tangguh dari dua hati yang telah berjanji untuk saling setia dalam setiap musim kehidupan."'
  }
];
