import Accordion from "@/components/Accordion";
import Section from "@/components/Section";

const faqItems = [
  {
    question: "Solea est-elle une institution de santé ?",
    answer: `Non.

Solea n'est pas une institution médicale et ne propose pas de traitements contre le cancer. Ceux-ci restent entièrement assurés et suivis par votre équipe médicale.

Solea intervient en complément de la médecine conventionnelle afin d'accompagner la personne dans sa globalité en soutenant son corps, son mental, en lui apprenant à gérer et transformer ses émotions et en permettant à l'individu de retrouver du sens.`
  },
  {
    question: "En quoi Solea est-elle différente des autres offres d'accompagnement ?",
    answer: `Il existe aujourd'hui de nombreuses initiatives proposant des ateliers divers, des activités ponctuelles et des groupes dont la composition évolue selon les ateliers et activités choisis.

La particularité de Solea réside dans son format immersif consistant en un séjour d'accompagnement exclusif de cinq jours, conçu comme un véritable cheminement de ressourcement, de reconnexion à soi et de transformation avec :
- Un même lieu au sein de la nature
- Un même groupe
- Un programme élaboré au plus près des attentes des participants
- Un séjour ressourçant hors du quotidien

Parce qu'une transformation ne naît pas d'un atelier, d'une consultation ou d'une activité.

Elle demande du temps, de la continuité, du lien humain et une expertise que seule Solea propose.`
  },
  {
    question: "Vais-je devoir arrêter ou modifier mes traitements ?",
    answer: `En aucun cas.

Aucune activité ou thérapie proposée par Solea ne se substitue au traitement médical ou ne conduit à interrompre un protocole thérapeutique.

Solea ne pose aucun diagnostic et ne porte aucun avis sur le suivi médical et les traitements prescrits.

Au contraire, notre démarche s'inscrit dans une approche intégrative fondée sur une collaboration avec la médecine conventionnelle.`
  },
  {
    question: "Les méthodes proposées par Solea sont-elles sérieuses ?",
    answer: `Oui.

Le programme est validé par un comité composé de médecins, d'oncologues, de thérapeutes et d'experts.

Les approches proposées sont sélectionnées selon leur niveau de preuves scientifiques lorsqu'elles existent, notamment en s'appuyant sur les recommandations internationales en oncologie intégrative (telles que les recommandations SIO/ASCO).`
  },
  {
    question: "Est-ce que Solea promet la guérison ?",
    answer: `Non, jamais.

Solea ne fait pas de fausses promesses.

En revanche, nous sommes convaincus que la qualité de la présence humaine, l'écoute, le partage d'expérience, alliés aux thérapies complémentaires et au contact avec la nature, aident à trouver la force intérieure, l'énergie positive, l'élan, la capacité d'avancer sereinement et de faire de cette maladie une force de transformation.`
  },
  {
    question: "Je suis très fatigué(e). Puis-je quand même participer ?",
    answer: `Très probablement.

La fatigue est l'un des effets les plus fréquents du cancer et de ses traitements.

Les activités sont adaptées au rythme de chacun.

Néanmoins, avant toute participation, un échange avec notre équipe permet de vérifier que le séjour est adapté à votre situation.`
  },
  {
    question: "Je ne me sens pas prêt(e) à parler de mon cancer.",
    answer: `Vous n'y serez jamais obligé.

Certaines personnes ressentent le besoin de partager leur histoire, d'autres préfèrent écouter ou simplement vivre l'expérience.

Chez Solea, chacun avance à son rythme, dans un climat d'écoute, de respect et de bienveillance.`
  },
  {
    question: "J'ai peur d'être confronté(e) à la souffrance des autres.",
    answer: `C'est une inquiétude fréquente et tout à fait légitime.

Chaque participant est accueilli avec son propre vécu, son histoire et son rythme. Les échanges sont encadrés par des professionnels afin que chacun puisse partager, s'il le souhaite, écouter et avancer dans un environnement respectueux et sécurisant, sans se sentir submergé par les émotions des autres.

Le séjour n'a pas pour objectif de rester centré sur la maladie ou la souffrance, mais de permettre à chacun de mobiliser ses ressources, de retrouver confiance et un élan, ce qui donne du sens à son parcours.

Aussi, si une personne a besoin d'exprimer sa souffrance et de se confier, elle pourra le faire en aparté avec un intervenant.`
  },
  {
    question: "Pourquoi le séjour dure-t-il cinq jours ?",
    answer: `Parce qu'un véritable changement demande du temps.

En quelques heures ou lors d'un atelier isolé, il est difficile d'intégrer de nouveaux outils ou de modifier durablement certaines habitudes. Un atelier ponctuel ou quelques heures d'accompagnement peuvent ouvrir une réflexion, mais seule une expérience immersive de plusieurs jours permet d'enclencher un changement profond.

Cinq jours permettent de créer une dynamique de groupe, de tisser des liens solides, d'expérimenter différentes approches, d'acquérir des connaissances et de repartir chez soi avec des outils concrets à appliquer dans son quotidien.`
  },
  {
    question: "Que vais-je apprendre pendant ces cinq jours ?",
    answer: `Vous découvrirez des pratiques validées ou reconnues en oncologie intégrative dans différents domaines : alimentation, activité physique adaptée, gestion du stress, méditation, hypnose médicale, psycho-oncologie, techniques de respiration, gestion des émotions, sommeil, communication avec les proches, et bien d'autres ressources.

L'objectif est de vous permettre de mieux comprendre certains aspects de votre santé et de repartir avec des connaissances et des outils directement utilisables après le séjour.

Au-delà des apprentissages, ce séjour offre également un temps pour se reconnecter à soi, retrouver de la confiance et avancer avec davantage de sérénité.`
  },
  {
    question: "Est-ce une démarche spirituelle ?",
    answer: `Solea n'est pas une démarche spirituelle au sens religieux du terme.

Aucune croyance n'est imposée.

Solea accueille chaque personne avec ses convictions, ses valeurs et son propre parcours.

Lorsque nous parlons de quête de sens ou de dimension spirituelle, nous faisons référence à cette réflexion profonde sur ce qui donne une direction à sa vie, à ce qui permet de retrouver un équilibre intérieur, un sentiment de paix ou une meilleure connexion avec soi-même.

Solea propose un espace d'ouverture et de réflexion sans imposer de voie toute tracée.

Solea accompagne chacun dans la construction de son propre chemin.`
  },
  {
    question: "Est-ce réservé aux personnes qui croient aux médecines complémentaires ?",
    answer: `Non.

Beaucoup de participants découvrent certaines approches pour la première fois.

Chacun est libre d'expérimenter, de poser des questions, de conserver ce qui lui convient et de laisser ce qui ne lui correspond pas.

Notre approche repose sur l'ouverture d'esprit, la curiosité, le non-jugement et le partage.`
  },
  {
    question: "Puis-je venir accompagné(e) de mon conjoint ou d'un proche ?",
    answer: `Le séjour est conçu pour offrir au participant un temps entièrement consacré à lui-même.

En parallèle, Solea souhaite également développer des conférences et des séminaires ouverts aux proches afin de mieux les accompagner dans leur rôle.`
  },
  {
    question: "Je suis en rémission. Est-ce encore utile ?",
    answer: `Oui.

La fin des traitements est souvent le début d'une nouvelle étape, parfois plus difficile qu'on ne l'imagine.

Retrouver confiance dans son corps, reprendre une vie professionnelle, gérer la peur de la récidive ou simplement redonner du sens à son existence sont autant de sujets que Solea aborde.`
  },
  {
    question: "Combien coûte le séjour ?",
    answer: `La participation est entièrement gratuite.

Nous souhaitons que personne ne renonce à cette expérience pour des raisons financières.

Les séjours sont rendus possibles grâce à la générosité de nos donateurs, partenaires, mécènes et bénévoles.`
  },
  {
    question: "Comment les places sont-elles attribuées ?",
    answer: `Le nombre de participants est volontairement limité afin de garantir un accompagnement de qualité.

Chaque demande, suivant sa date d'inscription, fait l'objet d'un échange avec notre équipe afin de s'assurer que l'expérience correspond aux besoins de la personne.`
  },
  {
    question: "J'ai déjà participé à un séjour Solea. Est-ce que je peux revenir ?",
    answer: `Afin de permettre au plus grand nombre de personnes touchées par le cancer de bénéficier de l'expérience Solea, la priorité est donnée aux personnes qui participent pour la première fois.

Chaque demande est néanmoins examinée avec attention en fonction des places disponibles et des circonstances particulières.

Nous sommes heureux que certains participants souhaitent prolonger leur cheminement avec Solea. Cette envie témoigne de la richesse de l'expérience vécue, et nous encourageons chacun à continuer à faire vivre les ressources découvertes pendant le séjour dans son quotidien.`
  },
  {
    question: "Je suis médecin ou professionnel de santé. Pourquoi orienter un patient vers Solea ?",
    answer: `Les traitements médicaux sont essentiels dans la prise en charge du cancer. Ils visent à traiter la maladie et à améliorer le pronostic des patients.

Cependant, au cours de leur parcours, de nombreuses personnes expriment également des besoins qui dépassent le seul champ médical : retrouver de l'énergie, mieux vivre avec les effets de la maladie et des traitements, mieux comprendre ce qui peut soutenir leur santé, reprendre confiance, rompre l'isolement ou trouver des ressources pour traverser cette période avec davantage de sérénité.

De plus en plus de patients souhaitent explorer des approches complémentaires pour prendre une place plus active dans leur parcours de santé. Solea leur offre un cadre structuré, bienveillant et sécurisé pour découvrir différentes ressources issues notamment de l'oncologie intégrative, en complément de leur suivi médical.

Solea ne se substitue jamais aux traitements ni aux recommandations de l'équipe soignante. La fondation s'inscrit dans une démarche de collaboration avec les professionnels de santé, afin d'accompagner la personne dans sa globalité : son corps, son vécu émotionnel, son quotidien et sa qualité de vie.

Orienter un patient vers Solea, c'est lui proposer un accompagnement complémentaire qui contribue à renforcer ses ressources personnelles tout au long de son parcours.`
  },
  {
    question: "Puis-je soutenir Solea même si je ne suis pas concerné par le cancer ?",
    answer: `Bien sûr.

Chaque don, chaque mise en relation, chaque compétence offerte ou chaque heure de bénévolat contribue à permettre à davantage de personnes de vivre cette expérience, gratuitement.`
  }
];

export const metadata = {
  title: "Questions fréquentes"
};

export default function FAQPage() {
  return (
    <div className="relative isolate overflow-hidden px-5 py-12 sm:px-8 lg:py-16">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-gradient-to-br from-fern/20 to-transparent blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 bottom-12 h-72 w-72 rounded-full bg-gradient-to-br from-cream/40 to-transparent blur-3xl"
      />

      <div className="mx-auto w-full max-w-[1000px] relative z-10">
        <div className="mb-12 sm:mb-16">
          <p className="text-[13px] font-semibold uppercase tracking-[0.22em] text-moss mb-6">
            Questions fréquentes
          </p>
          <h1 className="font-display text-[clamp(1.75rem,3vw,2.75rem)] font-light leading-[1.1] text-bark text-balance">
            Vos questions, nos réponses
          </h1>
        </div>

        <Accordion items={faqItems} />
      </div>
    </div>
  );
}
