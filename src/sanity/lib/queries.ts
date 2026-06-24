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

export const TESTIMONIALS_QUERY = groq`
  *[_type == "testimonial" && active != false] | order(order asc) {
    "id": _id,
    "quote": select($locale == "en" => coalesce(quote_en, quote_es), quote_es),
    author,
    pet,
    "service": select($locale == "en" => coalesce(service_en, service_es), service_es),
    rating
  }
`;

export const SETTINGS_QUERY = groq`
  *[_type == "settings" && _id == "settings"][0] {
    "profilePhotoUrl": profilePhoto.asset->url,
    "heroBannerUrl": heroBannerImage.asset->url,
    about_es, about_en,
    about_title_es, about_title_en,
    about_subtitle_es, about_subtitle_en,
    hero_badge,
    hero_title_es, hero_title_en,
    hero_title_highlight_es, hero_title_highlight_en,
    hero_subtitle_es, hero_subtitle_en,
    hero_description_es, hero_description_en,
    whatsapp, instagram, email
  }
`;

export const REQUIREMENTS_QUERY = groq`
  *[_type == "requirementItem" && active != false] | order(order asc) {
    icon,
    "title": select($locale == "en" => coalesce(title_en, title_es), title_es),
    "description": select($locale == "en" => coalesce(description_en, description_es), description_es)
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
