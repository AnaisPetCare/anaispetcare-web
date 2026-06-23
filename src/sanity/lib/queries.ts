import { groq } from "next-sanity";

export const SERVICES_QUERY = groq`
  *[_type == "service" && active == true] | order(order asc) {
    "id": _id,
    "name": select($locale == "en" => coalesce(name_en, name_es), name_es),
    "description": select($locale == "en" => coalesce(description_en, description_es), description_es),
    "detail": select($locale == "en" => coalesce(detail_en, detail_es), detail_es),
    "card_includes": select($locale == "en" => coalesce(card_includes_en, card_includes_es), card_includes_es),
    "includes": select($locale == "en" => coalesce(includes_en, includes_es), includes_es),
    "why_higher": select($locale == "en" => coalesce(why_higher_en, why_higher_es), why_higher_es),
    "benefits": select($locale == "en" => coalesce(benefits_en, benefits_es), benefits_es),
    "ideal": select($locale == "en" => coalesce(ideal_en, ideal_es), ideal_es),
    "conditions": select($locale == "en" => coalesce(conditions_en, conditions_es), conditions_es),
    "footer_note": select($locale == "en" => coalesce(footer_note_en, footer_note_es), footer_note_es),
    price_large,
    price_small,
    "note": select($locale == "en" => coalesce(price_note_en, price_note_es), price_note_es),
    "unit": select($locale == "en" => coalesce(unit_en, unit_es), unit_es),
    icon
  }
`;

export const CERTIFICATIONS_QUERY = groq`
  *[_type == "certification" && active == true] | order(order asc) {
    "id": _id,
    "name": select($locale == "en" => coalesce(name_en, name_es), name_es),
    institution,
    year,
    "description": select($locale == "en" => coalesce(description_en, description_es), description_es),
    "image": image.asset->url
  }
`;

export const FAQ_QUERY = groq`
  *[_type == "faqItem" && active == true] | order(order asc) {
    "q": select($locale == "en" => coalesce(question_en, question_es), question_es),
    "a": select($locale == "en" => coalesce(answer_en, answer_es), answer_es)
  }
`;

export const GALLERY_QUERY = groq`
  coalesce(
    *[_type == "gallery"][0].images[active != false][defined(image)] {
      "id": _key,
      "src": image.asset->url,
      caption
    },
    *[_type == "galleryImage" && active != false] | order(order asc) {
      "id": _id,
      "src": image.asset->url,
      caption
    }
  )
`;
