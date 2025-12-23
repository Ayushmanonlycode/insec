type LogoProps = {
    className?: string
}

export default function Logo({ className }: LogoProps) {
    return (
        <svg
            viewBox="0 0 200 65"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
        >
            {/* Iconic Elements */}
            <circle cx="10" cy="42" r="7" fill="#00FFB2" />
            <path d="M30 5L20 5L38 56L48 56L30 5Z" fill="#FFFFFF" />

            {/* Branding Text */}
            <text
                x="58"
                y="32"
                fill="#FFFFFF"
                style={{ fontSize: '26px', fontWeight: '700', fontFamily: 'Arial, sans-serif' }}
            >
                apni sec
            </text>

            {/* Subtext Branding */}
            <text
                x="58"
                y="52"
                fill="#FFFFFF"
                style={{ fontSize: '12px', fontWeight: '400', fontFamily: 'Arial, sans-serif', letterSpacing: '0.02em' }}
            >
                SECurity as a Service
            </text>
        </svg>
    )
}
