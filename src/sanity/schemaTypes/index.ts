import { service } from "./service";
import { gallery } from "./gallery";
import { galleryImage } from "./galleryImage";
import { faqItem } from "./faqItem";
import { settings } from "./settings";
import { certification } from "./certification";
import { testimonial } from "./testimonial";
import { requirementItem } from "./requirementItem";
import { page } from "./page";
import {
  heroBlock, textBlock, imageBlock, cardsBlock, ctaBlock,
  accordionBlock, galleryBlock, twoColumnsBlock, videoBlock,
  mapBlock, separatorBlock, contactFormBlock, bannerBlock, stepsBlock,
} from "./blocks";

export const schemaTypes = [
  settings, service, certification, testimonial, gallery, galleryImage, faqItem, requirementItem,
  page,
  heroBlock, textBlock, imageBlock, cardsBlock, ctaBlock,
  accordionBlock, galleryBlock, twoColumnsBlock, videoBlock,
  mapBlock, separatorBlock, contactFormBlock, bannerBlock, stepsBlock,
];
