import { createClient } from "@sanity/client";

const PROJECT_ID = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "6q4qoj9r";
const DATASET = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";

function getClient() {
  const token = process.env.SANITY_API_WRITE_TOKEN;
  if (!token) return null;
  return createClient({ projectId: PROJECT_ID, dataset: DATASET, apiVersion: "2024-01-01", token, useCdn: false });
}

async function isEmpty(client: ReturnType<typeof createClient>, type: string): Promise<boolean> {
  const count = await client.fetch<number>(`count(*[_type == $type])`, { type });
  return count === 0;
}

// ─── Seed data ────────────────────────────────────────────────────────────────

const SERVICES = [
  {
    id: "horas",
    name_es: "Visitas Diarias",
    name_en: "Daily Visits",
    description_es: "¿Vas a estar fuera todo el día o hasta el día siguiente? Paso a tu casa dos o tres veces al día para pasear, alimentar y darle agua a tu mascota. Tú no tienes que interrumpir tu plan.",
    description_en: "Going to be out all day or until the next day? I stop by your place two or three times a day to walk, feed, and water your pet. No need to interrupt your plans.",
    detail_es: "Perfecto para personas que necesitan apoyo puntual sin cuidado de tiempo completo. Muy útil para gatos y perritos independientes.\n\nSe aplica un cargo de transporte según la ubicación.",
    detail_en: "Perfect for people who need occasional support without full-time care. Very useful for cats and independent dogs.\n\nA transportation charge applies depending on location.",
    card_includes_es: ["Visitas a tu domicilio", "Paseos y ejercicio", "Alimentación y agua", "Limpieza de areneros", "Atención para gatos"],
    card_includes_en: ["Home visits", "Walks and exercise", "Feeding and water", "Litter cleaning", "Cat care"],
    includes_es: ["Visitas a tu domicilio (dos o tres veces al día)", "Paseos de 30–45 min con agua, juegos y ejercicio", "Revisión de comederos, agua limpia y arena (en caso de gatos)", "Atención amorosa, sin prisas"],
    includes_en: ["Visits to your home (two or three times a day)", "30–45 min walks with water, play, and exercise", "Checking food bowls, fresh water, and litter (for cats)", "Loving attention, no rush"],
    ideal_es: "", ideal_en: "", why_higher_es: [], why_higher_en: [], benefits_es: [], benefits_en: [],
    price_large: "70.000", price_small: "",
    price_note_es: "Se aplica cargo de transporte según ubicación.",
    price_note_en: "Transportation charge applies depending on location.",
    conditions_es: ["Ciertas condiciones aplican", "Mascotas de raza con mucha energía, el precio puede variar"],
    conditions_en: ["Certain conditions apply", "High-energy breed pricing may vary"],
    footer_note_es: "", footer_note_en: "",
    unit_es: "día", unit_en: "day",
    icon: "clock", order: 1,
  },
  {
    id: "banos",
    name_es: "Baño a Domicilio",
    name_en: "Home Bathing",
    description_es: "Ayudamos a que tu mascota se mantenga limpia, fresca y cómoda con nuestros servicios de baño e higiene a domicilio.",
    description_en: "We help keep your pet clean, fresh, and comfortable with our home bathing and hygiene services.",
    detail_es: "Servicio de higiene completo a domicilio para que tu peludo esté siempre presentable y saludable.",
    detail_en: "Complete home hygiene service to keep your furry friend always presentable and healthy.",
    card_includes_es: ["Baños", "Cepillado", "Limpieza básica", "Cuidado de higiene"],
    card_includes_en: ["Baths", "Brushing", "Basic cleaning", "Hygiene care"],
    includes_es: ["Baño completo con productos adecuados para su pelaje", "Secado y cepillado", "Limpieza de oídos", "Corte de uñas"],
    includes_en: ["Full bath with products suited for their coat", "Drying and brushing", "Ear cleaning", "Nail trimming"],
    ideal_es: "", ideal_en: "", why_higher_es: [], why_higher_en: [], benefits_es: [], benefits_en: [],
    price_large: "120.000", price_small: "",
    price_note_es: "A partir de $120.000 · precio varía según raza y tamaño",
    price_note_en: "Starting at $120,000 · price varies by breed and size",
    conditions_es: ["Precio varía según raza, tamaño y estado del pelaje"],
    conditions_en: ["Price varies by breed, size, and coat condition"],
    footer_note_es: "", footer_note_en: "",
    unit_es: "servicio", unit_en: "service",
    icon: "droplets", order: 2,
  },
  {
    id: "eventos",
    name_es: "Niñera de Mascotas en Eventos",
    name_en: "Pet Event Nanny",
    description_es: "¿Quieres que tu mascota forme parte de tu boda, cumpleaños, reunión familiar o celebración especial? Yo me encargo de cuidarla durante el evento para que puedas disfrutar cada momento sin preocuparte.",
    description_en: "Want your pet to be part of your wedding, birthday, family gathering, or special celebration? I take care of them during the event so you can enjoy every moment worry-free.",
    detail_es: "Tu mascota también forma parte de la familia y merece estar presente en los momentos más importantes. Con este servicio, podrás incluir a tu peludo en bodas, pedidas de mano, sesiones de fotos, cumpleaños y eventos especiales.",
    detail_en: "Your pet is also part of the family and deserves to be present at the most important moments. With this service, you can include your furry friend in weddings, proposals, photo sessions, birthdays, and special events.",
    card_includes_es: ["Bodas", "Cumpleaños", "Sesiones de fotos", "Pedidas de mano", "Eventos corporativos pet-friendly"],
    card_includes_en: ["Weddings", "Birthdays", "Photo sessions", "Proposals", "Pet-friendly corporate events"],
    includes_es: ["Supervisión constante durante el evento", "Paseos y pausas para hacer sus necesidades", "Agua, snacks y atención personalizada", "Apoyo durante fotografías y momentos especiales", "Monitoreo de señales de estrés o incomodidad", "Actualizaciones y fotos para tu tranquilidad", "Aplicación de medicamentos si es necesario"],
    includes_en: ["Constant supervision during the event", "Walks and bathroom breaks", "Water, snacks, and personalized attention", "Support during photos and special moments", "Monitoring stress or discomfort signals", "Updates and photos for your peace of mind", "Medication administration if necessary"],
    ideal_es: "Bodas · Pedidas de mano · Sesiones fotográficas · Cumpleaños · Reuniones familiares · Eventos sociales y corporativos pet-friendly",
    ideal_en: "Weddings · Proposals · Photo sessions · Birthdays · Family gatherings · Pet-friendly social and corporate events",
    benefits_es: ["Disfrutas tu evento sin preocupaciones", "Evitas delegar el cuidado de tu mascota a familiares o invitados", "Tu mascota participa de forma segura y cómoda", "Atención personalizada enfocada en su bienestar emocional"],
    benefits_en: ["Enjoy your event without worries", "Avoid delegating your pet's care to family or guests", "Your pet participates safely and comfortably", "Personalized attention focused on their emotional well-being"],
    why_higher_es: [], why_higher_en: [],
    price_large: "80.000", price_small: "",
    price_note_es: "Primeras 2h · $30.000/hora adicional · +6h o múltiples mascotas: cotización personalizada",
    price_note_en: "First 2h · $30,000/additional hour · +6h or multiple pets: personalized quote",
    conditions_es: ["El servicio se presta únicamente durante el evento", "La mascota debe contar con vacunación al día y buen estado de salud", "Se recomienda reunión previa para conocer rutina, personalidad y necesidades de la mascota", "Sujeto a disponibilidad de fecha y ubicación", "Mascotas de raza con mucha energía, el precio puede variar"],
    conditions_en: ["The service is provided only during the event", "The pet must be up to date on vaccinations and in good health", "A prior meeting is recommended to get to know the pet's routine, personality, and needs", "Subject to date and location availability", "High-energy breed pricing may vary"],
    footer_note_es: "Porque los momentos especiales se disfrutan mejor cuando sabes que tu mascota está segura, tranquila y acompañada.",
    footer_note_en: "Because special moments are better enjoyed when you know your pet is safe, calm, and cared for.",
    unit_es: "evento", unit_en: "event",
    icon: "camera", order: 3,
  },
  {
    id: "pernocta",
    name_es: "Cuidados en Tu Hogar",
    name_en: "Care at Your Home",
    description_es: "Voy a tu casa para cuidar de tu peludo en la comodidad de su propio entorno. (El transporte no está incluido. Aplican ciertas condiciones.)",
    description_en: "I come to your home to care for your pet in the comfort of their own environment. (Transportation not included. Conditions apply.)",
    detail_es: "Este servicio va mucho más allá de \"quedarse a dormir\". Implica una dedicación absoluta y exclusiva para tu mascota durante toda la noche, garantizando compañía, seguridad y el cumplimiento de sus rutinas en un entorno familiar.\n\nDebido a la logística, responsabilidad y nivel de compromiso que requiere, este servicio está sujeto a condiciones específicas.",
    detail_en: "This service goes far beyond just \"sleeping over\". It means absolute and exclusive dedication to your pet throughout the night, ensuring companionship, safety, and their routines in a familiar setting.\n\nDue to the logistics, responsibility, and level of commitment required, this service is subject to specific conditions.",
    card_includes_es: ["Pernocta en casa del cliente", "Acompañamiento nocturno", "Rutinas completas", "Supervisión prolongada", "Estadías de varios días"],
    card_includes_en: ["Overnight stay at your home", "Nighttime companionship", "Full daily routines", "Extended supervision", "Multi-day stays"],
    includes_es: ["Disponibilidad total desde el atardecer hasta la mañana siguiente", "Paseos, alimentación, juegos y acompañamiento nocturno", "Supervisión continua y exclusiva para tus mascotas", "Cuido tu hogar con la misma seriedad que a tu mascota", "Servicio completamente dedicado a tus mascotas"],
    includes_en: ["Full availability from dusk to the following morning", "Walks, feeding, play, and overnight companionship", "Continuous and exclusive supervision for your pets", "I care for your home with the same seriousness as your pet", "Service completely dedicated to your pets"],
    why_higher_es: ["Disponibilidad total y prolongada: permanezco en tu hogar desde el atardecer hasta la mañana siguiente", "Atención continua: incluye paseos, alimentación, juegos, acompañamiento y supervisión nocturna", "Exposición y adaptación personal: al estar en un entorno distinto a mi hogar, implica un nivel adicional de responsabilidad, confianza y adaptación", "Respeto por tu espacio: cuido tu hogar con la misma seriedad y compromiso con el que cuido a tu mascota", "Servicio exclusivo: durante la pernocta, mi tiempo está completamente destinado a tus mascotas"],
    why_higher_en: ["Full and extended availability: I stay in your home from dusk to the following morning", "Continuous attention: includes walks, feeding, play, companionship, and nighttime supervision", "Personal exposure and adaptation: being in an environment other than my own implies an additional level of responsibility, trust, and adaptation", "Respect for your space: I care for your home with the same seriousness and commitment with which I care for your pet", "Exclusive service: during the overnight stay, my time is entirely dedicated to your pets"],
    ideal_es: "", ideal_en: "", benefits_es: [], benefits_en: [],
    price_large: "100.000", price_small: "",
    price_note_es: "El valor puede variar según cantidad de mascotas, nivel de energía o requerimientos especiales. Transporte no incluido.",
    price_note_en: "Price may vary depending on the number of pets, energy level, or special requirements. Transportation not included.",
    conditions_es: ["Solo hogares con más de 2 mascotas", "Estadías mínimas de 30 días continuos", "Reserva anticipada de mínimo 2 a 3 semanas", "Sujeto a evaluación previa del caso y disponibilidad", "Mascotas con rutinas definidas y comportamiento estable"],
    conditions_en: ["Only homes with more than 2 pets", "Minimum stays of 30 continuous days", "Advance reservation of at least 2 to 3 weeks", "Subject to prior case evaluation and availability", "Pets with defined routines and stable behavior"],
    footer_note_es: "Este servicio refleja no solo el cuidado de tu mascota, sino también el compromiso, la confianza y la disposición de adaptarme a tu espacio para asegurar que tu compañero nunca esté solo.",
    footer_note_en: "This service reflects not only the care of your pet, but also the commitment, trust, and willingness to adapt to your space to ensure your companion is never alone.",
    unit_es: "noche", unit_en: "night",
    icon: "moon", order: 4,
  },
  {
    id: "hogar-pequenos",
    name_es: "Cuidado en Mi Hogar — Perros Pequeños",
    name_en: "Home Boarding — Small Dogs",
    description_es: "Deja a tu peludo en un lugar tranquilo y hogareño mientras estás fuera. Atención personalizada, sin jaulas y con todo el amor.",
    description_en: "Leave your furry friend in a calm, home-like setting while you're away. Personalized attention, no cages, and all the love.",
    detail_es: "Tu mascota será parte de mi familia durante su estadía. Solo cuido una mascota a la vez para garantizar atención exclusiva. Este servicio no incluye transporte — tú traes y recoges a tu peludo.",
    detail_en: "Your pet becomes part of my family during their stay. I only care for one pet at a time to ensure exclusive attention. Transportation not included — you drop off and pick up your furry friend.",
    card_includes_es: ["Atención exclusiva", "Estadías cortas y largas", "Administración de medicamentos", "Paseos, juegos y seguimiento diario", "Fotos y actualizaciones"],
    card_includes_en: ["Exclusive attention", "Short and long stays", "Medication administration", "Walks, play, and daily updates", "Photos and check-ins"],
    includes_es: ["Alojamiento cómodo, limpio y seguro", "Rutina de paseos, alimentación y juegos", "Fotos y actualizaciones diarias", "Supervisión constante (cuido mascotas de una misma familia)", "Aplicación de medicamentos si necesitas"],
    includes_en: ["Comfortable, clean, and safe accommodation", "Daily walks, feeding, and playtime", "Daily photos and updates", "Constant supervision (pets from the same family)", "Medication administration if needed"],
    ideal_es: "Perros pequeños y tranquilos que necesitan un hogar temporal lleno de amor.",
    ideal_en: "Small, calm dogs that need a temporary loving home.",
    price_large: "40.000", price_small: "",
    price_note_es: "Por noche · Para perros pequeños y tranquilos",
    price_note_en: "Per night · For small, calm dogs",
    conditions_es: ["Si es más de una mascota, el precio varía", "Transporte no incluido", "Perros pequeños y de temperamento tranquilo"],
    conditions_en: ["Price varies for more than one pet", "Transportation not included", "Small dogs with calm temperament"],
    why_higher_es: [], why_higher_en: [], benefits_es: [], benefits_en: [],
    footer_note_es: "", footer_note_en: "",
    unit_es: "noche", unit_en: "night",
    icon: "home", order: 5,
  },
  {
    id: "horas-extra",
    name_es: "Cuidado por Hora",
    name_en: "Hourly Care",
    description_es: "¿Vas al gimnasio, a una cita o tienes un compromiso de pocas horas? Me quedo con tu mascota durante ese tiempo puntual para que esté acompañada y bien cuidada.",
    description_en: "Heading to the gym, an appointment, or a short errand? I stay with your pet during that time so they're in good company and well cared for.",
    detail_es: "Servicio flexible y puntual, cobrado por hora. Ideal para situaciones donde necesitas acompañamiento por un tiempo definido sin requerir una visita diaria completa.",
    detail_en: "Flexible and punctual service, billed by the hour. Ideal for situations where you need companionship for a defined time without requiring a full daily visit.",
    card_includes_es: ["Cobro por hora", "Acompañamiento puntual", "Alimentación y juego", "Cuidado enfocado"],
    card_includes_en: ["Billed by the hour", "Punctual companionship", "Feeding and play", "Focused care"],
    includes_es: ["Acompañamiento y supervisión durante el tiempo contratado", "Alimentación, agua y juego", "Reporte del estado de tu mascota"],
    includes_en: ["Companionship and supervision for the contracted time", "Feeding, water, and play", "Report on your pet's condition"],
    ideal_es: "", ideal_en: "", why_higher_es: [], why_higher_en: [], benefits_es: [], benefits_en: [],
    price_large: "15.000", price_small: "12.000",
    price_note_es: "1 a 4 horas: $15.000/hora · Más de 4 horas: $12.000/hora",
    price_note_en: "1 to 4 hours: $15,000/hour · Over 4 hours: $12,000/hour",
    conditions_es: ["Mínimo 1 hora", "Se aplica cargo de transporte según ubicación"],
    conditions_en: ["Minimum 1 hour", "Transportation charge applies depending on location"],
    footer_note_es: "", footer_note_en: "",
    unit_es: "hora", unit_en: "hour",
    icon: "clock", order: 6,
  },
  {
    id: "hogar-grandes",
    name_es: "Cuidado en Mi Hogar — Perros Grandes",
    name_en: "Home Boarding — Large Dogs",
    description_es: "Cuido a tu perro grande en mi casa de una manera tranquila y segura. Paseos, atención personalizada y un ambiente familiar.",
    description_en: "I take care of your large dog at my home in a calm and safe way. Walks, personalized attention, and a family environment.",
    detail_es: "Servicio pensado para perros de razas grandes o activas. Mi casa de perros grandes tiene todo el espacio que necesitan para moverse cómodamente. Solo cuido una mascota a la vez.",
    detail_en: "Service designed for large or active breed dogs. My large dog area has all the space they need to move comfortably. I only care for one pet at a time.",
    card_includes_es: ["Atención exclusiva", "Estadías cortas y largas", "Administración de medicamentos", "Paseos y ejercicio diario", "Fotos y actualizaciones"],
    card_includes_en: ["Exclusive attention", "Short and long stays", "Medication administration", "Daily walks and exercise", "Photos and check-ins"],
    includes_es: ["Alojamiento espacioso, limpio y seguro", "Rutina de paseos largos y ejercicio", "Fotos y actualizaciones diarias", "Supervisión constante (cuido mascotas de una misma familia)", "Aplicación de medicamentos si necesitas"],
    includes_en: ["Spacious, clean, and safe accommodation", "Long walks and exercise routine", "Daily photos and updates", "Constant supervision (pets from the same family)", "Medication administration if needed"],
    ideal_es: "Perros de razas grandes o activas (husky, golden, pitbull, rottweiler, etc.)",
    ideal_en: "Large or active breed dogs (husky, golden, pitbull, rottweiler, etc.)",
    price_large: "60.000", price_small: "",
    price_note_es: "Por noche · Para perros grandes o razas activas",
    price_note_en: "Per night · For large dogs or active breeds",
    conditions_es: ["Si es más de una mascota, el precio varía", "Transporte no incluido", "Sujeto a evaluación previa del temperamento"],
    conditions_en: ["Price varies for more than one pet", "Transportation not included", "Subject to prior temperament assessment"],
    why_higher_es: [], why_higher_en: [], benefits_es: [], benefits_en: [],
    footer_note_es: "", footer_note_en: "",
    unit_es: "noche", unit_en: "night",
    icon: "home", order: 7,
  },
];

const CERTIFICATIONS = [
  {
    id: "auxiliar-veterinaria",
    name_es: "Auxiliar Veterinaria", name_en: "Veterinary Assistant",
    institution: "Institución certificadora", year: "",
    description_es: "Formación en cuidados básicos, administración de medicamentos, primeros auxilios y manejo clínico de animales.",
    description_en: "Training in basic care, medication administration, first aid, and clinical animal handling.",
    order: 1,
  },
  {
    id: "groomer",
    name_es: "Groomer Certificada", name_en: "Certified Groomer",
    institution: "Institución certificadora", year: "",
    description_es: "Capacitación profesional en estética canina: baños, cortes, cepillado, limpieza de oídos y cuidado del pelaje.",
    description_en: "Professional training in canine aesthetics: baths, cuts, brushing, ear cleaning, and coat care.",
    order: 2,
  },
  {
    id: "primeros-auxilios",
    name_es: "Primeros Auxilios Animales", name_en: "Animal First Aid",
    institution: "Institución certificadora", year: "",
    description_es: "Entrenamiento en respuesta de emergencias, RCP animal, manejo de intoxicaciones y estabilización de pacientes.",
    description_en: "Training in emergency response, animal CPR, toxication management, and patient stabilization.",
    order: 3,
  },
];

const FAQ_ITEMS = [
  {
    question_es: "¿Cuántas mascotas cuidas al mismo tiempo?",
    question_en: "How many pets do you care for at the same time?",
    answer_es: "Cuido las mascotas de una misma familia a la vez. Si tienes dos o tres peludos, los cuido a todos juntos. Así garantizo atención personalizada y sin estrés, sin mezclar mascotas de diferentes familias.",
    answer_en: "I care for pets from the same family at a time. If you have two or three furry friends, I'll take care of all of them together — ensuring personalized, stress-free attention without mixing pets from different families.",
    order: 1,
  },
  {
    question_es: "¿Qué incluye el servicio de hospedaje?",
    question_en: "What does the boarding service include?",
    answer_es: "Paseos diarios, alimentación según su rutina, juegos, compañía constante y reportes fotográficos todos los días para que tú estés tranquilo.",
    answer_en: "Daily walks, feeding according to their routine, play, constant companionship, and daily photo reports so you can feel at ease.",
    order: 2,
  },
  {
    question_es: "¿Puedes administrar medicamentos?",
    question_en: "Can you administer medications?",
    answer_es: "Sí. Tengo formación como Auxiliar Veterinaria, así que puedo administrar medicamentos orales, tópicos e inyectables de forma segura.",
    answer_en: "Yes. I have training as a Veterinary Assistant, so I can safely administer oral, topical, and injectable medications.",
    order: 3,
  },
  {
    question_es: "¿Dónde están ubicados?",
    question_en: "Where are you located?",
    answer_es: "En Medellín. Ofrezco servicio de transporte a costo adicional para recoger y entregar a tu mascota.",
    answer_en: "In Medellín. I offer transportation service at an additional cost for pickup and drop-off.",
    order: 4,
  },
  {
    question_es: "¿Con cuánto tiempo debo reservar?",
    question_en: "How far in advance should I book?",
    answer_es: "Depende del servicio: para cuidado en mi casa, con una semana de anticipación es suficiente. Para pernocta en tu hogar, recomiendo 2-3 semanas. Avisos de último momento (de un día para otro o emergencias) son posibles pero tienen un costo adicional.",
    answer_en: "It depends on the service: for care at my home, one week in advance is enough. For overnight stays at your home, I recommend 2-3 weeks. Last-minute requests (next day or emergencies) are possible but carry an extra charge.",
    order: 5,
  },
  {
    question_es: "¿Hacen visita previa?",
    question_en: "Do you do a meet-and-greet visit?",
    answer_es: "Sí, y es gratuita. Antes del primer hospedaje hacemos una visita de conocimiento para que tu mascota se familiarice conmigo y con el espacio.",
    answer_en: "Yes, and it's free. Before the first stay we do a meet-and-greet so your pet can get familiar with me and the space.",
    order: 6,
  },
  {
    question_es: "¿Qué pasa en caso de emergencia veterinaria?",
    question_en: "What happens in a veterinary emergency?",
    answer_es: "Tengo clínicas veterinarias de confianza cerca. Mi formación me permite identificar señales de alerta y actuar rápido. Siempre te contacto de inmediato.",
    answer_en: "I have trusted veterinary clinics nearby. My training allows me to identify warning signs and act fast. I always contact you immediately.",
    order: 7,
  },
];

const TESTIMONIALS = [
  {
    id: "t1",
    quote_es: "Dejé a mi golden con Anais por una semana y regresé a un perro feliz y bien cuidado. Los reportes diarios con fotos me dieron mucha tranquilidad durante el viaje.",
    quote_en: "I left my golden with Anais for a week and came back to a happy, well-cared-for dog. The daily photo updates gave me so much peace of mind during the trip.",
    author: "María Camila R.", pet: "Max · Golden Retriever",
    service_es: "Hospedaje", service_en: "Boarding",
    rating: 5, order: 1,
  },
  {
    id: "t2",
    quote_es: "Mi gata es muy especial y nerviosa con extraños, pero con las visitas diarias se adaptó perfecto. Llegaba a encontrar todo en orden y a Luna súper tranquila.",
    quote_en: "My cat is very particular and nervous around strangers, but with the daily visits she adapted perfectly. I always came home to everything in order and Luna completely relaxed.",
    author: "Andrés M.", pet: "Luna · Gata persa",
    service_es: "Visitas Diarias", service_en: "Daily Visits",
    rating: 5, order: 2,
  },
  {
    id: "t3",
    quote_es: "Excelente servicio para nuestra boda. Anais estuvo pendiente de Canela durante toda la ceremonia y las fotos con ella quedaron hermosas. Totalmente recomendada.",
    quote_en: "Excellent service for our wedding. Anais kept an eye on Canela throughout the ceremony and the photos with her came out beautiful. Totally recommended.",
    author: "Laura & Sebastián", pet: "Canela · Beagle",
    service_es: "Acompañamiento en Eventos", service_en: "Event Accompaniment",
    rating: 5, order: 3,
  },
];

// ─── Seeders ──────────────────────────────────────────────────────────────────

async function seedServices(client: ReturnType<typeof createClient>) {
  for (const s of SERVICES) {
    await client.createOrReplace({
      _id: `service-${s.id}`, _type: "service",
      name_es: s.name_es, name_en: s.name_en,
      description_es: s.description_es, description_en: s.description_en,
      detail_es: s.detail_es, detail_en: s.detail_en,
      card_includes_es: s.card_includes_es, card_includes_en: s.card_includes_en,
      includes_es: s.includes_es, includes_en: s.includes_en,
      why_higher_es: s.why_higher_es, why_higher_en: s.why_higher_en,
      benefits_es: s.benefits_es, benefits_en: s.benefits_en,
      ideal_es: s.ideal_es, ideal_en: s.ideal_en,
      conditions_es: s.conditions_es, conditions_en: s.conditions_en,
      footer_note_es: s.footer_note_es, footer_note_en: s.footer_note_en,
      price_large: s.price_large, price_small: s.price_small,
      price_note_es: s.price_note_es, price_note_en: s.price_note_en,
      unit_es: s.unit_es, unit_en: s.unit_en,
      icon: s.icon, order: s.order, active: true,
    });
  }
}

async function seedCertifications(client: ReturnType<typeof createClient>) {
  for (const c of CERTIFICATIONS) {
    await client.createOrReplace({
      _id: `certification-${c.id}`, _type: "certification",
      name_es: c.name_es, name_en: c.name_en,
      institution: c.institution, year: c.year,
      description_es: c.description_es, description_en: c.description_en,
      order: c.order, active: true,
    });
  }
}

async function seedFaq(client: ReturnType<typeof createClient>) {
  for (const [i, f] of FAQ_ITEMS.entries()) {
    await client.createOrReplace({
      _id: `faq-${String(i + 1).padStart(2, "0")}`, _type: "faqItem",
      question_es: f.question_es, question_en: f.question_en,
      answer_es: f.answer_es, answer_en: f.answer_en,
      order: f.order, active: true,
    });
  }
}

async function seedTestimonials(client: ReturnType<typeof createClient>) {
  for (const t of TESTIMONIALS) {
    await client.createOrReplace({
      _id: `testimonial-${t.id}`, _type: "testimonial",
      quote_es: t.quote_es, quote_en: t.quote_en,
      author: t.author, pet: t.pet,
      service_es: t.service_es, service_en: t.service_en,
      rating: t.rating, order: t.order, active: true,
    });
  }
}

const REQUIREMENTS_DATA = [
  { id: "vacunas", icon: "syringe", title_es: "Vacunas al día", title_en: "Up-to-date vaccines", description_es: "Parvovirus, moquillo, hepatitis y rabia. Necesitamos ver el carnet veterinario.", description_en: "Parvovirus, distemper, hepatitis, and rabies. We need to see the vet card.", order: 1 },
  { id: "desparasitado", icon: "bug", title_es: "Desparasitado", title_en: "Dewormed", description_es: "Antiparasitario interno y externo vigente. Preferiblemente máximo 3 meses de antigüedad.", description_en: "Internal and external antiparasitic up to date. Preferably no more than 3 months old.", order: 2 },
  { id: "medicamentos", icon: "pill", title_es: "¿Toma medicamentos?", title_en: "Does it take medication?", description_es: "Infórmanos si tu mascota requiere medicamentos. Tengo formación para administrarlos de forma segura.", description_en: "Let us know if your pet requires medication. I'm trained to administer it safely.", order: 3 },
  { id: "miedos", icon: "alert", title_es: "¿Le tiene miedo a algo?", title_en: "Is it afraid of anything?", description_es: "Cuéntanos sus miedos, traumas o estímulos que lo alteran. Así podemos cuidarlo mejor.", description_en: "Tell us about their fears, traumas, or triggers. That way we can take better care of them.", order: 4 },
  { id: "reserva", icon: "calendar", title_es: "Reserva anticipada", title_en: "Advance reservation", description_es: "1 semana para cuidado en mi casa · 2-3 semanas para pernocta en tu hogar · Último momento posible con costo adicional.", description_en: "1 week for care at my home · 2-3 weeks for overnight at your home · Last-minute possible with extra charge.", order: 5 },
  { id: "visita", icon: "clipboard", title_es: "Visita previa", title_en: "Meet-and-greet visit", description_es: "Hacemos una visita de conocimiento sin costo para que tu peludo se familiarice conmigo.", description_en: "We do a free meet-and-greet so your pet can get familiar with me.", order: 6 },
];

async function seedRequirements(client: ReturnType<typeof createClient>) {
  for (const r of REQUIREMENTS_DATA) {
    await client.createOrReplace({
      _id: `requirement-${r.id}`, _type: "requirementItem",
      icon: r.icon, title_es: r.title_es, title_en: r.title_en,
      description_es: r.description_es, description_en: r.description_en,
      order: r.order, active: true,
    });
  }
}

async function seedSettings(client: ReturnType<typeof createClient>) {
  // Create document if it doesn't exist yet
  await client.createIfNotExists({ _id: "settings", _type: "settings" });
  // Only fill fields that are currently empty (never overwrite Katherine's content)
  await client.patch("settings").setIfMissing({
    whatsapp: "573208504292",
    instagram: "anaispcareservices",
    email: "anaisrodriguez2@icloud.com",
    hero_badge: "Medellín · Cuidado con amor",
    hero_title_es: "Tu mascota,",
    hero_title_en: "Your pet,",
    hero_title_highlight_es: "nuestra familia",
    hero_title_highlight_en: "our family",
    hero_subtitle_es: "Atención personalizada. Amor que se siente.",
    hero_subtitle_en: "Personalized care. Love you can feel.",
    hero_description_es: "Cuidado profesional con formación veterinaria y groomer. Una mascota a la vez, siempre. Porque tu mejor amigo merece lo mejor.",
    hero_description_en: "Professional care with veterinary and groomer training. One pet at a time, always. Because your best friend deserves the best.",
    about_title_es: "Hola, soy Anais",
    about_title_en: "Hi, I'm Anais",
    about_subtitle_es: "Tu aliada en el cuidado de peludos",
    about_subtitle_en: "Your ally in pet care",
    about_es: "Soy una apasionada del bienestar animal con formación como Auxiliar Veterinaria y Groomer certificada. Creo que cada mascota merece un cuidado tan especial como el que le das en casa — por eso trabajo con una sola mascota a la vez.\n\nMi hogar es su hogar. Paseos, juegos, mimos y reportes fotográficos diarios para que tú disfrutes tu viaje tranquilo y tu peludo también.",
    about_en: "I'm passionate about animal welfare with training as a Veterinary Assistant and certified Groomer. I believe every pet deserves care as special as what you give them at home — that's why I work with only one pet at a time.\n\nMy home is their home. Walks, play, cuddles, and daily photo reports so you can enjoy your trip worry-free, and your furry friend too.",
  }).commit();
}

// ─── Public API ───────────────────────────────────────────────────────────────

export async function checkAndSeed(): Promise<{ seeded: string[] }> {
  const client = getClient();
  if (!client) {
    console.warn("[auto-seed] SANITY_API_WRITE_TOKEN not set — skipping seed.");
    return { seeded: [] };
  }

  const seeded: string[] = [];

  try {
    const [noServices, noCerts, noFaq, noTestimonials, noRequirements] = await Promise.all([
      isEmpty(client, "service"),
      isEmpty(client, "certification"),
      isEmpty(client, "faqItem"),
      isEmpty(client, "testimonial"),
      isEmpty(client, "requirementItem"),
    ]);

    // Settings always gets patched (setIfMissing is safe — never overwrites)
    await seedSettings(client); seeded.push("settings");

    if (noServices) { await seedServices(client); seeded.push("services"); }
    if (noCerts) { await seedCertifications(client); seeded.push("certifications"); }
    if (noFaq) { await seedFaq(client); seeded.push("faq"); }
    if (noTestimonials) { await seedTestimonials(client); seeded.push("testimonials"); }
    if (noRequirements) { await seedRequirements(client); seeded.push("requirements"); }

    if (seeded.length > 0) {
      console.log(`[auto-seed] Seeded: ${seeded.join(", ")}`);
    }
  } catch (err) {
    console.error("[auto-seed] Error:", err);
  }

  return { seeded };
}
