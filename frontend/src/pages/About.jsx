import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function About() {
  const navigate = useNavigate();

  const team = [
    {
      name: "Abhishek Prajapati",
      role: "Frontend Developer & UI/UX Designer",
      bio: "Computer Science Engineering student passionate about creating beautiful, user-friendly interfaces. Specializes in React, Tailwind CSS, and modern web development.",
      image:
        "./",
      skills: [
        "React",
        "Tailwind CSS",
        "JavaScript",
        "Framer Motion",
        "UI/UX Design",
      ],
      github: "abhi-create-design",
      linkedin: "abhishek-prajapati",
      twitter: "abhishek_dev",
      gradient: "from-purple-500 to-pink-500",
      color: "text-purple-600",
    },
    {
      name: "Abhinav Kumar",
      role: "Backend Developer & API Architect",
      bio: "Backend specialist focused on building robust, scalable APIs and database systems. Expert in Node.js, Express, and database optimization for high-performance applications.",
      image: "./",
      skills: ["Node.js", "Express", "MongoDB", "REST APIs", "Database Design"],
      github: "abhinav-kumar",
      linkedin: "abhinav-kumar",
      twitter: "abhinav_tech",
      gradient: "from-blue-500 to-cyan-500",
      color: "text-blue-600",
    },
    {
      name: "Akshat Gupta",
      role: "Full Stack Developer & DevOps Engineer",
      bio: "Versatile developer with expertise in both frontend and backend technologies. Handles deployment, CI/CD pipelines, and ensures smooth integration between all system components.",
      image:
        "./",
      skills: ["React", "Node.js", "Docker", "AWS", "CI/CD"],
      github: "akshat-gupta",
      linkedin: "akshat-gupta",
      instagram: "akshat_dev",
      gradient: "from-green-500 to-emerald-500",
      color: "text-green-600",
    },
  ];

  const mission = {
    title: "Our Mission",
    description:
      "To help people with taste and smell perception challenges rediscover the joy of eating through scientifically-optimized recipes and personalized flavor recommendations.",
    points: [
      "Make food enjoyable again for chemotherapy patients",
      "Support elderly individuals with age-related taste loss",
      "Provide diabetic-friendly and low-sodium options",
      "Help post-COVID patients recover their sense of taste",
      "Bridge the gap between food science and technology",
    ],
  };

  const values = [
    {
      emoji: "💡",
      title: "Innovation",
      description:
        "We push boundaries with cutting-edge technology and creative solutions",
    },
    {
      emoji: "👥",
      title: "Empathy",
      description:
        "We design with compassion for those facing taste challenges",
    },
    {
      emoji: "💻",
      title: "Excellence",
      description:
        "We build robust, high-quality software that makes a difference",
    },
    {
      emoji: "🏆",
      title: "Impact",
      description: "We measure success by the positive change we create",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden relative">
      {/* Background Decorations */}
      <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-80 h-80 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-full blur-3xl" />
      <div className="absolute top-1/2 -right-20 w-64 h-64 bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-full blur-3xl" />

      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto mb-24"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 300, delay: 0.2 }}
              className="inline-block mb-6"
            >
              <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center mx-auto shadow-2xl">
                <span className="text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-purple-200">
                  B²
                </span>
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-purple-600 to-teal-500 bg-clip-text text-transparent mb-4"
            >
              Meet BitsByte
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="text-xl text-gray-600 mb-8"
            >
              The passionate team behind FlavorBoost 2.0
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="flex justify-center gap-4"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate("/")}
                className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all"
              >
                Back to Home
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Mission Section */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-24 max-w-4xl mx-auto"
          >
            <div className="text-center mb-12">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-4xl font-bold text-gray-900 mb-4"
              >
                {mission.title}
              </motion.h2>
              <p className="text-xl text-gray-600">Making every bite count</p>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg text-gray-700 leading-relaxed mb-8 text-center px-4"
            >
              {mission.description}
            </motion.p>

            <div className="space-y-3">
              {mission.points.map((point, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="flex items-start gap-3 p-4 bg-purple-50 rounded-lg"
                >
                  <span className="text-purple-600 text-xl mt-1">🚀</span>
                  <span className="text-gray-800 font-medium">{point}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Team Section */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-24"
          >
            <div className="text-center mb-16">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-4xl font-bold text-gray-900 mb-4"
              >
                Our Team
              </motion.h2>
              <p className="text-xl text-gray-600">
                Passionate developers building the future of food technology
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {team.map((member, index) => (
                <TeamMemberCard key={index} member={member} index={index} />
              ))}
            </div>
          </motion.div>

          {/* Values Section */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-24"
          >
            <div className="text-center mb-16">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-4xl font-bold text-gray-900 mb-4"
              >
                Our Core Values
              </motion.h2>
              <p className="text-xl text-gray-600">What drives us every day</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
              {values.map((value, index) => (
                <ValueCard key={index} value={value} index={index} />
              ))}
            </div>
          </motion.div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <div className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-3xl p-12 shadow-2xl">
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 300 }}
                className="w-24 h-24 bg-white rounded-2xl flex items-center justify-center mx-auto mb-8"
              >
                <span className="text-6xl">👨‍💻👩‍💻</span>
              </motion.div>

              <h2 className="text-4xl font-bold text-white mb-6">
                Join Our Journey
              </h2>
              <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
                We're building something amazing, and we'd love for you to be
                part of it
              </p>

              <motion.button
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
                }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate("/")}
                className="px-12 py-4 bg-white text-purple-600 rounded-xl font-bold text-xl shadow-lg hover:shadow-2xl transition-all"
              >
                Start Using FlavorBoost
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

// Team Member Card Component
function TeamMemberCard({ member, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -10, scale: 1.02 }}
      className="bg-white rounded-2xl shadow-xl overflow-hidden"
    >
      {/* Member Image with Gradient Overlay */}
      <div className="relative h-64 overflow-hidden">
        <img
          src={member.image}
          alt={member.name}
          className="w-full h-full object-cover"
        />
        <div
          className={`absolute inset-0 bg-gradient-to-t ${member.gradient} opacity-80`}
        />

        {/* Social Links */}
        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-3">
          {member.github && (
            <SocialLink
              emoji="🐙"
              href={`https://github.com/${member.github}`}
              color={member.color}
            />
          )}
          {member.linkedin && (
            <SocialLink
              emoji="🔗"
              href={`https://linkedin.com/in/${member.linkedin}`}
              color={member.color}
            />
          )}
          {member.twitter && (
            <SocialLink
              emoji="🐦"
              href={`https://twitter.com/${member.twitter}`}
              color={member.color}
            />
          )}
          {member.instagram && (
            <SocialLink
              emoji="📸"
              href={`https://instagram.com/${member.instagram}`}
              color={member.color}
            />
          )}
        </div>
      </div>

      {/* Member Info */}
      <div className="p-6">
        <div className={`text-2xl font-bold ${member.color} mb-1`}>
          {member.name}
        </div>
        <div className="text-gray-600 font-medium mb-4">{member.role}</div>

        <p className="text-gray-700 text-sm leading-relaxed mb-4">
          {member.bio}
        </p>

        {/* Skills Tags */}
        <div className="flex flex-wrap gap-2">
          {member.skills.map((skill, skillIndex) => (
            <motion.span
              key={skillIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.4,
                delay: index * 0.1 + skillIndex * 0.05,
              }}
              className={`px-3 py-1 rounded-full text-xs font-medium ${
                skillIndex === 0
                  ? `bg-${member.color.replace("text-", "")}/10 ${member.color}`
                  : "bg-gray-100 text-gray-700"
              }`}
            >
              {skill}
            </motion.span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

// Social Link Component (using emojis instead of icons)
function SocialLink({ emoji, href, color }) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ scale: 1.2, y: -3 }}
      whileTap={{ scale: 0.9 }}
      className={`w-10 h-10 rounded-full bg-white flex items-center justify-center text-xl ${color} hover:bg-gray-100 transition-all`}
    >
      {emoji}
    </motion.a>
  );
}

// Value Card Component
function ValueCard({ value, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -5, scale: 1.02 }}
      className="bg-white p-8 rounded-2xl shadow-lg text-center"
    >
      <div className="w-20 h-20 bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl flex items-center justify-center mx-auto mb-6 text-purple-600 text-4xl">
        {value.emoji}
      </div>
      <h3 className="text-2xl font-bold text-gray-900 mb-3">{value.title}</h3>
      <p className="text-gray-600">{value.description}</p>
    </motion.div>
  );
}
