import { Check, Eye, Cloud, Swords, ShieldCheck, Briefcase } from 'lucide-react';

const solutions = [
    {
        title: "Dark Eye Watcher",
        icon: Eye,
        iconBg: "bg-white/5",
        features: [
            "Monitor The Dark Web For Compromised Data.",
            "Tracking Data Breaches 24x7",
            "Threat Intelligence Platform",
            "Data Loss Prevention (DLP)",
            "Brand Protection Services"
        ],
    },
    {
        title: "Red Team Assessment",
        icon: Swords,
        iconBg: "bg-white/5",
        features: [
            "Social Engineering Simulation Campaigns & Evaluation",
            "Assess Vulnerabilities In System And Processes",
            "On-Site Network Firewall And Process Audits",
            "Cloud Attack Emulation"
        ],
    },
    {
        title: "Virtual CISO",
        icon: Briefcase,
        iconBg: "bg-white/5",
        features: [
            "Continuous Vulnerability Scanning & Asset Monitoring",
            "Auditing Weekly Feature Releases",
            "DevSecOps - Shift Left Culture",
            "Zero Trust Security Model",
            "Threat Modelling",
            "Social Engineering Simulations & Awareness Trainings",
            "Information Security Policy & Cyber Risk Maturity Plan",
            "Secure Architecture Review",
            "Bug Bounty Program Management",
            "Vendor Monitoring System",
            "Compliance As A Service",
            "ISO 27001, SOC2, GDPR, RBI Audits & Compliance",
            "Third Party Risk Assessment"
        ],
    },
    {
        title: "Cloud Watcher",
        icon: Cloud,
        iconBg: "bg-white/5",
        features: [
            "Asset Monitoring",
            "Cloud Security Posture Management",
            "Microservices Security",
            "Cloud Attack Emulation"
        ],
    },
    {
        title: "End-to-End VAPT",
        icon: ShieldCheck,
        iconBg: "bg-white/5",
        features: [
            "Web, API & Mobile Application Security",
            "Secure Code Review",
            "Vulnerability Assessment & Penetration Testing",
            "Network Security"
        ],
    },
];

export default function SolutionsGrid() {
    return (
        <section id="services" className="py-24 bg-black px-6 md:px-16 lg:px-24 xl:px-32 border-t border-white/10">
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase mb-16 text-white text-left leading-[0.85]">
                OUR <br /> <span className="text-white/30">SERVICES</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
                {solutions.map((item, i) => (
                    <div key={i} className={`bg-zinc-950/50 rounded-2xl border border-white/5 p-8 transition-all flex flex-col h-full hover:border-white/20 ${item.title === 'Virtual CISO' ? 'lg:row-span-2' : ''}`}>
                        <div className="flex justify-between items-start mb-8">
                            <h3 className="text-2xl font-bold tracking-tight text-white pr-4">
                                {item.title}
                            </h3>
                            <div className={`${item.iconBg} p-3 rounded-full flex-shrink-0`}>
                                <item.icon className="w-6 h-6 text-white" />
                            </div>
                        </div>

                        <ul className="space-y-4 flex-grow">
                            {item.features.map((feature, idx) => (
                                <li key={idx} className="flex items-start gap-3 text-sm font-medium text-white/50 leading-snug">
                                    <Check className="w-4 h-4 mt-0.5 text-white/20 flex-shrink-0" />
                                    <span>{feature}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </section>
    );
}
