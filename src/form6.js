import React, { useCallback, useMemo, useState } from "react";
import './App.css';
import { DownOutlined } from '@ant-design/icons';
import { Dropdown, Space } from 'antd';
import { Select } from 'antd';
const onChange = (value) => {
    console.log(`selected ${value}`);
};
const onSearch = (value) => {
    console.log('search:', value);
};

// Filter `option.label` match the user type `input`
const filterOption = (input, option) =>
    (option?.label ?? '').toLowerCase().includes(input.toLowerCase());



export const Form = () => {

    const [inputdata, setInputData] = useState({
        fname: "",
        email: "",
        pass: "",

    })

    const [data, setData] = useState(JSON.parse(localStorage.getItem("form")) || [])
    const [isEdit, setisEdit] = useState(-1);
    const [sorttt, setSorttt] = useState();
    const [searchh, setSearchh] = useState();
    const [selected, setSelected] = useState();
    const [flag, setFlage] = useState(false);
    const [selectedBoxes, setSelectedboxes] = useState([])


    const handleChange = (e) => {
        console.log(e.target.value);
        setInputData({ ...inputdata, [e.target.name]: e.target.value, id: Date.now() });
    }

    // SubmitEvent

    const handleSubmit = () => {
        setFlage(!flag)
        if (isEdit !== -1) {
            const editrecord = data.map((item, index) => {
                if (isEdit === index) return inputdata
                else return item
            })
            setData(editrecord)
        } else {

            axios.fetch('https://jsonplaceholder.typicode.com/posts')

            setData([...data, inputdata]);
            localStorage.setItem('form', JSON.stringify([...data, inputdata]));
        }
    }


    // delete data 

    const handleDelete = (index) => {
        const del = data.filter((item, ind) => ind !== index);
        setData(del);
        localStorage.setItem('form', JSON.stringify(del));
    }

    // Edit data 

    const handleEdit = (index) => {
        setisEdit(index);
        const edit = data.find((item, ind) => ind === index);
        setInputData(edit);
        localStorage.setItem('form', JSON.stringify(edit));
    }



    // checkbox

    const handleCheck = (e) => {

        if (e.target.name === "selectall") {

            if (selectedBoxes?.length === data?.length) {
                setSelectedboxes([])

            }
            else {
                setSelectedboxes(data?.map((item) => { return (item?.id) }));

            }
        }
        else {

            if (selectedBoxes?.includes(parseInt(e.target?.value))) {
                setSelectedboxes(selectedBoxes?.filter((item) => { return item !== parseInt(e.target.value) }))
            }
            else { setSelectedboxes([...selectedBoxes, parseInt(e.target.value)]) }
        }

    }
    console.log(selectedBoxes)


    // search data 

    const serachingg = useMemo(() => {
        if (selected === 'fname') {
            return data.filter((item, index) => item.fname.toLowerCase().includes(searchh.toLowerCase()))
        }
        if (selected === 'email') {
            return data.filter((item, index) => item.email.toLowerCase().includes(searchh.toLowerCase()))
        }
        if (selected === 'pass') {
            return data.filter((item, index) => item.pass.toLowerCase().includes(searchh.toLowerCase()))
        }
        return data
    }, [selected, data])

    // sorting data

    const sorting = useMemo((a, b) => {
        if (sorttt === 'fname') {
            return data.sort((a, b) => a.fname.localeCompare(b.fname))
        }
        if (sorttt === 'email') {
            return data.sort((a, b) => a.email.localeCompare(b.email))
        }
        if (sorttt === 'pass') {
            return data.sort((a, b) => a.pass.localeCompare(b.pass))
        }
        else return data
    }, [sorttt])


    // sort data
    const items = [
        {
            label: <button onClick={(e) => setSorttt(e.target.innerText)}>fname</button>,
            key: '0',
        },
        {
            label: <button onClick={(e) => setSorttt(e.target.innerText)}>email</button>,
            key: '1',
        },

        {
            label: <button onClick={(e) => setSorttt(e.target.innerText)}>pass</button>,
            key: '3',
        },
    ];





    return (
        <>

            <div style={{
                backgroundImage:
                    'url("https://marketplace.canva.com/EAD2962NKnQ/2/0/1600w/canva-rainbow-gradient-pink-and-purple-virtual-background-_Tcjok-d9b4.jpg")',
                padding: "2%",
                height: "100%",
                width: "100% 100%",
                backgroundSize: "cover",
                objectFit: "cover",
                backgroundPosition: "50% 50%",
            }}>
                <div style={{ display: "flex", justifyContent: "center" }}>
                    <div>

                        <div style={{ marginTop: "20px" }}>
                            <label htmlFor="fname" style={{ fontSize: "20px" }}>First name :</label>
                            <input name="fname" id="fname" placeholder="first name" onChange={(e) => handleChange(e)} value={inputdata.fname} style={{ width: "300px", padding: "8px", marginLeft: "10px" }} />
                        </div>

                        <div style={{ marginTop: "20px" }}>
                            <label htmlFor="email" style={{ fontSize: "20px" }}>Email :</label>
                            <input name="email" id="email" placeholder="Email" onChange={(e) => handleChange(e)} value={inputdata.email} style={{ width: "300px", padding: "8px", marginLeft: "13%" }} />
                        </div>

                        <div style={{ marginTop: "20px" }}>
                            <label htmlFor="pass" style={{ fontSize: "20px" }}>password:</label>
                            <input name="pass" id="" placeholder="password" onChange={(e) => handleChange(e)} value={inputdata.pass} style={{ width: "300px", padding: "8px", marginLeft: "22px" }} />
                        </div>

                        <button onClick={handleSubmit} style={{ border: "2px solid #FF69B4", backgroundColor: "transparent", padding: "7px", width: "120px", fontSize: "18px", marginTop: "20px", marginLeft: "35%" }}>Submit</button><br></br>
                    </div>
                </div>

                <div style={{ display: "flex", justifyContent: "center" }}>
                    <Dropdown
                        menu={{
                            items,
                        }}
                        trigger={['click']}
                    >
                        <a onClick={(e) => e.preventDefault()}>
                            <Space>
                                <button style={{ border: "2px solid #FF69B4", backgroundColor: "transparent", padding: "7px", width: "120px", fontSize: "18px", marginTop: "20px" }}>sort
                                    <DownOutlined /></button>
                            </Space>
                        </a>
                    </Dropdown>

                </div>
                <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>

                    <input name="search" placeholder="search.." onChange={(e) => setSearchh(e.target.value)} value={searchh} style={{ width: "500px", padding: "5px", marginLeft: "22px" }} />


                    {/* Select box */}

                    <Select
                        showSearch
                        placeholder="Select a person"
                        optionFilterProp="children"
                        onChange={onChange}
                        onSearch={onSearch}
                        filterOption={filterOption}
                        style={{ color: "black", width: "200px", border: "1px solid black", height: "40px" }}
                        options={[
                            {
                                value: 'jack',
                                label: <button onClick={(e) => setSelected(e.target.innerText)} style={{ border: "none", backgroundColor: "transparent" }}>fname</button>,
                            },
                            {
                                value: 'lucy',
                                label: <button onClick={(e) => setSelected(e.target.innerText)} style={{ border: "none", backgroundColor: "transparent" }}>email</button>,
                            },
                            {
                                value: 'tom',
                                label: <button onClick={(e) => setSelected(e.target.innerText)} style={{ border: "none", backgroundColor: "transparent" }}>pass</button>,
                            },
                        ]}
                    />
                </div>


                {/* table */}
                <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
                    <table>
                        <thead>
                            <tr>
                                <th><input type="checkbox" value="all" name="selectall" checked={selectedBoxes?.length === data?.length} onChange={(e) => handleCheck(e)} /></th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>password</th>
                                <th>Edit</th>
                                <th>Delete</th>

                            </tr>
                        </thead>

                        <tbody>{serachingg?.map((item, index) => {

                            return (
                                <tr>
                                    <td><input type="checkbox" value={parseInt(item?.id)} name={parseInt(item?.id)} checked={selectedBoxes?.includes(parseInt(item?.id))} onChange={(e) => handleCheck(e)} /></td>
                                    <td>{item.fname}</td>
                                    <td>{item.email}</td>
                                    <td>{item.pass}</td>
                                    <td><button style={{ width: "100px" }} onClick={() => handleEdit(index)}>Edit</button></td>
                                    <td><button style={{ width: "100px" }} onClick={() => handleDelete(index)}>Delete</button></td>
                                </tr>
                            )
                        })}</tbody>
                    </table>

                </div>
                {/* Dropdown button */}


            </div>

        </>
    )
}