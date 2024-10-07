import React, { useState, useRef } from 'react';

export default function FormPost() {
    let [postedData, setPostedData] = useState("");
    const form = useRef();

    const onSubmitForm = (event) => {
        event.preventDefault();
        const formData = new FormData(form.current);
        const formEnt = Object.fromEntries(formData.entries());
        fetch('/api/form-post', {
            method: 'POST',
            body: JSON.stringify(formEnt),
            headers: { 'Content-Type': 'application/json' }
        })
        .then((response) => response.text())
        .then(result => setPostedData(result))
        .catch(err => alert(err));
    }

    const inputStyle = {
        margin: '5px 0',
    }

    return (
        <div style={{ margin: '30px' }}>
            <form ref={form} onSubmit={onSubmitForm}>
                <div>ชื่อผู้ติดต่อ</div>
                <input type="text" name="name" size="13" placeholder="ชื่อ" style={inputStyle} /><br />
                <input type="email" name="email" size="13" placeholder="อีเมล" style={inputStyle} /><br />
                <textarea name="message" cols="40" rows="4" placeholder="ข้อความ" style={inputStyle}></textarea><br />
                <button type="submit">ส่งข้อมูล</button>
            </form>
            <br />
            <div dangerouslySetInnerHTML={{ __html: postedData }}></div>
        </div>
    );
}
