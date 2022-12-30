const Title = ({ children }: { children: string }) => {
    return (
        <div className="border-amber-400 text-2xl underline decoration-red-600 underline-offset-4">
            <span>{children}</span>
        </div>
    )
}

export default Title
