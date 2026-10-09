const pageWidth = 595;
const pageHeight = 842;
const left = 48;
const right = 547;
const bodyWidth = right - left;

const hospitalityExperience = [
  {
    title: 'FOOD AND BEVERAGE ASSISTANT | REGENTA HOTELS & RESORTS',
    meta: 'October 2019 - March 2020 | Bhuj, Gujarat, India',
    bullets: [
      'Assisted daily food and beverage operations, maintaining service quality and guest satisfaction.',
      'Welcomed guests, managed seating, shared menu information, and offered recommendations.',
      'Took orders and coordinated with kitchen staff for accurate, timely service.',
      'Served food and beverages with attention to hotel service standards and dining etiquette.',
      'Maintained restaurant cleanliness, hygiene, food safety, and table setup.',
      'Supported banquets, weddings, private parties, and special events.',
      'Coordinated with kitchen and service teams to support smooth daily operations.',
      'Handled guest requests and feedback professionally.',
    ],
  },
  {
    title: 'INDUSTRIAL TRAINEE | RAMADA BY WYNDHAM',
    meta: 'June 2019 - October 2019 | Khajuraho, Madhya Pradesh, India',
    bullets: [
      'Assisted front-office operations, guest check-ins and check-outs, and reservation management.',
      'Handled bookings and guest interactions in person and through IDS hotel-management software.',
      'Assisted Indian and international guests with enquiries and service requests.',
      'Supported food and beverage operations for restaurants, weddings, marriage functions, and poolside parties.',
      'Helped coordinate weddings, social gatherings, and other special events.',
      'Collaborated with front-office and food-and-beverage teams to support guest satisfaction.',
    ],
    highlight: 'Best Trainee for Guest Relations, recognised following positive feedback from multiple international guests.',
  },
];

const itExperience = [
  ['Engineering Manager | Utah Tech Labs', 'June 2023 - Present | Kolkata, India', 'Leads 15 developers across eight concurrent projects with combined budgets of $2M.'],
  ['Project Coordinator | iEncode Tech', 'July 2022 - June 2023 | Kolkata, India', 'Coordinated project tasks and client communication to keep delivery aligned with product strategy.'],
  ['Project Coordinator | InfluxIQ Tech', 'December 2020 - July 2022 | Kalyani, India', 'Managed project coordination and business-development activities.'],
  ['Computer Faculty | Chakdaha Model School', 'July 2015 - March 2020 | Chakdaha, India', 'Designed and delivered interactive computer-science lessons.'],
  ['Online Bidder | Kloud Byte', 'March 2014 - July 2016 | Kolkata, India', 'Managed online bids and client proposals.'],
  ['HP Technical Support | Wipro', 'March 2013 - July 2015 | Kolkata, India', 'Provided troubleshooting for HP hardware and software.'],
];

const certifications = [
  'Power BI for Beginners - Great Learning Academy',
  'ChatGPT Prompt Engineering for Developers - DeepLearning.AI and Udemy',
  'Basics of ChatGPT and AI for Software Engineers',
  'Introduction to IoT',
  'Introduction to Machine Learning - Great Learning Academy',
  'AWS for Beginners - Great Learning Academy',
  'Project Management Foundations: Teams - PMI Registered Education Provider',
  'Agile Methodology Virtual Experience Program - Forage (Cognizant USA)',
];

const wrap = (text, limit) => {
  const words = text.replace(/[^\x20-\x7E]/g, '-').split(/\s+/);
  const lines = [];
  let line = '';
  words.forEach((word) => {
    const candidate = line ? `${line} ${word}` : word;
    if (candidate.length > limit && line) {
      lines.push(line);
      line = word;
    } else {
      line = candidate;
    }
  });
  if (line) lines.push(line);
  return lines;
};

const escapePdf = (text) => text
  .replace(/\\/g, '\\\\')
  .replace(/\(/g, '\\(')
  .replace(/\)/g, '\\)');

function makePdfPage(pageNumber, draw) {
  const commands = [];
  const addText = (text, x, y, size = 9, font = 'F1', color = '0.16 0.19 0.17') => {
    commands.push(`${color} rg BT /${font} ${size} Tf ${x} ${y} Td (${escapePdf(text)}) Tj ET`);
  };
  const addRect = (x, y, width, height, color) => {
    commands.push(`${color} rg ${x} ${y} ${width} ${height} re f`);
  };
  const addRule = (x, y, width, color = '0.85 0.84 0.78') => {
    commands.push(`${color} RG 0.6 w ${x} ${y} m ${x + width} ${y} l S`);
  };
  const page = {
    y: pageHeight - 47,
    addText,
    addRect,
    addRule,
    space(amount) { this.y -= amount; },
    line(text, options = {}) {
      const { size = 9, font = 'F1', color = '0.16 0.19 0.17', indent = 0, limit = 103, leading = size + 3 } = options;
      wrap(text, limit).forEach((part) => {
        if (this.y < 55) throw new Error('CV content exceeds the available page space.');
        addText(part, left + indent, this.y, size, font, color);
        this.y -= leading;
      });
    },
    section(title) {
      this.space(4);
      addText(title.toUpperCase(), left, this.y, 9, 'F2', '0.39 0.36 0.27');
      this.y -= 7;
      addRule(left, this.y, bodyWidth, '0.79 0.75 0.64');
      this.y -= 16;
    },
    footer() {
      addRule(left, 39, bodyWidth, '0.85 0.84 0.78');
      addText('KAUSHIK DAS  |  HOSPITALITY, GUEST RELATIONS & SALES', left, 24, 7, 'F2', '0.39 0.36 0.27');
      addText(`PAGE ${pageNumber}`, right - 35, 24, 7, 'F2', '0.39 0.36 0.27');
    },
  };
  draw(page);
  page.footer();
  return commands.join('\n');
}

function firstPage(page) {
  page.addRect(0, pageHeight - 154, pageWidth, 154, '0.13 0.21 0.18');
  page.addText('KAUSHIK DAS', left, pageHeight - 69, 26, 'F2', '0.97 0.95 0.88');
  page.addText('HOSPITALITY | GUEST RELATIONS | SALES ENTHUSIAST', left, pageHeight - 91, 9, 'F2', '0.83 0.79 0.67');
  page.addText('Kolkata, India  |  WhatsApp: +91 8436327900', left, pageHeight - 116, 9, 'F1', '0.96 0.95 0.91');
  page.addText('linkedin.com/in/luxekaushik', left, pageHeight - 133, 9, 'F1', '0.96 0.95 0.91');
  page.y = pageHeight - 179;

  page.section('Professional profile');
  page.line('Guest-focused hospitality professional with hands-on experience in food and beverage service, guest relations, front-office support, reservations, and special events. Enthusiastic about hospitality sales and building guest relationships through attentive service, clear communication, and an understanding of what makes an experience worth returning for.', { size: 8.5, limit: 112, leading: 11 });

  page.section('Hospitality strengths');
  page.line('Food and beverage service | Restaurant operations | Guest relations | Banquet and event support | Customer service | Team coordination | Food safety and hygiene | Reservations | IDS hotel-management software', { size: 8, limit: 117, leading: 10 });

  page.section('Hospitality experience');
  hospitalityExperience.forEach((job, index) => {
    if (index > 0) page.space(5);
    page.line(job.title, { size: 9, font: 'F2', limit: 110, leading: 11 });
    page.line(job.meta, { size: 8, color: '0.39 0.42 0.39', limit: 115, leading: 10 });
    job.bullets.forEach((bullet) => page.line(`- ${bullet}`, { size: 7.8, indent: 8, limit: 115, leading: 9.6 }));
    if (job.highlight) page.line(`Recognition: ${job.highlight}`, { size: 7.8, font: 'F2', indent: 8, limit: 115, leading: 9.6, color: '0.39 0.36 0.27' });
  });
}

function secondPage(page) {
  page.addText('KAUSHIK DAS', left, pageHeight - 52, 15, 'F2', '0.13 0.21 0.18');
  page.addText('HOSPITALITY PROFILE  |  PROFESSIONAL EXPERIENCE', left, pageHeight - 69, 8, 'F1', '0.39 0.42 0.39');
  page.addRule(left, pageHeight - 82, bodyWidth, '0.79 0.75 0.64');
  page.y = pageHeight - 103;

  page.section('Additional professional experience | technology and project delivery');
  itExperience.forEach(([title, meta, description]) => {
    page.line(title, { size: 8.2, font: 'F2', limit: 112, leading: 10 });
    page.line(meta, { size: 7.6, color: '0.39 0.42 0.39', limit: 115, leading: 9 });
    page.line(description, { size: 7.5, indent: 8, limit: 116, leading: 9 });
    page.space(3);
  });

  page.section('Education');
  [
    'Bachelor of Commerce (B.Com) | West Bengal State University',
    'BCA (Appeared) | National Institute of Electronics and Information Technology (NIELIT)',
    'Class 12 | Julian Day School, Kalyani',
  ].forEach((item) => page.line(item, { size: 8, limit: 115, leading: 10 }));

  page.section('Selected certifications');
  certifications.forEach((item) => page.line(`- ${item}`, { size: 7.5, indent: 5, limit: 116, leading: 9 }));

  page.section('Transferable skills');
  page.line('Guest and client communication | Business development | Team leadership | Project coordination | Online bidding and proposals | Stakeholder management | Problem-solving | Technology and digital tools', { size: 8, limit: 115, leading: 10 });

  page.section('Recognition');
  page.line('Best Trainee for Guest Relations at Ramada by Wyndham, following positive feedback from multiple international guests.', { size: 8, limit: 115, leading: 10 });
  page.line('Collaboration Catalyst Award at Utah Tech Labs for exceptional project-management performance within six months of joining.', { size: 8, limit: 115, leading: 10 });
}

function assemblePdf(streams) {
  const objects = [
    '<< /Type /Catalog /Pages 2 0 R >>',
    `<< /Type /Pages /Kids [${streams.map((_, index) => `${5 + index * 2} 0 R`).join(' ')}] /Count ${streams.length} >>`,
    '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>',
    '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>',
  ];

  streams.forEach((stream, index) => {
    const pageObject = 5 + index * 2;
    const contentObject = pageObject + 1;
    objects.push(`<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${pageWidth} ${pageHeight}] /Resources << /Font << /F1 3 0 R /F2 4 0 R >> >> /Contents ${contentObject} 0 R >>`);
    objects.push(`<< /Length ${new TextEncoder().encode(stream).length} >>\nstream\n${stream}\nendstream`);
  });

  let document = '%PDF-1.4\n';
  const offsets = [0];
  objects.forEach((object, index) => {
    offsets.push(new TextEncoder().encode(document).length);
    document += `${index + 1} 0 obj\n${object}\nendobj\n`;
  });
  const xrefOffset = new TextEncoder().encode(document).length;
  document += `xref\n0 ${offsets.length}\n0000000000 65535 f \n`;
  offsets.slice(1).forEach((offset) => {
    document += `${String(offset).padStart(10, '0')} 00000 n \n`;
  });
  document += `trailer\n<< /Size ${offsets.length} /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF`;
  return new Blob([new TextEncoder().encode(document)], { type: 'application/pdf' });
}

export function createLuxeCvPdf() {
  return assemblePdf([makePdfPage(1, firstPage), makePdfPage(2, secondPage)]);
}
