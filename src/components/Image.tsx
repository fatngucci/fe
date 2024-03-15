import React, { useState, useEffect } from 'react';

const ImageComponent = ({ bufferData }: { bufferData: Buffer }) => {
    const [src, setSrc] = useState("../assets/imgs/loadingGif.gif");

    useEffect(() => {
        // Convert the buffer data to a data URL
        const base64Data = btoa(
            new Uint8Array(bufferData).reduce((data, byte) => data + String.fromCharCode(byte), '')
        );
        const dataUrl = 'data: image/jpeg;base64,${base64Data}';

        // Set the data URL as the image source
        setSrc(dataUrl);
    }, [bufferData]);

    return (
        <img src={src} alt="Image" />
    );
};