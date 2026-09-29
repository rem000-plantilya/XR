// Single source of truth for business details, prices and policies.
// Used by the website, structured data (SEO/GEO), llms.txt and the printable contract.
// Replace the placeholder contact details below with your real ones.

export const site = {
  name: "XR Rentals",
  tagline: "Tables, Chairs, Smart Videoke & Tent Rentals",
  description:
    "XR Rentals offers affordable party and event rentals in the Philippines: 4ft tables at ₱100, monoblock chairs at ₱10, kids chairs at ₱8, smart videoke at ₱500 and tents at ₱500. Send an online inquiry to reserve.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  locale: "en_PH",
  currency: "PHP",

  // ---- PLACEHOLDERS: change these later ----
  phone: "+63 912 345 6789",
  phoneHref: "tel:+639123456789",
  smsHref: "sms:+639123456789",
  email: "hello@xrrentals.example",
  facebook: "https://www.facebook.com/xrrentals.dummy",
  messenger: "https://m.me/xrrentals.dummy",
  serviceArea: "Your City, Your Province",
  address: {
    locality: "Your City",
    region: "Your Province",
    country: "PH",
  },
  hours: "Mon–Sun, 7:00 AM – 9:00 PM",
  // -------------------------------------------

  rentalPeriod: "per day",
} as const;

export type ItemKey = "tables" | "chairs" | "kids_chairs" | "videoke" | "tents";

export type RentalItem = {
  key: ItemKey;
  name: string;
  unit: string;
  price: number;
  description: string;
  emoji: string;
  inclusions?: string[];
};

export const items: RentalItem[] = [
  {
    key: "tables",
    name: "4ft Table",
    unit: "table",
    price: 100,
    description: "Sturdy 4-foot tables for buffets, guest seating, gift and registration areas.",
    emoji: "🍽️",
  },
  {
    key: "chairs",
    name: "Monoblock Chair",
    unit: "pc",
    price: 10,
    description: "Clean, stackable monoblock chairs for birthdays, fiestas, wakes and gatherings.",
    emoji: "💺",
  },
  {
    key: "kids_chairs",
    name: "Kids Chair",
    unit: "pc",
    price: 8,
    description: "Child-sized chairs, perfect for kiddie parties and children's tables.",
    emoji: "🧒",
  },
  {
    key: "videoke",
    name: "Smart Videoke",
    unit: "unit",
    price: 500,
    description: "Smart videoke system with a large song library for non-stop singing.",
    emoji: "🎤",
    inclusions: [
      "1 mic receiver",
      "1 USB controller dongle",
      "1 portable controller",
      "1 microphone with cover and holder",
    ],
  },
  {
    key: "tents",
    name: "Tent",
    unit: "tent",
    price: 500,
    description: "Event tent for shade and rain cover at outdoor parties and gatherings.",
    emoji: "⛺",
  },
];

export type Penalty = { item: string; case: string; amount: number | null; note?: string };

export const penalties: Penalty[] = [
  { item: "Table", case: "Damage or misuse (e.g. used as chopping board, removing/tampering the brand)", amount: 500, note: "per table" },
  { item: "Table", case: "Missing / not returned", amount: 3000, note: "per table" },
  { item: "Chair (monoblock or kids)", case: "Damage or misuse (e.g. used as chopping board, removing/tampering the brand)", amount: 400, note: "per chair" },
  { item: "Chair (monoblock or kids)", case: "Missing / not returned", amount: 500, note: "per chair" },
  { item: "Smart Videoke", case: "Major damage (e.g. LCD screen)", amount: 5000, note: "per unit" },
  { item: "Smart Videoke", case: "Missing peripheral (mic receiver, USB controller dongle, portable controller, microphone with cover and holder)", amount: 1000, note: "per missing peripheral" },
  { item: "Tent", case: "Damage or missing parts", amount: null, note: "charged at actual repair or replacement cost" },
];

export const usageRules: string[] = [
  "Do NOT use tables or chairs as a chopping board or cutting surface.",
  "Do NOT remove, cover, scratch or tamper with the XR Rentals brand or markings.",
  "Do NOT stand on tables or chairs, or use them for anything other than their intended purpose.",
  "Keep the smart videoke away from rain, water, food and drinks; handle the LCD screen with care.",
  "Return every videoke peripheral: mic receiver, USB controller dongle, portable controller, and microphone with cover and holder.",
  "Items must be returned complete, clean and in the same condition as received.",
];

export const faqs: { q: string; a: string }[] = [
  {
    q: "How much is the table and chair rental at XR Rentals?",
    a: "A 4ft table is ₱100 per table, a monoblock chair is ₱10 per piece, and a kids chair is ₱8 per piece.",
  },
  {
    q: "How much is the smart videoke rental?",
    a: "Smart videoke rental is ₱500 per unit. It includes 1 mic receiver, 1 USB controller dongle, 1 portable controller, and 1 microphone with cover and holder.",
  },
  {
    q: "How much is the tent rental?",
    a: "Tent rental is ₱500 per tent.",
  },
  {
    q: "How do I reserve rentals from XR Rentals?",
    a: "Fill out the online inquiry form on this website with your event date, location and quantities, or message us on Facebook or call/text our mobile number. We will confirm availability and the final quote.",
  },
  {
    q: "What happens if a rented item is damaged or missing?",
    a: "Damaged tables are charged ₱500 each and missing tables ₱3,000 each. Damaged chairs are charged ₱400 each and missing chairs ₱500 each. Major videoke damage such as the LCD is ₱5,000, and each missing videoke peripheral is ₱1,000.",
  },
  {
    q: "Can I use the tables as a cutting or chopping surface?",
    a: "No. Tables and chairs must never be used as a chopping board. Misuse or tampering with the brand is treated as damage and charged accordingly.",
  },
  {
    q: "What events do you serve?",
    a: "Birthdays, kiddie parties, christenings, weddings, fiestas, reunions, company events, wakes and any gathering that needs tables, chairs, videoke or tents.",
  },
];

export const peso = (n: number) =>
  "₱" + n.toLocaleString("en-PH", { minimumFractionDigits: 0, maximumFractionDigits: 2 });
