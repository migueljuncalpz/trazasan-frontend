"use client";

interface SubHeaderProps {
    date: string,
    title: string,
    description: string,
}

export default function Subheader({...props} : SubHeaderProps) {
    return (
        <div><p className="mb-1 text-xs font-bold uppercase tracking-[.12em] text-[#7a918d]">{props.date}</p><
            h1 className="text-2xl font-bold tracking-tight text-[#123d3a] sm:text-[30px]">{props.title}</h1>
            <p className="mt-1 text-sm text-[#718581]">{props.description}</p>
        </div>
    )
}

export { Subheader };
