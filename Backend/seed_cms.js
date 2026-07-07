import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';
import dotenv from 'dotenv';
dotenv.config();

const pool = new pg.Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
});
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

const cmsData = {
  landing_hero: {
    title: "Women - Epitome of Service",
    subtitle: "WE District 323 A2 is dedicated to empowering women and serving communities through our network of clubs and active members.",
    stats: [
      { icon: "Users", value: "400+", label: "Active Members" },
      { icon: "Heart", value: "4000+", label: "Projects Completed" },
      { icon: "Award", value: "8", label: "Years of Service" },
      { icon: "Sparkles", value: "100K+", label: "Lives Impacted" }
    ]
  },
  landing_president: {
    name: "WE Varsha Vora",
    role: "District President",
    photo: "images/index-page-imgs/pfp.jpg",
    title: "Leading with Grace, Empowering with Purpose",
    bio: [
      "A fresh term blooms with a soul-stirring pooja at Jain Mandir, Chembur, marking the beginning of an extraordinary journey under the leadership of WE Varsha Vora.",
      "As District President, she embodies the perfect blend of strength, charm, and diplomacy—qualities that inspire every member of our community to reach new heights.",
      "Fun-loving, fierce, and flawlessly focused on empowering every woman in our district."
    ],
    tags: ["Strength", "Grace", "Diplomacy"]
  },
  about_areas: [
    "Assistance to Students in education and sports, Nutrition for Children.",
    "Setting up of laboratories, libraries in Schools.",
    "Women Welfare.",
    "Old Age homes and Health for Senior Citizens, orphanages.",
    "Rural Development, Water Connections, Tanks, Reservoirs.",
    "Assistance in Permanent projects.",
    "Environment Awareness Camps & Tree Plantation, Animal Welfare.",
    "Help to the Visually Impaired, Destitutes and the Differently Abled.",
    "Help to society, during Natural Calamities and the Pandemic."
  ],
  about_emblem: {
    image: "/images/WE-emblem.png",
    items: [
      { label: "The Woman in the Emblem", text: "A multifaceted personality. She can don many hats and can play many roles in any field whether it is the home or outside her home." },
      { label: "WE in Gold", text: "Stands for warmth, integrity, and firm values, along with success and achievement and epitomizes the strength of women and their ability to uplift other women." },
      { label: "Faces of the Women", text: "Looking outwards on the left portrays our Glorious Past — full of Service to humanity; on the right, projects our Bright Future — where the woman grows and touches many lives." },
      { label: "Circle in Gold", text: "Our all-encompassing field of work — humans, animal life or Environment. WE believe in the world of Co-existence, where every living being contributes to better the world." },
      { label: "White in the Background", text: "Purity in deeds and transparency in service, our everlasting and strong bonding of values and morals within the Organisation." },
      { label: "The Five Stars", text: "Describe the quality of Service, sincerity, dedication of our WE members! Even in the most difficult times, women stand up to it as Warriors!" }
    ]
  },
  about_founders: [
    { image: "/images/founders/1.jpg", name: "WE Kawal Rekhi", role: "Chief Founder — The Association of 'WE' Clubs of India", club: "WE Club of Chembur", bio: "Joined Lions in 1964 and has been serving the society since. She became the Charter Vice President of Lioness Club of Chembur in 1976-77 and was the Lioness Multiple District President in 1992-93." },
    { image: "/images/founders/2.jpg", name: "WE Saroja Mekal", role: "Founder — Multiple District 323 & District 323A2", club: "WE Club of Chembur", bio: "Joined Lioness Club of Chembur in 1986. She took up the post of Multiple District President of WE Multiple District 323 in 2019-2021." },
    { image: "/images/founders/3.jpg", name: "WE Rajni Shetty", role: "Founder — WE District 323 A2", club: "WE Club of Vasant Vihar", bio: "Charter Member of Lioness Club of Vasant Vihar since 1999. Lioness District President in 2011-12. Held position of Multiple District President in 2024-25." },
    { image: "/images/founders/4.jpg", name: "WE Rachana Bothra", role: "Founder — WE District 323 A2", club: "WE Club of Vasant Vihar", bio: "Joined Lioness Club of Pantnagar in 1988. Formed Lioness Club of Vasant Vihar in 1999. Lioness District President in 2009-10." },
    { image: "/images/founders/5.jpg", name: "WE Jyoti Jagasia", role: "Founder — WE District 323 A2", club: "WE Club of Anushakti Royals", bio: "Charter Member of Lioness Club of Anushakti Royals. Lioness District President in 2015-2016." }
  ],
  about_presidents: [
    { image: "/images/founders/6.jpg", name: "WE Mala Shetty", role: "District President (2018–2019)", club: "WE Club of Vasant Vihar", bio: "Slogan: Power to Empower. A journalist, banker, ran a school for special children, studied law and foremost a social worker." },
    { image: "/images/founders/7.jpg", name: "WE Sujatha Rao", role: "District President (2019–2021)", club: "WE Club of Vashi, Navi Mumbai", bio: "Slogan: Fellowship to Service. Stock broker, teacher, Director of her own company — always placed community service at the top." },
    { image: "/images/founders/8.jpg", name: "WE Asha Gupta", role: "District President (2021–2022)", club: "WE Club of Chembur Galaxy", bio: "Slogan: हाथ बढ़ाओ थामो और बढ़ते चलो. Naturopathy degree holder, Reiki master, yoga teacher and a stickler for time." },
    { image: "/images/founders/9.jpg", name: "WE Arti Bhatia", role: "District President (2022–2023)", club: "WE Club of Chembur", bio: "Slogan: Rise to Serve. A 'Shayar', dancer, textile designer with a wonderful eye for colour and design." },
    { image: "/images/founders/10.jpg", name: "WE Manju Jain", role: "District President (2023–2024)", club: "WE Club of New Panvel Steel Town", bio: "Slogan: चलो दुनिया बदलते हैं. Known for simplicity and soft spoken nature. Hardworking and organised personality." },
    { image: "/images/founders/11.jpg", name: "WE Sudha Kamath", role: "District President (2024–2025)", club: "WE Club of Vashi, Navi Mumbai", bio: "Slogan: सेवा से समृद्धि. Versatile with interests in dance, drama, gardening. Capable teacher with a passion for service." }
  ],
  about_slogan: [
    { bold: true, text: "WE — \"WOMEN - EPITOME OF SERVICE means Perfect Example of A Perfect Woman\"" },
    { text: "Epitome can be described as the complete embodiment of something or the best example — the best of the best, the pinnacle. She is a learner, an achiever, a leader. She is like water — one who can blend or gel in any situation and come out a winner. She is the symbol of love, compassion, emotional strength, and emotional courage. The hand that rocks the Cradle rules the World." },
    { bold: true, label: "WOMAN", text: "is the Best example of power and strength, playing various multifaceted roles — be it at home or outside. Women are the most defining factor that can bring a change to the society. A Woman is the one who is Empowered to imprint the best in young minds. She is a Mother, a Teacher, a Friend, and a Mentor." },
    { text: "There is no exercise better for the heart than reaching down and lifting people to brighten their lives." },
    { text: "We are in this together. Let's draw strength from each other. Let's make sure we share positive energy, while we create a world in our vision — a world where we are free to be who we want to be, and with whom we want to be, without fear." }
  ],
  about_team: [
    {
      name: "WE Varsha Vora",
      role: "District President",
      image: "../images/index-page-imgs/pfp.jpg"
    },
    {
      name: "Leadership Team",
      role: "District Board",
      image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=400&q=80"
    },
    {
      name: "Club Presidents",
      role: "Local Leaders",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&q=80"
    }
  ]
};

async function seedCMS() {
  try {
    console.log("Seeding CMS default data to site_content...");
    for (const [key, value] of Object.entries(cmsData)) {
      await prisma.siteContent.upsert({
        where: { key },
        create: { key, value },
        update: { value }
      });
      console.log(`- Upserted CMS key: ${key}`);
    }
    console.log("CMS SEEDING COMPLETED SUCCESSFULLY!");
    await pool.end();
  } catch (err) {
    console.error("CMS Seeding failed:", err);
    process.exit(1);
  }
}

seedCMS();
