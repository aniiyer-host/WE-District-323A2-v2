/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Globe, Briefcase, Star, Users, Quote, X, ChevronDown } from 'lucide-react';

const AboutPage = () => {
  const [expandedCard, setExpandedCard] = useState(null);

  const aboutCards = [
    {
      id: 'area-of-work',
      icon: Briefcase,
      title: "Area of Work",
      subtitle: "Our Fields of Service",
      gradient: "from-purple-600 to-purple-800",
      lightBg: "bg-purple-50",
      accentColor: "text-purple-700",
      borderColor: "border-purple-200",
      preview: "From education to environment — we serve across all walks of life.",
      content: {
        type: 'list',
        items: [
          "Assistance to Students in education and sports, Nutrition for Children.",
          "Setting up of laboratories, libraries in Schools.",
          "Women Welfare.",
          "Old Age homes and Health for Senior Citizens, orphanages.",
          "Rural Development, Water Connections, Tanks, Reservoirs.",
          "Assistance in Permanent projects.",
          "Environment Awareness Camps & Tree Plantation, Animal Welfare.",
          "Help to the Visually Impaired, Destitutes and the Differently Abled.",
          "Help to society, during Natural Calamities and the Pandemic.",
        ]
      }
    },
    {
      id: 'emblem',
      icon: Star,
      title: "Our Emblem",
      subtitle: "Symbol of Identity & Purpose",
      gradient: "from-pink-500 to-rose-600",
      lightBg: "bg-pink-50",
      accentColor: "text-pink-700",
      borderColor: "border-pink-200",
      preview: "Every element of our emblem carries deep meaning and values.",
      content: {
        type: 'emblem',
        image: "/images/WE-emblem.png",
        items: [
          { label: "The Woman in the Emblem", text: "A multifaceted personality. She can don many hats and can play many roles in any field whether it is the home or outside her home." },
          { label: "WE in Gold", text: "Stands for warmth, integrity, and firm values, along with success and achievement and epitomizes the strength of women and their ability to uplift other women." },
          { label: "Faces of the Women", text: "Looking outwards on the left portrays our Glorious Past — full of Service to humanity; on the right, projects our Bright Future — where the woman grows and touches many lives." },
          { label: "Circle in Gold", text: "Our all-encompassing field of work — humans, animal life or Environment. WE believe in the world of Co-existence, where every living being contributes to better the world." },
          { label: "White in the Background", text: "Purity in deeds and transparency in service, our everlasting and strong bonding of values and morals within the Organisation." },
          { label: "The Five Stars", text: "Describe the quality of Service, sincerity, dedication of our WE members! Even in the most difficult times, women stand up to it as Warriors!" },
        ]
      }
    },
    {
      id: 'founders',
      icon: Users,
      title: "Founders & Presidents",
      subtitle: "The Pillars of WE District 323 A2",
      gradient: "from-violet-600 to-purple-700",
      lightBg: "bg-violet-50",
      accentColor: "text-violet-700",
      borderColor: "border-violet-200",
      preview: "Visionary women who built this movement from the ground up.",
      content: {
        type: 'people',
        sections: [
          {
            heading: "Founders",
            people: [
              { image: "/images/founders/1.jpg", name: "WE Kawal Rekhi", role: "Chief Founder — The Association of 'WE' Clubs of India", club: "WE Club of Chembur", bio: "Joined Lions in 1964 and has been serving the society since. She became the Charter Vice President of Lioness Club of Chembur in 1976-77 and was the Lioness Multiple District President in 1992-93." },
              { image: "/images/founders/2.jpg", name: "WE Saroja Mekal", role: "Founder — Multiple District 323 & District 323A2", club: "WE Club of Chembur", bio: "Joined Lioness Club of Chembur in 1986. She took up the post of Multiple District President of WE Multiple District 323 in 2019-2021." },
              { image: "/images/founders/3.jpg", name: "WE Rajni Shetty", role: "Founder — WE District 323 A2", club: "WE Club of Vasant Vihar", bio: "Charter Member of Lioness Club of Vasant Vihar since 1999. Lioness District President in 2011-12. Held position of Multiple District President in 2024-25." },
              { image: "/images/founders/4.jpg", name: "WE Rachana Bothra", role: "Founder — WE District 323 A2", club: "WE Club of Vasant Vihar", bio: "Joined Lioness Club of Pantnagar in 1988. Formed Lioness Club of Vasant Vihar in 1999. Lioness District President in 2009-10." },
              { image: "/images/founders/5.jpg", name: "WE Jyoti Jagasia", role: "Founder — WE District 323 A2", club: "WE Club of Anushakti Royals", bio: "Charter Member of Lioness Club of Anushakti Royals. Lioness District President in 2015-2016." },
            ]
          },
          {
            heading: "District Presidents",
            people: [
              { image: "/images/founders/6.jpg", name: "WE Mala Shetty", role: "District President (2018–2019)", club: "WE Club of Vasant Vihar", bio: "Slogan: Power to Empower. A journalist, banker, ran a school for special children, studied law and foremost a social worker." },
              { image: "/images/founders/7.jpg", name: "WE Sujatha Rao", role: "District President (2019–2021)", club: "WE Club of Vashi, Navi Mumbai", bio: "Slogan: Fellowship to Service. Stock broker, teacher, Director of her own company — always placed community service at the top." },
              { image: "/images/founders/8.jpg", name: "WE Asha Gupta", role: "District President (2021–2022)", club: "WE Club of Chembur Galaxy", bio: "Slogan: हाथ बढ़ाओ थामो और बढ़ते चलो. Naturopathy degree holder, Reiki master, yoga teacher and a stickler for time." },
              { image: "/images/founders/9.jpg", name: "WE Arti Bhatia", role: "District President (2022–2023)", club: "WE Club of Chembur", bio: "Slogan: Rise to Serve. A 'Shayar', dancer, textile designer with a wonderful eye for colour and design." },
              { image: "/images/founders/10.jpg", name: "WE Manju Jain", role: "District President (2023–2024)", club: "WE Club of New Panvel Steel Town", bio: "Slogan: चलो दुनिया बदलते हैं. Known for simplicity and soft spoken nature. Hardworking and organised personality." },
              { image: "/images/founders/11.jpg", name: "WE Sudha Kamath", role: "District President (2024–2025)", club: "WE Club of Vashi, Navi Mumbai", bio: "Slogan: सेवा से समृद्धि. Versatile with interests in dance, drama, gardening. Capable teacher with a passion for service." },
            ]
          }
        ]
      }
    },
    {
      id: 'slogan',
      icon: Quote,
      title: "Our Slogan",
      subtitle: "Woman — Epitome of Service",
      gradient: "from-fuchsia-500 to-pink-600",
      lightBg: "bg-fuchsia-50",
      accentColor: "text-fuchsia-700",
      borderColor: "border-fuchsia-200",
      preview: "\"Woman – Epitome of Service\" — the perfect embodiment of strength and compassion.",
      content: {
        type: 'slogan',
        quotes: [
          { bold: true, text: "WE — \"WOMEN - EPITOME OF SERVICE means Perfect Example of A Perfect Woman\"" },
          { text: "Epitome can be described as the complete embodiment of something or the best example — the best of the best, the pinnacle. She is a learner, an achiever, a leader. She is like water — one who can blend or gel in any situation and come out a winner. She is the symbol of love, compassion, emotional strength, and emotional courage. The hand that rocks the Cradle rules the World." },
          { bold: true, label: "WOMAN", text: "is the Best example of power and strength, playing various multifaceted roles — be it at home or outside. Women are the most defining factor that can bring a change to the society. A Woman is the one who is Empowered to imprint the best in young minds. She is a Mother, a Teacher, a Friend, and a Mentor." },
          { text: "There is no exercise better for the heart than reaching down and lifting people to brighten their lives." },
          { text: "We are in this together. Let's draw strength from each other. Let's make sure we share positive energy, while we create a world in our vision — a world where we are free to be who we want to be, and with whom we want to be, without fear." },
        ]
      }
    },
  ];


  const team = [
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
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-pink-100">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700;800&family=Playfair+Display:wght@400;700;900&display=swap');
        
        * {
          font-family: 'Poppins', sans-serif;
        }
        
        .playfair {
          font-family: 'Playfair Display', serif;
        }

        @keyframes floatCard {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-12px); }
        }
        .about-float-card {
          animation: floatCard 4s ease-in-out infinite;
          cursor: pointer;
          transition: box-shadow 0.3s ease, transform 0.2s ease;
        }
        .about-float-card:nth-child(1) { animation-delay: 0s; }
        .about-float-card:nth-child(2) { animation-delay: 0.6s; }
        .about-float-card:nth-child(3) { animation-delay: 1.2s; }
        .about-float-card:nth-child(4) { animation-delay: 1.8s; }
        .about-float-card:hover {
          animation-play-state: paused;
          box-shadow: 0 30px 60px rgba(139,92,246,0.35) !important;
          transform: translateY(-16px) scale(1.03);
        }
        .we-modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(30,10,50,0.65);
          backdrop-filter: blur(6px);
          z-index: 1000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1rem;
          animation: fadeIn 0.25s ease;
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        .we-modal-box {
          background: #fff;
          border-radius: 24px;
          max-width: 760px;
          width: 100%;
          max-height: 88vh;
          overflow-y: auto;
          box-shadow: 0 40px 80px rgba(139,92,246,0.3);
          animation: slideUp 0.3s ease;
          scrollbar-width: thin;
          scrollbar-color: #d8b4fe #f3e8ff;
        }
        @keyframes slideUp {
          from { opacity:0; transform: translateY(40px); }
          to   { opacity:1; transform: translateY(0); }
        }
        .person-pill {
          background: linear-gradient(135deg, #f5f3ff, #fdf2f8);
          border: 1px solid #e9d5ff;
          border-radius: 16px;
          padding: 1rem 1.25rem;
          margin-bottom: 0.75rem;
        }
      `}</style>

      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden pt-24 px-4">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-72 h-72 bg-purple-300/30 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-pink-300/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto text-center">
          <span className="inline-block bg-purple-100 text-purple-700 px-6 py-2 rounded-full font-bold text-sm mb-6">
            OUR STORY
          </span>
          <h1 className="text-6xl md:text-8xl font-black mb-6 leading-tight">
            <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 bg-clip-text text-transparent playfair">
              About
            </span>
            <br />
            <span className="text-black-800 playfair">Woman Epitome of Service</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-4 max-w-3xl mx-auto font-light">
            Empowering women, transforming communities, one act of service at a time
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block bg-pink-100 text-pink-700 px-6 py-2 rounded-full font-bold text-sm mb-4">
                OUR MISSION
              </span>
              <h2 className="text-5xl md:text-6xl font-black text-gray-800 mb-6 playfair">
                Empowering Women, Serving Communities
              </h2>
              <div className="space-y-4 text-gray-600 leading-relaxed text-lg">
                <p>
                  WE (Woman Epitome of Service) Clubs of India is a dynamic network of women dedicated to creating positive change in our communities. We believe that empowered women are the cornerstone of a thriving society.
                </p>
                <p>
                  Through our diverse initiatives, we focus on education, healthcare, women empowerment, and community development, touching thousands of lives across District 323 A2 and beyond.
                </p>
                <p className="font-semibold text-purple-700">
                  Together, we are stronger. Together, we make a difference.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-3xl p-8 shadow-2xl">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border-4 border-white/30">
                  <Globe className="w-20 h-20 text-white mb-6 mx-auto" />
                  <h3 className="text-3xl font-bold text-white mb-4 text-center playfair">Our Vision</h3>
                  <p className="text-white/90 text-center text-lg leading-relaxed">
                    To be the leading force in women empowerment and community service, creating a ripple effect of positive change that transforms lives and builds stronger, more inclusive communities.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ───── About Sections – Floating Cards ───── */}
      <section className="py-24 px-4 bg-gradient-to-b from-transparent to-purple-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="inline-block bg-purple-100 text-purple-700 px-6 py-2 rounded-full font-bold text-sm mb-4">
              EXPLORE WE
            </span>
            <h2 className="text-5xl md:text-6xl font-black text-gray-800 mb-4 playfair">
              Discover Who We Are
            </h2>
            <div className="h-2 w-24 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full mx-auto mb-4"></div>
            <p className="text-gray-500 text-lg">Click on any card to explore in detail</p>
          </div>

          {/* Floating Cards Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {aboutCards.map((card) => {
              const Icon = card.icon;
              return (
                <div
                  key={card.id}
                  className="about-float-card bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-purple-100 overflow-hidden group"
                  onClick={() => setExpandedCard(card)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === 'Enter' && setExpandedCard(card)}
                >
                  {/* Gradient Header */}
                  <div className={`bg-gradient-to-br ${card.gradient} p-6 flex flex-col items-center justify-center`}>
                    <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-3 backdrop-blur-sm border-2 border-white/30 group-hover:scale-110 transition-transform duration-300">
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-white font-bold text-xl text-center playfair leading-tight">{card.title}</h3>
                    <p className="text-white/80 text-xs font-medium mt-1 text-center">{card.subtitle}</p>
                  </div>
                  {/* Preview Body */}
                  <div className="p-5 text-center">
                    <p className="text-gray-600 text-sm leading-relaxed mb-4">{card.preview}</p>
                    <span className={`inline-flex items-center gap-1 text-xs font-bold uppercase tracking-widest ${card.accentColor} bg-white border ${card.borderColor} px-3 py-1.5 rounded-full`}>
                      <ChevronDown className="w-3 h-3" />
                      Tap to expand
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ───── Expanded Modal ───── */}
      {expandedCard && (
        <div className="we-modal-overlay" onClick={() => setExpandedCard(null)}>
          <div className="we-modal-box" onClick={(e) => e.stopPropagation()}>
            {/* Modal Header */}
            <div className={`bg-gradient-to-r ${expandedCard.gradient} p-6 rounded-t-3xl flex items-center justify-between`}>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center border-2 border-white/30">
                  {React.createElement(expandedCard.icon, { className: 'w-6 h-6 text-white' })}
                </div>
                <div>
                  <h3 className="text-white font-black text-2xl playfair">{expandedCard.title}</h3>
                  <p className="text-white/75 text-sm">{expandedCard.subtitle}</p>
                </div>
              </div>
              <button
                onClick={() => setExpandedCard(null)}
                className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors"
              >
                <X className="w-5 h-5 text-white" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 md:p-8">
              {/* LIST TYPE – Area of Work */}
              {expandedCard.content.type === 'list' && (
                <ul className="space-y-3">
                  {expandedCard.content.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className={`mt-1 w-5 h-5 rounded-full bg-gradient-to-br ${expandedCard.gradient} flex items-center justify-center flex-shrink-0`}>
                        <span className="text-white text-xs font-bold">{i + 1}</span>
                      </span>
                      <span className="text-gray-700 leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              )}

              {/* EMBLEM TYPE */}
              {expandedCard.content.type === 'emblem' && (
                <div>
                  <img
                    src={expandedCard.content.image}
                    alt="WE Emblem"
                    className="w-40 h-40 object-contain mx-auto mb-6 drop-shadow-xl"
                  />
                  <div className="space-y-4">
                    {expandedCard.content.items.map((item, i) => (
                      <div key={i} className="flex gap-3">
                        <div className={`w-1.5 rounded-full bg-gradient-to-b ${expandedCard.gradient} flex-shrink-0`} style={{ minHeight: '100%' }}></div>
                        <div>
                          <span className={`font-bold ${expandedCard.accentColor}`}>{item.label}: </span>
                          <span className="text-gray-600">{item.text}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* PEOPLE TYPE – Founders */}
              {expandedCard.content.type === 'people' && (
                <div className="space-y-8">
                  {expandedCard.content.sections.map((section, si) => (
                    <div key={si}>
                      <h4 className={`text-xl font-black playfair ${expandedCard.accentColor} mb-4 pb-2 border-b-2 ${expandedCard.borderColor}`}>
                        {section.heading}
                      </h4>
                      <div className="space-y-3">
                        {section.people.map((person, pi) => (
                          <div key={pi} className="person-pill">
                            <div className="flex items-start gap-3 mb-1">
                              {/* Photo avatar */}
                              {person.image ? (
                                <img
                                  src={person.image}
                                  alt={person.name}
                                  className="w-14 h-14 rounded-2xl object-cover flex-shrink-0 shadow-md border-2 border-white ring-2 ring-purple-200"
                                />
                              ) : (
                                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${expandedCard.gradient} flex items-center justify-center flex-shrink-0 shadow-md`}>
                                  <span className="text-white text-lg font-bold">{person.name.split(' ').slice(-1)[0][0]}</span>
                                </div>
                              )}
                              <div className="flex-1 min-w-0">
                                <p className="font-bold text-gray-800 text-sm leading-tight">{person.name}</p>
                                <p className={`text-xs font-semibold ${expandedCard.accentColor} mt-0.5`}>{person.role}</p>
                                <p className="text-gray-500 text-xs leading-relaxed mt-0.5">{person.club}</p>
                              </div>
                            </div>
                            <p className="text-gray-600 text-sm leading-relaxed mt-2 pl-1">{person.bio}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* SLOGAN TYPE */}
              {expandedCard.content.type === 'slogan' && (
                <div className="space-y-5">
                  {expandedCard.content.quotes.map((q, i) => (
                    <div key={i} className={`p-4 rounded-2xl ${i === 0 ? `bg-gradient-to-r ${expandedCard.gradient} text-white` : 'bg-gray-50 text-gray-700'} leading-relaxed`}>
                      {q.label && <span className={`font-black ${i === 0 ? 'text-white' : expandedCard.accentColor} mr-1`}>{q.label}</span>}
                      <span className={q.bold && i !== 0 ? 'font-semibold' : ''}>{q.text}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Team Section */}
      <section className="py-24 px-4 bg-gradient-to-b from-transparent to-purple-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="inline-block bg-purple-100 text-purple-700 px-6 py-2 rounded-full font-bold text-sm mb-4">
              LEADERSHIP
            </span>
            <h2 className="text-5xl md:text-6xl font-black text-gray-800 mb-4 playfair">
              Our Leadership Team
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Guided by visionary leaders committed to our mission
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div key={index} className="group bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-purple-600/80 to-transparent"></div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-2 playfair">{member.name}</h3>
                  <p className="text-purple-600 font-semibold">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center">
              <img src="/images/WE-emblem.png" />
            </div>
            <div>
              <p className="font-bold text-lg">WE Clubs of India</p>
              <p className="text-sm text-gray-400">District 323 A2</p>
            </div>
          </div>
          <p className="text-gray-400 mb-4">Woman - Epitome of Service</p>
          <p className="text-sm text-gray-500">© 2025 WE - Woman Epitome of Service. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default AboutPage;

