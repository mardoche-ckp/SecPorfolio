# Guide de mise à jour du portfolio (SecPortfolio)

Ce document explique comment modifier, ajouter ou réorganiser le contenu de ton
site (textes, cartes, sections, animations, images) sans devoir tout
redemander à chaque fois. Garde-le à la racine du projet, il est fait pour
durer avec le site.

---

## 1. Comprendre l'organisation du projet

```
web/
├── app/
│   ├── page.tsx            → Ordre des sections affichées sur la page
│   ├── layout.tsx          → Titre du site, description SEO, polices
│   └── globals.css         → Couleurs, styles globaux, animations CSS
├── components/
│   ├── site-header.tsx     → Barre de navigation en haut
│   ├── hero-section.tsx    → Section d'accueil ("Salut, je suis...")
│   ├── services-section.tsx→ Section "Services"
│   ├── about-section.tsx   → Section "À propos"
│   ├── skills-section.tsx  → Section "Compétences & Expérience"
│   ├── certifications-section.tsx → Section "Certifications" (cartes)
│   ├── projects-section.tsx→ Section "Projets"
│   ├── testimonials-section.tsx → Section "Témoignages"
│   ├── newsletter-section.tsx   → Section newsletter
│   ├── contact-section.tsx → Section contact
│   ├── site-footer.tsx     → Pied de page
│   └── reveal.tsx          → Composant qui gère les animations d'apparition
├── lib/
│   └── i18n.ts             → **TOUS les textes du site (FR + EN)**
└── public/
    ├── images/             → Photos utilisées sur le site
    └── CV_Madoche_CAKPO.pdf→ Le CV téléchargeable
```

### La règle la plus importante à retenir

> **99 % des mises à jour de texte se font dans un seul fichier :
> `web/lib/i18n.ts`.**

Les composants (`.tsx`) définissent la mise en page, l'apparence et les
animations. Le fichier `i18n.ts` contient uniquement le **contenu** (titres,
paragraphes, listes, cartes...) dans les deux langues (`fr` et `en`). Modifier
un texte revient donc presque toujours à éditer une valeur dans ce fichier —
jamais besoin de toucher au design.

Le site fonctionne en français ET en anglais grâce au bouton "FR / EN" dans le
menu. Le fichier `i18n.ts` est divisé en deux gros blocs :

```ts
export const translations = {
  en: { ... },   // tout le contenu en anglais
  fr: { ... },   // tout le contenu en français
} as const
```

⚠️ Si tu ne modifies que le bloc `fr`, seule la version française du site sera
mise à jour et le bouton "EN" continuera d'afficher l'ancien texte (ou un
texte générique). Pense à modifier aussi le bloc `en` si tu veux que les deux
langues restent cohérentes.

---

## 2. Modifier un texte existant

Ouvre `web/lib/i18n.ts`. Chaque section a son propre "objet" nommé comme la
section : `hero`, `services`, `about`, `skills`, `certifications`, `projects`,
`testimonials`, `newsletter`, `contact`, `footer`, `nav`.

**Exemple : changer la phrase de description dans la section Hero (FR)**

```ts
hero: {
  ...
  description:
    "Je construis progressivement mon parcours autour de la cybersécurité...", // ← remplace ce texte
  ...
},
```

Remplace uniquement le texte entre guillemets. Fais bien attention à :
- Garder les guillemets (`"..."` ou `'...'`) autour du texte.
- Garder la virgule `,` à la fin de la ligne.
- Si ton texte contient une apostrophe (ex: `l'ESGIS`), utilise des guillemets
  doubles `"..."` pour éviter un bug, ou échappe l'apostrophe avec `\'`.

**Exemple : changer le nom d'un badge**

```ts
badges: {
  professional: 'Professionnel',
  creative: 'Créatif',
  developer: 'Développeur',
  designer: 'Cybersécurité Analyst',  // ← ce texte s'affiche sur la 4e photo
},
```

> Note : le nom de la clé à gauche (`designer`) ne doit **jamais** être changé
> car le code s'en sert pour retrouver la traduction. Seule la valeur à
> droite (le texte affiché) doit être modifiée.

---

## 3. Ajouter un élément à une liste existante (ex: nouvelle certification)

Certaines sections affichent une liste de "cartes" générées automatiquement à
partir d'un tableau (`items: [...]`). C'est le cas de `services`,
`skills.educationItems`, `certifications`, `projects` et `testimonials`.

Pour ajouter un élément, il suffit d'ajouter un nouveau bloc `{ ... }` dans le
tableau, avec une virgule après le bloc précédent.

### Exemple concret : ajouter une nouvelle certification

Dans `web/lib/i18n.ts`, cherche `certifications:` dans le bloc `fr` :

```ts
certifications: {
  title: 'Mes',
  titleHighlight: 'Certifications',
  subtitle: 'Des connaissances certifiées qui valident mes bases en cybersécurité',
  items: [
    {
      title: 'Fortinet Certified Fundamentals in Cybersecurity (NSE 1)',
      issuer: 'Fortinet Training Institute',
      desc: 'Notions fondamentales de cybersécurité et bonnes pratiques de protection des données.',
    },
    // ... autres certifications ...
    {
      title: 'Python Certificate',
      issuer: 'Cursa',
      desc: "Programmation Python appliquée à l'automatisation et au traitement de données.",
    },
    // 👇 AJOUTE TA NOUVELLE CERTIFICATION ICI, avec une virgule avant
    {
      title: 'Nom de la nouvelle certification',
      issuer: 'Organisme délivrant la certification',
      desc: 'Une phrase qui résume la compétence acquise.',
    },
  ],
},
```

Fais la **même chose dans le bloc `en`** juste en dessous (ou plus haut selon
où tu regardes) pour garder la version anglaise à jour, avec le texte traduit.

Une fois ajoutée, la carte apparaît **automatiquement** sur le site avec la
même animation que les autres — tu n'as rien d'autre à faire, car
`certifications-section.tsx` boucle sur la liste et génère une carte par
élément :

```tsx
{t.certifications.items.map((cert, i) => (
  <Reveal key={cert.title} animation="zoom-in" delay={i * 120}>
    <article>...</article>
  </Reveal>
))}
```

Le même principe s'applique pour :
- **Ajouter un projet** → ajoute un bloc dans `projects.items` (avec
  `title`, `tags: [...]`, `desc`).
- **Ajouter un service** → ajoute un bloc dans `services.items` (avec
  `title`, `desc`).
- **Ajouter une formation/diplôme** → ajoute un bloc dans
  `skills.educationItems` (avec `period`, `title`, `place`).
- **Ajouter un témoignage** → ajoute un bloc dans `testimonials.items` (avec
  `quote`, `name`, `role`).

### Cas particulier : les projets utilisent des images

`projects-section.tsx` associe une image à chaque projet dans cet ordre fixe :

```tsx
const images = ['/images/work-1.png', '/images/work-3.png', '/images/work-4.png']
```

Si tu ajoutes un 4e projet, soit tu ajoutes une nouvelle image dans ce
tableau (voir section 6 "Ajouter une image"), soit les images se répéteront
automatiquement en boucle.

### Cas particulier : les icônes des services

`services-section.tsx` associe une icône à chaque service dans cet ordre :

```tsx
const icons = [ShieldCheck, Bug, Network, Code2, MessageSquare, Terminal]
```

Ce sont des icônes de la librairie **lucide-react**. Si tu ajoutes un service
et veux une icône différente :
1. Va sur https://lucide.dev/icons pour choisir une icône et noter son nom
   (ex: `Lock`, `Fingerprint`, `Server`).
2. Ajoute-la dans l'import en haut du fichier :
   ```tsx
   import { ShieldCheck, Bug, Network, Code2, MessageSquare, Terminal, Lock } from 'lucide-react'
   ```
3. Ajoute-la dans le tableau `icons` à la position voulue.

---

## 4. Ajouter une carte de certification "à la main" (sans passer par la liste)

Tu n'as normalement **jamais besoin** de faire ça : ajoute simplement un
élément dans `certifications.items` comme expliqué en section 3, et une carte
sera générée automatiquement avec :
- Le même style (bordure, coins arrondis, fond, halo lumineux au survol).
- La même animation (`zoom-in` avec un léger décalage entre chaque carte).
- Le même comportement au survol (légère élévation + icône qui tourne).

Si un jour tu veux qu'**une carte en particulier** ait une icône différente
des autres (ex: une icône Fortinet, une icône Python...), il faut alors
modifier un peu le composant `certifications-section.tsx` :

1. Ouvre `web/components/certifications-section.tsx`.
2. Remplace l'unique icône `Award` par un tableau d'icônes, comme dans
   `services-section.tsx` :
   ```tsx
   import { Award, ShieldCheck, Code2 } from 'lucide-react'
   const icons = [ShieldCheck, ShieldCheck, Award, Code2] // une icône par certification, dans l'ordre
   ```
3. Dans la boucle, remplace `<Award className="size-6" />` par :
   ```tsx
   {(() => { const Icon = icons[i % icons.length]; return <Icon className="size-6" /> })()}
   ```

---

## 5. Ajouter une toute nouvelle section au site

Si un jour tu veux une section complètement différente (ex: "Veille
technologique", "Articles / Blog", "CTF & Wargames"...), voici la marche à
suivre. C'est plus technique, mais reproductible en suivant ces étapes.

### Étape 1 — Créer le composant

Crée un nouveau fichier dans `web/components/`, par exemple
`ctf-section.tsx`, en copiant la structure de `certifications-section.tsx`
(c'est le modèle le plus simple à réutiliser : titre + cartes animées).

```tsx
'use client'

import { Flag } from 'lucide-react'
import { useLanguage } from '@/components/language-provider'
import { Reveal } from '@/components/reveal'

export function CtfSection() {
  const { t } = useLanguage()

  return (
    <section id="ctf" className="px-4 py-20 sm:px-6 md:py-28">
      <div className="mx-auto max-w-6xl">
        <Reveal animation="fade-up" className="text-center">
          <h2 className="font-heading text-3xl font-extrabold sm:text-4xl">
            {t.ctf.title} <span className="text-gradient-primary">{t.ctf.titleHighlight}</span>
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-muted-foreground sm:text-base">
            {t.ctf.subtitle}
          </p>
        </Reveal>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {t.ctf.items.map((item, i) => (
            <Reveal key={item.title} animation="fade-up" delay={i * 120}>
              <article className="group h-full rounded-2xl border border-border bg-card/60 p-6 transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/50">
                <div className="mb-4 inline-flex rounded-xl bg-primary/15 p-3 text-primary">
                  <Flag className="size-6" />
                </div>
                <h3 className="font-heading text-lg font-bold">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.desc}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
```

### Étape 2 — Ajouter les textes dans `i18n.ts`

Dans les deux blocs `en` et `fr` de `web/lib/i18n.ts`, ajoute un nouvel objet
`ctf` (au même niveau que `certifications`, `projects`, etc.) :

```ts
ctf: {
  title: 'Mes',
  titleHighlight: 'CTF & Wargames',
  subtitle: 'Défis de cybersécurité pratiqués pour renforcer mes compétences',
  items: [
    { title: 'TryHackMe — Chemin Pentest', desc: 'Résolution de machines vulnérables en Linux et Windows.' },
  ],
},
```

### Étape 3 — Insérer la section dans la page

Ouvre `web/app/page.tsx` et :
1. Importe ton composant en haut :
   ```tsx
   import { CtfSection } from '@/components/ctf-section'
   ```
2. Place-le à l'endroit voulu dans l'ordre d'affichage :
   ```tsx
   <SkillsSection />
   <CertificationsSection />
   <CtfSection />        {/* ← nouvelle section */}
   <ProjectsSection />
   ```

### Étape 4 — Ajouter le lien dans le menu de navigation (optionnel)

Ouvre `web/components/site-header.tsx` et ajoute une ligne dans le tableau
`links` (présent deux fois : menu desktop et menu mobile) :

```tsx
const links = [
  ...
  { href: '#ctf', label: t.nav.ctf },
  ...
]
```

N'oublie pas d'ajouter `ctf: 'CTF & Wargames'` dans l'objet `nav` de
`i18n.ts` (dans les deux langues).

---

## 6. Ajouter / remplacer une image

1. Dépose ton fichier image dans `web/public/images/` (formats `.png`,
   `.jpg` ou `.webp` conseillés, idéalement compressée pour rester légère).
2. Référence-la dans le composant concerné avec le chemin `/images/nom-du-fichier.png`.
   - Photos "À propos" → tableau `images` dans `about-section.tsx`.
   - Images de projets → tableau `images` dans `projects-section.tsx`.
   - Photo de profil (bulle animée en haut) → `hero-section.tsx`, balise
     `<Image src="/images/avatar.png" .../>`.
3. Pour remplacer le CV téléchargeable, dépose le nouveau PDF dans
   `web/public/` et renomme-le exactement `CV_Madoche_CAKPO.pdf` (ou change
   le nom dans `hero-section.tsx`, propriété `href="/CV_..."`).

---

## 7. Modifier les animations

Le composant `web/components/reveal.tsx` gère les animations d'apparition au
scroll. Chaque section (ou chaque carte) est enveloppée dans une balise
`<Reveal>` avec deux réglages principaux :

```tsx
<Reveal animation="fade-up" delay={120}>
  ...
</Reveal>
```

- **`animation`** : type d'effet d'entrée. Valeurs disponibles :
  | Valeur | Effet |
  |---|---|
  | `fade-up` | apparaît en montant légèrement (par défaut) |
  | `fade-down` | apparaît en descendant légèrement |
  | `fade-left` | glisse depuis la droite |
  | `fade-right` | glisse depuis la gauche |
  | `zoom-in` | apparaît en grossissant légèrement |
  | `blur-in` | apparaît en se "défloutant" |

- **`delay`** : délai en millisecondes avant que l'animation démarre (utile
  pour faire apparaître les cartes une par une). Dans les listes, tu verras
  souvent `delay={i * 120}` : chaque carte attend 120ms de plus que la
  précédente (`i` est sa position dans la liste, générée automatiquement par
  `.map()`).

**Pour changer l'animation d'une section existante**, remplace simplement la
valeur de `animation="..."` dans le composant concerné. Exemple : rendre les
certifications plus "douces" avec un `blur-in` au lieu d'un `zoom-in` :

```tsx
<Reveal key={cert.title} animation="blur-in" delay={i * 120}>
```

**Pour changer la vitesse d'apparition des cartes en cascade**, modifie le
multiplicateur : `delay={i * 120}` → `delay={i * 200}` (plus lent) ou
`delay={i * 60}` (plus rapide).

### Animations "flottantes" en continu (CSS)

Certains éléments ont une animation permanente (pas liée au scroll), définie
directement dans `web/app/globals.css`, comme le badge flottant "2+ ans
d'apprentissage" ou la bulle de la photo de profil. Elles utilisent des
classes comme :

```tsx
className="animate-[float-slow_4s_ease-in-out_infinite]"
```

Ce sont des animations CSS "keyframes" définies dans `globals.css`
(`float-slow`, `blobMorph`, `wave`...). Tu peux ajuster la durée en changeant
le nombre (`4s`) directement dans le composant — pas besoin de toucher au
CSS pour ça. Pour créer un nouvel effet flottant, il faut par contre définir
un nouveau `@keyframes` dans `globals.css`, ce qui est plus avancé.

---

## 8. Modifier les couleurs et le style général

Les couleurs (primaire, fond, cartes, bordures...) sont centralisées dans
`web/app/globals.css` sous forme de variables CSS. Elles sont utilisées
partout via des classes Tailwind comme `bg-primary`, `text-primary`,
`border-border`, `bg-card`, `text-muted-foreground`. Modifier une variable
dans `globals.css` change instantanément la couleur sur tout le site — pas
besoin de la changer section par section.

⚠️ Cette partie est plus technique : une erreur de syntaxe ici peut casser
l'affichage de tout le site. Fais une sauvegarde du fichier avant toute
modification, ou demande de l'aide si tu n'es pas sûr.

---

## 9. Checklist rapide pour tes futures mises à jour

- [ ] **Nouvelle certification obtenue** → ajouter un bloc dans
      `certifications.items` (FR **et** EN) dans `i18n.ts`.
- [ ] **Nouveau projet réalisé** → ajouter un bloc dans `projects.items`
      (FR + EN) + éventuellement une image dans `public/images/` et dans le
      tableau `images` de `projects-section.tsx`.
- [ ] **Nouvelle formation / année d'études** → ajouter un bloc dans
      `skills.educationItems` (FR + EN).
- [ ] **Nouvelle compétence technique (barre de progression)** → ajouter un
      bloc dans le tableau `skillBars` en haut de `skills-section.tsx`
      (ce tableau n'est pas dans `i18n.ts` car il n'a pas besoin de
      traduction, seul le nom peut nécessiter une adaptation FR/EN).
- [ ] **CV mis à jour** → remplacer le fichier `public/CV_Madoche_CAKPO.pdf`.
- [ ] **Nouvelle section complète** → suivre les 4 étapes de la section 5 de
      ce guide.
- [ ] **Toujours modifier le bloc `fr` ET le bloc `en`** de `i18n.ts` pour
      garder les deux langues synchronisées.

---

## 10. Bon réflexe avant de publier

Après chaque modification, tu peux vérifier que le site démarre bien en
local avant de le déployer :

```bash
cd web
npm install     # une seule fois, ou si tu as changé des dépendances
npm run dev
```

Puis ouvre `http://localhost:3000` dans ton navigateur pour voir le résultat
en direct. Les changements de texte dans `i18n.ts` et de style dans les
composants `.tsx` se rechargent automatiquement sans redémarrer le serveur.
