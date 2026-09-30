// Single source of truth for business details, prices and policies.
// Used by the website, structured data (SEO/GEO), and llms.txt.
// The printable contract (public/XR-Rentals-Rental-Agreement.docx) is edited separately in Word — keep prices/penalties in sync.

export const site = {
  name: "XR Rentals",
  tagline: "Tables, Chairs, Smart Videoke & Tent Rentals",
  description:
    "XR Rentals offers affordable party and event rentals in Tanza, Cavite, Philippines: 4ft tables at ₱100, monoblock chairs at ₱10, kids chairs at ₱8, smart videoke at ₱500 and tents at ₱500. Send an online inquiry to reserve.",
  url: (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").replace(/\/+$/, ""),
  locale: "en_PH",
  currency: "PHP",

  // ---- Contact details ----
  phone: "+63 976 451 0923",
  phoneHref: "tel:+639764510923",
  smsHref: "sms:+639764510923",
  facebook: "https://www.facebook.com/jazminemay.serrano",
  messenger: "https://m.me/jazminemay.serrano",
  serviceArea: "Tanza, Cavite and nearby areas",
  address: {
    street: "Ph2 Bk22 Lt6 Latania St, Sunrise Place Subdivision",
    locality: "Tanza",
    region: "Cavite",
    postalCode: "4108",
    country: "PH",
  },
  fullAddress: "Ph2 Bk22 Lt6 Latania St, Sunrise Place Subdivision, Tanza, Cavite 4108",
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=" +
    encodeURIComponent("Latania St, Sunrise Place Subdivision, Tanza, Cavite 4108"),
  hours: "8:00 AM – 6:00 PM",
  openingHoursSchema: "Mo-Su 08:00-18:00",
  // --------------------------

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
  { item: "Table", case: "Damaged / misused (incl. chopping board use, brand removed or tampered)", amount: 500, note: "each table" },
  { item: "Table", case: "Missing table", amount: 3000, note: "each table" },
  { item: "Chair", case: "Damaged / misused (incl. brand removed or tampered)", amount: 400, note: "each chair" },
  { item: "Chair", case: "Missing chair", amount: 500, note: "each chair" },
  { item: "Smart Videoke", case: "Major damage (e.g. LCD screen)", amount: 5000, note: "or repair cost, per unit" },
  { item: "Smart Videoke", case: "Missing peripheral (mic receiver, USB dongle, portable controller, or microphone with cover and holder)", amount: 1000, note: "each item" },
];

// Mirrors sections 4, 6 and 7 of public/XR-Rentals-Rental-Agreement.docx — keep them in sync.
export const usageRules: string[] = [
  "Use tables and chairs only for their intended purpose. Do NOT use them as a chopping board or cutting surface, and do not cut, chop, drill, burn, paint, or write on them.",
  "Do NOT remove, peel, scratch out, or tamper with any brand, logo, sticker, or marking on the equipment.",
  "Handle the smart videoke with care, keep it away from liquids, heat, and rough handling, and return it complete with all its peripherals.",
  "The renter is responsible for all rented items from delivery/release until they are picked up or returned.",
  "Do not lend, sublease, or transfer the equipment to any other person.",
  "Return items on the agreed pick-up date and time. Late returns are charged an additional day's rental at the same rate, unless agreed otherwise in writing.",
  "Equipment is inspected by both parties at release and at return. Penalties are payable upon return and are separate from the rental fee.",
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
    a: "Damaged tables are charged ₱500 each and missing tables ₱3,000 each. Damaged chairs are charged ₱400 each and missing chairs ₱500 each. Major videoke damage such as the LCD is ₱5,000 or the repair cost, and each missing videoke peripheral is ₱1,000. Penalties are paid upon return and are separate from the rental fee.",
  },
  {
    q: "Can I use the tables as a cutting or chopping surface?",
    a: "No. Tables and chairs must never be used as a chopping board. Misuse or tampering with the brand is treated as damage and charged accordingly.",
  },
  {
    q: "What if I return the items late?",
    a: "Late returns are charged an additional day's rental at the same rate, unless agreed otherwise in writing.",
  },
  {
    q: "Can I cancel or move my reservation?",
    a: "Yes, but please tell us in advance. Down payments may not be refundable unless XR Rentals agrees.",
  },
  {
    q: "What events do you serve?",
    a: "Birthdays, kiddie parties, christenings, weddings, fiestas, reunions, company events, wakes and any gathering that needs tables, chairs, videoke or tents.",
  },
];

export const peso = (n: number) =>
  "₱" + n.toLocaleString("en-PH", { minimumFractionDigits: 0, maximumFractionDigits: 2 });
