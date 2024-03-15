import { useEffect, useState } from "react";
import { Container, Row, Col, Image, Button } from "react-bootstrap";
import { KunstwerkResource } from "./Resources";
import { displayPartsToString } from "typescript";

export default function KunstwerkSpinner(props: { kunstwerk: KunstwerkResource | null }) {
    const [value, setValue] = useState(6);
    // const [spinUrl, setSpinUrl] = useState<String | null | undefined>();


    const kunstwerk = props.kunstwerk;
    // console.log("das ist der titel: " +  kunstwerk!.titel);

    let spinUrl = "";
    let picClass = "bilder";
    let rowStyle = { display: "flex", justifyContent: "center", alignItems: "center"};

    if (!kunstwerk) {
        return null;
    }
    if (kunstwerk.titel === "Der Träger") {
        // setSpinUrl("steinBub");
        spinUrl = "steinBub";
        // console.log("beim buben")
    }
    else if (kunstwerk.titel === "Blauwal") {
        spinUrl = "whale";
        picClass = "whale";
        // rowStyle = {marginLeft: "170px",}
        // setSpinUrl("whale");
    }
    else if (kunstwerk.titel === "Nayara") {
        spinUrl = "steinGirl";
        // setSpinUrl("steinGirl");
    }
    else if (kunstwerk.titel === "Copper Horse") {
        spinUrl = "pony";
        // setSpinUrl("pony");
    }

    // console.log(test);

    // function load() {
    //     console.log("in load1");
    //     try {
    //         console.log("in load2");
    //         if (!kunstwerk) {
    //             return null;
    //         }
    //         if (kunstwerk.titel === "Der Träger") {
    //             setSpinUrl("steinBub");
    //             console.log("beim buben")
    //         }
    //         else if (kunstwerk.titel === "Blauwal") {
    //             setSpinUrl("whale");
    //         }
    //         else if (kunstwerk.titel === "Nayara") {
    //             setSpinUrl("steinGirl");
    //         }
    //         else if (kunstwerk.titel === "Copper Horse") {
    //             setSpinUrl("pony");
    //         }
    //         else {
    //             throw new Error("wtf")
    //         }

    //     } catch (err) {
    //         console.error();
    //     }
    // }

    // useEffect(() => {
    //     console.log("halllo")
    //     load();
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, []);


    const changePic = (value: number) => {
        setValue(value);
    };

    return (
        <Row style={rowStyle}>
            <Col xs={6} style={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: "75px" }}>
                <div className="container-custom">
                    <div className="inner-div">
                        <div className="slider-custom">
                            <div className="slider-container-custom">
                                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((index) => (
                                    <Image
                                        className={`${picClass}`}
                                        id={`${spinUrl}`}
                                        src={require(`../assets/imgs/sliderImg/${spinUrl}/${index}.jpg`)}
                                        alt={`Bild ${index}`}
                                        style={{ display: index === value ? "block" : "none" }}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="inner-div">
                        <div className="volume-slider" style={{ marginTop: "10px" }}>
                            <input
                                style={{ backgroundColor: "lightgray", borderRadius: "10px" }}
                                type="range"
                                min="1"
                                max="11"
                                value={value}
                                step="1"
                                onChange={(e) => changePic(parseInt(e.target.value))}
                            />
                        </div>
                    </div>
                </div>
            </Col>
        </Row>
    );
}
