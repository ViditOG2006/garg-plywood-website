export const SITE = {
  name: "Garg Plywood Palace",
  tagline: "Strong Foundations, Beautiful Creations",
  subtagline: "Your Trusted Plywood Partner",
  description:
    "Garg Plywood Palace is a family-owned wholesale and retail plywood dealer in Uttam Nagar, New Delhi since 1985 — offering premium plywood, block boards, laminates, timber, HDHMR, veneers, and hardware with quality you trust and service you deserve.",
  url: "https://gargplywoodpalace.com",
  email: "gargplywoodpalacesince1985@gmail.com",
  phones: ["+91 98100 34165", "+91 98109 46165"],
  whatsapp: "919810034165",
  hours: "Mon–Sat: 10:00 AM – 7:00 PM",
  founded: "1985",
  motto: "Quality • Trust • Durability",
  footerTagline: "Quality You Trust, Service You Deserve",
  bniMember: true,
} as const;

export const PEOPLE = {
  founder: "Late Shri Surender Kumar Gupta",
  owners: [
    { name: "Amit Gupta", phone: "+91 98100 34165", tel: "919810034165" },
    { name: "Gaurav Gupta", phone: "+91 98109 46165", tel: "919810946165" },
  ],
} as const;

export const LOCATION = {
  name: "Garg Plywood Palace",
  address: "WZ-255A, Uttam Nagar, New Delhi – 110059, India",
  fullAddress:
    "WZ-255A, Opposite Metro Pillar No. 667, Main Najafgarh Road, Uttam Nagar, New Delhi – 110059",
  landmark: "Opposite Metro Pillar No. 667, Near Uttam Nagar West Metro",
  mapQuery: "Garg+Plywood+Palace+Uttam+Nagar+Delhi",
} as const;

export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/products", label: "Products" },
  { href: "/mission-vision", label: "Mission & Vision" },
  { href: "/testimonials", label: "Testimonials" },
  { href: "/contact", label: "Contact" },
] as const;

export const IMAGES = {
  logo: "/images/logo.png",
  heroWood: "/images/hero-wood-texture.png",
  aboutHero: "/images/about/showroom.jpg",
  aboutStory: "/images/logo.png",
  missionPhoto: "/images/gallery/plywood-stack.jpg",
  clientLetters: "/images/client-letters.jpg",
  contactShowroom: "/images/bni-network.png",
  gallery: [
    "/images/gallery/plywood-stack.jpg",
    "/images/gallery/interior-kitchen.jpg",
    "/images/gallery/interior-wardrobe.jpg",
    "/images/gallery/interior-living.jpg",
    "/images/gallery/lumber-yard.jpg",
    "/images/about/showroom.jpg",
  ],
} as const;

export const PRODUCTS = [
  {
    id: "plywood",
    name: "Plywood",
    category: "Plywood",
    description:
      "Commercial and marine grade plywood for versatile applications — furniture, partitions, kitchens, and structural work.",
    features: ["Commercial & marine grades", "ISI certified options", "Moisture resistant variants"],
    image: "/images/products/plywood.jpg?v=2",
  },
  {
    id: "block-boards",
    name: "Block Boards",
    category: "Boards",
    description:
      "Strong, reliable block boards for doors, shelves, and long-span furniture — branded and co-branded options available.",
    features: ["Warp resistant", "Uniform thickness", "Branded & co-branded"],
    image: "/images/products/block-board.jpg?v=2",
  },
  {
    id: "laminates",
    name: "Laminates",
    category: "Laminates",
    description:
      "Stylish decorative laminates in wood grains, solids, and textures for modern residential and commercial interiors.",
    features: ["500+ designs", "Scratch resistant", "Premium finishes"],
    image: "/images/products/laminates.jpg?v=2",
  },
  {
    id: "flush-doors",
    name: "Flush Doors",
    category: "Doors",
    description:
      "Smooth, durable flush doors crafted for homes, offices, and commercial spaces with consistent quality.",
    features: ["Smooth finish", "Long-lasting", "Multiple sizes"],
    image: "/images/products/flush-doors.jpg?v=2",
  },
  {
    id: "timber",
    name: "Timber",
    category: "Timber",
    description:
      "Premium hardwood selections including Teak, Marandi, and Steam Beech for custom furniture and architectural projects.",
    features: ["Teak & Marandi wood", "Steam Beech", "Properly seasoned"],
    image: "/images/products/timber.jpg?v=2",
  },
  {
    id: "hdhmr",
    name: "HDHMR Boards",
    category: "Boards",
    description:
      "High Density High Moisture Resistant boards — the premium choice for modular kitchens, wardrobes, and CNC work.",
    features: ["High density", "Moisture resistant", "CNC friendly"],
    image: "/images/products/hdhmr.jpg?v=2",
  },
  {
    id: "veneers",
    name: "Veneers",
    category: "Veneer",
    description:
      "Natural veneers offering an authentic teakwood experience for luxury furniture, panels, and feature walls.",
    features: ["Natural grain", "Teakwood finish", "Custom sizing"],
    image: "/images/products/veneers.jpg?v=2",
  },
  {
    id: "louvers",
    name: "Louvers",
    category: "Louvers",
    description:
      "Decorative louvers that add sophistication and ventilation to interior and exterior design applications.",
    features: ["Modern designs", "Interior & exterior", "Easy installation"],
    image: "/images/products/louvers.jpg?v=2",
  },
  {
    id: "mouldings",
    name: "Mouldings",
    category: "Mouldings",
    description:
      "PVC and teakwood mouldings that give an excellent finished look to interiors, ceilings, and wall details.",
    features: ["PVC & teakwood", "Finished look", "Wide profiles"],
    image: "/images/products/mouldings.jpg?v=2",
  },
] as const;

export const BRANDS = [
  "Century Ply",
  "Greenply",
  "Brown Tiger",
  "Merino Laminates",
  "Greenlam",
  "Action Tesa",
  "National Plywood",
  "Kitply",
  "Jaquar",
  "Hettich",
] as const;

export const STATS = [
  { value: "1985", label: "Established Since" },
  { value: "40+", label: "Years of Excellence" },
  { value: "9+", label: "Product Categories" },
  { value: "1000+", label: "Projects Served" },
] as const;

export const WHY_CHOOSE = [
  {
    title: "Quality Guaranteed",
    description:
      "Every product meets standards for durability and performance with ISI certification and waterproofing.",
    icon: "shield",
  },
  {
    title: "Wide Variety",
    description:
      "An extensive selection of plywood, boards, laminates, timber, and hardware for every project requirement.",
    icon: "layers",
  },
  {
    title: "Competitive Pricing",
    description:
      "Affordable wholesale and retail solutions without compromising on excellence or authenticity.",
    icon: "tag",
  },
  {
    title: "Excellent Service",
    description:
      "Reliable delivery, quick turnaround, and dedicated support from our experienced team.",
    icon: "truck",
  },
] as const;

export const VALUES = [
  { title: "Quality", description: "ISI certified materials that stand the test of time." },
  { title: "Trust", description: "Built on decades of honest dealings and long-term relationships." },
  { title: "Durability", description: "Engineered for moisture resistance and demanding conditions." },
  { title: "Sustainability", description: "Responsible sourcing for lasting, eco-conscious interiors." },
] as const;

export const CLIENTS_SERVE = {
  professionals: [
    "Interior designers creating bespoke spaces",
    "Architects specifying premium materials",
    "Contractors and builders for large projects",
    "Furniture manufacturers and carpenters",
  ],
  homeowners: [
    "Renovating homes with reliable, high-quality timber solutions",
    "New home buyers seeking trusted material guidance",
    "Modular kitchen and wardrobe projects",
  ],
  industries: [
    "Hotels & hospitality projects",
    "Corporate office interiors",
    "Educational institutions",
    "Hospitals & healthcare spaces",
  ],
} as const;

export const CLIENT_LETTERS = [
  {
    src: "/images/testimonials/letter-hagerstone.jpg",
    alt: "Recommendation letter from Hagerstone International Pvt. Ltd. for Garg Plywood Palace",
    client: "Hagerstone International",
  },
  {
    src: "/images/testimonials/letter-creative-interio.jpg",
    alt: "Recommendation letter from Creative Interio for Garg Plywood Palace",
    client: "Creative Interio",
  },
  {
    src: "/images/testimonials/letter-divine-interiors.jpg",
    alt: "Certificate of appreciation from Divine Interiors for Garg Plywood Palace",
    client: "Divine Interiors",
  },
] as const;

export const TESTIMONIALS = [
  {
    id: 1,
    name: "Hagerstone International Pvt. Ltd.",
    role: "Interior Design & Build",
    quote:
      "We have been associated with Garg Plywood Palace for our carpentry and material requirements across projects including VST Motors Kotputli, Bansal Tower Noida, and Vinfast Jaipur. We are highly satisfied with the quality of materials and timely deliveries.",
    rating: 5,
    project: "Commercial Interiors",
  },
  {
    id: 2,
    name: "Creative Interio",
    role: "Interior Contractor, Gurugram",
    quote:
      "Having worked with Mr. Amit Gupta for 10 years, we are fully satisfied with the quality of branded block boards, MDF, HDHMR, and teak wood supplied for projects like Max Shalimar Bagh and Policy Bazaar Gurgaon.",
    rating: 5,
    project: "Premium Commercial Fit-outs",
  },
  {
    id: 3,
    name: "Divine Interiors",
    role: "Interior Design, Janakpuri",
    quote:
      "For 6 years, Garg Plywood Palace has been our trusted plywood supplier. Their unwavering support, exceptional service, quality, reliability, and timely delivery have been invaluable to our projects.",
    rating: 5,
    project: "Residential & Commercial",
  },
  {
    id: 4,
    name: "Rajesh Sharma",
    role: "Interior Contractor, Delhi",
    quote:
      "Garg Plywood Palace has been my go-to supplier for over a decade. Genuine products, fair pricing, and they always have stock when I need it for urgent projects.",
    rating: 5,
    project: "Residential Projects",
  },
  {
    id: 5,
    name: "Neha Singh",
    role: "Interior Designer, NCR",
    quote:
      "From marine plywood for wet areas to premium laminates for feature walls — one stop for everything. The team understands designer requirements perfectly.",
    rating: 5,
    project: "Luxury Interiors",
  },
  {
    id: 6,
    name: "Vikram Mehta",
    role: "Builder, Delhi NCR",
    quote:
      "We've sourced plywood for multiple housing projects from Garg Plywood Palace. Competitive wholesale rates and zero compromise on quality. Highly dependable.",
    rating: 5,
    project: "Housing Developments",
  },
] as const;

export const SUCCESS_PILLARS = [
  { label: "Long-term Client Relationships", icon: "handshake" },
  { label: "Residential & Commercial Projects", icon: "building" },
  { label: "Premium Interior Solutions", icon: "interior" },
  { label: "Reliable Supply & Timely Service", icon: "delivery" },
] as const;
