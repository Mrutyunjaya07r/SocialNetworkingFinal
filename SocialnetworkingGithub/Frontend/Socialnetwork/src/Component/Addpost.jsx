import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Addpost() {
    let navigate = useNavigate();
    let [image, setImage] = useState("");
    let [caption, setCaption] = useState("");
    let [url, setUrl] = useState("");

    useEffect(() => {
        if (url) {
            fetch('http://localhost:8080/addpost', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('socialNetworkapp2')
                },
                body: JSON.stringify({
                    pic: url,
                    caption: caption
                })
            })
            .then((res) => res.json())  
            .then((data) => {
                console.log(data);
                navigate('/'); 
            })
            .catch((err) => console.log(err));
        }
    }, [url, navigate]); 

    let postDetail = async () => {
        console.log(image, caption);
        let formdata = new FormData();
        formdata.append("file", image);
        formdata.append("upload_preset", "SocialnetworkingApp");
        formdata.append("cloud_name", "mrutyunjayacloud");

        fetch("https://api.cloudinary.com/v1_1/mrutyunjayacloud/image/upload", {
            method: "POST",
            body: formdata
        })
        .then((res) => res.json())  
        .then((data) => {
            console.log(data);
            setUrl(data.url);  
        })
        .catch((err) => console.log(err));
    };

    var loadFile = function (event) {
        var output = document.getElementById('output');
        output.src = URL.createObjectURL(event.target.files[0]);
        output.onload = function () {
            URL.revokeObjectURL(output.src); // Free memory
        };
    };

    return (
        <div className="container">
            <h1>Add Post</h1>
            <div className="container">
                <img style={{ height: "200px", width: "200px" }} id="output" alt="Preview"/>
                <input type="file" accept="image/*" onChange={(event) => { loadFile(event); setImage(event.target.files[0]); }} />
                <textarea 
                    placeholder="Enter your caption" 
                    style={{ marginRight: "50px", height: "200px", width: "400px" }} 
                    name="caption" 
                    value={caption} 
                    onChange={(e) => setCaption(e.target.value)} 
                />
                <button className="btn btn-primary" onClick={postDetail}>Submit</button>
            </div>
        </div>
    );
}

export default Addpost;
