import axios from "../utils/axios";

export const getContacts = async () => {
    let response = null;
    try {
        response = await axios.get('/contact');
        if (response.status === 200) {
            return response.data.data;
        } else {
            return response.data.message;
        }
    } catch (error) {
        return error;
    }
};

export const getDetailContact = async (id : string) => {
    let response = null;
    try {
        response = await axios.get('/contact/' + id);
        if (response.status === 200) {
            return response.data.data;
        } else {
            return response.data.message;
        }
    } catch (error) {
        return error;
    }
};

export const addContact = async (firstName: string, lastName: string, age: number, photo: string) => {
    let response = null;
    try {
        response = await axios.post('/contact', {
            firstName: firstName,
            lastName: lastName,
            age: age,
            photo: photo
        });
        if(response.status === 201 || response.status === 200){
            return response.config.data;
        } else {
            return response.status;
        }
    } catch (error) {
        return error;
    }
};

export const updateContact = async (id: string, firstName: string, lastName: string, age: number, photo: string) => {
    let response = null;
    try {
        response = await axios.put('/contact/' + id, {
            firstName: firstName,
            lastName: lastName,
            age: age,
            photo: photo
        });
        if(response.status === 201 || response.status === 200){
            return response.config.data;
        } else {
            return response.status;
        }
    } catch (error) {
        return error;
    }
};

export const deleteContact = async (id : string) => {
    let response = null;
    try {
        response = await axios.delete('/contact/' + id);
        if (response.status === 200) {
            console.log(response.data);
            return response.data;
        } else {
            console.log(response.data.message);
            return response.data.message;
        }
    } catch (error) {
        return error;
    }
};