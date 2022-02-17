import React, {  useEffect } from 'react';

const Iframe = () => {
    // const [src, setSource] = useState("");
    // const [title, setSource] = useState("");
    // const [allowfullscreen, setFullScreenFlag] = useState("")
    // useEffect(() => {
    //     fetch(
    //         "http://localhost:5000/iframe")
    //         .then((response) => response.json())
    //         .then((response) => {
    //             console.log()
    //             // setSource(text);
    //         });
    // });


    return (
        // basic bootstrap classes. you can change with yours.
        <div className="col-md-12">
            <div className="emdeb-responsive">
                <iframe title="Driver Monitoring Live - Trip Analysis" width="600" height="373.5" src="https://app.powerbi.com/view?r=eyJrIjoiMGVmMzc0ZDItNzdiYS00NDdmLThhZjktZTY2ZmQ3NzgxOTY5IiwidCI6IjdkODViMzVjLTg3MmUtNDA1NS1hZjkyLTgwZmI3YzlmOTRiNCIsImMiOjF9" frameborder="0" allowfullscreen="true"></iframe>
            </div>
           
        </div>
    );
};

export default Iframe;