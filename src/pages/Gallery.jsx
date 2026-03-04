import React, { useState } from 'react';

const galleryImages = [
    { src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBhNTiZR8jk5bfPts3okMMXE9R3bNSFiA4MAHS_5ZsIbosl8KCZlhTEumaV6KMz5hvO_WmvrMir-SXwdGW2qslfbd7Njs4Azy4hXit5IeIzOc5yIlHGMxs5Q8w-S7e-f01JCjYT6UunOHJapZbhsUNypDpV9v8EKMuDc-vCHHbuLYi9xmRpav1u_IryZlTud2xzS7qWTWfBwLAGNooq2LayOU1cQgl0smiKKAkN9C7TJCcO6v3rQUVGhn-dUWbGF4gEWkWVKkv_U-YH', label: 'Classroom Environment', category: 'Classrooms' },
    { src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDrFY3bR7GoxDA59-4SYsdw_jET8e50lOUJmFT67YSkh42bi8qHu3wkYkmKxhUyVusI0Wj8w4vM0M3UQzz_DrhrzvOatGO-Iaka--eqd8vDJPhFYn7MvpUyxVaR6kUMkLCGcPdeCjMXscjaQEo4EghuujX76ZLKQemmTfF2aDwnT4KN7xi53kuf4cRllQliIm2wmfKzUDgAWAS_snIXNzIHaEFz2beAVvUIQP-qPTKAhhzJ_-KtgO7zl-54loQfNzHD5_WM9066eSpk', label: 'Students Focused', category: 'Students' },
    { src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBzUpDCS-sO1q5ANoqDP31iJruqqzlLZWqlZJfmt8YbpuMqZ6jdUviAANjUd4z-_nXcFOz6tJefAHELCnc3YodjN42Nzy8UgiYCc3kCEwRwvZPacKYlnorc2jGE1T5S7moFltymmYsbGvaA8elp-m2n8TwW9OpE2LsHuF40NVBE8t-vBoBLbgInZpmRWIKqd829L_W_QlpqJba86AillQW57KdhhU8WAseKFdarxneWgq5gAsXg4MM3S09awIWX_xsDEVCQhVrynDjG', label: 'Modern Facilities', category: 'Classrooms' },
    { src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAsbC6Cjv3F3tNjzDyUCfRgjbLBc9Bb1n6-STVzUwNTsIZQ6LtVBEvK4f-TifuN0mZT0MG0sfAxTAorLFs5gbwl91zhawSxu4u0BiN6s8gos8fl-sX10Xv3G6Ld6BWCZM6VWuEPCanHMFuy438NhiEczmJ6i6Ychf3KQdzgdgazMqZ9ftU5M4oaim7ZB6jMgWOkLe0qR5VzdJJfirbCeomJo-ts1eON6axTIDM4avlEwAC8vepUOHuWKN3Kp3kC5Pv1MFv9W7V_HBet', label: 'Library Resources', category: 'Facilities' },
    { src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBg6-W-tYCSAccZeMiaaJI5pMbVAxEoZ4ETgyE7BeWL3SbpKV67AQheRqN79XkRxzwhsWqGdUTTrg5qgN9uID9YauqO6sUqQWScnTDBL9lDWZCVBwGGYhWG-Ys1U9Z0UfmBpkOrkM4-ZeLVMM79elLaLYFHnWUEyZEYJdpULixeF-vF6HLLt9rQrdT_V44w36u9kzPaElhpYaIt9wnDEHFR5EHOULNL99D_DHKZOR_vsnhuXn9vpVbf8uVXDM96j88y8YkpbGAomoif', label: 'Academy Building', category: 'Campus' },
    { src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuATXBC84VRnnI-OAuNwMACtwOHzTDh_4BgTKwJ1yZHEoyVipaU6UT_pSsvp2d747z1Kk6ERh66nzrHJSa3MnrERAv5tlKbDXmLHk4B741IR97f65QzXVOEK4-uzmpHvAZMYQlkyy8P7nF4QtLKhcozRggRhv8YyOO53oGAdBWAWmJv4gDKHfjP_NUf4Wl4PtHLvnDsJ6fv6pK0rNEINWpwSqT6EkHPh1_SMv2FC2__yW52XcQCflB3bxYVTPr38_YdYRWGYnmIe-Y37', label: 'Faculty Excellence', category: 'Faculty' },
    { src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD5hNeDTVo0c_6BR9FVfUQ8jdMAwLDDSYydsn347MfUMhg-6B15X-sXdWE0wwzCWhlvbrv1E3dTE64si8scHuwrtlwlQHCPcYeA6DvkEDi35AiljFFgqE45S7ivhMwo94dPMRjPTPkCW70HY3Y8Xb9Nq1w_xhL09o7LIUqwZdMVlP0yJjalbj5Q4OHQlGJ5Sa2lfkLpeoCf2Rfa-vaK0MnZmwcoP1UfE0g56vW-4OtO6iMyKaemrS4FhvYeGWsR5EZ19vcaZfoJF3PW', label: 'Mentorship Session', category: 'Faculty' },
    { src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuByBbe14HMC27uZD2Y9mckvY9fxnTeGQKDn55DjydR4xCDyvst7-904oNxO2MVdMMQzwWb7W_YeMcneC8-VeWFHYTz-i75ihuF8JyugMHSpFCHZOrgv_FITzW2i2HQKZnGDeRzEAoGjpHnYkyI48DuVllaGFtTppwhDv87tu_Ngnz-Kn48gZkGuc8IPCr6BoefXFAsx9IHkdS7AFRMFR2G8WG4a3poHoZAdJ62JbJaaCbr6ZAxkB18S6BuTmvhLzaScF2VgDYTiccYu', label: 'Directors Vision', category: 'Campus' },
    { src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCxVf3I5-9tZs-KrLz3r0T-immKR7jwKGeYGnGb21CRrC7HYC3RW6sj9lX57x4HngChQCogKUTCZoS7FgBPjpGUJzAnURmPfDYoSOpRAv7bNZh5PwgtjkaS1QOEXhiqiu6g1n5muwGTc0ZUimQQ4SgR_hNGOcYPpyaA3YKrtuFHxDHMpTaCCVbdrQaLSQtvurA0XOwr36d-M7Uqmh3tiSIzhM3uSNv9zggXaRzxZbAeaD91DFpO1QKwfWmH-kwiJN4SygJ4c04lhjZQ', label: 'Sanskriti Founder', category: 'Faculty' },
];

const categories = ['All', 'Classrooms', 'Students', 'Facilities', 'Campus', 'Faculty'];

export default function Gallery() {
    const [active, setActive] = useState('All');
    const [lightbox, setLightbox] = useState(null);

    const filtered = active === 'All' ? galleryImages : galleryImages.filter(img => img.category === active);

    return (
        <div className="w-full">
            <header className="relative py-24 overflow-hidden" style={{ background: 'linear-gradient(135deg, #1e1b4b 0%, #581c87 100%)' }}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                    <span className="inline-block px-4 py-1.5 rounded-full bg-white/20 text-white font-semibold text-sm mb-4 uppercase tracking-wider">Our Campus</span>
                    <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6">Gallery</h1>
                    <p className="max-w-3xl mx-auto text-xl text-purple-200 leading-relaxed">
                        Take a visual tour of The Sanskriti Academy â€” our classrooms, faculty, campus, and vibrant student life.
                    </p>
                </div>
            </header>

            <section className="py-12 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-wrap gap-3 justify-center mb-12">
                        {categories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setActive(cat)}
                                className={`px-6 py-2.5 rounded-full font-semibold text-sm transition-all ${active === cat ? 'bg-primary text-white shadow-lg' : 'bg-slate-100 text-slate-600 hover:bg-primary/10 hover:text-primary'}`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {filtered.map((img, i) => (
                            <div
                                key={i}
                                className="relative group overflow-hidden rounded-2xl cursor-pointer shadow-md hover:shadow-xl transition-all hover:-translate-y-1"
                                onClick={() => setLightbox(img)}
                            >
                                <img src={img.src} alt={img.label} className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                                    <div>
                                        <p className="text-white font-bold">{img.label}</p>
                                        <span className="text-xs bg-primary text-white px-2 py-0.5 rounded-full">{img.category}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {lightbox && (
                <div className="fixed inset-0 z-[200] bg-black/90 flex items-center justify-center p-4" onClick={() => setLightbox(null)}>
                    <div className="relative max-w-4xl w-full" onClick={e => e.stopPropagation()}>
                        <button className="absolute -top-12 right-0 text-white text-sm flex items-center gap-1 hover:text-primary transition-colors" onClick={() => setLightbox(null)}>
                            <span className="material-symbols-outlined">close</span> Close
                        </button>
                        <img src={lightbox.src} alt={lightbox.label} className="w-full rounded-2xl shadow-2xl" />
                        <p className="text-white text-center mt-4 font-semibold">{lightbox.label}</p>
                    </div>
                </div>
            )}
        </div>
    );
}

