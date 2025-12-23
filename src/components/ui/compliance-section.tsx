import React from 'react';

export default function ComplianceSection() {
    return (
        <section id="compliance" className="py-32 bg-white text-black px-6 md:px-16 lg:px-24 xl:px-32">
            <div className="flex flex-col lg:flex-row gap-20 items-start">
                <div className="lg:sticky lg:top-32 max-w-md">
                    <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase leading-none">
                        GLOBAL <br /> COMPLIANCE
                    </h2>
                    <p className="mt-8 text-xl font-medium leading-relaxed">
                        Apni Sec aligns its security practices with globally trusted standards and rigorous audit requirements.
                    </p>
                </div>

                <div className="flex-1 grid grid-cols-2 gap-12">
                    <div>
                        <h4 className="font-black uppercase tracking-widest text-sm mb-6 border-b-2 border-black pb-2">Standards</h4>
                        <ul className="space-y-4 text-2xl font-bold">
                            <li>OWASP</li>
                            <li>NIST</li>
                            <li>SANS</li>
                            <li>CERT / NIC</li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-black uppercase tracking-widest text-sm mb-6 border-b-2 border-black pb-2">Audit-Ready</h4>
                        <ul className="space-y-4 text-2xl font-bold">
                            <li>ISO 27001</li>
                            <li>SOC 2</li>
                            <li>GDPR</li>
                            <li>RBI Compliance</li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
}
