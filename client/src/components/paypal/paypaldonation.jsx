import React, { useEffect, useMemo, useRef } from "react";
// const { IDBUTTON } = process.env

let counter = 0;
const generateId = () => {
    return `ID-${++counter}`; // if it is necessary, use some better unique id generator
};

const Paypalbutton = () => {
    const buttonRef = useRef(null);
    const buttonId = useMemo(() => `ID-${generateId()}`, []);

    useEffect(() => {
        const button = window.PayPal.Donation.Button({
            env: 'sandbox',
            hosted_button_id: `T26QVZCLKVLHG`,
            image: {
                src: 'https://www.paypalobjects.com/es_XC/i/btn/btn_donate_SM.gif',
                alt: 'Donar con el botón PayPal',
                title: 'PayPal - The safer, easier way to pay online!',
            },
            onComplete: async function (params) {
                // Your onComplete handler

            },
        });
        button.render(`#${buttonRef.current.id}`); // you can change the code and run it when DOM is ready
    }, []);
    return (
        <div ref={buttonRef} id={buttonId} />
    );

}
export default Paypalbutton