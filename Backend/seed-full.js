import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';
import Club from './models/Club.js';

dotenv.config();

// Connect to MongoDB
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('✅ MongoDB Connected...');
    } catch (err) {
        console.error('❌ MongoDB Connection Error:', err.message);
        process.exit(1);
    }
};

const seedFullData = async () => {
    try {
        // Clear existing data
        console.log('🗑️  Clearing existing users and clubs...');
        await User.deleteMany({});
        await Club.deleteMany({});

        // Admin users
        console.log('👤 Creating admin users...');
        const adminUsers = [
            { username: 'admin', password: 'admin123', role: 'admin', clubId: null },
            { username: 'admin2', password: 'admin123', role: 'admin', clubId: null }
        ];

        for (const userData of adminUsers) {
            await User.create(userData);
        }
        console.log('✅ Created 2 admin users');

        // Club users
        console.log('🏛️  Creating club users...');
        const clubUsers = [
            { username: 'anushakti_royals', password: 'club123', role: 'club', clubId: 'anushakti-royals' },
            { username: 'belapur_club', password: 'club123', role: 'club', clubId: 'belapur' },
            { username: 'chembur_club', password: 'club123', role: 'club', clubId: 'chembur' },
            { username: 'chembur_galaxy', password: 'club123', role: 'club', clubId: 'chembur-galaxy' },
            { username: 'dronagiri_club', password: 'club123', role: 'club', clubId: 'dronagiri' },
            { username: 'girls_in_pearls', password: 'club123', role: 'club', clubId: 'girls-in-pearls' },
            { username: 'new_panvel_steel_town', password: 'club123', role: 'club', clubId: 'new-panvel-steel-town' },
            { username: 'shining_star', password: 'club123', role: 'club', clubId: 'shining-star' },
            { username: 'thane_angels', password: 'club123', role: 'club', clubId: 'thane-angels' },
            { username: 'thane_lake_city', password: 'club123', role: 'club', clubId: 'thane-lake-city' },
            { username: 'thane_stars_city', password: 'club123', role: 'club', clubId: 'thane-stars-city' },
            { username: 'uran_club', password: 'club123', role: 'club', clubId: 'uran' },
            { username: 'vasant_vihar', password: 'club123', role: 'club', clubId: 'vasant-vihar' },
            { username: 'vashi_navi_mumbai', password: 'club123', role: 'club', clubId: 'vashi-navi-mumbai' },
            { username: 'vile_parle', password: 'club123', role: 'club', clubId: 'vile-parle' }
        ];

        for (const userData of clubUsers) {
            await User.create(userData);
        }
        console.log('✅ Created 15 club users');

        // Full club data from ClubsPage.jsx
        console.log('🏛️  Creating detailed club documents...');
        const clubs = [
            {
                clubId: 'anushakti-royals',
                name: 'WE Club of Anushakti Royals',
                description: 'Community Service focused club in Anushaktinagar, dedicated to health check-up camps, cancer care support, and women empowerment initiatives.',
                president: {
                    name: 'WE Devki Goklani',
                    photo: '',
                    bio: 'Leading the club since establishment with a focus on community health and women empowerment',
                    email: '',
                    phone: ''
                },
                members: Array(6).fill(null).map((_, i) => ({ name: `Member ${i + 1}`, designation: 'Member' })),
                events: [],
                images: ['/images/club-pages-imgs/AnushaktiRoyals/1.png'],
                coverImage: '/images/club-pages-imgs/AnushaktiRoyals/1.png',
                established: new Date('2017-01-01'),
                isActive: true
            },
            {
                clubId: 'belapur',
                name: 'WE Club of Belapur',
                description: 'Focused on Animal Welfare & Care for Elderly. Active in community outreach, educational support, and health initiatives across Belapur, Navi Mumbai.',
                president: {
                    name: 'WE Geeta Singh',
                    photo: '',
                    bio: 'Passionate about animal welfare and elderly care',
                    email: '',
                    phone: ''
                },
                members: Array(17).fill(null).map((_, i) => ({ name: `Member ${i + 1}`, designation: 'Member' })),
                events: [],
                images: ['/images/club-pages-imgs/Belapur/1.jpg'],
                coverImage: '/images/club-pages-imgs/Belapur/1.jpg',
                established: new Date('2022-01-01'),
                isActive: true
            },
            {
                clubId: 'chembur',
                name: 'WE Club of Chembur',
                description: 'Education & Child Welfare focused club that has impacted over 5000+ lives through various initiatives including solar power projects and educational programs.',
                president: {
                    name: 'WE Ramolla Karnani',
                    photo: '',
                    bio: 'Dedicated to education and sustainable development',
                    email: '',
                    phone: ''
                },
                members: Array(29).fill(null).map((_, i) => ({ name: `Member ${i + 1}`, designation: 'Member' })),
                events: [],
                images: ['/images/club-pages-imgs/Chembur/1.jpg'],
                coverImage: '/images/club-pages-imgs/Chembur/1.jpg',
                established: new Date('2017-01-01'),
                isActive: true
            },
            {
                clubId: 'chembur-galaxy',
                name: 'WE Club of Chembur Galaxy',
                description: 'Women Empowerment focused club dedicated to skill building and social welfare initiatives in the Chembur region.',
                president: {
                    name: 'WE Kiran Sahetia',
                    photo: '',
                    bio: 'Champion of women empowerment and skills development',
                    email: '',
                    phone: ''
                },
                members: Array(18).fill(null).map((_, i) => ({ name: `Member ${i + 1}`, designation: 'Member' })),
                events: [],
                images: ['/images/club-pages-imgs/ChemburGalaxy/1.jpg'],
                coverImage: '/images/club-pages-imgs/ChemburGalaxy/1.jpg',
                established: new Date('2017-01-01'),
                isActive: true
            },
            {
                clubId: 'dronagiri',
                name: 'WE Club of Dronagiri',
                description: 'Health & Wellness focused club conducting health camps, community service programs, and women support initiatives in Dronagiri, Navi Mumbai.',
                president: {
                    name: 'WE Surekha Bhoir',
                    photo: '',
                    bio: 'Healthcare professional committed to community wellness',
                    email: '',
                    phone: ''
                },
                members: Array(19).fill(null).map((_, i) => ({ name: `Member ${i + 1}`, designation: 'Member' })),
                events: [],
                images: ['/images/club-pages-imgs/Dronagiri/1.jpg'],
                coverImage: '/images/club-pages-imgs/Dronagiri/1.jpg',
                established: new Date('2023-01-01'),
                isActive: true
            },
            {
                clubId: 'girls-in-pearls',
                name: 'WE Club of Girls in Pearls',
                description: 'Youth Development & Environment focused club running youth programs, leadership training, and community projects across Mumbai Region.',
                president: {
                    name: 'WE Neha Shende',
                    photo: '',
                    bio: 'Young leader passionate about youth empowerment and environmental conservation',
                    email: '',
                    phone: ''
                },
                members: Array(28).fill(null).map((_, i) => ({ name: `Member ${i + 1}`, designation: 'Member' })),
                events: [],
                images: ['/images/club-pages-imgs/GirlsinPearls/1.jpg'],
                coverImage: '/images/club-pages-imgs/GirlsinPearls/1.jpg',
                established: new Date('2022-01-01'),
                isActive: true
            },
            {
                clubId: 'new-panvel-steel-town',
                name: 'WE Club of New Panvel Steel Town',
                description: 'Community Development focused club with 38 active members working on social initiatives, community welfare, and educational support programs.',
                president: {
                    name: 'WE Megha Jain',
                    photo: '',
                    bio: 'Community development expert with a passion for sustainable growth',
                    email: '',
                    phone: ''
                },
                members: Array(38).fill(null).map((_, i) => ({ name: `Member ${i + 1}`, designation: 'Member' })),
                events: [],
                images: ['/images/club-pages-imgs/NPST/1.jpg'],
                coverImage: '/images/club-pages-imgs/NPST/1.jpg',
                established: new Date('2017-01-01'),
                isActive: true
            },
            {
                clubId: 'shining-star',
                name: 'WE Club of Shining Star',
                description: 'Newly established club in 2024 focusing on Environment & Care for Elderly with environment programs and community service initiatives in Vashi.',
                president: {
                    name: 'WE Dr. Vijaya Gosavi',
                    photo: '',
                    bio: 'Medical professional dedicated to elderly care and environmental causes',
                    email: '',
                    phone: ''
                },
                members: Array(12).fill(null).map((_, i) => ({ name: `Member ${i + 1}`, designation: 'Member' })),
                events: [],
                images: [],
                coverImage: '',
                established: new Date('2024-01-01'),
                isActive: true
            },
            {
                clubId: 'thane-angels',
                name: 'WE Club of Thane Angels',
                description: 'Award-winning club with 4000+ lives touched through 30+ projects. Excellence award winner focused on community development in Thane.',
                president: {
                    name: 'WE Priyadarshini Sane',
                    photo: '',
                    bio: 'Excellence award winner and community development leader',
                    email: '',
                    phone: ''
                },
                members: Array(38).fill(null).map((_, i) => ({ name: `Member ${i + 1}`, designation: 'Member' })),
                events: [],
                images: ['/images/club-pages-imgs/Angels/1.jpg'],
                coverImage: '/images/club-pages-imgs/Angels/1.jpg',
                established: new Date('2019-01-01'),
                isActive: true
            },
            {
                clubId: 'thane-lake-city',
                name: 'WE Club of Thane Lake City',
                description: 'Health & Education focused club working on rural developments, educational programs, and social welfare initiatives in Thane.',
                president: {
                    name: 'WE Sarala Bhot',
                    photo: '',
                    bio: 'Rural development specialist with focus on health and education',
                    email: '',
                    phone: ''
                },
                members: Array(32).fill(null).map((_, i) => ({ name: `Member ${i + 1}`, designation: 'Member' })),
                events: [],
                images: ['/images/club-pages-imgs/LakeCity/1.jpg'],
                coverImage: '/images/club-pages-imgs/LakeCity/1.jpg',
                established: new Date('2017-01-01'),
                isActive: true
            },
            {
                clubId: 'thane-stars-city',
                name: 'WE Club of Thane Stars City',
                description: 'Newly established in 2024, focused on Education & Literacy with programs for literacy support, education initiatives, and community projects.',
                president: {
                    name: 'WE Rohini Thakur',
                    photo: '',
                    bio: 'Education advocate passionate about literacy programs',
                    email: '',
                    phone: ''
                },
                members: Array(12).fill(null).map((_, i) => ({ name: `Member ${i + 1}`, designation: 'Member' })),
                events: [],
                images: [],
                coverImage: '',
                established: new Date('2024-01-01'),
                isActive: true
            },
            {
                clubId: 'uran',
                name: 'WE Club of Uran',
                description: 'Rural Development & Health focused club dedicated to rural outreach, community service, and women empowerment in Uran, Navi Mumbai.',
                president: {
                    name: 'WE Shilpa Gade',
                    photo: '',
                    bio: 'Rural development expert committed to women empowerment',
                    email: '',
                    phone: ''
                },
                members: Array(22).fill(null).map((_, i) => ({ name: `Member ${i + 1}`, designation: 'Member' })),
                events: [],
                images: ['/images/club-pages-imgs/Uran/1.jpg'],
                coverImage: '/images/club-pages-imgs/Uran/1.jpg',
                established: new Date('2017-01-01'),
                isActive: true
            },
            {
                clubId: 'vasant-vihar',
                name: 'WE Club of Vasant Vihar',
                description: 'One of the largest clubs with 59 members focused on Education & Child Welfare. Has touched 1000+ lives through educative initiatives.',
                president: {
                    name: 'WE Hiral Sanghvi',
                    photo: '',
                    bio: 'Education champion with extensive experience in child welfare programs',
                    email: '',
                    phone: ''
                },
                members: Array(59).fill(null).map((_, i) => ({ name: `Member ${i + 1}`, designation: 'Member' })),
                events: [],
                images: ['/images/club-pages-imgs/VasantVihar/1.jpg'],
                coverImage: '/images/club-pages-imgs/VasantVihar/1.jpg',
                established: new Date('2017-01-01'),
                isActive: true
            },
            {
                clubId: 'vashi-navi-mumbai',
                name: 'WE Club of Vashi Navi Mumbai',
                description: 'Community Welfare focused club working on rural development and care for elderly initiatives in Vashi, Navi Mumbai.',
                president: {
                    name: 'WE Namita Sinha',
                    photo: '',
                    bio: 'Community welfare specialist with focus on elderly care',
                    email: '',
                    phone: ''
                },
                members: Array(35).fill(null).map((_, i) => ({ name: `Member ${i + 1}`, designation: 'Member' })),
                events: [],
                images: ['/images/club-pages-imgs/VashiNaviMumbai/1.jpg'],
                coverImage: '/images/club-pages-imgs/VashiNaviMumbai/1.jpg',
                established: new Date('2017-01-01'),
                isActive: true
            },
            {
                clubId: 'vile-parle',
                name: 'WE Club of Vile Parle',
                description: 'Education & Literacy champion club that has helped 500+ students and supported 5+ schools through various educational initiatives.',
                president: {
                    name: 'WE Neena Pethe',
                    photo: '',
                    bio: 'Education champion dedicated to supporting schools and students',
                    email: '',
                    phone: ''
                },
                members: Array(32).fill(null).map((_, i) => ({ name: `Member ${i + 1}`, designation: 'Member' })),
                events: [],
                images: ['/images/club-pages-imgs/VileParle/1.jpg'],
                coverImage: '/images/club-pages-imgs/VileParle/1.jpg',
                established: new Date('2018-01-01'),
                isActive: true
            }
        ];

        await Club.insertMany(clubs);
        console.log('✅ Created 15 detailed club documents');

        console.log('\n🎉 Full database seeding complete!');
        console.log('\n📋 Login Credentials:');
        console.log('\n👑 ADMIN USERS:');
        console.log('   Username: admin | Password: admin123');
        console.log('   Username: admin2 | Password: admin123');
        console.log('\n🏛️  CLUB USERS (all have password: club123):');
        clubUsers.forEach(club => {
            console.log(`   Username: ${club.username}`);
        });

        process.exit(0);
    } catch (error) {
        console.error('❌ Error seeding data:', error);
        process.exit(1);
    }
};

// Run the seed
connectDB().then(() => {
    seedFullData();
});
