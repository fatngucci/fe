export default function PanoramicView({ galerieName }: { galerieName: string }) {


    function load() {
        let i = document.querySelector("iframe");
        if (i) {
            i.style.height = (window.innerHeight - 59) + 'px';
        } else {
            alert("no");
        }

    }

    window.addEventListener("resize", load);

    return (
        <div className="flex" style={{ justifyContent: "center", textAlign: "center" }}>
            {/* <iframe src={`https://localhost:3001/marzipano/${galerieName}/${galerieName}.html`} width="100%" height="800" frameBorder={0} title='test' /> */}
            {/* <iframe src={`https://localhost:3001/marzipano/index1.html`} width="80%" height="700" frameBorder={0} title='test' /> */}
            {/* <iframe src={`https://inspiring-yeot-356a51.netlify.app/`} width="2000" height="1000" frameBorder={0} title='test' /> */}

            <iframe src={`https://${galerieName}-360.netlify.app/`} width="80%" height={window.innerHeight-59} title={galerieName} onLoad={load} />

        </div>
    )
}
