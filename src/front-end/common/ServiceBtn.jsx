import React from "react";

const ServiceBtn = ({ value }) => {
    const [hover, setHover] = React.useState(false);

    return (
        <button
            className="flex-grow border-solid border-white border-2 rounded-[10px] sm:p-5 hover:bg-white m-2 p-4"
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
        >
            <span
                className="text-base uppercase tracking-widest font-albert-sans"
                style={{
                    color: hover ? 'black' : 'white'
                }}
            >{value}</span>
        </button>
    )
}

export default ServiceBtn;