// Project Types
export interface Project {
    id: number;
    slug: string;
    title: string;
    category: string;
    type: 'client' | 'personal';
    tagline: string;
    description: string;
    thumbnail: string;
    heroImage: string;
    liveUrl?: string;
    appStoreUrl?: string;

    overview: {
        problem: string;
        solution: string;
        role: string;
        timeline?: string;
    };

    features: {
        title: string;
        description: string;
        icon?: string;
    }[];

    technologies: string[];

    results?: {
        metric: string;
        value: string;
    }[];

    gallery?: string[];

    className?: string; // For grid layout customization
}

// Project Data
export const projects: Project[] = [
    // PROJECT 1 - Slovak Luxury Living
    {
        id: 1,
        slug: 'slovak-luxury-living',
        title: 'Slovak Luxury Living',
        category: 'Webstránka pre reality',
        type: 'client',
        tagline: 'Prémiová realitná platforma s integráciou MLS',
        description: 'Kompletný dizajn a vývoj webstránky pre luxusnú realitnú kanceláriu s automatickým exportom na Nehnutelnosti.sk, AI vylepšovaním fotiek a pokročilým filtrovaním.',
        thumbnail: '/images/projects/slovak-luxury-living/hero.png',
        heroImage: '/images/projects/slovak-luxury-living/hero.png',
        liveUrl: 'https://slovak-luxury-living.vercel.app/',

        overview: {
            problem: 'Luxusná realitná kancelária potrebovala profesionálnu online prezentáciu so zjednodušenou správou nehnuteľností a automatickou distribúciou na najväčší slovenský realitný portál.',
            solution: 'Vytvorená moderná, responzívna webstránka s vlastným CMS pre nehnuteľnosti, exportom na jedno kliknutie na Nehnutelnosti.sk cez API, AI vylepšovaním fotiek a pokročilým systémom filtrovania.',
            role: 'Lead Developer & Designer - Kompletný dizajn webu, redesign značky (logo), frontend/backend vývoj, integrácia MLS API, integrácia AI vylepšovania fotiek.',
            timeline: '2026'
        },

        features: [
            {
                title: 'Integrácia MLS - API Nehnutelnosti.sk',
                description: 'Export nehnuteľností jedným kliknutím eliminuje duplicitné zadávanie údajov. Inzeráty sú automaticky publikované na najväčšom slovenskom realitnom portáli so synchronizovanými obrázkami a detailmi.'
            },
            {
                title: 'Pokročilé filtrovanie nehnuteľností',
                description: 'Filtrovanie v reálnom čase podľa ceny, lokality, typu nehnuteľnosti, izieb a funkcií. Stavy filtrov založené na URL umožňujú zdieľanie výsledkov vyhľadávania.'
            },
            {
                title: 'AI Vylepšenie fotiek',
                description: 'Automatické vylepšenie obrázkov pri nahrávaní - korekcia osvetlenia, color grading a zväčšenie rozlíšenia pre profesionálnu prezentáciu nehnuteľností.'
            },
            {
                title: 'Systém správy nehnuteľností',
                description: 'Plnohodnotný admin panel pre správu inzerátov s galériami, detailnými špecifikáciami a automatickým generovaním náhľadov.'
            },
            {
                title: 'Redesign značky',
                description: 'Kompletný redesign loga s prémiovou estetikou, modernou farebnou paletou a sofistikovanou vizuálnou identitou pre luxusný trh.'
            }
        ],

        technologies: ['Next.js', 'React', 'TypeScript', 'Vercel', 'Nehnutelnosti.sk API', 'AI Image Processing', 'Tailwind CSS'],

        results: [
            {
                metric: 'Úspora času',
                value: 'Eliminované duplicitné zadávanie'
            },
            {
                metric: 'Kvalita obrázkov',
                value: 'Profesionálne fotky bez manuálnej úpravy'
            },
            {
                metric: 'Užívateľská skúsenosť',
                value: 'Lepšie objavovanie vďaka filtrovaniu'
            }
        ],

        gallery: [
            '/images/projects/slovak-luxury-living/gallery-1.jpg',
            '/images/projects/slovak-luxury-living/gallery-2.jpg',
            '/images/projects/slovak-luxury-living/gallery-3.jpg'
        ],

        className: 'md:col-span-2 md:row-span-1'
    },

    // PROJECT 2 - Notewall
    {
        id: 5,
        slug: 'notewall',
        title: 'Notewall',
        category: 'iOS Aplikácia pre produktivitu',
        type: 'personal',
        tagline: 'Poznámky a pripomienky na zamknutej obrazovke - 498 denných interakcií',
        description: 'iOS aplikácia pre produktivitu riešiaca zabudnuté úlohy. Zobrazuje pripomienky priamo na zamknutej obrazovke iPhonu pre maximálnu viditeľnosť. 200+ stiahnutí, 30 platiacich zákazníkov.',
        thumbnail: '/images/projects/notewall/hero.png',
        heroImage: '/images/projects/notewall/hero.png',
        liveUrl: 'https://www.notewall.info/',
        appStoreUrl: 'https://apps.apple.com/us/app/lock-screen-notes-notewall/id6755601996',

        overview: {
            problem: 'Ľudia si píšu pripomienky do poznámkových aplikácií, ale zriedka ich otvárajú, čo vedie k zabudnutým úlohám. Priemerný človek odomkne telefón 498-krát denne, ale nikdy nevidí svoj zoznam úloh.',
            solution: 'Prvá a jediná iOS aplikácia umožňujúca vlastné poznámky na zamknutej obrazovke s personalizovanými pozadiami. Každé odomknutie telefónu = vizuálna pripomienka. Využíva WidgetKit pre iOS 16+.',
            role: 'Solo Founder & Developer - Návrh produktu, vývoj v Swift/SwiftUI, tvorba značky (názov, logo, ikona), vývoj webu (React), marketing v App Store (ASO), SEO.',
            timeline: '2025'
        },

        features: [
            {
                title: 'Inovácia widgetu zamknutej obrazovky',
                description: 'Technicky náročná implementácia widgetu pre iOS zamknutú obrazovku pomocou Swift a WidgetKit. Viacero veľkostí widgetov, integrácia vlastných pozadí a funkcia rýchlej úpravy.'
            },
            {
                title: 'Podpora vlastných pozadí',
                description: 'Užívatelia si môžu personalizovať zamknutú obrazovku vlastnými fotkami, pričom sa im zobrazujú pripomienky, úlohy a ciele pre pútavý vizuálny zážitok.'
            },
            {
                title: 'Viacero typov poznámok',
                description: 'Podpora pre pripomienky, denné ciele, motivačné citáty, úlohy, sledovanie návykov - flexibilné typy obsahu pre rôzne prípady použitia v produktivite.'
            },
            {
                title: 'Webstránka v React.js',
                description: 'Vlastná produktová webstránka s animáciami pri scrollovaní, interaktívnymi ukážkami dem, plynulými prechodmi, integráciou App Store a SEO optimalizovaným blogom.'
            },
            {
                title: 'Kompletný vývoj značky',
                description: 'Tvorba značky od nuly: naming ("Notewall"), dizajn loga (Figma), ikona aplikácie, mockupy screenshotov pre App Store, prezentačné video a marketingová grafika.'
            },
            {
                title: 'Optimalizácia pre App Store (ASO)',
                description: 'Kľúčovými slovami optimalizovaný názov, podtitul a popis. Screenshoty optimalizované na konverziu s popismi výhod. Stratégie na získavanie pozitívnych recenzií.'
            }
        ],

        technologies: ['Swift', 'SwiftUI', 'WidgetKit', 'iOS Development', 'React.js', 'Figma', 'App Store Connect'],

        results: [
            {
                metric: 'Stiahnutia',
                value: '200+ celkových stiahnutí'
            },
            {
                metric: 'Platiaci zákazníci',
                value: '~30 aktívnych predplatiteľov'
            },
            {
                metric: 'Pozícia na trhu',
                value: 'Prvá aplikácia s touto funkciou'
            },
            {
                metric: 'Denné interakcie',
                value: '498 možností vidieť pripomienku'
            }
        ],

        gallery: [
            '/images/projects/notewall/gallery-1.jpg',
            '/images/projects/notewall/gallery-2.jpg',
            '/images/projects/notewall/gallery-3.jpg'
        ],

        className: 'md:col-span-2 md:row-span-1'
    },

    // PROJECT 3 - Faithwall
    {
        id: 6,
        slug: 'faithwall',
        title: 'Faithwall',
        category: 'iOS Náboženská aplikácia',
        type: 'personal',
        tagline: 'Biblické verše na zamknutej obrazovke - #130 globálne',
        description: 'iOS aplikácia zobrazujúca biblické verše na zamknutej obrazovke pre každodenné duchovné povzbudenie. Integrovaná databáza Biblie s objavovaním podľa tém. Hodnotená #130 globálne v kategórii Referencie.',
        thumbnail: '/images/projects/faithwall/hero.png',
        heroImage: '/images/projects/faithwall/hero.png',
        liveUrl: 'https://faithwall.app/',
        appStoreUrl: 'https://apps.apple.com/us/app/bible-verse-widgets-faithwall/id6756815070',

        overview: {
            problem: 'Kresťania chcú každodenné povzbudenie z Písma, ale zabúdajú čítať biblické aplikácie. Zamknutá obrazovka ponúka trvalý duchovný kontakt počas celého dňa.',
            solution: 'Aplikácia pre zamknutú obrazovku s biblickými veršami s kompletnou integrovanou databázou, objavovaním veršov podľa tém a prispôsobiteľnými widgetmi. Využíva rovnaký technický základ ako Notewall.',
            role: 'Solo Founder & Developer - Návrh produktu, vývoj v Swift, integrácia biblickej databázy, tvorba značky (odlišná od Notewall), webstránka v Next.js, dizajnové podklady vo Figme, optimalizácia ASO.',
            timeline: '2025'
        },

        features: [
            {
                title: 'Kompletná databáza Biblie',
                description: 'Integrovaná plná databáza biblických veršov s viacerými prekladmi. Verše označené podľa tém (viera, nádej, sila, pokoj) pre jednoduché objavovanie. Offline prístup cez lokálne úložisko.'
            },
            {
                title: 'Objavovanie veršov podľa tém',
                description: 'Užívatelia prezerajú verše podľa témy, vyhľadávajú kľúčové slová, navigujú podľa knihy/kapitoly a ukladajú obľúbené verše pre rýchly prístup v ťažkých chvíľach.'
            },
            {
                title: 'Prispôsobenie widgetu',
                description: 'Viacero veľkostí widgetov, možnosti kresťanských pozadí, prispôsobiteľný štýl textu (fonty, farby) pre čitateľnosť a zobrazenie odkazu na verš.'
            },
            {
                title: 'Webstránka v Next.js',
                description: 'Vlastná webstránka s biblickým veršom dňa, blogovým obsahom pre SEO, ukážkou funkcií, svedectvami a posolstvom priateľským ku kresťanom.'
            },
            {
                title: 'Odlišná identita značky',
                description: 'Značka oddelená od Notewall: unikátne logo s kresťanskou symbolikou, teplejšia/duchovná farebná paleta, úctivý hlas značky a grafika pre App Store navrhnutá vo Figme.'
            },
            {
                title: 'Úspech v App Store - #130 globálne',
                description: 'ASO optimalizácia dosiahla #130 globálne hodnotenie vo vysoko konkurenčnej kategórii Referencie. Stratégia kľúčových slov pre "Bible verse lock screen", "daily Bible widget".'
            }
        ],

        technologies: ['Swift', 'SwiftUI', 'WidgetKit', 'Next.js', 'Bible Database', 'Figma', 'App Store Connect'],

        results: [
            {
                metric: 'Rebríček App Store',
                value: '#130 globálne v kategórii Referencie'
            },
            {
                metric: 'Pozícia na trhu',
                value: 'Unikátna inovácia pre biblické verše'
            },
            {
                metric: 'Konkurencia v kategórii',
                value: 'Top 150 v konkurenčnej kategórii'
            }
        ],

        gallery: [
            '/images/projects/faithwall/gallery-1.jpg',
            '/images/projects/faithwall/gallery-2.jpg',
            '/images/projects/faithwall/gallery-3.jpg'
        ],

        className: 'md:col-span-2 md:row-span-1'
    },

    // PROJECT 4 - BILLIK (MOVED UP)
    {
        id: 2,
        slug: 'billik',
        title: 'BILLIK E-Commerce',
        category: 'E-Commerce Platforma',
        type: 'client',
        tagline: 'Kompletná transformácia značky a e-commerce pre dodávateľa zváracej techniky',
        description: 'End-to-end vývoj e-commerce, redesign značky, SEO stratégia a digitálny marketing pre 33-ročnú firmu so zváracou technikou. Dosiahnuté #1 pozície v Google pre cieľové kľúčové slová.',
        thumbnail: '/images/projects/billik/hero.png',
        heroImage: '/images/projects/billik/hero.png',
        liveUrl: 'https://www.billik.sk/',

        overview: {
            problem: 'Zavedená priemyselná firma s 33+ ročnou tradíciou potrebovala modernú online prezentáciu, aby mohla konkurovať v B2B/B2C e-commerce pri zachovaní profesionálnej reputácie.',
            solution: 'Kompletná digitálna transformácia: redesign značky, platforma Shoptet postavená od nuly, komplexná SEO stratégia, obsahový marketing a integrácia AI zákazníckej podpory.',
            role: 'Lead Developer, Brand Designer & Digital Marketing Strategist - Redesign loga, vývoj webu, implementácia SEO, tvorba obsahu, grafický dizajn, integrácia platieb, vývoj AI chatbota.',
            timeline: '2024-2025'
        },

        features: [
            {
                title: 'Kompletný redesign značky',
                description: 'Transformácia loga, vytvorenie novej farebnej palety a vizuálnej identity posúvajúcej vnímanie značky od tradičnej k profesionálnej/súčasnej pre priemyselný sektor.'
            },
            {
                title: 'SEO Stratégia & #1 Pozície',
                description: 'Prieskum kľúčových slov, on-page optimalizácia, tvorba blogového obsahu. Úspešne dosiahnuté #1 pozície v Google pre viaceré cielené long-tail kľúčové slová v konkurenčnom B2B segmente.'
            },
            {
                title: 'AI Zákaznícka podpora - "Lacko"',
                description: 'Vlastný AI chatbot trénovaný na firemnej znalostnej báze. Odpovedá na FAQ, pomáha s výberom produktov a poskytuje 24/7 zákaznícku podporu pre odporúčania zváracej techniky.'
            },
            {
                title: 'Vývoj E-Commerce platformy',
                description: 'Plná implementácia Shoptet od základov s komplexnou organizáciou produktového katalógu, responzívnym dizajnom pre mobily a optimalizovaným procesom objednávky.'
            },
            {
                title: 'Integrácia platobnej brány',
                description: 'Bezpečná integrácia spracovania platieb pre Slovensko/Česko s viacerými platobnými metódami, automatickým potvrdením a generovaním dokladov.'
            },
            {
                title: 'Obsahový marketing',
                description: 'Vytvorené 3 SEO optimalizované blogové články o témach zváracieho priemyslu, prinášajúce merateľnú organickú návštevnosť a budujúce autoritu.'
            },
            {
                title: 'Digitálne marketingové podklady',
                description: 'Vlastné grafiky pre karusely, firemné brožúry, letáky, grafika pre sociálne siete (Facebook) a optimalizácia Google Business profilu.'
            }
        ],

        technologies: ['Shoptet', 'SEO', 'AI/ML Chatbot', 'Payment Gateway API', 'Graphic Design', 'Content Marketing'],

        results: [
            {
                metric: 'SEO Výkonnosť',
                value: '#1 pozície v Google pre kľúčové slová'
            },
            {
                metric: 'Organická návštevnosť',
                value: 'Merateľná návštevnosť cez blog'
            },
            {
                metric: 'Vnímanie značky',
                value: 'Posun od tradičnej k modernej'
            },
            {
                metric: 'Zákaznícka podpora',
                value: 'Dostupnosť 24/7 AI asistencie'
            }
        ],

        gallery: [
            '/images/projects/billik/gallery-1.jpg',
            '/images/projects/billik/gallery-2.jpg',
            '/images/projects/billik/gallery-3.jpg'
        ],

        className: 'md:col-span-2 md:row-span-1'
    },

    // PROJECT 5 - RealFoto (MOVED DOWN)
    {
        id: 4,
        slug: 'realfoto',
        title: 'RealFoto',
        category: 'AI SaaS na vylepšenie fotiek',
        type: 'personal',
        tagline: 'Profesionálna realitná fotografia prostredníctvom AI vylepšenia',
        description: 'SaaS platforma meniaca amatérske realitné fotky na profesionálne inzeráty pomocou AI HDR vylepšenia, 4K upscalingu, výmeny oblohy a automatického rozmazania súkromných údajov.',
        thumbnail: '/images/projects/realfoto/hero.png',
        heroImage: '/images/projects/realfoto/hero.png',
        liveUrl: 'https://www.realfoto.sk/',

        overview: {
            problem: 'Slovenské realitné inzeráty často obsahujú nekvalitné fotky: tmavé interiéry, špinavé okná, sivú oblohu, viditeľné ŠPZ. Profesionálna fotografia je drahá a časovo náročná.',
            solution: 'Cenovo dostupná AI alternatíva k profesionálnym fotografom. Okamžité vylepšenie realitných fotiek s HDR osvetlením, 4K upscalingom, výmenou oblohy, čistením okien, odstránením objektov a automatickým rozmazaním súkromia.',
            role: 'Solo Founder & Developer - Prieskum trhu, vývoj produktu, tvorba značky (logo, web), vývoj v Next.js/Supabase, integrácia AI, platobný systém Stripe.',
            timeline: '2025'
        },

        features: [
            {
                title: 'Vylepšenie osvetlenia HDR',
                description: 'AI vyvažuje expozíciu v celom obraze, optimalizuje tiene, stredné tóny a jasy pre profesionálne vyzerajúce osvetlenie aj z podexponovaných fotiek z mobilu.'
            },
            {
                title: '4K Upscaling',
                description: 'AI interpolácia zvyšuje rozlíšenie na 4K, pridáva detaily pri zachovaní kvality pre ostré obrázky vhodné pre veľké displeje a tlač.'
            },
            {
                title: 'Automatické rozmazanie súkromia',
                description: 'AI automaticky detekuje a rozmazáva ŠPZ vozidiel a tváre ľudí pre obrázky v súlade s GDPR bez nutnosti manuálnej úpravy.'
            },
            {
                title: 'Čistenie okien',
                description: 'Odstraňuje odrazy, špinu a odlesky z okien. AI identifikuje sklenené povrchy a zvyšuje priehľadnosť pre lepšiu prezentáciu výhľadov a prirodzeného svetla.'
            },
            {
                title: 'Výmena oblohy',
                description: 'Nahrádza zamračenú/sivú oblohu fotorealistickou modrou oblohou s oblakmi. AI upravuje osvetlenie a teplotu farieb celého obrázka pre konzistenciu a emocionálnu príťažlivosť.'
            },
            {
                title: 'Odstránenie objektov',
                description: 'AI inpainting odstraňuje nechcené objekty (smetné koše, neporiadok, káble, osobné veci) a prirodzene vypĺňa priestor pre čistejšiu prezentáciu.'
            },
            {
                title: 'Supabase Backend & Stripe',
                description: 'Supabase spravuje autentifikáciu, metadáta obrázkov, históriu spracovania a sledovanie predplatného. Stripe zabezpečuje kreditné a predplatné modely účtovania.'
            }
        ],

        technologies: ['Next.js', 'Supabase', 'AI/ML Image Processing', 'Stripe', 'Cloud Storage', 'React', 'TypeScript'],

        results: [
            {
                metric: 'Hodnota pre zákazníka',
                value: 'Dostupné vs. profesionálni fotografi'
            },
            {
                metric: 'Rýchlosť spracovania',
                value: 'Okamžité vylepšenie vs. dni čakania'
            },
            {
                metric: 'Dodržiavanie predpisov',
                value: 'Automatické rozmazanie podľa GDPR'
            }
        ],

        gallery: [
            '/images/projects/realfoto/gallery-1.jpg',
            '/images/projects/realfoto/gallery-2.jpg',
            '/images/projects/realfoto/gallery-3.jpg'
        ],

        className: 'md:col-span-2 md:row-span-1'
    },

    // PROJECT 6 - SlohGPT
    {
        id: 3,
        slug: 'slohgpt',
        title: 'SlohGPT',
        category: 'AI SaaS Platforma',
        type: 'personal',
        tagline: 'AI hodnotenie slohov pre učiteľov slovenského jazyka',
        description: 'SaaS produkt riešiaci časovo náročné manuálne opravovanie slohov pomocou AI hodnotenia trénovaného na slovenských vzdelávacích štandardoch s využitím RAG architektúry a Pinecone.',
        thumbnail: '/images/projects/slohgpt/hero.png',
        heroImage: '/images/projects/slohgpt/hero.png',
        liveUrl: 'https://www.slohgpt.sk/',

        overview: {
            problem: 'Učitelia slovenčiny trávia hodiny manuálnym opravovaním slohov. Neexistovali žiadne AI nástroje, ktoré by rozumeli slovenským vzdelávacím štandardom a hodnotiacim rubrikám.',
            solution: 'Vytvorený SaaS na hodnotenie slohov s vlastnou RAG pipeline využívajúcou Pinecone. AI trénovaná na štandardoch Ministerstva školstva, poskytujúca kontextovo presnú spätnú väzbu.',
            role: 'Solo Founder & Developer - Návrh produktu, vývoj značky (názov, logo, identita), vývoj v Next.js, implementácia RAG architektúry, integrácia Stripe, SEO stratégia.',
            timeline: '2025'
        },

        features: [
            {
                title: 'RAG Pipeline s Pinecone',
                description: 'Architektúra Retrieval-Augmented Generation využívajúca Pinecone. AI sa nespolieha na generické chápanie jazyka - vyhľadáva relevantné slovenské vzdelávacie štandardy a hodnotiace rubriky.'
            },
            {
                title: 'Slovenské vzdelávacie štandardy',
                description: 'Znalostná báza zahŕňa učebné osnovy Ministerstva školstva, pokyny na písanie slohov pre rôzne ročníky, rámce literárnej analýzy a gramatické pravidlá.'
            },
            {
                title: 'Detailný systém spätnej väzby',
                description: 'AI poskytuje celkovú známku/body, detailnú spätnú väzbu na štruktúru, gramatiku, obsah a štýl, plus konkrétne návrhy na zlepšenie a rozbor podľa rubriky.'
            },
            {
                title: 'Panel pre učiteľa',
                description: 'Nahrávanie slohov (PDF, DOCX, text), zobrazenie fronty spracovania, stiahnutie/export spätnej väzby a prístup ku kompletnej histórii hodnotenia s vyhľadávaním.'
            },
            {
                title: 'Integrácia platieb Stripe',
                description: 'Flexibilné ceny: kredity za sloh, mesačné predplatné a potenciálne hromadné ceny pre školy/inštitúcie s automatizovaným účtovaním a fakturáciou.'
            },
            {
                title: 'Kompletný vývoj značky',
                description: 'Tvorba značky od nuly: naming ("SlohGPT"), dizajn loga, výber farebnej palety, grafický identifikačný systém a brand manuál.'
            }
        ],

        technologies: ['Next.js', 'React', 'Pinecone Vector DB', 'GPT API', 'RAG Architecture', 'Stripe', 'TypeScript', 'SEO'],

        results: [
            {
                metric: 'Pozícia na trhu',
                value: 'Prvý AI nástroj na slohy v SR'
            },
            {
                metric: 'Hodnota pre užívateľa',
                value: 'Výrazná úspora času pre učiteľov'
            },
            {
                metric: 'Technická inovácia',
                value: 'Vlastný RAG systém vs. generická AI'
            }
        ],

        gallery: [
            '/images/projects/slohgpt/gallery-1.jpg',
            '/images/projects/slohgpt/gallery-2.jpg',
            '/images/projects/slohgpt/gallery-3.jpg'
        ],

        className: 'md:col-span-2 md:row-span-1'
    }
];

// Helper function to get project by slug
export function getProjectBySlug(slug: string): Project | undefined {
    return projects.find(project => project.slug === slug);
}

// Helper function to get all project slugs (for static generation)
export function getAllProjectSlugs(): string[] {
    return projects.map(project => project.slug);
}

// Helper function to filter projects by type
export function getProjectsByType(type: 'client' | 'personal'): Project[] {
    return projects.filter(project => project.type === type);
}
