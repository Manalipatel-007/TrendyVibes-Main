import { get } from 'axios';

// ...existing code...

const getUserProfile = async (token) => {
    try {
        const response = await get('http://localhost:4000/api/users/profile', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        console.log("User Profile:", response.data);
    } catch (error) {
        console.log("Get user error:", error);
    }
};

// ...existing code...

export default {
    getUserProfile,
    // ...existing code...
};
