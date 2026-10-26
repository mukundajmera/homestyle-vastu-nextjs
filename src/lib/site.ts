export const SITE_ORIGIN = 'https://www.fengshuihomestylevastu.com';
export const BRAND_NAME = ['Feng Shui HomeStyle', 'Vastu'].join(' ');
export const BRAND_TITLE = BRAND_NAME;
export const PERSON_NAME = 'Sanjay Jain';
export const PERSON_TITLE = 'Feng Shui and Vastu Consultant';
export const ADDRESS = {
  street: 'Shivam Apartment, Acharya Kriplani Marg, Anand Puri, Bees Dukan, Adarsh Nagar',
  locality: 'Jaipur',
  neighborhood: 'Anand Puri',
  region: 'Rajasthan',
  postalCode: '302004',
  country: 'India',
  countryCode: 'IN',
} as const;
export const PHONE_E164 = '+919828088678';
export const WHATSAPP_URL = 'https://wa.me/919828088678';
export const WHATSAPP_MESSAGE = 'Hello Sanjay ji, I found your website and would like to discuss a Vastu / Feng Shui consultation for my property.';
export const WHATSAPP_CHAT_URL = `${WHATSAPP_URL}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;
