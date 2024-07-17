import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
const Profile = () => {
  const [user, setUser] = useState({});
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: '',
    dob: '',
    mobile: '',
  });
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    } else {
      const decoded = jwtDecode(token);
      const fetchData = async () => {
        try {
          const res = await axios.get(`http://localhost:5000/api/users/profile`, {
            headers: { 'x-auth-token': token },
          });
          setUser(res.data);
          setFormData({
            name: res.data.name || '',
            age: res.data.age || '',
            gender: res.data.gender || '',
            dob: res.data.dob ? res.data.dob.split('T')[0] : '',
            mobile: res.data.mobile || '',
          });
        } catch (err) {
          console.error(err);
        }
      };
      fetchData();
    }
  }, [navigate]);

  const { name, age, gender, dob, mobile } = formData;

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      const res = await axios.put(
        'http://localhost:5000/api/users/profile',
        { name, age, gender, dob, mobile },
        { headers: { 'x-auth-token': token } }
      );
      setUser(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div style={styles.container}>
        
  <h1 style={styles.heading}><i class="bi bi-person-circle"></i>
        Profile
      </h1>      <form onSubmit={onSubmit} style={styles.form}>
        <input
          type="text"
          name="name"
          value={name}
          onChange={onChange}
          placeholder="Name"
          required
          style={styles.input}
        />
        <input
          type="number"
          name="age"
          value={age}
          onChange={onChange}
          placeholder="Age"
          style={styles.input}
        />
        <input
          type="text"
          name="gender"
          value={gender}
          onChange={onChange}
          placeholder="Gender"
          style={styles.input}
        />
        <input
          type="date"
          name="dob"
          value={dob}
          onChange={onChange}
          placeholder="Date of Birth"
          style={styles.input}
        />
        <input
          type="text"
          name="mobile"
          value={mobile}
          onChange={onChange}
          placeholder="Mobile"
          style={styles.input}
        />
        <button type="submit" style={styles.button}>
          Update
        </button>
      </form>
      <button onClick={logout} style={styles.button2}>
        Logout
      </button>
    </div>
  );
};

export default Profile;

// Inline styles object
const styles = {
  container: {
    maxWidth: '600px',
    margin: '50px auto',
    paddingLeft: '25px',
    paddingRight: '25px',
    paddingTop: '10px',
    paddingBottom: '10px',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    backgroundImage:"url(https://i.pinimg.com/originals/8d/73/1f/8d731f8b2355a81edc3efcb1727645ed.gif)",
    backgroundSize: 'cover',
    backgroundPosition: 'center',
},
heading: {
    textAlign: 'center',
    marginBottom: '20px',
    fontSize: '30px',
    color: '#333',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  input: {
    marginBottom: '15px',
    padding: '10px',
    fontSize: '16px',
    border: '1px solid #ccc',
    borderRadius: '4px',
  },
  button: {
    padding: '10px',
    fontSize: '16px',
    backgroundColor: 'green',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
    marginTop: '10px',
  },
  button2:{
    padding: '10px',
    fontSize: '16px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
    marginTop: '10px',
  }
};

