import React from 'react'

export default function Title({ text, color, classes }: { text: string, color: string, classes?: string }) {
    return (
        <h2 className={`text-3xl font-bold text-${color} ${classes}`}> {text}</ h2>
    )
}
