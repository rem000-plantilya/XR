// Generates the printable rental agreement from lib/site.ts (prices, penalties, contacts).
// Run: npm run contract   ->  public/XR-Rentals-Rental-Agreement.docx
import fs from "node:fs";
import path from "node:path";
import {
  AlignmentType, BorderStyle, Document, Footer, LevelFormat, Packer, PageNumber, Paragraph,
  ShadingType, Table, TableCell, TableLayoutType, TableRow, TabStopType, TextRun, WidthType,
} from "docx";
import { items, penalties, peso, site, usageRules } from "../lib/site.ts";

const FONT = "Arial";
const PAGE_W = 12240; // US Letter (short bond)
const MARGIN = 1080; // 0.75"
const CONTENT_W = PAGE_W - MARGIN * 2; // 10080
const BRAND = "E8622A";
const LINE = "________________________________";

const border = { style: BorderStyle.SINGLE, size: 4, color: "999999" };
const borders = { top: border, bottom: border, left: border, right: border };
const cellMargins = { top: 70, bottom: 70, left: 110, right: 110 };

const p = (text, opts = {}) =>
  new Paragraph({ spacing: { after: 80 }, ...opts, children: [new TextRun({ text, ...(opts.run || {}) })] });

const runs = (parts, opts = {}) =>
  new Paragraph({
    spacing: { after: 80 },
    ...opts,
    children: parts.map((x) => (typeof x === "string" ? new TextRun(x) : new TextRun(x))),
  });

const heading = (text) =>
  new Paragraph({
    spacing: { before: 220, after: 100 },
    border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: BRAND, space: 2 } },
    children: [new TextRun({ text: text.toUpperCase(), bold: true, size: 22, color: "1F2A44" })],
  });

const field = (label, width = CONTENT_W) =>
  new Paragraph({
    spacing: { after: 120 },
    tabStops: [{ type: TabStopType.RIGHT, position: width, leader: "underscore" }],
    children: [new TextRun({ text: `${label}: ` }), new TextRun({ text: "\t" })],
  });

const twoFields = (a, b) =>
  new Paragraph({
    spacing: { after: 120 },
    tabStops: [
      { type: TabStopType.LEFT, position: CONTENT_W / 2 - 200, leader: "underscore" },
      { type: TabStopType.RIGHT, position: CONTENT_W, leader: "underscore" },
    ],
    children: [new TextRun(`${a}: `), new TextRun("\t"), new TextRun(`   ${b}: `), new TextRun("\t")],
  });

function cell(text, width, { bold = false, fill, align = AlignmentType.LEFT, size = 19 } = {}) {
  return new TableCell({
    borders,
    width: { size: width, type: WidthType.DXA },
    margins: cellMargins,
    shading: fill ? { fill, type: ShadingType.CLEAR, color: "auto" } : undefined,
    children: [new Paragraph({ alignment: align, children: [new TextRun({ text, bold, size })] })],
  });
}

function table(widths, header, rows) {
  const headFill = "1F2A44";
  return new Table({
    layout: TableLayoutType.FIXED,
    width: { size: widths.reduce((a, b) => a + b, 0), type: WidthType.DXA },
    columnWidths: widths,
    rows: [
      new TableRow({
        tableHeader: true,
        children: header.map((h, i) =>
          new TableCell({
            borders,
            width: { size: widths[i], type: WidthType.DXA },
            margins: cellMargins,
            shading: { fill: headFill, type: ShadingType.CLEAR, color: "auto" },
            children: [new Paragraph({ children: [new TextRun({ text: h, bold: true, color: "FFFFFF", size: 19 })] })],
          }),
        ),
      }),
      ...rows.map(
        (r, ri) =>
          new TableRow({
            children: r.map((c, i) =>
              cell(typeof c === "string" ? c : c.text, widths[i], {
                ...(typeof c === "string" ? {} : c),
                fill: typeof c !== "string" && c.fill ? c.fill : ri % 2 ? "F6F3EE" : undefined,
              }),
            ),
          }),
      ),
    ],
  });
}

// ---------- content ----------

const itemsTable = table(
  [3780, 2100, 1500, 2700],
  ["Item", "Rate", "Qty", "Amount"],
  [
    ...items.map((it) => [it.name, `${peso(it.price)} / ${it.unit}`, "", ""]),
    [{ text: "Delivery / pick-up fee", bold: true }, "", "", ""],
    [{ text: "TOTAL RENTAL", bold: true, fill: "FDE9DF" }, { text: "", fill: "FDE9DF" }, { text: "", fill: "FDE9DF" }, { text: "₱", bold: true, fill: "FDE9DF" }],
    [{ text: "Down payment / Reservation", bold: true }, "", "", "₱"],
    [{ text: "Balance due on delivery", bold: true }, "", "", "₱"],
  ],
);

const penaltyTable = table(
  [2500, 5380, 2200],
  ["Item", "Case", "Charge"],
  penalties.map((pn) => [
    pn.item,
    pn.case,
    { text: pn.amount ? `${peso(pn.amount)} ${pn.note ?? ""}` : "Actual repair / replacement cost", bold: !!pn.amount },
  ]),
);

const videoke = items.find((i) => i.key === "videoke");
const checklistTable = table(
  [4680, 1800, 1800, 1800],
  ["Smart Videoke inclusion (per unit)", "Released ✓", "Returned ✓", "Remarks"],
  [
    ...videoke.inclusions.map((inc) => [inc.replace(/^1 /, "").replace(/^./, (c) => c.toUpperCase()), "☐", "☐", ""]),
    ["LCD screen / main unit condition", "☐ Good", "☐ Good", ""],
  ],
);

const terms = [
  "The Renter is fully responsible for all rented items from the time of delivery/release until they are returned to and inspected by XR Rentals.",
  ...usageRules,
  "Tables and chairs must NOT be used as a chopping board or cutting surface. Any misuse, including removing or tampering with the brand, is considered damage and charged per the penalty schedule below.",
  "Items will be counted and inspected upon release and upon return. Findings on return inspection are final once acknowledged by both parties.",
  "Penalty charges for damaged or missing items must be settled in full upon return/pick-up of the items.",
  "Rented items may not be sub-leased, lent or brought to a location other than the event address stated in this agreement without the consent of XR Rentals.",
  "XR Rentals is not liable for injury or loss arising from improper use of the rented items.",
];

const numbering = {
  config: [
    {
      reference: "terms",
      levels: [{ level: 0, format: LevelFormat.DECIMAL, text: "%1.", alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 400, hanging: 360 } } } }],
    },
  ],
};

const sigBlock = (left, right) =>
  new Table({
    layout: TableLayoutType.FIXED,
    width: { size: CONTENT_W, type: WidthType.DXA },
    columnWidths: [4840, 400, 4840],
    borders: { top: { style: BorderStyle.NONE }, bottom: { style: BorderStyle.NONE }, left: { style: BorderStyle.NONE }, right: { style: BorderStyle.NONE }, insideHorizontal: { style: BorderStyle.NONE }, insideVertical: { style: BorderStyle.NONE } },
    rows: [
      new TableRow({
        children: [left, null, right].map((label, i) => {
          const none = { style: BorderStyle.NONE, size: 0, color: "FFFFFF" };
          return new TableCell({
            width: { size: [4840, 400, 4840][i], type: WidthType.DXA },
            borders: { top: none, bottom: none, left: none, right: none },
            children: label
              ? [
                  new Paragraph({ spacing: { before: 500 }, children: [new TextRun(LINE)] }),
                  new Paragraph({ children: [new TextRun({ text: label, bold: true, size: 19 })] }),
                  new Paragraph({ children: [new TextRun({ text: "Signature over printed name / Date", size: 17, color: "666666" })] }),
                ]
              : [new Paragraph("")],
          });
        }),
      }),
    ],
  });

const doc = new Document({
  creator: site.name,
  title: `${site.name} Rental Agreement`,
  styles: { default: { document: { run: { font: FONT, size: 20 } } } },
  numbering,
  sections: [
    {
      properties: {
        page: { size: { width: PAGE_W, height: 15840 }, margin: { top: 900, bottom: 900, left: MARGIN, right: MARGIN } },
      },
      footers: {
        default: new Footer({
          children: [
            new Paragraph({
              alignment: AlignmentType.CENTER,
              children: [
                new TextRun({ text: `${site.name} · ${site.phone} · ${site.facebook}   |   Page `, size: 16, color: "666666" }),
                new TextRun({ children: [PageNumber.CURRENT], size: 16, color: "666666" }),
                new TextRun({ text: " of ", size: 16, color: "666666" }),
                new TextRun({ children: [PageNumber.TOTAL_PAGES], size: 16, color: "666666" }),
              ],
            }),
          ],
        }),
      },
      children: [
        new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: site.name.toUpperCase(), bold: true, size: 40, color: BRAND })] }),
        new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: site.tagline, size: 20, color: "444444" })] }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { after: 160 },
          children: [new TextRun({ text: `Mobile: ${site.phone}   ·   Facebook: ${site.facebook}`, size: 18, color: "444444" })],
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { after: 200 },
          children: [new TextRun({ text: "EQUIPMENT RENTAL AGREEMENT", bold: true, size: 30, color: "1F2A44" })],
        }),
        twoFields("Agreement No.", "Date"),

        heading("1. Renter information"),
        field("Full name"),
        field("Address"),
        twoFields("Mobile no.", "Facebook name"),
        twoFields("Valid ID type", "ID no."),

        heading("2. Event details"),
        twoFields("Event date", "Event type"),
        field("Event address / venue"),
        twoFields("Delivery date & time", "Return / pick-up date & time"),

        heading("3. Rented items"),
        itemsTable,

        heading("4. Smart videoke release & return checklist"),
        p("Each smart videoke unit includes the following. Each missing peripheral is charged ₱1,000.", { run: { size: 19 } }),
        checklistTable,

        heading("5. Terms, proper usage & responsibility"),
        ...terms.map((t) => new Paragraph({ numbering: { reference: "terms", level: 0 }, spacing: { after: 60 }, children: [new TextRun({ text: t, size: 19 })] })),

        heading("6. Penalty schedule for damage, misuse & missing items"),
        penaltyTable,
        p(""),
        runs([
          { text: "Return inspection: ", bold: true },
          "☐ All items complete and in good condition     ☐ With damage / missing items (see below)",
        ]),
        field("Damage / missing item details"),
        twoFields("Total penalty charged", "OR / Receipt no."),

        heading("7. Acknowledgment"),
        p(
          `I, the Renter, have read and understood this agreement, received the items listed above in good and complete condition, and agree to be responsible for them. I agree to pay the penalties stated above for any damage, misuse or missing items.`,
          { run: { size: 19 } },
        ),
        sigBlock("RENTER", `${site.name.toUpperCase()} REPRESENTATIVE`),
      ],
    },
  ],
});

const out = path.join(process.cwd(), "public", "XR-Rentals-Rental-Agreement.docx");
fs.writeFileSync(out, await Packer.toBuffer(doc));
console.log("Wrote", out);
